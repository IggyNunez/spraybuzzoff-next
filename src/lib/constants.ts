import type {
  NavLink,
  HeroStat,
  ServiceFeatured,
  ServiceSmall,
  ProcessStep,
  DiffCard,
  Plan,
  Pest,
  Testimonial,
  FAQ,
  CTAStat,
} from "@/types";

export const BOOKING_URL =
  "https://portal.gorilladesk.com/spraybuzzoff";

export const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Plans", href: "#plans" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/spraybuzzoff", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com/spraybuzzoff", icon: "facebook" },
] as const;

export const INTRO_CARDS: DiffCard[] = [
  {
    icon: "\u2753",
    title: "The Question",
    desc: "If you\u2019ve ever paused and wondered, \u201CWhat exactly are they spraying around my home?\u201D \u2014 you\u2019re not alone.",
  },
  {
    icon: "\u26A0\uFE0F",
    title: "Same Old Playbook",
    desc: "For decades, pest control hasn\u2019t really changed. Same synthetic chemicals. Just rebranded as \u201Cnormal.\u201D",
  },
  {
    icon: "\u{1F3E1}",
    title: "Families Changed",
    desc: "Modern families live differently now. We read labels. We question ingredients. And we expect better options.",
  },
  {
    icon: "\u{1F33F}",
    title: "A Better Way",
    desc: "That\u2019s why Buzz Off was built \u2014 pest prevention that aligns with the way families actually live today.",
  },
];

export const HERO_STATS: HeroStat[] = [
  { label: "Zero Synthetics", sub: "100% Plant-Based Formulas" },
  { label: "Safe for Families", sub: "Kids, Pets & Playgrounds" },
  { label: "FIFRA Exempt", sub: "25(b) Registered Ingredients" },
  { label: "Mom-Founded", sub: "Family Owned & Operated" },
];

export const SERVICES_FEATURED: ServiceFeatured[] = [
  {
    label: "Prevention",
    title: "Mosquito Prevention",
    image: "/assets/spraying-bugs.jpg",
    description:
      "Reclaim your backyard for playtime, without synthetic chemicals on your kids' skin. We create a natural shield around your outdoor living spaces so your kids can run barefoot and bite-free.",
    bullets: [
      "Evenings outside feel relaxed again",
      "Designed for yards where kids and pets play",
      "No harsh sprays or overwhelming smells",
    ],
  },
  {
    label: "Exterior",
    title: "General Pest Prevention",
    image: "/assets/spraying-exterior.jpg",
    description:
      'Keep the "uninvited guests" outside where they belong. Our exterior-first approach creates a botanical perimeter that stops pests before they step foot in your kitchen.',
    bullets: [
      "Stops bugs before they come inside",
      "Keeps treatments outside, away from daily life",
      "A gentle, botanical barrier around your home",
    ],
  },
];

export const SERVICES_SMALL: ServiceSmall[] = [
  {
    label: "Interior",
    title: "Interior Treatment",
    image: "/assets/spraying-hallway.jpg",
  },
  {
    label: "Protection",
    title: "Eave & Entry Points",
    image: "/assets/spraying-underneath-roof.jpg",
  },
  {
    label: "Outdoor",
    title: "Yard Perimeter",
    image: "/assets/man-getting-spray-ready.jpg",
  },
  {
    label: "Flexible",
    title: "One-Time Treatment",
    image: "/assets/man-by-truck.jpg",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    num: "01",
    icon: "\u{1F4CB}",
    title: "Book Online",
    desc: "Schedule your service in under 2 minutes. Pick the plan that fits your family.",
  },
  {
    num: "02",
    icon: "\u{1F50D}",
    title: "We Assess",
    desc: "Our team inspects your property to identify pest pressures and entry points.",
  },
  {
    num: "03",
    icon: "\u{1F33F}",
    title: "We Treat",
    desc: "Plant-based formulas are applied to create a natural barrier around your home.",
  },
  {
    num: "04",
    icon: "\u{1F6E1}\uFE0F",
    title: "Stay Protected",
    desc: "Your home stays protected with ongoing prevention. We come back so pests don't.",
  },
];

export const DIFFERENCE_CARDS: DiffCard[] = [
  {
    icon: "\u26A1",
    title: "Stops Pests on Contact",
    desc: "Plant-based formulas that work fast against ants, spiders, and roaches. No harsh chemicals needed. It works. Period.",
  },
  {
    icon: "\u{1F6E1}\uFE0F",
    title: "Keeps Them From Coming Back",
    desc: "Natural oils create a scent barrier that pests avoid. Intentional protection, not excessive chemicals. Prevention over poison.",
  },
  {
    icon: "\u{1F49A}",
    title: "Safe for Kids, Pets & Peace of Mind",
    desc: "FIFRA 25(b) exempt ingredients that meet the non-toxic standards many families already choose at home. Non-toxic shouldn't be a luxury.",
  },
];

export const SERVICE_AREAS = [
  "Rancho Cucamonga",
  "Upland",
  "Ontario",
  "Claremont",
  "Glendora",
  "San Dimas",
  "Fontana",
  "Pomona",
];

export const PLANS: Plan[] = [
  {
    tier: "Starter",
    name: "The Basics",
    price: "$79",
    freq: "Per Treatment / Quarterly",
    featured: false,
    ctaStyle: "green",
    ctaText: "Get Started",
    features: [
      { text: "Exterior Perimeter Treatment", included: true },
      { text: "Eave & Entry Point Treatment", included: true },
      { text: "Plant-Based Formulas Only", included: true },
      { text: "Mosquito Yard Treatment", included: false },
      { text: "Interior Treatment", included: false },
    ],
  },
  {
    tier: "Complete",
    name: "The Full Shield",
    price: "$119",
    freq: "Per Treatment / Monthly",
    featured: true,
    ctaStyle: "gold",
    ctaText: "Get Protected",
    features: [
      { text: "Everything in The Basics", included: true },
      { text: "Mosquito Yard Prevention", included: true },
      { text: "Interior Treatment (As Needed)", included: true },
      { text: "Priority Scheduling", included: true },
      { text: "Free Re-Treatments", included: true },
    ],
  },
  {
    tier: "Premium",
    name: "The Fortress",
    price: "$179",
    freq: "Per Treatment / Monthly",
    featured: false,
    ctaStyle: "green",
    ctaText: "Go Premium",
    features: [
      { text: "Everything in Full Shield", included: true },
      { text: "Bi-Weekly Mosquito Treatment", included: true },
      { text: "Flea & Tick Yard Treatment", included: true },
      { text: "Unlimited Re-Treatments", included: true },
      { text: "Emergency Same-Day Service", included: true },
    ],
  },
];

export const PESTS: Pest[] = [
  { icon: "\u{1F99F}", name: "Mosquitoes", desc: "Yard & perimeter" },
  { icon: "\u{1FAB3}", name: "Roaches", desc: "Interior & exterior" },
  { icon: "\u{1F41C}", name: "Ants", desc: "Trails & colonies" },
  { icon: "\u{1F577}\uFE0F", name: "Spiders", desc: "Webs & nests" },
  { icon: "\u{1FAB2}", name: "Earwigs", desc: "Garden & entry" },
  { icon: "\u{1F415}", name: "Fleas & Ticks", desc: "Yard treatment" },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    text: "Finally a pest company I don't have to worry about with my toddler running barefoot in the backyard. They actually use safe products and it WORKS.",
    name: "Rachel M.",
    location: "Rancho Cucamonga, CA \u00B7 Verified",
    avatar: "\u{1F469}",
  },
  {
    text: "We switched from a traditional pest company and haven't looked back. No chemical smell, no worrying about the dogs. The mosquitoes are GONE.",
    name: "Marcus T.",
    location: "Upland, CA \u00B7 Verified",
    avatar: "\u{1F468}",
  },
  {
    text: "As a mom of three, finding a truly non-toxic pest service was a game changer. Hayley and Veronnica really understand what families need. Highly recommend!",
    name: "Jessica L.",
    location: "Claremont, CA \u00B7 Verified",
    avatar: "\u{1F469}",
  },
];

export const FAQS: FAQ[] = [
  {
    question: "Is it really safe for kids and pets?",
    answer:
      "Absolutely. We use only FIFRA 25(b) exempt, plant-based ingredients. These are the same types of natural oils many families already use at home. Your kids can play in the yard right after treatment.",
  },
  {
    question: "Does natural pest control actually work?",
    answer:
      "Yes. Our plant-based formulas stop pests on contact and create a natural scent barrier that keeps them from coming back. We stand behind our results with free re-treatments if needed.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve families across the Inland Empire and San Gabriel Valley, including Rancho Cucamonga, Upland, Ontario, Claremont, Glendora, San Dimas, Fontana, Pomona, La Verne, Arcadia, Monrovia, and more.",
  },
  {
    question: "How often should I get treated?",
    answer:
      "For best results, we recommend monthly or quarterly treatments depending on your plan. Consistent prevention is the key to keeping pests away long-term without harsh chemicals.",
  },
  {
    question:
      "What's the difference between you and traditional pest control?",
    answer:
      "Traditional pest companies use synthetic pesticides that can leave residues and strong chemical smells. We use zero synthetic pesticides. Every product we use is plant-based, FIFRA 25(b) exempt, and designed for homes with families.",
  },
  {
    question: "Do you offer one-time treatments?",
    answer:
      "Yes! While our protection plans offer the best ongoing value, we also offer one-time treatments. Contact us for a custom quote based on your property and needs.",
  },
];

export const CTA_STATS: CTAStat[] = [
  { value: "500+", label: "Families Protected" },
  { value: "5.0\u2605", label: "Average Rating" },
  { value: "100%", label: "Plant-Based" },
];
