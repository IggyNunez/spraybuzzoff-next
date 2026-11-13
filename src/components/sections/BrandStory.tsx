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
    <section id="about" className="relative scroll-mt-24 bg-brand-deeper py-20 xl:py-[120px] overflow-hidden">
      <LeafDecor variant="branch" top="0" size={260} opacity={0.12} />

      <motion.div
        className="relative z-[2] max-w-[1320px] mx-auto px-4 xl:px-[clamp(24px,4vw,64px)]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative grid max-w-[640px] mx-auto xl:max-w-none xl:grid-cols-[600px_1fr] rounded-[28px] shadow-[0_40px_80px_rgba(0,0,0,0.38)]">
          {/* ZERO sticker: top right of the card on phones, on the photo/text seam from 1280px up */}
          <div
            aria-hidden
            className="absolute z-10 -top-8 right-4 xl:right-auto xl:left-[600px] xl:-translate-x-1/2 xl:-top-10 w-[104px] h-[104px] xl:w-[136px] xl:h-[136px] rounded-full bg-brand-yellow border-4 border-brand-deeper shadow-[0_10px_24px_rgba(0,0,0,0.3)] flex items-center justify-center -rotate-[8deg]"
          >
            <div className="absolute inset-[7px] rounded-full border-2 border-dashed border-brand-deep/40" />
            <div className="text-center leading-none text-brand-deep">
              <div className="font-display text-[28px] xl:text-[36px]">ZERO</div>
              <div className="font-body font-bold text-[8px] xl:text-[10px] tracking-[0.12em] uppercase mt-1">
                Synthetic
                <br />
                Pesticides
              </div>
            </div>
          </div>

          {/* Photo: below the note on phones, left panel from 1280px up.
              The names are painted into the photo near both edges, so it is never cropped
              sideways: it sits full width at the bottom, and when the note is taller the
              extra height shows as sky (the gradient matches the photo's top row). */}
          <div
            className="relative order-2 xl:order-1 aspect-[1520/1722] xl:aspect-auto xl:min-h-[640px] rounded-b-[28px] xl:rounded-bl-[28px] xl:rounded-br-none xl:rounded-tl-[28px] overflow-hidden"
            style={{ backgroundImage: "linear-gradient(to right, rgb(109,160,181), rgb(85,141,168))" }}
          >
            <Image
              src="/assets/brand-story/owners-dorrin-maurice.jpg"
              alt="Buzz Off owners Maurice and Dorrin, in green Buzz Off shirts, standing together by a harbor"
              width={1520}
              height={1722}
              sizes="(min-width: 1280px) 600px, (min-width: 672px) 640px, 100vw"
              className="absolute inset-x-0 bottom-0 w-full h-auto"
            />
          </div>

          {/* The note */}
          <div className="order-1 xl:order-2 bg-brand-cream rounded-t-[28px] xl:rounded-tl-none xl:rounded-r-[28px] px-6 pt-24 pb-10 xl:pt-[84px] xl:pr-16 xl:pb-20 xl:pl-[84px] flex flex-col justify-center">
            <p className="flex items-center gap-3 font-body font-bold text-[13px] tracking-[0.24em] uppercase text-brand-green-dark mb-6">
              <span aria-hidden className="w-8 h-[2px] bg-brand-green-dark" />
              A Note From the Owners
            </p>
            {/* Sentence case per Dorrin's Nov 12 mockup, an exception to the site-wide title caps rule. */}
            <h2
              className="font-display text-[36px] xl:text-[56px] leading-[1.03] text-brand-deep [text-wrap:balance]"
              style={{ textTransform: "none" }}
            >
              You chose a different approach.{" "}
              <span className="text-brand-green-dark">And that&rsquo;s the point.</span>
            </h2>
            <div aria-hidden className="w-[88px] h-[5px] rounded-full bg-brand-yellow my-8" />
            <p className="font-body text-[16.5px] xl:text-[19px] leading-[1.62] text-brand-dark max-w-[34em]">
              We started Buzz Off because we believed there had to be a better, smarter way to do pest
              control. One without synthetic pesticides or harsh chemicals. So instead of waiting for the
              industry to change, we decided to lead the way. That&rsquo;s how Buzz Off started. We&rsquo;re
              glad you&rsquo;re here.
            </p>
            <p className="font-display text-[26px] xl:text-[32px] text-brand-green-dark mt-8">
              &ndash; Dorrin &amp; Maurice
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
