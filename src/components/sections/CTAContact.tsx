"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ContactForm } from "@/components/ui/ContactForm";
import { CTA_STATS } from "@/lib/constants";


export function CTAContact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden" ref={ref}>
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/man-by-truck.jpg')" }}
      />
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(26,92,50,0.94) 0%, rgba(15,61,32,0.92) 100%)",
        }}
      />

      <div className="relative z-[2] max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left — text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold uppercase leading-[1.1] tracking-wide text-white mb-6">
            <span className="section-eyebrow !text-[#F0C060] block mb-3">Get Started</span>
            Ready to Say Goodbye to Pests &amp; Harsh Chemicals?
          </h2>
          <p className="font-body text-[0.95rem] leading-relaxed text-white/80 mb-10">
            Natural pest protection for your family&apos;s playground. Book
            your first service in minutes. No contracts. No pressure. Just
            safer pest control.
          </p>

          <div className="flex gap-8">
            {CTA_STATS.map((stat) => (
              <div key={stat.label}>
                <strong className="font-display text-2xl font-bold text-[#C8973A] block">
                  {stat.value}
                </strong>
                <span className="font-body text-[0.82rem] text-white/80">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
