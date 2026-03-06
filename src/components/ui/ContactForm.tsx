"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { ButtonGold } from "./ButtonGold";

const REFERRAL_OPTIONS = [
  "Google Search",
  "Instagram",
  "Neighbor / Friend",
  "Nextdoor",
  "Facebook",
  "Other",
];

const inputClasses =
  "w-full bg-white/[0.06] border border-white/[0.12] rounded-[10px] px-4 py-3 font-body text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-gold-500 transition-colors duration-200";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    referral: "",
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    setSubmitted(true);
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
        <h3 className="font-display text-2xl font-bold text-white mb-3">
          Thank You!
        </h3>
        <p className="font-body text-[0.95rem] text-white">
          You&apos;re in. We&apos;ll be in touch shortly to confirm your first visit.
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

        <ButtonGold type="submit" className="w-full justify-center">
          Book Now
        </ButtonGold>
      </form>
    </div>
  );
}
