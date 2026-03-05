"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PestFloat } from "@/components/ui/PestFloat";
import { SpiderSVG } from "@/components/ui/pests/SpiderSVG";
import { FAQS } from "@/lib/constants";
import { fadeUpDelayed } from "@/lib/animation-variants";

export function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="relative py-28 md:py-36 bg-canvas-warm overflow-hidden"
      ref={ref}
    >
      {/* Floating spider */}
      <PestFloat
        size={32}
        style={{ top: "10%", right: "8%" }}
        driftVariant={3}
      >
        <SpiderSVG />
      </PestFloat>

      <div className="max-w-[1100px] mx-auto px-[clamp(20px,4vw,48px)]">
        <SectionHeader
          eyebrow="Got Questions?"
          title="Questions We Actually Get"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                className={`rounded-2xl border-2 transition-colors duration-300 overflow-hidden ${
                  isOpen
                    ? "border-red-500 bg-white"
                    : "border-gray-200 bg-white"
                }`}
                variants={fadeUpDelayed(i * 0.08)}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className="font-body text-[0.82rem] font-bold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <motion.span
                    className="text-red-500 text-xl font-light shrink-0"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.2 },
                      }}
                      className="overflow-hidden"
                    >
                      <p className="font-body text-[0.82rem] leading-relaxed text-gray-700 px-6 pb-6">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
