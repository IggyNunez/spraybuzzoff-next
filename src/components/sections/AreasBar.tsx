import { SERVICE_AREAS, BOOKING_URL } from "@/lib/constants";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export function AreasBar() {
  return (
    <div className="bg-green-800 py-5">
      <div className="max-w-[1400px] mx-auto px-[clamp(20px,4vw,48px)] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <span className="font-body text-[0.82rem] font-bold text-gold-500 mr-2">
            📍 Serving the Inland Empire
          </span>
          {SERVICE_AREAS.map((city, i) => (
            <span key={city} className="flex items-center gap-2">
              <span className="font-body text-[0.82rem] text-white">
                {city}
              </span>
              {i < SERVICE_AREAS.length - 1 && (
                <span className="w-1 h-1 rounded-full bg-gold-500/60" />
              )}
            </span>
          ))}
        </div>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 font-body text-[0.78rem] font-extrabold tracking-[0.08em] uppercase text-white bg-red-500 hover:bg-red-600 px-[18px] py-2 rounded-full transition-colors shrink-0"
          style={{ border: "2px solid #016d30" }}
        >
          Check Your Area
          <ArrowIcon className="group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}
