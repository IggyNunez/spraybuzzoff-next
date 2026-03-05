"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { NAV_LINKS, BOOKING_URL, SOCIAL_LINKS } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const DURATION = 0.6;

/* ── Chamfered corners for the taller drawer card ── */
const CARD_CLIP = "polygon(16px 0%, calc(100% - 16px) 0%, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0% calc(100% - 16px), 0% 16px)";

/* ── Inline SVG social icons ── */
function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" />
    </svg>
  );
}

function SocialIcon({ icon, className = "" }: { icon: string; className?: string }) {
  if (icon === "instagram") return <InstagramIcon className={className} />;
  if (icon === "facebook") return <FacebookIcon className={className} />;
  return null;
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Desktop Nav ── */}
      <motion.nav
        className="hidden md:block fixed top-0 left-0 right-0 z-[100]"
        initial={false}
        animate={{ height: scrolled ? 70 : 140 }}
        transition={{ duration: DURATION, ease: EASE }}
        style={{ height: 140 }}
      >
        <motion.div
          className="flex items-center h-full max-w-[1400px] mx-auto px-[clamp(20px,4vw,48px)]"
          initial={false}
          animate={{ justifyContent: scrolled ? "center" : "space-between" }}
          transition={{ duration: DURATION, ease: EASE }}
        >
          <motion.a
            href="#"
            className="shrink-0 block"
            initial={false}
            animate={{
              width: scrolled ? 0 : 170,
              opacity: scrolled ? 0 : 1,
            }}
            transition={{ duration: DURATION, ease: EASE }}
            style={{ overflow: "hidden" }}
            aria-hidden={scrolled}
            tabIndex={scrolled ? -1 : undefined}
          >
            <Image
              src="/assets/spraybuzzoffLogo.png"
              alt="Buzz Off Pest Prevention"
              width={170}
              height={170}
              className="w-[170px] h-[170px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
              priority
            />
          </motion.a>

          {/* Pill — outer = green border frame, inner = white content */}
          <div
            style={{
              background: "#016d30",
              borderRadius: 9999,
              padding: "3px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
            }}
          >
            <motion.div
              className="flex items-center"
              style={{ background: "#FFFFFF", borderRadius: 9999 }}
              initial={false}
              animate={{
                paddingLeft: scrolled ? 24 : 24,
                paddingRight: scrolled ? 10 : 10,
                paddingTop: scrolled ? 6 : 6,
                paddingBottom: scrolled ? 6 : 6,
                gap: scrolled ? 2 : 4,
              }}
              transition={{ duration: DURATION, ease: EASE }}
            >
              <motion.a
                href="#"
                className="shrink-0 flex items-center justify-center overflow-hidden"
                initial={false}
                animate={{
                  width: scrolled ? 36 : 0,
                  opacity: scrolled ? 1 : 0,
                  marginRight: scrolled ? 4 : 0,
                }}
                transition={{ duration: DURATION, ease: EASE }}
                aria-hidden={!scrolled}
                tabIndex={!scrolled ? -1 : undefined}
              >
                <Image
                  src="/assets/spraybuzzoffLogo.png"
                  alt="Buzz Off"
                  width={36}
                  height={36}
                  className="w-9 h-9 min-w-[36px] drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)]"
                />
              </motion.a>

              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-[0.7rem] font-bold tracking-[0.06em] uppercase text-green-900 hover:text-green-700 px-4 py-2 transition-colors duration-200 whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}

              {/* Desktop social icons */}
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-green-900/50 hover:text-green-900 transition-colors"
                >
                  <SocialIcon icon={s.icon} className="w-4 h-4" />
                </a>
              ))}

              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-[0.68rem] font-extrabold tracking-[0.08em] uppercase text-white bg-red-500 hover:bg-red-600 px-5 py-2 rounded-full transition-colors duration-200 ml-1 whitespace-nowrap"
                style={{ border: "2px solid #016d30" }}
              >
                Book Now
              </a>
            </motion.div>
          </div>
        </motion.div>
      </motion.nav>

      {/* ── Mobile Nav ── */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-[100] px-4 pt-3 flex items-start justify-between">
        {/* Big logo — visible at top, collapses on scroll */}
        <motion.a
          href="#"
          className="shrink-0 block"
          initial={false}
          animate={{
            width: scrolled ? 0 : 100,
            opacity: scrolled ? 0 : 1,
          }}
          transition={{ duration: DURATION, ease: EASE }}
          style={{ overflow: "hidden" }}
          aria-hidden={scrolled}
          tabIndex={scrolled ? -1 : undefined}
        >
          <Image
            src="/assets/spraybuzzoffLogo.png"
            alt="Buzz Off Pest Prevention"
            width={100}
            height={100}
            className="w-[100px] h-[100px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
            priority
          />
        </motion.a>

        {/* Pill — right side */}
        <div
          style={{
            background: "#016d30",
            borderRadius: 9999,
            padding: "3px",
            boxShadow: "0 4px 18px rgba(0,0,0,0.12)",
          }}
        >
          <motion.div
            className="flex items-center justify-between h-[56px] pr-4"
            style={{ background: "#FFFFFF", borderRadius: 9999 }}
            initial={false}
            animate={{
              paddingLeft: scrolled ? 6 : 16,
            }}
            transition={{ duration: DURATION, ease: EASE }}
          >
            {/* Small logo inside pill — appears on scroll */}
            <motion.a
              href="#"
              className="shrink-0 flex items-center justify-center overflow-hidden"
              initial={false}
              animate={{
                width: scrolled ? 44 : 0,
                opacity: scrolled ? 1 : 0,
                marginRight: scrolled ? 4 : 0,
              }}
              transition={{ duration: DURATION, ease: EASE }}
              aria-hidden={!scrolled}
              tabIndex={!scrolled ? -1 : undefined}
            >
              <Image
                src="/assets/spraybuzzoffLogo.png"
                alt="Buzz Off"
                width={44}
                height={44}
                className="w-[44px] h-[44px] min-w-[44px] drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)]"
              />
            </motion.a>

            <div className="flex items-center gap-3">
              {/* Social icons in mobile pill */}
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-green-900/50 hover:text-green-900 transition-colors"
                >
                  <SocialIcon icon={s.icon} className="w-[18px] h-[18px]" />
                </a>
              ))}

              <button
                className="flex flex-col justify-center items-center w-10 h-10"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <span className="block w-[20px] h-[2px] bg-green-900 rounded-full" />
                <span className="block w-[20px] h-[2px] bg-green-900 rounded-full mt-[5px]" />
                <span className="block w-[20px] h-[2px] bg-green-900 rounded-full mt-[5px]" />
              </button>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* ── Mobile Drawer — chamfered card ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="md:hidden fixed inset-0 z-[200] bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMobile}
            />

            {/* Outer motion div animates the slide, inner divs handle shape + content */}
            <motion.div
              className="md:hidden fixed top-1/2 right-3 -translate-y-1/2 z-[201] w-[270px]"
              style={{
                background: "#016d30",
                clipPath: CARD_CLIP,
                padding: "3px",
                boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
              }}
              initial={{ x: "110%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "110%", opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <div
                className="flex flex-col overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.97)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-5 pt-3 pb-2">
                  <a href="#" onClick={closeMobile}>
                    <Image
                      src="/assets/spraybuzzoffLogo.png"
                      alt="Buzz Off"
                      width={64}
                      height={64}
                      className="w-16 h-16"
                    />
                  </a>
                  <button
                    className="flex items-center justify-center w-7 h-7 rounded-full border border-green-900/20 hover:border-green-900/40 hover:bg-green-900/5 transition-all"
                    onClick={closeMobile}
                    aria-label="Close menu"
                  >
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#016d30" strokeWidth="1.5" strokeLinecap="round">
                      <line x1="1" y1="1" x2="11" y2="11" />
                      <line x1="11" y1="1" x2="1" y2="11" />
                    </svg>
                  </button>
                </div>

                <div className="mx-5 h-px bg-green-900/10" />

                {/* Nav links */}
                <div className="flex flex-col px-5 pt-2">
                  {NAV_LINKS.map((link, i) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={closeMobile}
                      className="font-body text-[0.9rem] font-bold tracking-[0.05em] uppercase text-green-900 hover:text-green-900 py-[12px] transition-colors flex items-center justify-between"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: 0.08 + i * 0.04, ease: EASE }}
                    >
                      {link.label}
                      <svg width="7" height="7" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="opacity-30">
                        <path d="M2 1l4 3-4 3" />
                      </svg>
                    </motion.a>
                  ))}
                </div>

                {/* Bottom section */}
                <div className="px-5 pb-4 pt-2">
                  <div className="h-px bg-green-900/10 mb-3" />

                  {/* Book Now */}
                  <motion.a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobile}
                    className="block font-body text-[0.7rem] font-extrabold tracking-[0.08em] uppercase text-white bg-red-500 hover:bg-red-600 py-2.5 rounded-full transition-colors text-center"
                    style={{ border: "2px solid #016d30" }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, ease: EASE }}
                  >
                    Book Now
                  </motion.a>

                  {/* Phone */}
                  <motion.a
                    href="tel:9098988955"
                    className="block font-body text-[0.9rem] font-extrabold tracking-[0.04em] text-green-900 text-center mt-2 hover:text-green-700 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    909.898.8955
                  </motion.a>

                  {/* Social row */}
                  <motion.div
                    className="flex items-center justify-center gap-3 mt-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                  >
                    {SOCIAL_LINKS.map((s) => (
                      <a
                        key={s.icon}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-green-900/25 text-green-900/60 hover:text-green-900 hover:border-green-900/50 transition-all"
                      >
                        <SocialIcon icon={s.icon} className="w-4 h-4" />
                      </a>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
