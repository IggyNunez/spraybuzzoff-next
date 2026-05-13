import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CityServiceJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";
import { CITIES, getCityBySlug } from "@/lib/cities";
import { BookNowButton } from "@/components/ui/BookNowButton";

const SITE = "https://spraybuzzoff.com";

export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const data = getCityBySlug(city);
  if (!data) return {};

  const url = `${SITE}/pest-control/${data.slug}`;
  const title = `Plant-Based Pest Control in ${data.name}, CA`;
  const description = `Natural, FIFRA 25(b) exempt pest control in ${data.name}, ${data.county}. Safe for kids & pets. Mosquito, ant, spider & roach prevention. No contracts. Family-owned and local.`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: "Buzz Off",
      title,
      description,
      images: [{ url: "/assets/og-home.jpg", width: 1200, height: 630, alt: `Plant-based pest control in ${data.name}, CA` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/assets/og-home.jpg"],
    },
    keywords: [
      `pest control ${data.name}`,
      `pest control ${data.name} CA`,
      `mosquito control ${data.name}`,
      `exterminator ${data.name}`,
      `natural pest control ${data.name}`,
      `organic pest control ${data.name}`,
      `eco-friendly pest control ${data.name}`,
      `pet safe pest control ${data.name}`,
      `kid safe pest control ${data.name}`,
      ...data.zips.map((z) => `pest control ${z}`),
    ],
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const data = getCityBySlug(city);
  if (!data) return notFound();

  const url = `${SITE}/pest-control/${data.slug}`;

  const faqs = [
    {
      question: `Do you offer pest control in ${data.name}, CA?`,
      answer: `Yes. Buzz Off provides 100% plant-based pest control throughout ${data.name}, including ${data.neighborhoods.slice(0, 3).join(", ")} and surrounding neighborhoods. All ZIP codes in ${data.name} (${data.zips.join(", ")}) are covered with same- or next-day availability most weeks.`,
    },
    {
      question: `What pests do you treat in ${data.name}?`,
      answer: `Our ${data.name} treatments target ${data.topPests.join(", ").toLowerCase()}, plus general household pests like silverfish, earwigs, and fleas. We use FIFRA 25(b) exempt plant oils (cedarwood, cinnamon, thyme, rosemary, citronella) - no synthetic pyrethroids.`,
    },
    {
      question: `Is your pest control safe for kids and pets in ${data.name}?`,
      answer: `Yes. Every product we use in ${data.name} homes is FIFRA 25(b) exempt and made from plant-based essential oils. Kids and pets just need to stay off treated areas until dry - typically 30 to 45 minutes. No evacuation, no lingering chemical smell, no synthetic residue.`,
    },
    {
      question: `How much does pest control cost in ${data.name}?`,
      answer: `Pricing in ${data.name} depends on home size and plan. We offer one-time treatments, bi-weekly mosquito shields (March–November), and monthly or quarterly perimeter plans. There are no contracts - cancel anytime. Call ${"909.898.8955"} or book online for a ${data.name} quote.`,
    },
    {
      question: `How quickly can you service ${data.name}?`,
      answer: `Most ${data.name} appointments are booked within 2–5 business days. Mosquito-season calls (March–November) often fill faster, so book early if you're planning a weekend gathering.`,
    },
  ];

  const breadcrumbs = [
    { name: "Home", url: SITE },
    { name: "Service Areas", url: `${SITE}/pest-control` },
    { name: `${data.name}, CA`, url },
  ];

  const otherCities = CITIES.filter((c) => c.slug !== data.slug);

  return (
    <>
      <CityServiceJsonLd
        cityName={data.name}
        citySlug={data.slug}
        geo={data.geo}
        description={`Plant-based, FIFRA 25(b) exempt pest control for homes in ${data.name}, ${data.county}. Safe for kids and pets. ${data.pestIntro}`}
      />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <FAQJsonLd faqs={faqs} />

      <Nav />

      <main className="w-full min-w-full">
        {/* Hero */}
        <section className="section-card mt-2 relative bg-[#1A5C32] text-white overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-15">
            <Image
              src="/assets/services-hero.jpg"
              alt={`Plant-based pest control serving ${data.name}, ${data.county}`}
              fill
              className="object-cover"
              fetchPriority="high"
              loading="eager"
            />
          </div>
          <div className="relative z-10 max-w-[1200px] mx-auto px-[clamp(20px,4vw,64px)] pt-[220px] pb-24">
            {/* Visible breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mb-6 text-[0.75rem] font-body tracking-[0.08em] uppercase text-white/70">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li aria-hidden>›</li>
                <li><Link href="/pest-control" className="hover:text-white">Service Areas</Link></li>
                <li aria-hidden>›</li>
                <li className="text-white" aria-current="page">{data.name}, CA</li>
              </ol>
            </nav>

            <p className="font-body text-[0.8rem] tracking-[0.2em] uppercase text-[#F0C060] mb-3">
              Plant-Based Pest Control in {data.name}, CA
            </p>
            <h1 className="font-display text-[clamp(40px,6vw,84px)] leading-[0.95] tracking-[0.01em] uppercase mb-6">
              {data.name}'s Natural Pest Control.<br />
              <span className="italic font-serif normal-case text-[#F0C060]">Safe for kids, pets, and the people you love.</span>
            </h1>
            <p className="max-w-[720px] text-[clamp(16px,1.4vw,19px)] leading-[1.55] text-white/85 mb-8">
              {data.pestIntro} Every Buzz Off treatment is 100% plant-based, FIFRA 25(b) exempt, and built around
              {" "}{data.name} homes - no contracts, no synthetic chemicals, just botanical oils that work.
            </p>
            <div className="flex flex-wrap gap-3">
              <BookNowButton className="bg-[#F0C060] text-[#1A5C32] hover:bg-[#E5B450] px-6 py-3 rounded-full font-body font-extrabold text-sm tracking-[0.1em] uppercase">
                Book {data.name} Service
              </BookNowButton>
              <a
                href="tel:9098988955"
                className="px-6 py-3 rounded-full font-body font-extrabold text-sm tracking-[0.1em] uppercase border-2 border-white/40 hover:bg-white/10 transition-colors"
              >
                909.898.8955
              </a>
            </div>
          </div>
        </section>

        {/* Climate + why-local */}
        <section className="section-card mt-2 bg-[#F7F3EA]">
          <div className="max-w-[1200px] mx-auto px-[clamp(20px,4vw,64px)] py-20 grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="font-body text-[0.75rem] tracking-[0.2em] uppercase text-[#1A5C32] mb-3">Why {data.name} needs plant-based</p>
              <h2 className="font-display text-[clamp(28px,3.6vw,48px)] uppercase leading-[1.05] text-[#1A5C32] mb-5">
                Pest pressure unique to {data.name}.
              </h2>
              <p className="text-[17px] leading-[1.6] text-neutral-700 mb-4">{data.climateNote}</p>
              <p className="text-[17px] leading-[1.6] text-neutral-700">{data.localAngle}</p>
            </div>
            <div>
              <p className="font-body text-[0.75rem] tracking-[0.2em] uppercase text-[#1A5C32] mb-3">Top {data.name} pests we treat</p>
              <ul className="space-y-3">
                {data.topPests.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-[17px] text-neutral-800 border-b border-[#1A5C32]/10 pb-3">
                    <span className="w-2 h-2 rounded-full bg-[#F0C060]" />
                    {p} in {data.name}, CA
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Services for this city */}
        <section className="section-card mt-2 bg-white">
          <div className="max-w-[1200px] mx-auto px-[clamp(20px,4vw,64px)] py-20">
            <p className="font-body text-[0.75rem] tracking-[0.2em] uppercase text-[#1A5C32] mb-3">Services in {data.name}</p>
            <h2 className="font-display text-[clamp(28px,3.6vw,48px)] uppercase leading-[1.05] text-[#1A5C32] mb-10">
              Plant-based pest control for every {data.name} home.
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { t: `Mosquito Prevention in ${data.name}`, d: `Bite-free backyards from March through November. Fogging, granular treatment, and bait stations - all plant-based.` },
                { t: `General Pest Prevention in ${data.name}`, d: `Botanical barrier for ${data.topPests.slice(0, 3).join(", ").toLowerCase()}, and other common ${data.name} pests.` },
                { t: `Interior Treatment in ${data.name}`, d: `Plant-based interior care for homes with kids, pets, and sensitive family members.` },
                { t: `Perimeter Protection in ${data.name}`, d: `Natural exterior barrier that keeps ${data.name} pests outside where they belong.` },
                { t: `One-Time Treatment in ${data.name}`, d: `Hosting a ${data.name} backyard event? Single-visit service, no contract required.` },
                { t: `Whole Home Protection in ${data.name}`, d: `Interior + exterior plant-based coverage for complete ${data.name} home defense.` },
              ].map((s) => (
                <div key={s.t} className="border border-[#1A5C32]/15 rounded-2xl p-6 hover:border-[#1A5C32]/40 transition-colors">
                  <h3 className="font-display text-[22px] uppercase text-[#1A5C32] mb-2">{s.t}</h3>
                  <p className="text-[15px] leading-[1.55] text-neutral-700">{s.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/services" className="font-body text-[0.8rem] tracking-[0.1em] uppercase text-[#1A5C32] underline underline-offset-4 hover:text-[#0F3D20]">
                View full service details →
              </Link>
            </div>
          </div>
        </section>

        {/* Neighborhoods + ZIPs */}
        <section className="section-card mt-2 bg-[#1A5C32] text-white">
          <div className="max-w-[1200px] mx-auto px-[clamp(20px,4vw,64px)] py-20">
            <p className="font-body text-[0.75rem] tracking-[0.2em] uppercase text-[#F0C060] mb-3">Neighborhoods we service</p>
            <h2 className="font-display text-[clamp(28px,3.6vw,48px)] uppercase leading-[1.05] mb-10">
              Serving every corner of {data.name}.
            </h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="font-body text-[0.8rem] tracking-[0.15em] uppercase text-[#F0C060] mb-4">Neighborhoods</h3>
                <ul className="grid grid-cols-2 gap-2 text-[16px]">
                  {data.neighborhoods.map((n) => (
                    <li key={n} className="text-white/90">{n}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-body text-[0.8rem] tracking-[0.15em] uppercase text-[#F0C060] mb-4">ZIP codes</h3>
                <ul className="flex flex-wrap gap-2">
                  {data.zips.map((z) => (
                    <li key={z} className="px-3 py-1.5 rounded-full border border-white/30 text-[14px] tracking-[0.05em]">{z}</li>
                  ))}
                </ul>
                <h3 className="font-body text-[0.8rem] tracking-[0.15em] uppercase text-[#F0C060] mt-8 mb-4">Local landmarks</h3>
                <ul className="text-[15px] text-white/85 space-y-1">
                  {data.landmarks.map((l) => (
                    <li key={l}>· {l}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        {data.testimonial && (
          <section className="section-card mt-2 bg-[#F7F3EA]">
            <div className="max-w-[900px] mx-auto px-[clamp(20px,4vw,64px)] py-20 text-center">
              <p className="font-body text-[0.75rem] tracking-[0.2em] uppercase text-[#1A5C32] mb-4">From a {data.name} neighbor</p>
              <p className="font-serif italic text-[clamp(20px,2.4vw,30px)] leading-[1.4] text-[#1A5C32] mb-6">
                "{data.testimonial.text}"
              </p>
              <p className="font-body text-[14px] tracking-[0.05em] text-neutral-700">- {data.testimonial.name}, {data.testimonial.location}</p>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="section-card mt-2 bg-white">
          <div className="max-w-[1000px] mx-auto px-[clamp(20px,4vw,64px)] py-20">
            <p className="font-body text-[0.75rem] tracking-[0.2em] uppercase text-[#1A5C32] mb-3">{data.name} FAQs</p>
            <h2 className="font-display text-[clamp(28px,3.6vw,48px)] uppercase leading-[1.05] text-[#1A5C32] mb-10">
              Pest control questions from {data.name} homeowners.
            </h2>
            <div className="divide-y divide-[#1A5C32]/15">
              {faqs.map((f) => (
                <details key={f.question} className="py-5 group">
                  <summary className="font-display text-[20px] uppercase text-[#1A5C32] cursor-pointer list-none flex items-start justify-between gap-4">
                    {f.question}
                    <span className="text-[#F0C060] text-xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-[16px] leading-[1.6] text-neutral-700">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-card mt-2 bg-[#1A5C32] text-white text-center">
          <div className="max-w-[900px] mx-auto px-[clamp(20px,4vw,64px)] py-20">
            <h2 className="font-display text-[clamp(32px,4.2vw,56px)] uppercase leading-[1] mb-6">
              Ready for a bite-free {data.name} yard?
            </h2>
            <p className="text-[17px] text-white/85 mb-8 max-w-[620px] mx-auto">
              Join your {data.name} neighbors who've switched to plant-based. No contracts, no synthetics, no pressure.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <BookNowButton className="bg-[#F0C060] text-[#1A5C32] hover:bg-[#E5B450] px-8 py-4 rounded-full font-body font-extrabold text-sm tracking-[0.1em] uppercase">
                Book {data.name} Service
              </BookNowButton>
              <a
                href="tel:9098988955"
                className="px-8 py-4 rounded-full font-body font-extrabold text-sm tracking-[0.1em] uppercase border-2 border-white/40 hover:bg-white/10 transition-colors"
              >
                Call 909.898.8955
              </a>
            </div>
          </div>
        </section>

        {/* Nearby cities */}
        <section className="section-card mt-2 bg-white">
          <div className="max-w-[1200px] mx-auto px-[clamp(20px,4vw,64px)] py-16">
            <p className="font-body text-[0.75rem] tracking-[0.2em] uppercase text-[#1A5C32] mb-3">Nearby service areas</p>
            <h2 className="font-display text-[clamp(24px,2.8vw,36px)] uppercase leading-[1.05] text-[#1A5C32] mb-6">
              Pest control near {data.name}.
            </h2>
            <ul className="flex flex-wrap gap-2">
              {otherCities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/pest-control/${c.slug}`}
                    className="inline-block px-4 py-2 rounded-full border border-[#1A5C32]/25 text-[14px] text-[#1A5C32] hover:bg-[#1A5C32] hover:text-white transition-colors"
                  >
                    Pest Control in {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
