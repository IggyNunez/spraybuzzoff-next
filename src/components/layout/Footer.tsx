import Image from "next/image";
import { BOOKING_URL } from "@/lib/constants";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export function Footer() {
  return (
    <footer className="text-white pt-16 pb-8" style={{ background: "#012810" }}>
      <div className="max-w-[1400px] mx-auto px-[clamp(20px,4vw,48px)]">

        {/* Centered logo + tagline */}
        <div className="flex flex-col items-center text-center mb-12">
          <Image
            src="/assets/spraybuzzoffLogo.png"
            alt="Buzz Off"
            width={200}
            height={200}
            className="h-36 w-auto mb-4"
          />
          <p className="font-body text-[0.88rem] leading-relaxed text-green-300 max-w-sm">
            Natural pest prevention made for families, by families.
            Zero synthetic pesticides. Safe for kids, pets &amp; the planet.
          </p>
          {/* Social icons */}
          <div className="flex gap-4 mt-5">
            <a
              href="https://instagram.com/spraybuzzoff"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a
              href="https://facebook.com/spraybuzzoff"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-12" style={{ background: "rgba(255,255,255,0.08)" }} />

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14">
          {/* Services */}
          <div>
            <h4 className="font-display text-[0.82rem] font-bold uppercase tracking-[0.15em] mb-5 text-white">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                "Mosquito Prevention",
                "General Pest Prevention",
                "Interior Treatment",
                "One-Time Treatment",
              ].map((s) => (
                <li key={s}>
                  <a href="#services" className="font-body text-[0.88rem] text-green-300 hover:text-white transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Plans */}
          <div>
            <h4 className="font-display text-[0.82rem] font-bold uppercase tracking-[0.15em] mb-5 text-white">
              Plans
            </h4>
            <ul className="space-y-3">
              {["The Basics", "The Full Shield", "The Fortress", "Custom Quote"].map((p) => (
                <li key={p}>
                  <a href="#plans" className="font-body text-[0.88rem] text-green-300 hover:text-white transition-colors">
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-[0.82rem] font-bold uppercase tracking-[0.15em] mb-5 text-white">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "#about" },
                { label: "FAQ", href: "#faq" },
                { label: "Contact", href: "#contact" },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="font-body text-[0.88rem] text-green-300 hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-[0.82rem] font-bold uppercase tracking-[0.15em] mb-5 text-white">
              Get In Touch
            </h4>
            <div className="space-y-3">
              <a href="tel:9098988955" className="flex items-center gap-2 font-body text-[0.88rem] text-green-300 hover:text-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                909.898.8955
              </a>
              <a href="mailto:Buzz@spraybuzzoff.com" className="flex items-center gap-2 font-body text-[0.88rem] text-green-300 hover:text-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Buzz@spraybuzzoff.com
              </a>
              <span className="flex items-center gap-2 font-body text-[0.88rem] text-green-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Inland Empire, CA
              </span>
              <div className="pt-1">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-body text-[0.78rem] font-extrabold tracking-[0.08em] uppercase text-white bg-red-500 hover:bg-red-600 px-[18px] py-2 rounded-full transition-colors"
                  style={{ border: "2px solid rgba(255,255,255,0.15)" }}
                >
                  Book Now
                  <ArrowIcon className="group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-3" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <p className="font-body text-[0.8rem] text-green-300/70">
            &copy; Buzz Off Pest Prevention 2026. All rights reserved. Made for families, by families.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-body text-[0.8rem] text-green-300/70 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-body text-[0.8rem] text-green-300/70 hover:text-white transition-colors">
              Terms &amp; Conditions
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
