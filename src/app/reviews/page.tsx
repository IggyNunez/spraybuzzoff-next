"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { useBooking } from "@/components/ui/BookingDrawer";
import Image from "next/image";
import Link from "next/link";

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

type Review = {
  name: string;
  rating: number;
  date: string;
  text: string;
  source: "google" | "yelp";
  localGuide?: boolean;
};

const REVIEWS: Review[] = [
  {
    name: "Ceci Diaz",
    rating: 5,
    date: "March 2026",
    text: "I had a great experience with Buzz Off Natural Pest Prevention. From start to finish, the visit was pleasant, friendly, and very professional. He arrived right on time and took the time to explain everything clearly, which I really appreciated. It\u2019s reassuring to know they use natural methods that are safe for my family and pets while still being effective. Their attention to detail and commitment to customer service really stood out. I would definitely recommend them to anyone looking for a reliable and eco-friendly pest control solution.",
    source: "google",
  },
  {
    name: "Julie C.",
    rating: 5,
    date: "March 2026",
    text: "Wooo, I loved my service! We\u2019ve been dealing with insane mosquitos because of our pool and all of our plants in the back & I wanted to wait a week to even write this review to see if it made a difference... Well, came here to say that I totally 10/10 would recommend! My husband and I noticed that we haven\u2019t had to smack these small mosquitos in our room because we like to leave our sliding door open from time to time. Not a single mosquito has came back! Also, Maurice noticed that we had a few spiders and he kindly offered to spray them off our patio. A few hours later I noticed about 3 dead spiders. BEST part \u2014 when they came to spray, I was babysitting my niece and nephew outside and the kids did not have to stop or go inside because the natural components are harmless to children.",
    source: "yelp",
  },
  {
    name: "Gerard Vergel de Dios",
    rating: 5,
    date: "March 2026",
    text: "Dorrin is awesome!! Super cool guy and very informative. Saw results immediately in our kids\u2019 playhouse, brown widows dead in their tracks.",
    source: "google",
    localGuide: true,
  },
  {
    name: "Nate Tate",
    rating: 5,
    date: "March 2026",
    text: "One of the main reasons I chose Buzz Off Pest Prevention was because they use a non-toxic, chemical-free solution, which was really important to me since I have a little one at home who loves to play outside. We went with the exterior, interior, and mosquito repellent package because we were dealing with little bugs getting into the house and relentless mosquitoes at night. Since starting service, I haven\u2019t seen any bugs inside, and we\u2019re finally able to enjoy being outside at night without getting eaten alive. Moe, our specialist, was also extremely professional and courteous.",
    source: "google",
    localGuide: true,
  },
  {
    name: "Momwalk Rancho",
    rating: 5,
    date: "March 2026",
    text: "This local business came to share at my local mom walk I host and when I tell you the owners are so humble and welcoming I mean it! They are here and present in the community ready to help us with our mosquitos and bugs! No more spiders and bugs! No more million bug bites during the hot months! Their solution is all natural as well which my mom community loves! Highly recommend them to all my friends and family!",
    source: "google",
    localGuide: true,
  },
  {
    name: "Andrew V.",
    rating: 5,
    date: "January 2026",
    text: "I highly recommend Moe and his pest control service. We had him treat our home for mosquitoes and general bugs, and we were dealing with a roach issue as well. Ever since the service, we\u2019ve noticed a huge improvement. What really sold us was that he uses organic, family- and pet-friendly products. I have a daughter who plays outside with her toys and dogs that are always in the yard, so safety was a big priority for us. The service was professional, thorough, and the scents actually smell great \u2014 not like harsh chemicals. We were so happy with the results that we signed up for a subscription.",
    source: "yelp",
  },
  {
    name: "Megan Stillman",
    rating: 5,
    date: "March 2026",
    text: "The mosquito service has saved my sanity and legs from bites! My kids love to play outside all afternoon and now we can enjoy our backyard worry free. The owners are so personable and really want you to feel educated about the whole process. The solution really does work! Highly recommend to anyone struggling with mosquito infestation.",
    source: "google",
    localGuide: true,
  },
  {
    name: "Ivan A.",
    rating: 5,
    date: "March 2026",
    text: "I had a flea infestation from the stray animals making their way into my front yard. With the heat I\u2019ve seen new creatures start to appear. BuzzOff is a newly started family business, and the owners have gone above and beyond to get rid of the bugs. As a family owned business you can tell they\u2019re out here providing the best service possible, treating the problem like if it was their own. It\u2019s affordable and they work with your schedules.",
    source: "yelp",
  },
  {
    name: "Terranzo M.",
    rating: 5,
    date: "January 2026",
    text: "We called Buzz Off when we noticed ants and spiders around the house. From the first phone call to the final visit, the team was professional, friendly, and patient with all my questions \u2014 especially about being safe for our dogs. They explained what products they\u2019d use and confirmed they were designed to be pet-friendly, which gave us peace of mind. Service was affordable and thorough \u2014 highly recommend if you want effective pest control that won\u2019t put your pets at risk!",
    source: "yelp",
  },
  {
    name: "Lo U.",
    rating: 5,
    date: "March 2026",
    text: "No more searching around, I found the one!!! Amazing work!! Great customer service, very professional and polite and caring! I wanted to try the \u201cnatural\u201d solution because I have young kids \u2014 I don\u2019t need the harsh chemicals others use. They use natural solutions for killing insects that\u2019s very effective! I am very satisfied and recommend this company!",
    source: "yelp",
  },
  {
    name: "John S.",
    rating: 5,
    date: "February 2026",
    text: "Dorrin and his team are great to work with. I\u2019ve always been concerned about traditional pest control because my two boys pretty much roll, land, and play in everything I tell them not to. Going to have them back for sure!! Highly recommended!!!",
    source: "yelp",
  },
  {
    name: "Terrance M.",
    rating: 5,
    date: "January 2026",
    text: "Buzz Off came out and treated my backyard and home using natural products that were extremely effective. I specifically chose a more natural option because I have a dog and didn\u2019t want harsh chemicals affecting his health. I noticed an immediate difference after their service. The treatment worked fast \u2014 I saw spiders eliminated within minutes. The team was professional, thorough, and respectful of my property. They cleaned up after themselves and even removed cobwebs. Excellent service for the price.",
    source: "yelp",
  },
  {
    name: "Wendy Gonzalez",
    rating: 5,
    date: "March 2026",
    text: "I heard about this company from a friend. I was originally skeptical because of the low amount of reviews but honestly, I was so happy with the service and the experience, from the customer service to the quick manner they responded. Everything was so easy and they did a great job. I\u2019m highly recommending them to my friends and family.",
    source: "google",
    localGuide: true,
  },
  {
    name: "Gabby Aguilar",
    rating: 5,
    date: "March 2026",
    text: "Great customer service. Detailed and thorough work. Will definitely use again!",
    source: "google",
    localGuide: true,
  },
  {
    name: "Julie S.",
    rating: 5,
    date: "January 2026",
    text: "Super impressed with BuzzOff. They came out and inspected my home and provided a plan. They took the time to educate me on the natural products that they use. Made me feel at ease. I have 2 active kiddos who love to play in the yard. I was most impressed with the treatment to our hedge, where the mosquitoes live. I have never had any other pest control company offer that. Excited to continue our pest control service with BuzzOff knowing that our home will be safe from toxic chemicals.",
    source: "yelp",
  },
  {
    name: "Katherine B.",
    rating: 5,
    date: "January 2026",
    text: "Loved this pest control company!! I love that they use a natural, pet-safe spray so we can still be outside without worrying about harsh chemicals. The spray also smells amazing!! It left the house feeling fresh instead of chemical heavy. Most importantly, the bugs are gone! Would absolutely recommend!!!",
    source: "yelp",
  },
  {
    name: "Ashlyn C.",
    rating: 5,
    date: "February 2026",
    text: "Buzz Off Pest Prevention was exactly what I was looking for. I love that they use natural, pet-friendly treatments (huge plus for me), and they are a local family owned small business. They provide great customer service!",
    source: "yelp",
  },
  {
    name: "Cody Deniz",
    rating: 5,
    date: "March 2026",
    text: "Buzz Off is awesome! Professional and showed up on time. Explained what they were going to do ahead of service. Disclosed the full amount the service would cost prior to service starting. Can\u2019t speak highly enough of them.",
    source: "google",
    localGuide: true,
  },
  {
    name: "Karina S.",
    rating: 5,
    date: "February 2026",
    text: "My inquiry was quickly answered and appointment was made. Maurice assessed our need, then performed treatment using all natural ingredients. Very pleased with this service.",
    source: "yelp",
  },
  {
    name: "Code D.",
    rating: 5,
    date: "March 2026",
    text: "These guys were amazing! Efficient! Great community and they provided exactly as they said. Can\u2019t speak highly enough about these guys.",
    source: "yelp",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="#F0C060">
          <path d="M10 1l2.47 5.01L18 6.94l-4 3.9.94 5.5L10 13.77l-4.94 2.57.94-5.5-4-3.9 5.53-.93L10 1z" />
        </svg>
      ))}
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
            priority
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
                  <p className="font-display text-[clamp(2rem,4vw,3rem)] leading-none" style={{ color: "#1A5C32" }}>5.0</p>
                  <div className="flex justify-center my-1">
                    <Stars />
                  </div>
                  <p className="font-body text-[0.7rem] font-bold tracking-[0.15em] uppercase text-[#1C2B1E]/50">Average Rating</p>
                </div>
                <div>
                  <p className="font-display text-[clamp(2rem,4vw,3rem)] leading-none" style={{ color: "#1A5C32" }}>{REVIEWS.length}+</p>
                  <p className="font-body text-[0.7rem] font-bold tracking-[0.15em] uppercase text-[#1C2B1E]/50 mt-2">Verified Reviews</p>
                </div>
                <div>
                  <p className="font-display text-[clamp(2rem,4vw,3rem)] leading-none" style={{ color: "#1A5C32" }}>100%</p>
                  <p className="font-body text-[0.7rem] font-bold tracking-[0.15em] uppercase text-[#1C2B1E]/50 mt-2">5-Star Reviews</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── Reviews Grid ── */}
        <section className="py-[clamp(48px,6vw,80px)]" style={{ background: "#EDEADE" }}>
          <div className="max-w-[1200px] mx-auto px-[clamp(20px,4vw,48px)]">
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
                      <Stars />
                      <SourceBadge source={review.source} />
                    </div>
                    <p className="font-body text-[0.9rem] leading-relaxed" style={{ color: "#1C2B1E" }}>
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center font-body font-bold text-[0.75rem] text-white shrink-0"
                        style={{ background: "#1A5C32" }}
                      >
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-body font-bold text-[0.82rem]" style={{ color: "#1C2B1E" }}>
                          {review.name}
                        </p>
                        <p className="font-body text-[0.68rem]" style={{ color: "#1C2B1E99" }}>
                          {review.date}
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
