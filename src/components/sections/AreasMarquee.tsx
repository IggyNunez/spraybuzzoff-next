import { SERVICE_AREAS } from "@/lib/constants";

export function AreasMarquee() {
  const doubled = [...SERVICE_AREAS, ...SERVICE_AREAS];

  return (
    <section className="bg-[#1A5C32] py-8 overflow-hidden">
      <div
        className="marquee-track flex items-center gap-0 whitespace-nowrap"
        style={{ "--marquee-duration": "30s", width: "max-content" } as React.CSSProperties}
      >
        {doubled.map((city, i) => (
          <span key={`${city}-${i}`} className="flex items-center gap-0">
            <span className="font-display text-[clamp(24px,3vw,36px)] font-bold uppercase text-white tracking-[0.04em] px-6">
              {city}
            </span>
            <span className="w-2 h-2 rounded-full bg-[#F0C060] shrink-0" />
          </span>
        ))}
      </div>
    </section>
  );
}
