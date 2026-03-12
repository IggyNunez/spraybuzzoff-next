import type { LeadFormData } from "@/types";

/** Strip HTML tags and trim whitespace */
function sanitize(value: string, maxLen = 500): string {
  return value.replace(/<[^>]*>/g, "").trim().slice(0, maxLen);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ValidationResult {
  valid: boolean;
  errors: string[];
  sanitized: LeadFormData;
}

export function validateLeadForm(raw: Record<string, unknown>): ValidationResult {
  const errors: string[] = [];

  const firstName = sanitize(String(raw.firstName ?? ""), 100);
  const lastName = sanitize(String(raw.lastName ?? ""), 100);
  const email = sanitize(String(raw.email ?? ""), 254);
  const phone = sanitize(String(raw.phone ?? ""), 30);
  const address = sanitize(String(raw.address ?? ""), 300);
  const referral = sanitize(String(raw.referral ?? ""), 100);
  const service = sanitize(String(raw.service ?? ""), 100);
  const message = sanitize(String(raw.message ?? ""), 2000);

  if (!firstName) errors.push("First name is required.");
  if (!lastName) errors.push("Last name is required.");
  if (!email) errors.push("Email is required.");
  else if (!EMAIL_RE.test(email)) errors.push("Invalid email format.");

  return {
    valid: errors.length === 0,
    errors,
    sanitized: { firstName, lastName, email, phone, address, referral, service, message },
  };
}
