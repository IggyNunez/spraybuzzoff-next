import { TICKER_ITEMS } from "@/lib/constants";

export function MarqueeTicker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section className="bg-brand-yellow py-4 overflow-hidden">
      <div
        className="marquee-track flex items-center gap-0 whitespace-nowrap"
        style={{ "--marquee-duration": "25s", width: "max-content" } as React.CSSProperties}
      >
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-0">
            <span className="font-body text-[11px] font-bold tracking-[0.15em] uppercase text-brand-deep px-5">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
          </span>
        ))}
      </div>
    </section>
  );
}
