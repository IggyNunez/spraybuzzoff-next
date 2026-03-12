export interface NavLink {
  label: string;
  href: string;
}

export interface HeroStat {
  label: string;
  sub: string;
}

export interface ServiceFeatured {
  label: string;
  title: string;
  image: string;
  description: string;
  bullets: string[];
}

export interface ServiceSmall {
  label: string;
  title: string;
  image: string;
}

export interface ProcessStep {
  num: string;
  icon: string;
  title: string;
  desc: string;
}


export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface Plan {
  tier: string;
  name: string;
  price: string;
  freq: string;
  featured: boolean;
  ctaStyle: "gold" | "green";
  ctaText: string;
  features: PlanFeature[];
}


export interface Testimonial {
  text: string;
  name: string;
  location: string;
  avatar: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CTAStat {
  value: string;
  label: string;
}

export interface ComparisonRow {
  feature: string;
  buzzoff: string;
  traditional: string;
}


/* ── GorillaDesk API integration types ── */

/** Form data sent from the client to /api/lead */
export interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  referral?: string;
  service?: string;
  message?: string;
}

/** Response returned from /api/lead to the client */
export interface LeadApiResponse {
  success: boolean;
  message: string;
  customerId?: number;
}

/** Payload for POST /customers */
export interface GDCustomerCreatePayload {
  first_name: string;
  last_name: string;
  email: string;
  status: "lead" | "active" | "inactive";
  phones?: GDPhoneEntry[];
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
}

/** A single phone entry for GorillaDesk */
export interface GDPhoneEntry {
  number: string;
  type: string;
  is_primary: boolean;
}

/** Shape of a customer returned by GorillaDesk */
export interface GDCustomerResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
}

/** Payload for POST /customers/:id/notes */
export interface GDNoteCreatePayload {
  content: string;
}
