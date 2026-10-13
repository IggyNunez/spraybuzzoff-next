"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ButtonGold } from "@/components/ui/ButtonGold";
import { StatsBar } from "@/components/sections/StatsBar";
import { useBooking } from "@/components/ui/BookingDrawer";
import { HERO_TYPE, HeroOverlay, HeroTitle } from "@/components/ui/PageHero";
import { trackContact } from "@/lib/fbpixel";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * The hero clip is only 5.4s long, so looping it back to back felt frantic.
 * It now plays once, rests on its last frame, dips to dark, and starts over.
 * The final ~0.4s of the file is never shown, same as before.
 */
const CLIP_END_S = 5;
const HOLD_MS = 3500;
const FADE_MS = 700;

export function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { open: openBooking } = useBooking();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    let resting = false;

    const rest = () => {
      if (resting || video.currentTime < CLIP_END_S) return;
      resting = true;
      video.pause();
      // With reduced motion, play once and stay on the last frame.
      if (reduceMotion) return;
      timers.push(
        window.setTimeout(() => {
          video.style.opacity = "0";
          timers.push(
            window.setTimeout(() => {
              video.currentTime = 0;
              void video.play().catch(() => {});
              video.style.opacity = "1";
              resting = false;
            }, FADE_MS),
          );
        }, HOLD_MS),
      );
    };

    video.addEventListener("timeupdate", rest);
    video.addEventListener("ended", rest);
    return () => {
      video.removeEventListener("timeupdate", rest);
      video.removeEventListener("ended", rest);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70svh] md:h-[100svh] overflow-hidden bg-brand-deeper"
    >
      {/* Video Background */}
      <motion.div
        className="absolute inset-0 w-full h-[120%] z-0"
        style={{ y: videoY }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover transition-opacity duration-700 ease-out"
          aria-label="Buzz Off plant-based pest control technicians treating a family home in the Inland Empire"
        >
          <source src="/assets/hero-video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <HeroOverlay variant="video" />

      {/* Content. Padding is tuned so the gap between the logo and the copy
          matches the gap between the buttons and the stats bar (measured at
          about 138px each at 1440x900), instead of the old 250px over 160px. */}
      <motion.div
        className="hero-gutter relative z-10 flex flex-col justify-center h-full max-w-[1920px] mx-auto pt-[110px] pb-[96px] md:pt-[clamp(120px,18.5svh,200px)] md:pb-[clamp(100px,11.5svh,140px)]"
        style={{ y: textY }}
      >
        <HeroTitle
          variant="home"
          lines={[
            <>Pest Control for</>,
            // nowrap keeps "Non-Toxic" whole; on phones it split at the hyphen.
            <span key="accent">
              the <span className="whitespace-nowrap">Non-Toxic</span> Era.
            </span>,
          ]}
          delay={0.2}
        />

        {/* Hero tagline in Playfair italic, per the brand sheet. */}
        <motion.p
          className={HERO_TYPE.tagline}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
        >
          Live Outside Again, Naturally.
        </motion.p>

        <motion.p
          className={`${HERO_TYPE.body} mb-8`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
        >
          100% plant-based pest control. Safe for kids, pets, and the people you love.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 md:gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
        >
          <ButtonGold onClick={openBooking} className="w-full sm:w-auto justify-center">
            Book Your First Service
          </ButtonGold>
          <a
            href="tel:9098988955"
            onClick={() => trackContact()}
            className="inline-flex items-center justify-center font-body text-[13px] font-bold tracking-[0.12em] uppercase text-white border-2 border-white/40 bg-white/[0.08] backdrop-blur-md hover:bg-white/[0.16] hover:border-white/70 px-10 py-4 rounded-full transition-all duration-300"
          >
            Call the Team
          </a>
        </motion.div>
      </motion.div>

      {/* Frosted stats bar overlaying bottom of hero video */}
      <StatsBar />
    </section>
  );
}
