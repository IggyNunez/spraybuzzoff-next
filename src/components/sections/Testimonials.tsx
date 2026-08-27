"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { REVIEWS, TOTAL_REVIEW_COUNT, AVERAGE_RATING, displayDate, type Review } from "@/lib/reviews";
import { ArchedEyebrow } from "@/components/ui/ArchedEyebrow";

/** How many reviews the homepage shows. The full set lives on /reviews. */
const HOMEPAGE_REVIEW_COUNT = 12;

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#C8973A" className="shrink-0">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ReviewCard({ t, className = "" }: { t: Review; className?: string }) {
  return (
    <div
      className={`relative bg-[#FAFAF7] rounded-[4px] p-8 border-l-[3px] border-[#E05A2B] shadow-[0_2px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-shadow duration-300 flex flex-col ${className}`}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4" aria-label={`${t.rating} out of 5 stars`}>
        {[...Array(t.rating)].map((_, si) => (
          <StarIcon key={si} />
        ))}
      </div>

      {/* Quote */}
      <p className="font-quote italic text-[0.95rem] leading-[1.8] text-[#1C2B1E] mb-6 flex-1">
        &ldquo;{t.text}&rdquo;
      </p>

      {/* Customer photos */}
      {t.photos.length > 0 && (
        <div className={`grid gap-2 mb-6 ${t.photos.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
          {t.photos.slice(0, 2).map((photo) => (
            <div
              key={photo.src}
              className="relative w-full overflow-hidden rounded-[4px]"
              style={{ aspectRatio: t.photos.length === 1 ? "4 / 3" : "1 / 1" }}
            >
              <Image
                src={photo.src}
                alt={`${photo.caption} from ${t.name}, a Buzz Off pest control customer in the Inland Empire`}
                fill
                sizes="(max-width: 768px) 45vw, 220px"
                className="object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}

      {/* Attribution */}
      <div className="flex items-center gap-3 pt-5 border-t border-[#1A5C32]/10">
        {t.avatar ? (
          <Image
            src={t.avatar}
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover shrink-0"
            loading="lazy"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#1A5C32] flex items-center justify-center shrink-0" aria-hidden="true">
            <span className="font-display text-[0.9rem] font-bold text-white">
              {t.name.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <strong className="font-body text-[0.85rem] font-bold text-[#1A5C32] block">
            {t.name}
          </strong>
          <span className="font-body text-[0.75rem] text-[#1C2B1E]/50">
            {t.source === "google" ? "Google" : "Yelp"}
            {displayDate(t) ? ` · ${displayDate(t)}` : ""}
            {t.isLocalGuide ? " · Local Guide" : ""}
          </span>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const reviews = REVIEWS.slice(0, HOMEPAGE_REVIEW_COUNT);
  const [current, setCurrent] = useState(0);

  return (
    <section id="reviews" className="relative py-24 md:py-32 bg-[#FAFAF7]" ref={ref}>
      <div className="max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)]">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <ArchedEyebrow>Happy Families</ArchedEyebrow>
          </motion.div>
          <motion.h2
            className="section-title mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            What the Neighborhood&apos;s Saying
          </motion.h2>
          <motion.div
            className="gold-divider mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          />
          <motion.p
            className="font-body text-[0.95rem] text-[#1C2B1E]/60"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Real reviews from real Inland Empire families.
          </motion.p>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {reviews.map((t, i) => (
            <motion.div
              key={`${t.name}-${i}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            >
              <ReviewCard t={t} />
            </motion.div>
          ))}
        </div>

        {/* Mobile: Swipe carousel with peek */}
        <div className="md:hidden">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50 && current < reviews.length - 1) {
                    setCurrent(current + 1);
                  } else if (info.offset.x > 50 && current > 0) {
                    setCurrent(current - 1);
                  }
                }}
                className="cursor-grab active:cursor-grabbing"
              >
                <ReviewCard t={reviews[current]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-[#C8973A] w-6"
                    : "bg-[#1A5C32]/20 hover:bg-[#1A5C32]/40"
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Read the rest */}
        <div className="flex justify-center mt-12">
          <Link
            href="/reviews"
            className="font-body text-[0.78rem] font-bold tracking-[0.12em] uppercase text-[#1A5C32] border-b-2 border-[#C8973A] pb-1 hover:text-[#E05A2B] transition-colors"
          >
            Read all {TOTAL_REVIEW_COUNT} reviews
          </Link>
        </div>

        {/* Trust stats */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          {[
            { val: "500+", label: "Families Protected" },
            { val: `${AVERAGE_RATING.toFixed(1)}★`, label: "Average Rating" },
            { val: `${TOTAL_REVIEW_COUNT}`, label: "Verified Reviews" },
            { val: "100%", label: "Plant-Based" },
            { val: "0", label: "Synthetic Pesticides" },
          ].map((b) => (
            <div key={b.label} className="flex flex-col items-center gap-1">
              <span className="font-display text-[1.6rem] font-bold text-[#C8973A]">
                {b.val}
              </span>
              <span className="font-body text-[0.7rem] font-bold tracking-[0.15em] uppercase text-[#1C2B1E]/50">
                {b.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
