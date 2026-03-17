import { NextRequest, NextResponse } from "next/server";
import { getGorillaDesk, GorillaApiError } from "@/lib/gorilladesk";
import { validateLeadForm } from "@/lib/validation";
import type { LeadApiResponse, GDCustomerCreatePayload } from "@/types";

const PHONE_FALLBACK = "(909) 552-1718";

/* ── Simple in-memory rate limiter (3 requests / minute per IP) ── */
const rateMap = new Map<string, number[]>();
const RATE_WINDOW = 60_000; // 1 minute
const RATE_LIMIT = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rateMap.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW);
  hits.push(now);
  rateMap.set(ip, hits);
  return hits.length > RATE_LIMIT;
}

/* ── POST /api/lead ── */
export async function POST(req: NextRequest) {
  try {
    /* Rate limit */
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json<LeadApiResponse>(
        {
          success: false,
          message: `Too many requests. Please wait a moment or call us at ${PHONE_FALLBACK}.`,
        },
        { status: 429 }
      );
    }

    /* Parse & validate */
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json<LeadApiResponse>(
        { success: false, message: "Invalid request body." },
        { status: 400 }
      );
    }

    const { valid, errors, sanitized } = validateLeadForm(body);
    if (!valid) {
      return NextResponse.json<LeadApiResponse>(
        { success: false, message: errors.join(" ") },
        { status: 400 }
      );
    }

    /* Build GorillaDesk customer payload */
    const gd = getGorillaDesk();

    // Parse address into structured location (required by GorillaDesk)
    // Default to service area if user didn't provide an address
    let location = {
      address_line_1: "TBD",
      city: "Rancho Cucamonga",
      state: "CA",
      zip: "91730",
    };

    if (sanitized.address) {
      // Try to parse "123 Main St, City, ST 91730" format
      const parts = sanitized.address.split(",").map((p: string) => p.trim());
      if (parts.length >= 2) {
        const lastPart = parts[parts.length - 1];
        // Try to extract state and zip from last part (e.g. "CA 91730" or "CA")
        const stateZipMatch = lastPart.match(/^([A-Z]{2})\s*(\d{5})?$/i);
        if (stateZipMatch) {
          location = {
            address_line_1: parts[0],
            city: parts.length >= 3 ? parts[parts.length - 2] : "Rancho Cucamonga",
            state: stateZipMatch[1].toUpperCase(),
            zip: stateZipMatch[2] || "91730",
          };
        } else {
          // Couldn't parse state/zip — use street + city from parts
          location = {
            address_line_1: parts[0],
            city: parts[1] || "Rancho Cucamonga",
            state: "CA",
            zip: "91730",
          };
        }
      } else {
        // Single value — treat as street address
        location.address_line_1 = sanitized.address;
      }
    }

    const customerPayload: GDCustomerCreatePayload = {
      first_name: sanitized.firstName,
      last_name: sanitized.lastName,
      email: sanitized.email,
      status: "lead",
      location,
    };

    // Attach phone if provided (type ID "5G4m9Mm1OL" = Mobile in GorillaDesk)
    if (sanitized.phone) {
      customerPayload.phones = [
        { phone: sanitized.phone, type: "5G4m9Mm1OL", is_primary: true },
      ];
    }

    /* Create customer */
    const customer = await gd.createCustomer(customerPayload);

    /* Attach note with all form details */
    const noteLines: string[] = [
      `📋 New lead from spraybuzzoff.com`,
      `Submitted: ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })}`,
    ];
    if (sanitized.service) noteLines.push(`Service interest: ${sanitized.service}`);
    if (sanitized.referral) noteLines.push(`Referral source: ${sanitized.referral}`);
    if (sanitized.address) noteLines.push(`Address: ${sanitized.address}`);
    if (sanitized.message) noteLines.push(`Message: ${sanitized.message}`);

    const customerId = customer.data.id;

    await gd.addNote(customerId, { content: noteLines.join("\n") });

    return NextResponse.json<LeadApiResponse>({
      success: true,
      message: "Your info has been received! We'll be in touch shortly.",
      customerId,
    });
  } catch (err) {
    console.error("[/api/lead] Error:", err);

    if (err instanceof GorillaApiError) {
      if (err.status === 429) {
        return NextResponse.json<LeadApiResponse>(
          {
            success: false,
            message: `Our system is busy. Please try again in a moment or call us at ${PHONE_FALLBACK}.`,
          },
          { status: 429 }
        );
      }
      return NextResponse.json<LeadApiResponse>(
        {
          success: false,
          message: `Something went wrong on our end. Please call us at ${PHONE_FALLBACK}.`,
        },
        { status: 502 }
      );
    }

    return NextResponse.json<LeadApiResponse>(
      {
        success: false,
        message: `Unexpected error. Please call us at ${PHONE_FALLBACK}.`,
      },
      { status: 500 }
    );
  }
}
