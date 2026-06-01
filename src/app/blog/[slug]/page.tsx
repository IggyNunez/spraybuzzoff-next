import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { BreadcrumbJsonLd, BlogPostingJsonLd } from "@/components/seo/JsonLd";
import { BLOG_POSTS } from "@/content/blog";

const SITE = "https://spraybuzzoff.com";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  const url = `${SITE}/blog/${post.slug}`;
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: [post.targetKeyword],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.metaTitle,
      description: post.metaDescription,
      publishedTime: post.datePublished,
      authors: [post.author],
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return notFound();

  const url = `${SITE}/blog/${post.slug}`;

  const breadcrumbs = [
    { name: "Home", url: SITE },
    { name: "Blog", url: `${SITE}/blog` },
    { name: post.title, url },
  ];

  return (
    <>
      <BlogPostingJsonLd post={post} />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Nav />
      <main className="w-full min-w-full">
        {/* Hero */}
        <section className="section-card mt-2 bg-[#1A5C32] text-white">
          <div className="max-w-[900px] mx-auto px-[clamp(20px,4vw,64px)] pt-[200px] pb-20">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 text-[0.75rem] font-body tracking-[0.08em] uppercase text-white/70"
            >
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li aria-hidden>›</li>
                <li>
                  <Link href="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li aria-hidden>›</li>
                <li className="text-white" aria-current="page">
                  {post.city ?? "Article"}
                </li>
              </ol>
            </nav>
            {post.city && (
              <p className="font-body text-[0.8rem] tracking-[0.2em] uppercase text-[#F0C060] mb-3">
                {post.city}{post.region ? `, ${post.region}` : ""}
              </p>
            )}
            <h1 className="font-display text-[clamp(32px,5vw,62px)] leading-[0.98] tracking-[0.01em] uppercase mb-6">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-white/70 text-[0.82rem] font-body">
              <span>{post.author}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.datePublished}>
                {new Date(post.datePublished).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC",
                })}
              </time>
            </div>
          </div>
        </section>

        {/* Article body */}
        <section className="section-card mt-2 bg-white">
          <div className="max-w-[780px] mx-auto px-[clamp(20px,4vw,48px)] py-16">
            <div
              className="blog-prose"
              dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
            />
          </div>
        </section>

        {/* CTA */}
        <section className="section-card mt-2 bg-[#1A5C32] text-white text-center">
          <div className="max-w-[900px] mx-auto px-[clamp(20px,4vw,64px)] py-20">
            <h2 className="font-display text-[clamp(32px,4.2vw,52px)] uppercase leading-[1] mb-6">
              Ready to take back your yard?
            </h2>
            <p className="text-[17px] text-white/85 mb-8 max-w-[560px] mx-auto">
              Get a quote for professional, plant-based pest control with no
              contracts required.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/contact"
                className="font-body text-[0.78rem] font-extrabold tracking-[0.08em] uppercase text-[#1A5C32] bg-[#F0C060] hover:bg-[#E5B450] px-8 py-4 rounded-full transition-colors"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/services"
                className="font-body text-[0.78rem] font-extrabold tracking-[0.08em] uppercase text-white border-2 border-white/40 hover:bg-white/10 px-8 py-4 rounded-full transition-colors"
              >
                View All Services
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
