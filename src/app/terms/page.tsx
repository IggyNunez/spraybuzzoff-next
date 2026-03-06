"use client";

import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="bg-[#1A5C32] pt-40 pb-16">
          <div className="max-w-[800px] mx-auto px-[clamp(20px,4vw,48px)]">
            <p
              className="font-body font-bold text-[0.72rem] tracking-[0.25em] uppercase mb-3"
              style={{ color: "#E05A2B" }}
            >
              Legal
            </p>
            <h1 className="font-display text-[clamp(40px,6vw,72px)] leading-none uppercase text-white">
              Terms &amp; Conditions
            </h1>
            <div className="h-[2px] w-16 mt-4" style={{ background: "#C8973A" }} />
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-[#EDEADE]">
          <div className="max-w-[800px] mx-auto px-[clamp(20px,4vw,48px)]">
            <div className="space-y-10 font-body text-[0.95rem] leading-relaxed text-[#1C2B1E]">

              <div>
                <p className="text-[#1C2B1E]/60 text-[0.85rem] mb-8">
                  Last updated: March 5, 2026
                </p>
                <p>
                  Welcome to Buzz Off Pest Prevention. By using our services or accessing our website at spraybuzzoff.com, you agree to the following terms and conditions. Please read them carefully.
                </p>
              </div>

              <div>
                <h2 className="font-display text-[1.4rem] uppercase text-[#1A5C32] mb-3 tracking-wide">
                  1. Services
                </h2>
                <p className="mb-3">
                  Buzz Off Pest Prevention provides plant-based pest prevention services for residential properties in the Inland Empire and San Gabriel Valley regions of Southern California. All treatments use FIFRA 25(b) exempt botanical ingredients.
                </p>
                <p>
                  Service schedules, pricing, and availability are subject to change. We will communicate any changes that affect your scheduled services in advance.
                </p>
              </div>

              <div>
                <h2 className="font-display text-[1.4rem] uppercase text-[#1A5C32] mb-3 tracking-wide">
                  2. No Contracts
                </h2>
                <p>
                  Buzz Off operates on a no-contract basis. You are free to pause, modify, or cancel your service plan at any time without penalty or cancellation fees. We earn your continued business by delivering consistent results.
                </p>
              </div>

              <div>
                <h2 className="font-display text-[1.4rem] uppercase text-[#1A5C32] mb-3 tracking-wide">
                  3. Scheduling &amp; Access
                </h2>
                <p className="mb-3">
                  By booking a service, you authorize Buzz Off technicians to access the exterior areas of your property for treatment. Interior treatments require a separate authorization and your presence or explicit consent.
                </p>
                <p>
                  We ask that pets be kept indoors during treatment and for approximately 30-45 minutes after application to allow for drying time. While our products are plant-based and designed to be safe, this precaution ensures the best results.
                </p>
              </div>

              <div>
                <h2 className="font-display text-[1.4rem] uppercase text-[#1A5C32] mb-3 tracking-wide">
                  4. Payment
                </h2>
                <p>
                  Payment is due at the time of service unless otherwise arranged. We accept major credit cards and digital payment methods. Recurring plan payments are processed on the schedule agreed upon at enrollment.
                </p>
              </div>

              <div>
                <h2 className="font-display text-[1.4rem] uppercase text-[#1A5C32] mb-3 tracking-wide">
                  5. Results &amp; Guarantees
                </h2>
                <p className="mb-3">
                  Buzz Off provides pest prevention, not pest elimination. Our plant-based treatments are designed to repel and deter common pests including mosquitoes, ants, spiders, fleas, ticks, and other insects.
                </p>
                <p>
                  Results may vary based on environmental conditions, property size, surrounding areas, and pest pressure. We stand behind our work and offer re-treatments between scheduled visits if you experience pest activity covered under your plan.
                </p>
              </div>

              <div>
                <h2 className="font-display text-[1.4rem] uppercase text-[#1A5C32] mb-3 tracking-wide">
                  6. Limitation of Liability
                </h2>
                <p>
                  Buzz Off Pest Prevention shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid for the specific service in question. We are not responsible for damage to plants, landscaping, or property that may result from pest activity itself.
                </p>
              </div>

              <div>
                <h2 className="font-display text-[1.4rem] uppercase text-[#1A5C32] mb-3 tracking-wide">
                  7. Intellectual Property
                </h2>
                <p>
                  All content on spraybuzzoff.com, including text, logos, images, and design elements, is the property of Buzz Off Pest Prevention and may not be reproduced, distributed, or used without written permission.
                </p>
              </div>

              <div>
                <h2 className="font-display text-[1.4rem] uppercase text-[#1A5C32] mb-3 tracking-wide">
                  8. Changes to Terms
                </h2>
                <p>
                  We reserve the right to update these terms at any time. Changes will be posted on this page with an updated revision date. Continued use of our services after changes are posted constitutes acceptance of the revised terms.
                </p>
              </div>

              <div>
                <h2 className="font-display text-[1.4rem] uppercase text-[#1A5C32] mb-3 tracking-wide">
                  9. Contact
                </h2>
                <p>
                  If you have questions about these terms, reach out to us:
                </p>
                <ul className="mt-3 space-y-1">
                  <li><strong>Phone:</strong> <a href="tel:9098988955" className="text-[#1A5C32] underline">909.898.8955</a></li>
                  <li><strong>Email:</strong> <a href="mailto:Buzz@spraybuzzoff.com" className="text-[#1A5C32] underline">Buzz@spraybuzzoff.com</a></li>
                  <li><strong>Service Area:</strong> Inland Empire &amp; San Gabriel Valley, CA</li>
                  <li><strong>License:</strong> #PR 10014</li>
                </ul>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
