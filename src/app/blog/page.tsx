import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { BLOG_POSTS } from "@/content/blog";

const SITE = "https://spraybuzzoff.com";

export const metadata: Metadata = {
  title: "Pest Control Tips & Guides | Spray Buzz Off Blog",
  description:
    "Practical pest control tips and local advice for Oklahoma homeowners from the Spray Buzz Off team.",
  alternates: { canonical: `${SITE}/blog` },
  robots: { index: true, follow: true },
};

export default function BlogIndex() {
  return (
    <>
      <Nav />
      <main className="w-full min-w-full">
        {/* Hero */}
        <section className="section-card mt-2 bg-[#1A5C32] text-white">
          <div className="max-w-[1200px] mx-auto px-[clamp(20px,4vw,64px)] pt-[200px] pb-20">
            <p className="font-body text-[0.8rem] tracking-[0.2em] uppercase text-[#F0C060] mb-3">
              Pest Control Advice
            </p>
            <h1 className="font-display text-[clamp(40px,6vw,80px)] leading-[0.95] tracking-[0.01em] uppercase mb-6">
              The Spray Buzz Off Blog
            </h1>
            <p className="max-w-[640px] text-[clamp(16px,1.4vw,19px)] leading-[1.55] text-white/85">
              Practical pest control tips and local guides for Oklahoma homeowners.
              Seasonal advice, treatment timing, and what to watch for in your yard.
            </p>
          </div>
        </section>

        {/* Posts */}
        <section className="section-card mt-2 bg-[#F7F3EA]">
          <div className="max-w-[1200px] mx-auto px-[clamp(20px,4vw,64px)] py-20">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BLOG_POSTS.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-2xl p-8 flex flex-col border border-[#1A5C32]/10 hover:border-[#1A5C32]/30 transition-colors"
                >
                  {post.city && (
                    <p className="font-body text-[0.72rem] tracking-[0.18em] uppercase text-[#1A5C32] mb-2">
                      {post.city}
                    </p>
                  )}
                  <h2 className="font-display text-[clamp(20px,2vw,26px)] uppercase leading-[1.1] text-[#1A5C32] mb-3 flex-1">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-[#2D7A47] transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-[15px] leading-[1.55] text-neutral-600 mb-4">
                    {post.metaDescription}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#1A5C32]/10">
                    <time
                      dateTime={post.datePublished}
                      className="font-body text-[0.75rem] text-neutral-500"
                    >
                      {new Date(post.datePublished).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        timeZone: "UTC",
                      })}
                    </time>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-body text-[0.75rem] font-bold tracking-[0.08em] uppercase text-[#1A5C32] hover:text-[#2D7A47] transition-colors"
                    >
                      Read More
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
