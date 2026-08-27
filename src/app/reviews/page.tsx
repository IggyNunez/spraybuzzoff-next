"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { useBooking } from "@/components/ui/BookingDrawer";
import Image from "next/image";
import Link from "next/link";
import {
  REVIEWS,
  TOTAL_REVIEW_COUNT,
  AVERAGE_RATING,
  FIVE_STAR_PERCENT,
  displayDate,
  type Review,
} from "@/lib/reviews";

// Linked so a visitor can check the count against the source profile rather
// than taking the number on this page at face value.
const PROFILE_URLS = {
  google:
    "https://www.google.com/maps/search/?api=1&query=Buzz+Off+Pest+Prevention+Rancho+Cucamonga",
  yelp: "https://www.yelp.com/biz/buzz-off-pest-prevention-rancho-cucamonga",
} as const;

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}



function Stars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill={i < rating ? "#F0C060" : "#D8D3C4"} aria-hidden="true">
          <path d="M10 1l2.47 5.01L18 6.94l-4 3.9.94 5.5L10 13.77l-4.94 2.57.94-5.5-4-3.9 5.53-.93L10 1z" />
        </svg>
      ))}
    </div>
  );
}

function ProfileLink({ source }: { source: "google" | "yelp" }) {
  const isGoogle = source === "google";
  return (
    <a
      href={PROFILE_URLS[source]}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 font-body font-bold text-[0.72rem] tracking-[0.12em] uppercase px-5 py-3 rounded-full transition-all hover:bg-[#1A5C32]/[0.04]"
      style={{ border: "1px solid rgba(26,92,50,0.2)", color: "#1C2B1E" }}
    >
      Read them on {isGoogle ? "Google" : "Yelp"}
      <ArrowIcon className="group-hover:translate-x-1 transition-transform" />
    </a>
  );
}

function Avatar({ review }: { review: Review }) {
  if (review.avatar) {
    return (
      <Image
        src={review.avatar}
        alt=""
        width={36}
        height={36}
        className="w-9 h-9 rounded-full object-cover shrink-0"
        loading="lazy"
      />
    );
  }
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center font-body font-bold text-[0.75rem] text-white shrink-0"
      style={{ background: "#1A5C32" }}
      aria-hidden="true"
    >
      {review.name.charAt(0)}
    </div>
  );
}

function SourceBadge({ source }: { source: "google" | "yelp" }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 font-body text-[0.6rem] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full"
      style={{
        background: source === "google" ? "rgba(66,133,244,0.1)" : "rgba(211,35,35,0.1)",
        color: source === "google" ? "#4285F4" : "#D32323",
      }}
    >
      {source === "google" ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.16 12.594c0-5.76-4.698-9.282-10.044-9.282C4.596 3.312 1 7.122 1 12.156 1 17.814 5.28 21 10.2 21c2.916 0 5.244-1.2 6.876-3.228l-2.796-2.196c-.948 1.2-2.34 1.86-4.08 1.86-2.64 0-4.596-1.86-4.596-4.44h12.24c.192-.72.316-1.44.316-2.4zM7.68 10.56c.24-2.04 1.68-3.36 3.516-3.36 1.92 0 3.276 1.32 3.516 3.36H7.68z"/>
        </svg>
      )}
      {source === "google" ? "Google" : "Yelp"}
    </span>
  );
}

export default function ReviewsPage() {
  const { open: openBooking } = useBooking();
  return (
    <>
      <Nav />
      <main>
        {/* ── Hero ── */}
        <section
          className="relative min-h-[50vh] flex items-end pb-20 pt-40"
          style={{ background: "#1A5C32" }}
        >
          <Image
            src="/assets/services-hero.jpg"
            alt="Buzz Off plant-based pest control trusted by families across the Inland Empire"
            fill
            className="object-cover object-center"
            fetchPriority="high"
            loading="eager"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(15,61,32,0.92) 0%, rgba(26,92,50,0.78) 100%)" }} />
          <div className="relative max-w-[1920px] mx-auto px-[clamp(20px,4vw,48px)] w-full">
            <FadeIn>
              <p className="font-body font-bold text-[0.72rem] tracking-[0.25em] uppercase mb-3" style={{ color: "#E05A2B" }}>
                Real Families. Real Results.
              </p>
              <h1 className="font-display text-[clamp(48px,8vw,90px)] leading-none uppercase text-white mb-4">
                What Our<br />
                <span style={{ color: "#C8973A" }}>Customers Say.</span>
              </h1>
              <p className="font-body text-[1.05rem] text-white/80 max-w-xl leading-relaxed">
                Don&apos;t just take our word for it. Hear from the families who trust Buzz Off to protect their homes the natural way.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── Gold divider ── */}
        <div className="h-[3px] w-full" style={{ background: "#C8973A" }} />

        {/* ── Stats Bar ── */}
        <section className="py-10" style={{ background: "#fff" }}>
          <div className="max-w-[900px] mx-auto px-[clamp(20px,4vw,48px)]">
            <FadeIn>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="font-display text-[clamp(2rem,4vw,3rem)] leading-none" style={{ color: "#1A5C32" }}>{AVERAGE_RATING.toFixed(1)}</p>
                  <div className="flex justify-center my-1">
                    <Stars />
                  </div>
                  <p className="font-body text-[0.7rem] font-bold tracking-[0.15em] uppercase text-[#1C2B1E]/50">Average Rating</p>
                </div>
                <div>
                  <p className="font-display text-[clamp(2rem,4vw,3rem)] leading-none" style={{ color: "#1A5C32" }}>{TOTAL_REVIEW_COUNT}</p>
                  <p className="font-body text-[0.7rem] font-bold tracking-[0.15em] uppercase text-[#1C2B1E]/50 mt-2">Verified Reviews</p>
                </div>
                <div>
                  <p className="font-display text-[clamp(2rem,4vw,3rem)] leading-none" style={{ color: "#1A5C32" }}>{FIVE_STAR_PERCENT}%</p>
                  <p className="font-body text-[0.7rem] font-bold tracking-[0.15em] uppercase text-[#1C2B1E]/50 mt-2">5-Star Reviews</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── Reviews Grid ── */}
        <section className="py-[clamp(48px,6vw,80px)]" style={{ background: "#EDEADE" }}>
          <div className="max-w-[1200px] mx-auto px-[clamp(20px,4vw,48px)]">
            <FadeIn>
              <p className="font-body text-[0.8rem] text-center mb-8" style={{ color: "#1C2B1E99" }}>
                {REVIEWS.length === TOTAL_REVIEW_COUNT
                  ? `All ${TOTAL_REVIEW_COUNT} reviews`
                  : `${REVIEWS.length} of our ${TOTAL_REVIEW_COUNT} reviews. The other ${TOTAL_REVIEW_COUNT - REVIEWS.length} are star ratings left without a written comment.`}
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                <ProfileLink source="google" />
                <ProfileLink source="yelp" />
              </div>
            </FadeIn>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
              {REVIEWS.map((review, i) => (
                <FadeIn key={`${review.name}-${i}`} delay={Math.min(i * 0.05, 0.4)}>
                  <div
                    className="break-inside-avoid rounded-2xl p-6 flex flex-col gap-3"
                    style={{
                      background: "#fff",
                      border: "1px solid rgba(26,92,50,0.08)",
                      boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <Stars rating={review.rating} />
                      <SourceBadge source={review.source} />
                    </div>
                    <p className="font-body text-[0.9rem] leading-relaxed" style={{ color: "#1C2B1E" }}>
                      &ldquo;{review.text}&rdquo;
                    </p>
                    {review.photos.length > 0 && (
                      <div className={`grid gap-2 ${review.photos.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
                        {review.photos.map((photo) => (
                          <div
                            key={photo.src}
                            className="relative w-full overflow-hidden rounded-lg"
                            style={{ aspectRatio: review.photos.length === 1 ? "4 / 3" : "1 / 1" }}
                          >
                            <Image
                              src={photo.src}
                              alt={`${photo.caption} from ${review.name}, a Buzz Off pest control customer`}
                              fill
                              sizes="(max-width: 768px) 50vw, 240px"
                              className="object-cover"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-3 mt-1">
                      <Avatar review={review} />
                      <div>
                        <p className="font-body font-bold text-[0.82rem]" style={{ color: "#1C2B1E" }}>
                          {review.name}
                        </p>
                        <p className="font-body text-[0.68rem]" style={{ color: "#1C2B1E99" }}>
                          {displayDate(review)}
                          {review.isLocalGuide && (
                            <span style={{ color: "#1A5C32" }}> · Local Guide</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative py-[clamp(64px,8vw,100px)] overflow-hidden">
          <Image
            src="/assets/bottom-bar-petprevention.JPG"
            alt="Buzz Off family-safe pest control trusted by hundreds of families"
            fill
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(15,61,32,0.88), rgba(26,92,50,0.72))" }}
          />
          <div className="relative z-10 max-w-[700px] mx-auto px-[clamp(20px,4vw,48px)] text-center">
            <FadeIn>
              <h2 className="font-display text-[clamp(44px,6vw,80px)] leading-none uppercase text-white mb-4">
                Join the<br />
                <span style={{ color: "#C8973A" }}>Buzz Off Family.</span>
              </h2>
              <p className="font-body text-white/75 text-[1rem] mb-8 leading-relaxed">
                See why families across the Inland Empire and San Gabriel Valley are making the switch to plant-based pest control.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={openBooking}
                  className="group inline-flex items-center justify-center gap-2 font-body font-bold text-[0.78rem] tracking-[0.12em] uppercase text-white px-10 py-4 rounded-full transition-all hover:opacity-90"
                  style={{ background: "#E05A2B" }}
                >
                  Book Your First Service
                  <ArrowIcon className="group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 font-body font-bold text-[0.78rem] tracking-[0.12em] uppercase px-10 py-4 rounded-full transition-all hover:bg-white/10"
                  style={{ border: "2px solid rgba(255,255,255,0.3)", color: "white" }}
                >
                  Call the Team
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
