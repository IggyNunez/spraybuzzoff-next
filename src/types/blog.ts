export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  targetKeyword: string;
  datePublished: string;
  author: string;
  city?: string;
  bodyHtml: string;
  internalLinks: { label: string; href: string }[];
}
