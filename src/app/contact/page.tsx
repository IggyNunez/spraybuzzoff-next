"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { BOOKING_URL, SERVICE_AREAS } from "@/lib/constants";
import Image from "next/image";

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

const TRUST_ITEMS = [
  { icon: "🌿", label: "100% Plant-Based", sub: "Zero synthetic pesticides" },
  { icon: "✅", label: "No Contracts", sub: "Cancel anytime" },
  { icon: "⭐", label: "5.0 Rating", sub: "500+ families protected" },
  { icon: "🏡", label: "Family-Owned", sub: "Founded by moms" },
];

const CONTACT_INFO = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    label: "Call the Team",
    value: "909.898.8955",
    href: "tel:9098988955",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: "Email Us",
    value: "Buzz@spraybuzzoff.com",
    href: "mailto:Buzz@spraybuzzoff.com",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "Service Area",
    value: "SGV & Inland Empire, CA",
    href: null,
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to GorillaDeck booking portal
    window.open(BOOKING_URL, "_blank");
    setSubmitted(true);
  };

  return (
    <>
      <Nav />
      <main>
        {/* ── Hero ── */}
        <section
          className="relative min-h-[68vh] flex items-end pb-24 pt-40 overflow-hidden"
          style={{ background: "#1A5C32" }}
        >
          {/* Photo background */}
          <Image
            src="/assets/contact-hero.jpg"
            alt="Buzz Off truck in the Inland Empire at dusk"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(15,61,32,0.90) 0%, rgba(26,92,50,0.70) 100%)" }} />
          <div className="relative max-w-[1920px] mx-auto px-[clamp(20px,4vw,48px)] w-full">
            <FadeIn>
              <p className="font-body font-bold text-[0.72rem] tracking-[0.25em] uppercase mb-3" style={{ color: "#E05A2B" }}>
                Get In Touch
              </p>
              <h1 className="font-display text-[clamp(52px,8vw,100px)] leading-none uppercase text-white mb-4">
                Book Your<br />
                <span style={{ color: "#C8973A" }}>First Service.</span>
              </h1>
              <p className="font-body text-white/75 text-[1.05rem] max-w-lg leading-relaxed">
                No quote wall. Pricing is visible. Book in minutes — no contracts, no pressure. Just safer pest control for your family.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── Gold divider ── */}
        <div className="h-[3px] w-full" style={{ background: "#C8973A" }} />

        {/* ── Main content ── */}
        <section className="py-[clamp(64px,8vw,120px)]" style={{ background: "#EDEADE" }}>
          <div className="max-w-[1920px] mx-auto px-[clamp(20px,4vw,48px)]">
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16">

              {/* Left — contact info + trust */}
              <div>
                <FadeIn>
                  <h2 className="font-display text-[clamp(30px,3.5vw,48px)] uppercase leading-none mb-1" style={{ color: "#1A5C32" }}>
                    Let's Talk
                  </h2>
                  <div className="h-[2px] w-14 mb-6" style={{ background: "#C8973A" }} />
                  <p className="font-body text-[0.97rem] leading-relaxed mb-8" style={{ color: "#1C2B1E" }}>
                    Call the team, email, or book directly through our online portal. We respond quickly and make it easy to get started.
                  </p>
                </FadeIn>

                {/* Contact details */}
                <FadeIn delay={0.1}>
                  <div className="space-y-4 mb-10">
                    {CONTACT_INFO.map((c) => (
                      <div key={c.label} className="flex items-start gap-4">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: "#1A5C32", color: "#C8973A" }}
                        >
                          {c.icon}
                        </div>
                        <div>
                          <p className="font-body font-bold text-[0.72rem] tracking-widest uppercase mb-0.5" style={{ color: "#6B7B6E" }}>
                            {c.label}
                          </p>
                          {c.href ? (
                            <a href={c.href} className="font-body font-semibold text-[1rem] hover:underline" style={{ color: "#1A5C32" }}>
                              {c.value}
                            </a>
                          ) : (
                            <p className="font-body font-semibold text-[1rem]" style={{ color: "#1C2B1E" }}>{c.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </FadeIn>

                {/* Trust badges */}
                <FadeIn delay={0.2}>
                  <div className="grid grid-cols-2 gap-3">
                    {TRUST_ITEMS.map((t) => (
                      <div
                        key={t.label}
                        className="rounded-xl p-4"
                        style={{ background: "#fff", border: "1px solid rgba(26,92,50,0.1)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
                      >
                        <span className="text-2xl">{t.icon}</span>
                        <p className="font-body font-bold text-[0.82rem] mt-2 mb-0.5" style={{ color: "#1C2B1E" }}>{t.label}</p>
                        <p className="font-body text-[0.75rem]" style={{ color: "#6B7B6E" }}>{t.sub}</p>
                      </div>
                    ))}
                  </div>
                </FadeIn>

                {/* Service areas */}
                <FadeIn delay={0.3} className="mt-10">
                  <h3 className="font-body font-bold text-[0.72rem] tracking-[0.22em] uppercase mb-4" style={{ color: "#E05A2B" }}>
                    Service Areas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_AREAS.map((area) => (
                      <span
                        key={area}
                        className="font-body text-[0.78rem] font-semibold px-3 py-1.5 rounded-full"
                        style={{ background: "#EAF2EC", color: "#1A5C32", border: "1px solid rgba(26,92,50,0.15)" }}
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                  <p className="font-body text-[0.8rem] mt-3" style={{ color: "#6B7B6E" }}>
                    Don&apos;t see your city? Call the team — we may still serve your area.
                  </p>
                </FadeIn>
              </div>

              {/* Right — form */}
              <FadeIn delay={0.15}>
                <div
                  className="rounded-2xl p-8 lg:p-10"
                  style={{ background: "#fff", boxShadow: "0 4px 40px rgba(26,92,50,0.08)", border: "1px solid rgba(26,92,50,0.08)" }}
                >
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                        style={{ background: "#EAF2EC" }}
                      >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1A5C32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <h3 className="font-display text-[2rem] uppercase leading-none mb-3" style={{ color: "#1A5C32" }}>
                        You're In.
                      </h3>
                      <p className="font-body text-[0.95rem] leading-relaxed mb-6" style={{ color: "#6B7B6E" }}>
                        We'll be in touch shortly to confirm your first visit. Opening our booking portal now.
                      </p>
                      <a
                        href={BOOKING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 font-body font-bold text-[0.78rem] tracking-[0.12em] uppercase text-white px-8 py-3.5 rounded-full"
                        style={{ background: "#1A5C32" }}
                      >
                        Open Booking Portal
                        <ArrowIcon className="group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-display text-[clamp(26px,3vw,40px)] uppercase leading-none mb-1" style={{ color: "#1A5C32" }}>
                        Book Your First Service
                      </h3>
                      <div className="h-[2px] w-14 mb-6" style={{ background: "#C8973A" }} />

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
                              border: "1.5px solid rgba(26,92,50,0.15)",
                              color: "#1C2B1E",
                            }}
                            onFocus={(e) => e.target.style.borderColor = "#1A5C32"}
                            onBlur={(e) => e.target.style.borderColor = "rgba(26,92,50,0.15)"}
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
                              style={{ background: "#F4FAF6", border: "1.5px solid rgba(26,92,50,0.15)", color: "#1C2B1E" }}
                              onFocus={(e) => e.target.style.borderColor = "#1A5C32"}
                              onBlur={(e) => e.target.style.borderColor = "rgba(26,92,50,0.15)"}
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
                              style={{ background: "#F4FAF6", border: "1.5px solid rgba(26,92,50,0.15)", color: "#1C2B1E" }}
                              onFocus={(e) => e.target.style.borderColor = "#1A5C32"}
                              onBlur={(e) => e.target.style.borderColor = "rgba(26,92,50,0.15)"}
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
                            style={{ background: "#F4FAF6", border: "1.5px solid rgba(26,92,50,0.15)", color: "#1C2B1E" }}
                            onFocus={(e) => e.target.style.borderColor = "#1A5C32"}
                            onBlur={(e) => e.target.style.borderColor = "rgba(26,92,50,0.15)"}
                          />
                        </div>

                        {/* Service */}
                        <div>
                          <label className="font-body font-bold text-[0.72rem] tracking-widest uppercase block mb-1.5" style={{ color: "#6B7B6E" }}>
                            Service Interested In *
                          </label>
                          <select
                            name="service"
                            required
                            value={form.service}
                            onChange={handleChange}
                            className="w-full font-body text-[0.92rem] rounded-xl px-4 py-3.5 outline-none transition-all appearance-none cursor-pointer"
                            style={{ background: "#F4FAF6", border: "1.5px solid rgba(26,92,50,0.15)", color: form.service ? "#1C2B1E" : "#9BA89D" }}
                            onFocus={(e) => e.target.style.borderColor = "#1A5C32"}
                            onBlur={(e) => e.target.style.borderColor = "rgba(26,92,50,0.15)"}
                          >
                            <option value="" disabled>Select a service...</option>
                            <option>Natural Mosquito Shield</option>
                            <option>Natural Perimeter Protection</option>
                            <option>Natural Whole Home Protection</option>
                            <option>One-Time Treatment</option>
                            <option>Not sure — help me choose</option>
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
                            style={{ background: "#F4FAF6", border: "1.5px solid rgba(26,92,50,0.15)", color: "#1C2B1E" }}
                            onFocus={(e) => e.target.style.borderColor = "#1A5C32"}
                            onBlur={(e) => e.target.style.borderColor = "rgba(26,92,50,0.15)"}
                          />
                        </div>

                        {/* Submit */}
                        <button
                          type="submit"
                          className="group w-full inline-flex items-center justify-center gap-2 font-body font-bold text-[0.82rem] tracking-[0.12em] uppercase text-white px-8 py-4 rounded-full transition-all hover:opacity-90 mt-2"
                          style={{ background: "#E05A2B" }}
                        >
                          Book Now
                          <ArrowIcon className="group-hover:translate-x-1 transition-transform" />
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
        <section className="py-14" style={{ background: "#0F3D20" }}>
          <div className="max-w-[900px] mx-auto px-[clamp(20px,4vw,48px)] flex flex-col md:flex-row items-center justify-between gap-6">
            <FadeIn>
              <p className="font-display text-[clamp(22px,3vw,36px)] uppercase text-white leading-tight">
                Prefer to book online instantly?
              </p>
              <p className="font-body text-white/60 text-[0.88rem] mt-1">
                Use our booking portal — select your service, pick a time, done.
              </p>
            </FadeIn>
            <FadeIn delay={0.1} className="shrink-0">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-body font-bold text-[0.78rem] tracking-[0.12em] uppercase text-white px-10 py-4 rounded-full transition-all hover:opacity-90 whitespace-nowrap"
                style={{ background: "#E05A2B" }}
              >
                Open Booking Portal
                <ArrowIcon className="group-hover:translate-x-1 transition-transform" />
              </a>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
