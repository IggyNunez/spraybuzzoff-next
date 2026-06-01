/**
 * Per-site config for the SEO automation stack.
 *
 * Single source of truth for everything site-specific. Contains NO
 * secrets (those come from environment variables / GitHub secrets).
 * Safe to commit.
 */

export const SITE = {
  url: "https://spraybuzzoff.com",
  // Verified in Search Console as a DOMAIN property (not URL-prefix),
  // so the property identifier is the sc-domain: form.
  searchConsoleUrl: "sc-domain:spraybuzzoff.com",
  projectName: "spraybuzzoff-next",
};

export const EMAIL = {
  // Sends from email.plaintalk.dev (verified in Resend) — Plain Talk is
  // the parent company entity for this site.
  from: "Buzz Off Ops <ops@email.plaintalk.dev>",
  to: "dev@ignacionunez.dev",
  // Optional client CC; null = internal-only.
  cc: null,
};

/**
 * Business identity for the NAP audit. Pulled from the site's
 * LocalBusinessJsonLd (src/components/seo/JsonLd.tsx). Buzz Off is a
 * service-area pest-control business with no public street address,
 * so streetAddress is left empty (the audit handles a blank street).
 */
export const NAP = {
  name: "Buzz Off",
  nameShort: "Buzz Off",
  phone: "(909) 898-8955",
  phoneDigits: "9098988955",
  streetAddress: "",
  city: "Rancho Cucamonga",
  state: "CA",
  zip: "91730",
};

export const NAP_DIRECTORIES = [
  { name: "Google Business Profile", url: "https://business.google.com/u/0/" },
  { name: "Yelp", url: "https://biz.yelp.com/" },
  { name: "Facebook", url: "https://business.facebook.com/" },
  { name: "Nextdoor", url: "https://business.nextdoor.com/" },
  { name: "Apple Business Connect", url: "https://businessconnect.apple.com/" },
  { name: "Bing Places", url: "https://www.bingplaces.com/" },
  { name: "Angi (Angie's List)", url: "https://pro.angi.com/" },
  { name: "BBB (Better Business Bureau)", url: "https://www.bbb.org/" },
];
