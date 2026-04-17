import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CITIES } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you're looking for doesn't exist. But our plant-based pest control still does — browse our service areas or head back home.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="w-full min-w-full">
        {/* Hero */}
        <section className="section-card mt-2 relative overflow-hidden bg-[#1A5C32] text-white">
          {/* Decorative botanical leaves */}
          <div aria-hidden className="pointer-events-none absolute -top-10 -left-10 w-[320px] opacity-25 rotate-[-12deg]">
            <Image
              src="/assets/leaf-branch.png"
              alt=""
              width={320}
              height={320}
              className="w-full h-auto"
            />
          </div>
          <div aria-hidden className="pointer-events-none absolute -bottom-16 -right-16 w-[380px] opacity-20 rotate-[18deg]">
            <Image
              src="/assets/leaf-mosquito-right.png"
              alt=""
              width={380}
              height={380}
              className="w-full h-auto"
            />
          </div>
          <div aria-hidden className="pointer-events-none absolute top-1/3 right-[15%] w-[180px] opacity-15 rotate-[25deg] hidden md:block">
            <Image
              src="/assets/leaf-mosquito-left.png"
              alt=""
              width={180}
              height={180}
              className="w-full h-auto"
            />
          </div>

          <div className="relative z-10 max-w-[1000px] mx-auto px-[clamp(20px,4vw,64px)] pt-[220px] pb-24 text-center">
            {/* Big 404 */}
            <p
              aria-hidden
              className="font-display leading-[0.85] tracking-[-0.02em] text-[clamp(140px,22vw,280px)] text-[#F0C060] drop-shadow-[0_6px_30px_rgba(0,0,0,0.25)]"
            >
              404
            </p>

            <p className="font-body text-[0.8rem] tracking-[0.25em] uppercase text-[#F0C060] mt-2 mb-4">
              No Bugs Found · No Page Either
            </p>

            <h1 className="font-display text-[clamp(36px,5.2vw,72px)] leading-[0.95] uppercase mb-6">
              Looks like this one<br />
              <span className="italic font-serif normal-case text-[#F0C060]">flew off somewhere.</span>
            </h1>

            <p className="max-w-[620px] mx-auto text-[clamp(16px,1.3vw,18px)] leading-[1.6] text-white/85 mb-10">
              The page you're looking for doesn't exist — but our 100% plant-based pest control still does.
              Head back home, or find the Buzz Off service closest to you.
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/"
                className="bg-[#F0C060] text-[#1A5C32] hover:bg-[#E5B450] px-8 py-4 rounded-full font-body font-extrabold text-sm tracking-[0.1em] uppercase transition-colors"
              >
                Back to Home
              </Link>
              <Link
                href="/pest-control"
                className="px-8 py-4 rounded-full font-body font-extrabold text-sm tracking-[0.1em] uppercase border-2 border-white/40 hover:bg-white/10 transition-colors"
              >
                View Service Areas
              </Link>
            </div>
          </div>
        </section>

        {/* Helpful links */}
        <section className="section-card mt-2 bg-[#F7F3EA]">
          <div className="max-w-[1200px] mx-auto px-[clamp(20px,4vw,64px)] py-20">
            <div className="text-center mb-14">
              <p className="font-body text-[0.75rem] tracking-[0.2em] uppercase text-[#1A5C32] mb-3">
                Try one of these instead
              </p>
              <h2 className="font-display text-[clamp(28px,3.6vw,48px)] uppercase leading-[1.05] text-[#1A5C32]">
                Where would you like to go?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5 mb-14">
              {[
                {
                  title: "Our Services",
                  desc: "Mosquito, perimeter, interior, and whole-home plant-based plans.",
                  href: "/services",
                  label: "View Services",
                },
                {
                  title: "Reviews",
                  desc: "See what Inland Empire & San Gabriel Valley neighbors are saying.",
                  href: "/reviews",
                  label: "Read Reviews",
                },
                {
                  title: "Get a Quote",
                  desc: "Same-day replies on most days. No contracts, ever.",
                  href: "/contact",
                  label: "Contact Us",
                },
              ].map((c) => (
                <Link
                  key={c.title}
                  href={c.href}
                  className="group border border-[#1A5C32]/15 rounded-2xl p-7 bg-white hover:border-[#1A5C32] hover:shadow-lg transition-all"
                >
                  <h3 className="font-display text-[24px] uppercase text-[#1A5C32] mb-2">{c.title}</h3>
                  <p className="text-[15px] leading-[1.55] text-neutral-700 mb-4">{c.desc}</p>
                  <span className="inline-flex items-center gap-2 font-body text-[12px] tracking-[0.1em] uppercase text-[#1A5C32] group-hover:text-[#C8973A]">
                    {c.label} <span aria-hidden>→</span>
                  </span>
                </Link>
              ))}
            </div>

            {/* City pill grid */}
            <div>
              <p className="text-center font-body text-[0.75rem] tracking-[0.2em] uppercase text-[#1A5C32] mb-5">
                Or jump to your city
              </p>
              <ul className="flex flex-wrap gap-2 justify-center max-w-[800px] mx-auto">
                {CITIES.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/pest-control/${c.slug}`}
                      className="inline-block px-4 py-2 rounded-full border border-[#1A5C32]/25 text-[14px] text-[#1A5C32] hover:bg-[#1A5C32] hover:text-white transition-colors"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
