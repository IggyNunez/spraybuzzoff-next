import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { CITIES } from "@/lib/cities";
import { SERVICE_AREA_REGIONS, SERVICE_AREAS } from "@/lib/constants";

const SITE = "https://spraybuzzoff.com";

export const metadata: Metadata = {
  title: "Pest Control Service Areas | Inland Empire, San Gabriel Valley & Orange County",
  description:
    "Plant-based pest control across the Inland Empire, San Gabriel Valley and Orange County - Rancho Cucamonga, Upland, Ontario, Claremont, Pomona, Anaheim, Irvine, Huntington Beach, Newport Beach and more. FIFRA 25(b) exempt. Safe for kids & pets.",
  alternates: { canonical: `${SITE}/pest-control` },
  keywords: [
    "pest control Inland Empire",
    "pest control San Gabriel Valley",
    "pest control Orange County",
    "pest control near me",
    "natural pest control SoCal",
    "plant-based pest control California",
  ],
};

export default function ServiceAreasPage() {
  const breadcrumbs = [
    { name: "Home", url: SITE },
    { name: "Service Areas", url: `${SITE}/pest-control` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Nav />
      <main className="w-full min-w-full">
        <section className="section-card mt-2 bg-[#1A5C32] text-white">
          <div className="max-w-[1200px] mx-auto px-[clamp(20px,4vw,64px)] pt-[220px] pb-20">
            <nav aria-label="Breadcrumb" className="mb-6 text-[0.75rem] font-body tracking-[0.08em] uppercase text-white/70">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li aria-hidden>›</li>
                <li className="text-white" aria-current="page">Service Areas</li>
              </ol>
            </nav>

            <p className="font-body text-[0.8rem] tracking-[0.2em] uppercase text-[#F0C060] mb-3">Service Areas</p>
            <h1 className="font-display text-[clamp(40px,6vw,84px)] leading-[0.95] uppercase mb-6">
              Plant-based pest control across the<br />
              <span className="italic font-serif normal-case text-[#F0C060]">Inland Empire, San Gabriel Valley & Orange County.</span>
            </h1>
            <p className="max-w-[720px] text-[clamp(16px,1.4vw,19px)] leading-[1.55] text-white/85">
              Buzz Off is a family-owned pest prevention company serving {SERVICE_AREAS.length} cities across Southern California. Every treatment is 100% plant-based, FIFRA 25(b) exempt, and built for homes with kids, pets, and the people you love.
            </p>
          </div>
        </section>

        <section className="section-card mt-2 bg-white">
          <div className="max-w-[1200px] mx-auto px-[clamp(20px,4vw,64px)] py-20">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {CITIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/pest-control/${c.slug}`}
                  className="group border border-[#1A5C32]/15 rounded-2xl p-6 hover:border-[#1A5C32] hover:bg-[#1A5C32] hover:text-white transition-colors"
                >
                  <p className="font-body text-[0.7rem] tracking-[0.15em] uppercase text-[#F0C060] mb-2">{c.county}</p>
                  <h2 className="font-display text-[26px] uppercase text-[#1A5C32] group-hover:text-white mb-2">{c.name}</h2>
                  <p className="text-[13px] text-neutral-600 group-hover:text-white/85">ZIPs: {c.zips.join(", ")}</p>
                  <p className="mt-3 text-[12px] font-body tracking-[0.08em] uppercase text-[#1A5C32] group-hover:text-[#F0C060]">
                    View {c.name} →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-card mt-2 bg-[#F7F5F0]">
          <div className="max-w-[1200px] mx-auto px-[clamp(20px,4vw,64px)] py-20">
            <p className="font-body text-[0.8rem] tracking-[0.2em] uppercase text-[#E05A2B] mb-3">Full Coverage Map</p>
            <h2 className="font-display text-[clamp(30px,4vw,52px)] leading-[1] uppercase text-[#1A5C32] mb-4">
              Every city we service
            </h2>
            <p className="max-w-[720px] text-[15px] leading-[1.6] text-neutral-600 mb-10">
              Buzz Off provides natural pest prevention and mosquito control across {SERVICE_AREAS.length} cities.
              Don&apos;t see yours? Call the team - we may still serve your area.
            </p>

            <div className="grid md:grid-cols-2 gap-10">
              {SERVICE_AREA_REGIONS.map((r) => (
                <div key={r.region}>
                  <h3 className="font-display text-[22px] uppercase text-[#1A5C32] mb-4">{r.region}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {r.cities.map((city) => {
                      const match = CITIES.find((c) => c.name === city);
                      const pill = (
                        <span className="inline-block font-body text-[0.82rem] font-semibold px-3 py-1.5 rounded-full bg-white border border-[#1A5C32]/15 text-[#1A5C32]">
                          {city}
                        </span>
                      );
                      return (
                        <li key={city}>
                          {match ? (
                            <Link
                              href={`/pest-control/${match.slug}`}
                              className="inline-block hover:opacity-80 transition-opacity"
                              aria-label={`Pest control in ${city}, CA`}
                            >
                              {pill}
                            </Link>
                          ) : (
                            pill
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
