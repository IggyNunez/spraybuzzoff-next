"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { ButtonGold } from "./ButtonGold";
import type { LeadApiResponse } from "@/types";
import { BOOKING_URL } from "@/lib/constants";
import { ArrowIcon } from "./ArrowIcon";

const REFERRAL_OPTIONS = [
  "Google Search",
  "Instagram",
  "Neighbor / Friend",
  "Nextdoor",
  "Facebook",
  "Other",
];

const SERVICE_OPTIONS = [
  "The Perimeter — $99",
  "The Whole House — $129",
  "Mosquito Shield — $85",
  "Perimeter + Mosquito — $218",
  "Whole House + Mosquito — $178",
  "Not sure — help me choose",
];

const inputClasses =
  "w-full bg-white/[0.06] border border-white/[0.12] rounded-[10px] px-4 py-3 font-body text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-gold-500 transition-colors duration-200";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    referral: "",
    service: "",
    message: "",
  });

  const handleChange =
    (field: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data: LeadApiResponse = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        className="frost-dark rounded-[20px] p-10 text-center shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-5xl mb-4">✅</div>
        <p className="font-body font-bold text-[0.72rem] tracking-[0.22em] uppercase mb-2" style={{ color: "#C8973A" }}>
          Step 1 Complete
        </p>
        <h3 className="font-display text-2xl font-bold text-white mb-3">
          You&apos;re In!
        </h3>
        <p className="font-body text-[0.95rem] text-white/75 mb-6">
          Your info has been received. Now pick your preferred date &amp; time to lock in your first visit.
        </p>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-2 font-body font-bold text-[0.82rem] tracking-[0.12em] uppercase text-[#1A5C32] px-8 py-3.5 rounded-full transition-colors duration-200 hover:opacity-90"
          style={{ background: "#C8973A" }}
        >
          Pick Your Date &amp; Time
          <ArrowIcon className="group-hover:translate-x-1 transition-transform" />
        </a>
        <p className="font-body text-[0.78rem] text-white/40 mt-4">
          Or we&apos;ll call you within 1 business day to schedule.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="frost-dark rounded-[20px] p-10 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
      <h3 className="font-display text-xl font-bold text-white uppercase mb-6">
        Book Your First Service
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-body text-[0.82rem] font-bold uppercase tracking-wider text-white mb-1.5 block">
              First Name
            </label>
            <input
              type="text"
              className={inputClasses}
              placeholder="Jane"
              value={form.firstName}
              onChange={handleChange("firstName")}
              required
            />
          </div>
          <div>
            <label className="font-body text-[0.82rem] font-bold uppercase tracking-wider text-white mb-1.5 block">
              Last Name
            </label>
            <input
              type="text"
              className={inputClasses}
              placeholder="Smith"
              value={form.lastName}
              onChange={handleChange("lastName")}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-body text-[0.82rem] font-bold uppercase tracking-wider text-white mb-1.5 block">
              Email
            </label>
            <input
              type="email"
              className={inputClasses}
              placeholder="jane@email.com"
              value={form.email}
              onChange={handleChange("email")}
              required
            />
          </div>
          <div>
            <label className="font-body text-[0.82rem] font-bold uppercase tracking-wider text-white mb-1.5 block">
              Phone
            </label>
            <input
              type="tel"
              className={inputClasses}
              placeholder="(909) 555-0123"
              value={form.phone}
              onChange={handleChange("phone")}
            />
          </div>
        </div>

        <div>
          <label className="font-body text-[0.82rem] font-bold uppercase tracking-wider text-white mb-1.5 block">
            Street Address
          </label>
          <input
            type="text"
            className={inputClasses}
            placeholder="123 Main St, Rancho Cucamonga, CA"
            value={form.address}
            onChange={handleChange("address")}
          />
        </div>

        <div>
          <label className="font-body text-[0.82rem] font-bold uppercase tracking-wider text-white mb-1.5 block">
            Service Interested In
          </label>
          <select
            className={`${inputClasses} appearance-none`}
            value={form.service}
            onChange={handleChange("service")}
          >
            <option value="" disabled>
              Select a service...
            </option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt} className="text-gray-900">
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-body text-[0.82rem] font-bold uppercase tracking-wider text-white mb-1.5 block">
            How did you hear about us?
          </label>
          <select
            className={`${inputClasses} appearance-none`}
            value={form.referral}
            onChange={handleChange("referral")}
          >
            <option value="" disabled>
              Select one...
            </option>
            {REFERRAL_OPTIONS.map((opt) => (
              <option key={opt} value={opt} className="text-gray-900">
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-body text-[0.82rem] font-bold uppercase tracking-wider text-white mb-1.5 block">
            Message (Optional)
          </label>
          <textarea
            className={`${inputClasses} min-h-[100px] resize-y`}
            placeholder="Tell us about your pest situation..."
            value={form.message}
            onChange={handleChange("message")}
          />
        </div>

        {error && (
          <p className="font-body text-sm text-red-400 bg-red-400/10 rounded-lg px-4 py-2">
            {error}
          </p>
        )}

        <ButtonGold
          type="submit"
          className="w-full justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Book Now"}
        </ButtonGold>
      </form>
    </div>
  );
}
