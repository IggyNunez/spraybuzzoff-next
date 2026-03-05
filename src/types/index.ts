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

export interface DiffCard {
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

export interface Pest {
  icon: string;
  name: string;
  desc: string;
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
