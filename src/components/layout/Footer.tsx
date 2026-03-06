"use client";

import Image from "next/image";
import { BOOKING_URL } from "@/lib/constants";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export function Footer() {
  return (
    <footer className="relative text-white pt-16 pb-8 overflow-hidden bg-[#1A5C32]">
      {/* Botanical leaf pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.06]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="leafPattern" x="0" y="0" width="600" height="650" patternUnits="userSpaceOnUse">
              {/* Hero leaf — large, sweeping, top-left area */}
              <g transform="translate(120, 60) rotate(30, 0, 0)">
                <path
                  d="M0 0 C-50 35, -65 110, -25 170 C-8 195, 8 195, 25 170 C65 110, 50 35, 0 0Z"
                  fill="white"
                />
                <path d="M0 10 C-2 60, 0 120, 0 170" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5" />
                <path d="M-4 55 C-20 68, -32 85, -38 105" fill="none" stroke="white" strokeWidth="1" opacity="0.35" />
                <path d="M4 55 C20 68, 32 85, 38 105" fill="none" stroke="white" strokeWidth="1" opacity="0.35" />
                <path d="M-3 95 C-16 105, -26 120, -30 140" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
                <path d="M3 95 C16 105, 26 120, 30 140" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
                <path d="M-2 130 C-10 140, -18 152, -20 162" fill="none" stroke="white" strokeWidth="0.8" opacity="0.25" />
                <path d="M2 130 C10 140, 18 152, 20 162" fill="none" stroke="white" strokeWidth="0.8" opacity="0.25" />
                {/* Stem */}
                <path d="M0 170 C4 190, 10 215, 8 240" fill="none" stroke="white" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
              </g>

              {/* Second large leaf — right side, opposite angle */}
              <g transform="translate(440, 280) rotate(-25, 0, 0)">
                <path
                  d="M0 0 C-40 28, -52 88, -20 136 C-6 156, 6 156, 20 136 C52 88, 40 28, 0 0Z"
                  fill="white"
                  opacity="0.7"
                />
                <path d="M0 8 C-1 48, 0 96, 0 136" fill="none" stroke="white" strokeWidth="1.2" opacity="0.45" />
                <path d="M-3 44 C-16 54, -26 68, -30 84" fill="none" stroke="white" strokeWidth="0.8" opacity="0.3" />
                <path d="M3 44 C16 54, 26 68, 30 84" fill="none" stroke="white" strokeWidth="0.8" opacity="0.3" />
                <path d="M-2 80 C-12 90, -20 104, -22 118" fill="none" stroke="white" strokeWidth="0.8" opacity="0.25" />
                <path d="M2 80 C12 90, 20 104, 22 118" fill="none" stroke="white" strokeWidth="0.8" opacity="0.25" />
                <path d="M0 136 C-3 152, -6 170, -5 188" fill="none" stroke="white" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
              </g>

              {/* Medium leaf — bottom left */}
              <g transform="translate(60, 420) rotate(55, 0, 0)">
                <path
                  d="M0 0 C-30 20, -38 65, -15 100 C-5 115, 5 115, 15 100 C38 65, 30 20, 0 0Z"
                  fill="white"
                  opacity="0.5"
                />
                <path d="M0 6 C0 36, 0 72, 0 100" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
                <path d="M-3 35 C-12 42, -20 55, -22 68" fill="none" stroke="white" strokeWidth="0.7" opacity="0.25" />
                <path d="M3 35 C12 42, 20 55, 22 68" fill="none" stroke="white" strokeWidth="0.7" opacity="0.25" />
                <path d="M0 100 C2 112, 5 126, 4 138" fill="none" stroke="white" strokeWidth="1.5" opacity="0.25" strokeLinecap="round" />
              </g>

              {/* Small accent leaf — top right */}
              <g transform="translate(480, 50) rotate(-50, 0, 0)">
                <path
                  d="M0 0 C-22 15, -28 50, -10 75 C-3 86, 3 86, 10 75 C28 50, 22 15, 0 0Z"
                  fill="white"
                  opacity="0.4"
                />
                <path d="M0 5 C0 28, 0 54, 0 75" fill="none" stroke="white" strokeWidth="0.8" opacity="0.35" />
                <path d="M0 75 C-2 86, -4 98, -3 106" fill="none" stroke="white" strokeWidth="1.2" opacity="0.2" strokeLinecap="round" />
              </g>

              {/* Tiny floating leaf — center area */}
              <g transform="translate(300, 180) rotate(15, 0, 0)">
                <path
                  d="M0 0 C-16 11, -20 36, -7 54 C-2 62, 2 62, 7 54 C20 36, 16 11, 0 0Z"
                  fill="white"
                  opacity="0.3"
                />
                <path d="M0 4 C0 20, 0 38, 0 54" fill="none" stroke="white" strokeWidth="0.6" opacity="0.3" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leafPattern)" />
        </svg>
      </div>

      {/* Top gold divider */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] z-[1]"
        style={{ background: "linear-gradient(90deg, transparent, #C8973A, transparent)" }}
      />

      <div className="relative z-10 max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)]">

        {/* Centered logo + tagline */}
        <div className="flex flex-col items-center text-center mb-14">
          <Image
            src="/assets/spraybuzzoffLogo.png"
            alt="Buzz Off"
            width={200}
            height={200}
            className="h-52 w-auto mb-5"
          />
          <p className="font-body text-[0.88rem] leading-relaxed text-white max-w-sm">
            Made for families, built for backyards.
            100% plant-based pest prevention. Safe for kids, pets &amp; the people you love.
          </p>

          {/* Social icons */}
          <div className="flex gap-4 mt-6">
            <a
              href="https://instagram.com/spraybuzzoff"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/15 hover:scale-110"
              style={{ border: "1px solid rgba(255,255,255,0.5)" }}
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
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/15 hover:scale-110"
              style={{ border: "1px solid rgba(255,255,255,0.5)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Gold divider */}
        <div
          className="h-px mb-12"
          style={{ background: "linear-gradient(90deg, transparent, rgba(200,151,58,0.4), transparent)" }}
        />

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14">
          {/* Services */}
          <div>
            <h4 className="font-display text-[0.8rem] font-bold uppercase tracking-[0.18em] mb-5 text-[#C8973A]">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Mosquito Prevention", href: "/#services" },
                { label: "General Pest Prevention", href: "/#services" },
                { label: "Interior Treatment", href: "/#services" },
                { label: "One-Time Treatment", href: "/#contact" },
              ].map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="font-body text-[0.85rem] text-white hover:text-white/80 transition-colors">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Plans */}
          <div>
            <h4 className="font-display text-[0.8rem] font-bold uppercase tracking-[0.18em] mb-5 text-[#C8973A]">
              Plans
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Natural Mosquito Shield", href: "/#plans" },
                { label: "Natural Perimeter Protection", href: "/#plans" },
                { label: "Natural Whole Home Protection", href: "/#plans" },
                { label: "Book Your First Service", href: "/#contact" },
              ].map((p) => (
                <li key={p.label}>
                  <a href={p.href} className="font-body text-[0.85rem] text-white hover:text-white/80 transition-colors">
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-[0.8rem] font-bold uppercase tracking-[0.18em] mb-5 text-[#C8973A]">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/#about" },
                { label: "FAQ", href: "/#faq" },
                { label: "Contact", href: "/#contact" },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="font-body text-[0.85rem] text-white hover:text-white/80 transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-[0.8rem] font-bold uppercase tracking-[0.18em] mb-5 text-[#C8973A]">
              Get In Touch
            </h4>
            <div className="space-y-3">
              <a href="tel:9098988955" className="flex items-center gap-2 font-body text-[0.85rem] text-white hover:text-white/80 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                909.898.8955
              </a>
              <a href="mailto:Buzz@spraybuzzoff.com" className="flex items-center gap-2 font-body text-[0.85rem] text-white hover:text-white/80 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Buzz@spraybuzzoff.com
              </a>
              <span className="flex items-center gap-2 font-body text-[0.85rem] text-white">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Inland Empire, CA
              </span>
              <div className="pt-2">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-body text-[0.78rem] font-extrabold tracking-[0.08em] uppercase text-[#1A5C32] bg-white hover:bg-white/90 px-5 py-2.5 rounded-full transition-all hover:scale-105"
                >
                  Book Now
                  <ArrowIcon className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-3"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <p className="font-body text-[0.78rem] text-white">
            &copy; Buzz Off Pest Prevention 2026. All rights reserved. Made for families, by families.{" "}
            <span className="text-white">License #PR 10014</span>
          </p>
          <div className="flex gap-6">
            <a href="/privacy" className="font-body text-[0.78rem] text-white hover:text-white/80 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="font-body text-[0.78rem] text-white hover:text-white/80 transition-colors">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
