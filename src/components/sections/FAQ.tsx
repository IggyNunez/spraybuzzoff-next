"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FAQS } from "@/lib/constants";
import { ArchedEyebrow } from "@/components/ui/ArchedEyebrow";

export function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 md:py-32 bg-white" ref={ref}>
      <div className="max-w-[900px] mx-auto px-[clamp(20px,4vw,80px)]">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <ArchedEyebrow>Got Questions?</ArchedEyebrow>
          </motion.div>
          <motion.h2
            className="section-title mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Questions We Actually Get
          </motion.h2>
          <motion.div
            className="gold-divider mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          />
        </div>

        {/* Accordion */}
        <div className="divide-y divide-[#1A5C32]/10 border-t border-b border-[#1A5C32]/10">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
              >
                <button
                  className="w-full flex items-center justify-between py-5 px-2 text-left cursor-pointer transition-colors hover:bg-[#EAF2EC] rounded-lg"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className="font-body text-[0.9rem] font-bold text-[#1C2B1E] pr-4 leading-snug">
                    {faq.question}
                  </span>
                  <motion.span
                    className="shrink-0 text-[1.2rem] font-light text-[#E05A2B]"
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
                      <p className="font-body text-[0.85rem] leading-relaxed text-[#1C2B1E]/70 px-2 pb-5">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <p className="font-body text-[0.9rem] text-[#1C2B1E]/50 mb-2">
            Still have questions?
          </p>
          <a
            href="tel:9098988955"
            className="font-body text-[0.95rem] font-bold text-[#1A5C32] hover:text-[#0F3D20] transition-colors"
          >
            Call the Team &mdash; 909.898.8955
          </a>
        </motion.div>
      </div>
    </section>
  );
}
