import Link from "next/link";
import { CITIES } from "@/lib/cities";
import { MARQUEE_AREAS } from "@/lib/constants";

export function AreasMarquee() {
  const citySlugMap = new Map(CITIES.map((c) => [c.name, c.slug]));
  const items = MARQUEE_AREAS.map((name) => ({ name, slug: citySlugMap.get(name) }));
  const doubled = [...items, ...items];

  return (
    <section className="bg-[#1A5C32] py-8 overflow-hidden" aria-label="Cities we serve">
      <div
        className="marquee-track flex items-center gap-0 whitespace-nowrap"
        style={{ "--marquee-duration": "40s", width: "max-content" } as React.CSSProperties}
      >
        {doubled.map((c, i) => {
          const label = (
            <span className="font-display text-[clamp(24px,3vw,36px)] font-bold uppercase text-white tracking-[0.04em] px-6">
              {c.name}
            </span>
          );
          return (
            <span key={`${c.name}-${i}`} className="flex items-center gap-0">
              {c.slug ? (
                <Link
                  href={`/pest-control/${c.slug}`}
                  className="hover:text-[#F0C060] transition-colors"
                  aria-label={`Pest control in ${c.name}, CA`}
                >
                  {label}
                </Link>
              ) : (
                label
              )}
              <span className="w-2 h-2 rounded-full bg-[#F0C060] shrink-0" />
            </span>
          );
        })}
      </div>
    </section>
  );
}
