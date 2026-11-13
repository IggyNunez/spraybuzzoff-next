"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LeafDecor } from "@/components/ui/LeafDecor";

/**
 * Owners' note, built to Dorrin's spec (Nov 12, 2026,
 * BuzzOff_BrandStory_Section_for_Iggy.pdf). The copy is the owners' note from
 * the welcome tri-fold, verbatim: do not edit it without the client.
 *
 * id="about" is the target of the footer "About Us" link (/#about).
 */
export function BrandStory() {
  return (
    <section id="about" className="relative scroll-mt-24 bg-brand-deeper py-20 lg:py-[120px] overflow-hidden">
      <LeafDecor variant="branch" top="0" size={260} opacity={0.12} />

      <motion.div
        className="relative z-[2] max-w-[1320px] mx-auto px-4 lg:px-[clamp(24px,4vw,64px)]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative grid lg:grid-cols-[600px_1fr] rounded-[28px] shadow-[0_40px_80px_rgba(0,0,0,0.38)]">
          {/* ZERO sticker: top right of the card on phones, on the photo/text seam from 1024px up */}
          <div
            aria-hidden
            className="absolute z-10 -top-8 right-4 lg:right-auto lg:left-[600px] lg:-translate-x-1/2 lg:-top-10 w-[104px] h-[104px] lg:w-[136px] lg:h-[136px] rounded-full bg-brand-yellow border-4 border-brand-deeper shadow-[0_10px_24px_rgba(0,0,0,0.3)] flex items-center justify-center -rotate-[8deg]"
          >
            <div className="absolute inset-[7px] rounded-full border-2 border-dashed border-brand-deep/40" />
            <div className="text-center leading-none text-brand-deep">
              <div className="font-display text-[28px] lg:text-[36px]">ZERO</div>
              <div className="font-body font-bold text-[8px] lg:text-[10px] tracking-[0.12em] uppercase mt-1">
                Synthetic
                <br />
                Pesticides
              </div>
            </div>
          </div>

          {/* Photo: below the note on phones, left panel from 1024px up */}
          <div className="relative order-2 lg:order-1 aspect-[1520/1722] lg:aspect-auto lg:min-h-[640px] rounded-b-[28px] lg:rounded-bl-[28px] lg:rounded-br-none lg:rounded-tl-[28px] overflow-hidden">
            <Image
              src="/assets/brand-story/owners-dorrin-maurice.jpg"
              alt="Buzz Off owners Maurice and Dorrin, in green Buzz Off shirts, standing together by a harbor"
              fill
              sizes="(min-width: 768px) 600px, 100vw"
              className="object-cover"
              style={{ objectPosition: "50% 22%" }}
            />
          </div>

          {/* The note */}
          <div className="order-1 lg:order-2 bg-brand-cream rounded-t-[28px] lg:rounded-tl-none lg:rounded-r-[28px] px-6 pt-24 pb-10 lg:pt-[84px] lg:pr-16 lg:pb-20 lg:pl-[84px] flex flex-col justify-center">
            <p className="flex items-center gap-3 font-body font-bold text-[13px] tracking-[0.24em] uppercase text-brand-green-dark mb-6">
              <span aria-hidden className="w-8 h-[2px] bg-brand-green-dark" />
              A Note From the Owners
            </p>
            {/* Sentence case per Dorrin's Nov 12 mockup, an exception to the site-wide title caps rule. */}
            <h2
              className="font-display text-[36px] lg:text-[56px] leading-[1.03] text-brand-deep [text-wrap:balance]"
              style={{ textTransform: "none" }}
            >
              You chose a different approach.{" "}
              <span className="text-brand-green-dark">And that&rsquo;s the point.</span>
            </h2>
            <div aria-hidden className="w-[88px] h-[5px] rounded-full bg-brand-yellow my-8" />
            <p className="font-body text-[16.5px] lg:text-[19px] leading-[1.62] text-brand-dark max-w-[34em]">
              We started Buzz Off because we believed there had to be a better, smarter way to do pest
              control. One without synthetic pesticides or harsh chemicals. So instead of waiting for the
              industry to change, we decided to lead the way. That&rsquo;s how Buzz Off started. We&rsquo;re
              glad you&rsquo;re here.
            </p>
            <p className="font-display text-[26px] lg:text-[32px] text-brand-green-dark mt-8">
              &ndash; Dorrin &amp; Maurice
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
