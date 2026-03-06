import type {
  NavLink,
  HeroStat,
  ServiceFeatured,
  ServiceSmall,
  ProcessStep,
  Plan,
  Testimonial,
  FAQ,
  CTAStat,
  ComparisonRow,
} from "@/types";

export const BOOKING_URL =
  "https://portal.gorilladesk.com/spraybuzzoff";

export const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Plans", href: "/#plans" },
  { label: "About", href: "/about-us" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/spraybuzzoff", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com/spraybuzzoff", icon: "facebook" },
] as const;


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


export const SERVICE_AREAS = [
  "Rancho Cucamonga",
  "Upland",
  "Ontario",
  "Claremont",
  "Glendora",
  "San Dimas",
  "Fontana",
  "Pomona",
  "La Verne",
  "Arcadia",
  "Monrovia",
  "Azusa",
];

export const PLANS: Plan[] = [
  {
    tier: "Mosquito Control",
    name: "Natural Mosquito Shield",
    price: "",
    freq: "",
    featured: false,
    ctaStyle: "green",
    ctaText: "Call the Team",
    features: [
      { text: "Mosquito fogging of foliage & harborage areas", included: true },
      { text: "Granular treatment in turf, planter beds & shrubs", included: true },
      { text: "Mosquito bait stations for continuous control", included: true },
      { text: "Standing water & breeding zone inspection", included: true },
      { text: "Recurring bi-weekly service (March–November)", included: true },
    ],
  },
  {
    tier: "Most Popular",
    name: "Natural Perimeter Protection",
    price: "",
    freq: "",
    featured: true,
    ctaStyle: "gold",
    ctaText: "Call the Team",
    features: [
      { text: "Full exterior de-webbing of eaves, windows & doorways", included: true },
      { text: "Targeted crack & crevice dust application", included: true },
      { text: "Exterior foundation & entry-point treatment", included: true },
      { text: "Plant-based formulas only", included: true },
      { text: "No contracts — cancel anytime", included: true },
    ],
  },
  {
    tier: "Complete Protection",
    name: "Natural Whole Home Protection",
    price: "",
    freq: "",
    featured: false,
    ctaStyle: "green",
    ctaText: "Call the Team",
    features: [
      { text: "Everything in Natural Perimeter Protection", included: true },
      { text: "Interior treatment as needed", included: true },
      { text: "Interior crack & crevice dust for long-term prevention", included: true },
      { text: "Plant-based formulas only", included: true },
      { text: "No contracts — cancel anytime", included: true },
    ],
  },
];


export const TESTIMONIALS: Testimonial[] = [
  {
    text: "I was very impressed with the products they use. They are very natural products that are safe for my two girls. Hayley came out to do the mosquito hedge treatment and she did an amazing job!",
    name: "Julie S.",
    location: "La Puente, CA \u00B7 Yelp",
    avatar: "",
  },
  {
    text: "We've been dealing with ants and spiders for a while now, and these ladies came in and got the job done efficiently and professionally. They are pet-safe products which was very important to me since I have two dogs.",
    name: "Terranzo M.",
    location: "City of Industry, CA \u00B7 Yelp",
    avatar: "",
  },
  {
    text: "I love that they use natural and pet-friendly treatments. They are a local family-owned business and their customer service is great! Highly recommend!",
    name: "Ashlyn C.",
    location: "Rancho Cucamonga, CA \u00B7 Yelp",
    avatar: "",
  },
  {
    text: "They use a natural pet-safe spray and it smells amazing! The bugs are gone and I feel so much better knowing the products used around my home are safe.",
    name: "Katherine B.",
    location: "CA \u00B7 Yelp",
    avatar: "",
  },
];

export const FAQS: FAQ[] = [
  {
    question: "What's actually in your treatments?",
    answer:
      "Active ingredients include cedarwood oil, cinnamon oil, thyme oil, rosemary oil, clove oil, citronella oil, lemongrass oil, cornmint oil, and geraniol. Every product used is FIFRA 25(b) exempt. No synthetic pyrethroids, no organophosphates, no harsh chemicals.",
  },
  {
    question: "Are your treatments safe for kids and pets?",
    answer:
      "Yes. Keep kids and pets off treated areas until dry — typically 30 to 45 minutes. That's it.",
  },
  {
    question: "Why do your treatments smell the way they do?",
    answer:
      "The scent is the botanical oils working — cedarwood, cinnamon, thyme, citronella, lemongrass. The aroma dissipates as the product dries, usually within an hour.",
  },
  {
    question: "How often do you treat?",
    answer:
      "Bi-weekly during mosquito season, which runs March through November in Southern California. Perimeter and whole home plans are on monthly or quarterly schedules depending on your plan.",
  },
  {
    question: "Do I have to sign a contract?",
    answer:
      "No contracts, ever. Pause or cancel anytime.",
  },
  {
    question: "How is Buzz Off different from traditional pest control?",
    answer:
      "Botanical formulas instead of synthetic pyrethroids — cedarwood, rosemary, thyme, citronella, and other plant oils. Synthetic chemicals for 50 years. We use plant-based. There's a difference.",
  },
  {
    question: "What pests do you treat for?",
    answer:
      "Natural Mosquito Shield is for mosquitoes. Perimeter and Whole Home plans address ants, spiders, roaches, earwigs, fleas, ticks, silverfish, and other common household invaders.",
  },
  {
    question: "Will rain affect my treatment?",
    answer:
      "Treatments are designed to bind after application and hold up to light rain once dry. Significant rainfall immediately after service will be made right — we come back, no questions asked.",
  },
  {
    question: "Do I need to be home during the service?",
    answer:
      "Not for exterior-only services — just access to the yard. Interior treatments require scheduling.",
  },
  {
    question: "How soon will I see results?",
    answer:
      "Significant reduction in activity within the first one to two visits. Populations continue to decline over time on the recurring schedule.",
  },
  {
    question: "Are your products safe for gardens and pollinators?",
    answer:
      "Treatments are applied strategically to harborage areas rather than broadcast across flowering plants. The plant oils do not bioaccumulate. Dedicated gardens and pollinator-friendly plantings can be worked around on request.",
  },
  {
    question: "Are your products safe near water features or pools?",
    answer:
      "No aquatic toxicity restrictions. We recommend removing or covering outdoor pet water bowls during treatment. Pools are treated around appropriately.",
  },
];

export const CTA_STATS: CTAStat[] = [
  { value: "500+", label: "Families Protected" },
  { value: "5.0\u2605", label: "Average Rating" },
  { value: "100%", label: "Plant-Based" },
];

export const STATS_BAR = [
  { icon: "leaf", label: "100% Plant-Based" },
  { icon: "family", label: "Made for Families" },
  { icon: "star", label: "5\u2605 Average" },
];

export const TICKER_ITEMS = [
  "FIFRA 25(b) Exempt",
  "Zero Synthetics",
  "Mom-Founded",
  "Safe for Kids & Pets",
  "No Contracts",
  "100% Plant-Based",
  "Family Owned",
  "Inland Empire Local",
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  { feature: "Ingredients", buzzoff: "Plant-based essential oils", traditional: "Synthetic pyrethroids" },
  { feature: "Safe for Kids & Pets", buzzoff: "Yes \u2014 FIFRA 25(b) exempt", traditional: "Requires evacuation" },
  { feature: "Environmental Impact", buzzoff: "No bioaccumulation", traditional: "Soil & water contamination" },
  { feature: "Contracts Required", buzzoff: "Never \u2014 cancel anytime", traditional: "12-month lock-in typical" },
  { feature: "Scent", buzzoff: "Pleasant botanical aroma", traditional: "Chemical odor" },
  { feature: "Effectiveness", buzzoff: "Proven pest prevention", traditional: "Kills on contact, pests return" },
];
