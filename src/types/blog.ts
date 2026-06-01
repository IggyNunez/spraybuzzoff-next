export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  targetKeyword: string;
  datePublished: string;
  author: string;
  city?: string;
  region?: string;
  heroImage?: { path: string; alt: string };
  diagramImage?: { path: string; alt: string };
  bodyHtml: string;
  internalLinks: { label: string; href: string }[];
}
