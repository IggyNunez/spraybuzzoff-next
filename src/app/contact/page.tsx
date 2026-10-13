"use client";

import { useRef, useState } from "react";
import type { LeadApiResponse } from "@/types";
import { motion, useInView } from "framer-motion";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { SERVICE_AREA_REGIONS } from "@/lib/constants";
import { useBooking } from "@/components/ui/BookingDrawer";
import { PageHero, HERO_TYPE } from "@/components/ui/PageHero";
import { BrandBadge, type GlyphName } from "@/components/ui/BrandBadge";
import { AVERAGE_RATING } from "@/lib/reviews";
import { trackLead, trackContact } from "@/lib/fbpixel";

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

const TRUST_ITEMS: { glyph: GlyphName; label: string; sub: string }[] = [
  { glyph: "leaf", label: "100% Plant-Based", sub: "Zero synthetic pesticides" },
  { glyph: "check", label: "No Contracts", sub: "Cancel anytime" },
  // Rating comes from the review data, never typed in.
  { glyph: "star", label: `${AVERAGE_RATING.toFixed(1)} Rating`, sub: "500+ families protected" },
  { glyph: "home-heart", label: "Family-Owned", sub: "Family owned & operated" },
];

const CONTACT_INFO: { glyph: GlyphName; label: string; value: string; href: string | null }[] = [
  { glyph: "phone", label: "Call the Team", value: "909.898.8955", href: "tel:9098988955" },
  { glyph: "mail", label: "Email Us", value: "Buzz@spraybuzzoff.com", href: "mailto:Buzz@spraybuzzoff.com" },
  { glyph: "pin", label: "Service Area", value: "SGV & Inland Empire, CA", href: null },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { open: openBooking } = useBooking();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    service: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Split name into firstName / lastName for the API
      const nameParts = form.name.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || firstName; // fallback to first name

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          service: form.service,
          message: form.message,
        }),
      });

      const data: LeadApiResponse = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
      trackLead({ content_name: form.service || "Contact Page Form" });
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="Get In Touch"
          lines={[<>Book Your</>, <span key="accent" className={HERO_TYPE.accent}>First Service.</span>]}
          imageSrc="/assets/contact-hero.jpg"
          imageAlt="Buzz Off natural pest control service truck ready for eco-friendly treatments in the Inland Empire at dusk"
        >
          <p className={HERO_TYPE.body}>
            No quote wall. Pricing is visible. Book in minutes - no contracts, no pressure. Just safer pest control for your family.
          </p>
        </PageHero>

        {/* ── Main content ── */}
        <section className="py-[clamp(64px,8vw,120px)]" style={{ background: "#EDEADE" }}>
          <div className="max-w-[1920px] mx-auto px-[clamp(20px,4vw,48px)]">
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16">

              {/* Left - contact info + trust */}
              <div>
                <FadeIn>
                  <h2 className="font-display text-[clamp(30px,3.5vw,48px)] leading-[1.05] mb-1" style={{ color: "#154734" }}>
                    Let's Talk
                  </h2>
                  <div className="h-[2px] w-14 mb-6" style={{ background: "#FA4616" }} />
                  <p className="font-body text-[0.97rem] leading-relaxed mb-8" style={{ color: "#1C2B1E" }}>
                    Call the team, email, or book directly through our online portal. We respond quickly and make it easy to get started.
                  </p>
                </FadeIn>

                {/* Contact details */}
                <FadeIn delay={0.1}>
                  <div className="space-y-4 mb-10">
                    {CONTACT_INFO.map((c, ci) => (
                      <motion.div key={c.label} whileHover="hover" className="flex items-start gap-4">
                        <BrandBadge glyph={c.glyph} size={44} delay={0.1 + ci * 0.1} />
                        <div>
                          <p className="font-body font-bold text-[0.72rem] tracking-widest uppercase mb-0.5" style={{ color: "#6B7B6E" }}>
                            {c.label}
                          </p>
                          {c.href ? (
                            <a href={c.href} onClick={c.href.startsWith("tel:") ? () => trackContact() : undefined} className="font-body font-semibold text-[1rem] hover:underline" style={{ color: "#154734" }}>
                              {c.value}
                            </a>
                          ) : (
                            <p className="font-body font-semibold text-[1rem]" style={{ color: "#1C2B1E" }}>{c.value}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </FadeIn>

                {/* Trust badges */}
                <FadeIn delay={0.2}>
                  <div className="grid grid-cols-2 gap-3">
                    {TRUST_ITEMS.map((t, ti) => (
                      <motion.div
                        key={t.label}
                        whileHover="hover"
                        className="rounded-xl p-4"
                        style={{ background: "#fff", border: "1px solid rgba(21,71,52,0.1)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
                      >
                        <BrandBadge glyph={t.glyph} size={40} delay={0.1 + ti * 0.08} />
                        <p className="font-body font-bold text-[0.82rem] mt-2 mb-0.5" style={{ color: "#1C2B1E" }}>{t.label}</p>
                        <p className="font-body text-[0.75rem]" style={{ color: "#6B7B6E" }}>{t.sub}</p>
                      </motion.div>
                    ))}
                  </div>
                </FadeIn>

                {/* Service areas */}
                <FadeIn delay={0.3} className="mt-10">
                  <h3 className="font-body font-bold text-[0.72rem] tracking-[0.22em] uppercase mb-4" style={{ color: "#FA4616" }}>
                    Service Areas
                  </h3>
                  <div className="flex flex-col gap-5">
                    {SERVICE_AREA_REGIONS.map((r) => (
                      <div key={r.region}>
                        <p className="font-body font-bold text-[0.78rem] mb-2" style={{ color: "#1C2B1E" }}>
                          {r.region}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {r.cities.map((area) => (
                            <span
                              key={area}
                              className="font-body text-[0.78rem] font-semibold px-3 py-1.5 rounded-full"
                              style={{ background: "#E0F6E8", color: "#154734", border: "1px solid rgba(21,71,52,0.15)" }}
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="font-body text-[0.8rem] mt-3" style={{ color: "#6B7B6E" }}>
                    Don&apos;t see your city? Call the team - we may still serve your area.
                  </p>
                </FadeIn>
              </div>

              {/* Right - form */}
              <FadeIn delay={0.15}>
                <div
                  className="rounded-2xl p-8 lg:p-10"
                  style={{ background: "#fff", boxShadow: "0 4px 40px rgba(21,71,52,0.08)", border: "1px solid rgba(21,71,52,0.08)" }}
                >
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                      <BrandBadge glyph="check" size={68} onMount className="mb-5" />
                      <p className="font-body font-bold text-[0.72rem] tracking-[0.22em] uppercase mb-2" style={{ color: "#FA4616" }}>
                        Step 1 Complete
                      </p>
                      <h3 className="font-display text-[2rem] leading-[1.05] mb-3" style={{ color: "#154734" }}>
                        You're In!
                      </h3>
                      <p className="font-body text-[0.95rem] leading-relaxed mb-6" style={{ color: "#6B7B6E" }}>
                        Your info has been received. Now pick your preferred date &amp; time to lock in your first visit.
                      </p>
                      <button
                        onClick={openBooking}
                        className="group inline-flex items-center justify-center gap-2 font-body font-bold text-[0.82rem] tracking-[0.12em] uppercase text-white w-full px-8 py-4 rounded-full transition-all hover:opacity-90"
                        style={{ background: "#FA4616" }}
                      >
                        Pick Your Date &amp; Time
                        <ArrowIcon className="group-hover:translate-x-1 transition-transform" />
                      </button>
                      <p className="font-body text-[0.78rem] mt-4" style={{ color: "#9BA89D" }}>
                        Or we&apos;ll call you within 1 business day to schedule.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-display text-[clamp(26px,3vw,40px)] leading-[1.05] mb-1" style={{ color: "#154734" }}>
                        Book Your First Service
                      </h3>
                      <div className="h-[2px] w-14 mb-6" style={{ background: "#FA4616" }} />

                      <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                          <label className="font-body font-bold text-[0.72rem] tracking-widest uppercase block mb-1.5" style={{ color: "#6B7B6E" }}>
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Jane Smith"
                            className="w-full font-body text-[0.92rem] rounded-xl px-4 py-3.5 outline-none transition-all"
                            style={{
                              background: "#F4FAF6",
                              border: "1.5px solid rgba(21,71,52,0.15)",
                              color: "#1C2B1E",
                            }}
                            onFocus={(e) => e.target.style.borderColor = "#154734"}
                            onBlur={(e) => e.target.style.borderColor = "rgba(21,71,52,0.15)"}
                          />
                        </div>

                        {/* Phone + Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="font-body font-bold text-[0.72rem] tracking-widest uppercase block mb-1.5" style={{ color: "#6B7B6E" }}>
                              Phone *
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              required
                              value={form.phone}
                              onChange={handleChange}
                              placeholder="(909) 555-1234"
                              className="w-full font-body text-[0.92rem] rounded-xl px-4 py-3.5 outline-none transition-all"
                              style={{ background: "#F4FAF6", border: "1.5px solid rgba(21,71,52,0.15)", color: "#1C2B1E" }}
                              onFocus={(e) => e.target.style.borderColor = "#154734"}
                              onBlur={(e) => e.target.style.borderColor = "rgba(21,71,52,0.15)"}
                            />
                          </div>
                          <div>
                            <label className="font-body font-bold text-[0.72rem] tracking-widest uppercase block mb-1.5" style={{ color: "#6B7B6E" }}>
                              Email *
                            </label>
                            <input
                              type="email"
                              name="email"
                              required
                              value={form.email}
                              onChange={handleChange}
                              placeholder="jane@email.com"
                              className="w-full font-body text-[0.92rem] rounded-xl px-4 py-3.5 outline-none transition-all"
                              style={{ background: "#F4FAF6", border: "1.5px solid rgba(21,71,52,0.15)", color: "#1C2B1E" }}
                              onFocus={(e) => e.target.style.borderColor = "#154734"}
                              onBlur={(e) => e.target.style.borderColor = "rgba(21,71,52,0.15)"}
                            />
                          </div>
                        </div>

                        {/* Address */}
                        <div>
                          <label className="font-body font-bold text-[0.72rem] tracking-widest uppercase block mb-1.5" style={{ color: "#6B7B6E" }}>
                            Property Address
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            placeholder="123 Maple St, Rancho Cucamonga, CA"
                            className="w-full font-body text-[0.92rem] rounded-xl px-4 py-3.5 outline-none transition-all"
                            style={{ background: "#F4FAF6", border: "1.5px solid rgba(21,71,52,0.15)", color: "#1C2B1E" }}
                            onFocus={(e) => e.target.style.borderColor = "#154734"}
                            onBlur={(e) => e.target.style.borderColor = "rgba(21,71,52,0.15)"}
                          />
                        </div>

                        {/* Service */}
                        <div>
                          <label className="font-body font-bold text-[0.72rem] tracking-widest uppercase block mb-1.5" style={{ color: "#6B7B6E" }}>
                            Service Interested In *
                          </label>
                          <select
                            name="service"
                            aria-label="Service Interested In"
                            required
                            value={form.service}
                            onChange={handleChange}
                            className="w-full font-body text-[0.92rem] rounded-xl px-4 py-3.5 outline-none transition-all appearance-none cursor-pointer"
                            style={{ background: "#F4FAF6", border: "1.5px solid rgba(21,71,52,0.15)", color: form.service ? "#1C2B1E" : "#9BA89D" }}
                            onFocus={(e) => e.target.style.borderColor = "#154734"}
                            onBlur={(e) => e.target.style.borderColor = "rgba(21,71,52,0.15)"}
                          >
                            <option value="" disabled>Select a service...</option>
                            <option>The Perimeter</option>
                            <option>The Whole House</option>
                            <option>Mosquito Shield</option>
                            <option>Perimeter + Mosquito</option>
                            <option>Whole House + Mosquito</option>
                            <option>Not sure - help me choose</option>
                          </select>
                        </div>

                        {/* Message */}
                        <div>
                          <label className="font-body font-bold text-[0.72rem] tracking-widest uppercase block mb-1.5" style={{ color: "#6B7B6E" }}>
                            Anything Else?
                          </label>
                          <textarea
                            name="message"
                            rows={3}
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Tell us about your pest situation, property size, or any concerns..."
                            className="w-full font-body text-[0.92rem] rounded-xl px-4 py-3.5 outline-none transition-all resize-none"
                            style={{ background: "#F4FAF6", border: "1.5px solid rgba(21,71,52,0.15)", color: "#1C2B1E" }}
                            onFocus={(e) => e.target.style.borderColor = "#154734"}
                            onBlur={(e) => e.target.style.borderColor = "rgba(21,71,52,0.15)"}
                          />
                        </div>

                        {/* Error message */}
                        {error && (
                          <p className="font-body text-[0.85rem] text-red-600 bg-red-50 rounded-xl px-4 py-3 border border-red-200">
                            {error}
                          </p>
                        )}

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`group w-full inline-flex items-center justify-center gap-2 font-body font-bold text-[0.82rem] tracking-[0.12em] uppercase text-white px-8 py-4 rounded-full transition-all mt-2 ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}`}
                          style={{ background: "#FA4616" }}
                        >
                          {isSubmitting ? "Sending..." : "Book Now"}
                          {!isSubmitting && <ArrowIcon className="group-hover:translate-x-1 transition-transform" />}
                        </button>

                        <p className="font-body text-[0.75rem] text-center leading-relaxed" style={{ color: "#9BA89D" }}>
                          No contracts. No pressure. We'll confirm your visit by phone within 1 business day.
                        </p>
                      </form>
                    </>
                  )}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── Gorilladesk CTA ── */}
        <section className="py-14" style={{ background: "#0F3224" }}>
          <div className="max-w-[900px] mx-auto px-[clamp(20px,4vw,48px)] flex flex-col md:flex-row items-center justify-between gap-6">
            <FadeIn>
              <p className="font-display text-[clamp(22px,3vw,36px)] text-white leading-tight">
                Prefer to book online instantly?
              </p>
              <p className="font-body text-white/60 text-[0.88rem] mt-1">
                Use our booking portal - select your service, pick a time, done.
              </p>
            </FadeIn>
            <FadeIn delay={0.1} className="shrink-0">
              <button
                onClick={openBooking}
                className="group inline-flex items-center gap-2 font-body font-bold text-[0.78rem] tracking-[0.12em] uppercase text-white px-10 py-4 rounded-full transition-all hover:opacity-90 whitespace-nowrap"
                style={{ background: "#FA4616" }}
              >
                Open Booking Portal
                <ArrowIcon className="group-hover:translate-x-1 transition-transform" />
              </button>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
