"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IFRAME_SRC =
  "https://portal-embed-v3.gorilladesk.com/?screen=booking&account_id=84081210";
const EMBED_SCRIPT =
  "https://portal-embed-v3.gorilladesk.com/js/booking/embed.js";

/* ── Context ── */
type BookingCtx = { open: () => void };
const Ctx = createContext<BookingCtx>({ open: () => {} });
export const useBooking = () => useContext(Ctx);

/* ── Provider (wraps app) ── */
export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [isOpen]);

  // load embed script once
  useEffect(() => {
    if (document.getElementById("gd-embed-script")) return;
    const s = document.createElement("script");
    s.id = "gd-embed-script";
    s.src = EMBED_SCRIPT;
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <Ctx.Provider value={{ open }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <>
            {/* backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[9998] bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={close}
            />

            {/* drawer */}
            <motion.div
              key="drawer"
              className="fixed top-0 right-0 bottom-0 z-[9999] w-full sm:w-[440px] bg-white shadow-2xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {/* header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
                <span className="font-body font-bold text-sm uppercase tracking-wider text-gray-700">
                  Book a Service
                </span>
                <button
                  onClick={close}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close booking"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* iframe */}
              <iframe
                id="gorilladesk-booking-iframe"
                src={IFRAME_SRC}
                className="flex-1 w-full border-0"
                title="Book a service with Buzz Off"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
