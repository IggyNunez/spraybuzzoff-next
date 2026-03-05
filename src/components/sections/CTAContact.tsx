"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ContactForm } from "@/components/ui/ContactForm";
import { CTA_STATS } from "@/lib/constants";
import { fadeUp, fadeUpDelayed } from "@/lib/animation-variants";

export function CTAContact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <section id="contact" className="relative py-28 md:py-36 overflow-hidden" ref={ref}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/man-by-truck.jpg')" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(1,109,48,0.94) 0%, rgba(5,92,59,0.9) 100%)",
        }}
      />

      <div className="relative z-[2] max-w-[1400px] mx-auto px-[clamp(20px,4vw,48px)] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold uppercase leading-[1.1] text-white mb-6">
            Ready to Say Goodbye to Pests &amp; Harsh Chemicals?
          </h2>
          <p className="font-body text-[0.95rem] leading-relaxed text-white mb-10">
            Natural pest protection for your family&apos;s playground. Get a
            free quote in minutes. No commitment. No pressure. Just safer pest
            control.
          </p>

          <div className="flex gap-8">
            {CTA_STATS.map((stat) => (
              <div key={stat.label}>
                <strong className="font-display text-2xl font-bold text-gold-500 block">
                  {stat.value}
                </strong>
                <span className="font-body text-[0.82rem] text-white">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={fadeUpDelayed(0.2)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
