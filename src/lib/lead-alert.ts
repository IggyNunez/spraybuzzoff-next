import type { LeadFormData } from "@/types";

/* ── Lead rescue email ──
 * The lead form's only destination is GorillaDesk. When that write fails the
 * visitor is told to call us and the submission survives nowhere but a server
 * log, so the lead is lost. This mails the full submission to the ops inbox
 * instead.
 *
 * Uses Resend's REST API directly - the same service and verified sending
 * domain the SEO automation scripts already use (seo-stack.config.mjs), so
 * there is no new dependency and no second email vendor to maintain.
 *
 * This must never throw. A failed rescue cannot be allowed to replace the
 * original CRM error the caller is already handling.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const SEND_TIMEOUT_MS = 5_000;

const FROM = process.env.LEAD_ALERT_FROM || "Buzz Off Ops <ops@email.plaintalk.dev>";
const TO = process.env.LEAD_ALERT_TO || "dev@ignacionunez.dev";
// Same env name the SEO digest uses for an optional client-facing copy.
const CC = process.env.LEAD_INBOX_CC || null;

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string | undefined): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:6px 14px 6px 0;color:#6B7B6E;font:600 13px system-ui,sans-serif;white-space:nowrap;vertical-align:top">${esc(label)}</td>
    <td style="padding:6px 0;color:#1C2B1E;font:400 14px system-ui,sans-serif">${esc(value).replace(/\n/g, "<br>")}</td>
  </tr>`;
}

function buildHtml(lead: LeadFormData, reason: string, submittedAt: string): string {
  return `<div style="max-width:620px;margin:0 auto;font-family:system-ui,sans-serif">
  <div style="background:#B3261E;color:#fff;padding:16px 20px;border-radius:10px 10px 0 0">
    <p style="margin:0;font-weight:700;font-size:15px">Lead did NOT reach GorillaDesk</p>
    <p style="margin:4px 0 0;font-size:13px;opacity:.9">This email is the only copy. Add the customer manually.</p>
  </div>
  <div style="border:1px solid #E3E7E4;border-top:none;border-radius:0 0 10px 10px;padding:20px">
    <table style="border-collapse:collapse;width:100%">
      ${row("Name", `${lead.firstName} ${lead.lastName}`.trim())}
      ${row("Email", lead.email)}
      ${row("Phone", lead.phone)}
      ${row("Address", lead.address)}
      ${row("Service", lead.service)}
      ${row("Referral", lead.referral)}
      ${row("Message", lead.message)}
      ${row("Submitted", submittedAt)}
    </table>
    <p style="margin:18px 0 0;padding-top:14px;border-top:1px solid #E3E7E4;color:#6B7B6E;font-size:12px">
      Reason: ${esc(reason)}
    </p>
  </div>
</div>`;
}

function buildText(lead: LeadFormData, reason: string, submittedAt: string): string {
  const lines = [
    "LEAD DID NOT REACH GORILLADESK - this email is the only copy.",
    "",
    `Name: ${lead.firstName} ${lead.lastName}`.trim(),
    `Email: ${lead.email}`,
  ];
  if (lead.phone) lines.push(`Phone: ${lead.phone}`);
  if (lead.address) lines.push(`Address: ${lead.address}`);
  if (lead.service) lines.push(`Service: ${lead.service}`);
  if (lead.referral) lines.push(`Referral: ${lead.referral}`);
  if (lead.message) lines.push(`Message: ${lead.message}`);
  lines.push(`Submitted: ${submittedAt}`, "", `Reason: ${reason}`);
  return lines.join("\n");
}

/**
 * Mails a lead that failed to reach the CRM.
 * Returns true only if Resend accepted the message, so the caller can tell the
 * visitor we have their details instead of asking them to call.
 */
export async function sendLeadRescueEmail(
  lead: LeadFormData,
  reason: string
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Loud on purpose: without this key a CRM outage silently drops leads.
    console.error(
      "[/api/lead] RESEND_API_KEY not set - lead could not be rescued and is LOST:",
      JSON.stringify(lead)
    );
    return false;
  }

  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
  });

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        ...(CC ? { cc: [CC] } : {}),
        reply_to: lead.email,
        subject: `Lead not saved to CRM - ${lead.firstName} ${lead.lastName}`.trim(),
        html: buildHtml(lead, reason, submittedAt),
        text: buildText(lead, reason, submittedAt),
      }),
      signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
    });

    if (!res.ok) {
      console.error(
        "[/api/lead] Rescue email rejected by Resend:",
        res.status,
        await res.text().catch(() => ""),
        "LOST LEAD:",
        JSON.stringify(lead)
      );
      return false;
    }

    console.warn("[/api/lead] CRM write failed; lead rescued by email.", reason);
    return true;
  } catch (err) {
    console.error(
      "[/api/lead] Rescue email threw - lead is LOST:",
      err,
      JSON.stringify(lead)
    );
    return false;
  }
}
