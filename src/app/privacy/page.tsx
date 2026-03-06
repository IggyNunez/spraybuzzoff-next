"use client";

import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPage() {
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
              Privacy Policy
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
                  At Buzz Off Pest Prevention, we respect your privacy and are committed to protecting the personal information you share with us. This policy explains what information we collect, how we use it, and your rights regarding that information.
                </p>
              </div>

              <div>
                <h2 className="font-display text-[1.4rem] uppercase text-[#1A5C32] mb-3 tracking-wide">
                  1. Information We Collect
                </h2>
                <p className="mb-3">
                  We collect information you provide directly when booking a service, submitting a contact form, or communicating with our team. This may include:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Name</li>
                  <li>Phone number</li>
                  <li>Email address</li>
                  <li>Home address (service location)</li>
                  <li>Service preferences and notes</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-[1.4rem] uppercase text-[#1A5C32] mb-3 tracking-wide">
                  2. How We Use Your Information
                </h2>
                <p className="mb-3">We use your information to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Schedule and perform pest prevention services at your property</li>
                  <li>Communicate with you about appointments, follow-ups, and service updates</li>
                  <li>Process payments for services rendered</li>
                  <li>Improve our services and customer experience</li>
                  <li>Send service reminders and seasonal pest prevention tips (with your consent)</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-[1.4rem] uppercase text-[#1A5C32] mb-3 tracking-wide">
                  3. Information Sharing
                </h2>
                <p className="mb-3">
                  We do not sell, rent, or trade your personal information to third parties. We may share your information only in the following limited circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Service Providers:</strong> Trusted third-party tools used for scheduling, payment processing, and communication (e.g., booking platforms, payment processors)</li>
                  <li><strong>Legal Requirements:</strong> When required by law, court order, or to protect the safety and rights of Buzz Off Pest Prevention or others</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-[1.4rem] uppercase text-[#1A5C32] mb-3 tracking-wide">
                  4. Cookies &amp; Website Analytics
                </h2>
                <p className="mb-3">
                  Our website may use cookies and analytics tools to understand how visitors interact with spraybuzzoff.com. These tools help us improve site performance and user experience. Cookies do not collect personally identifiable information unless you voluntarily submit it through a form.
                </p>
                <p>
                  You can disable cookies through your browser settings at any time.
                </p>
              </div>

              <div>
                <h2 className="font-display text-[1.4rem] uppercase text-[#1A5C32] mb-3 tracking-wide">
                  5. Data Security
                </h2>
                <p>
                  We take reasonable measures to protect your personal information from unauthorized access, alteration, or destruction. Payment information is handled exclusively through PCI-compliant third-party processors and is never stored on our servers.
                </p>
              </div>

              <div>
                <h2 className="font-display text-[1.4rem] uppercase text-[#1A5C32] mb-3 tracking-wide">
                  6. Your Rights
                </h2>
                <p className="mb-3">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Request access to the personal information we hold about you</li>
                  <li>Request corrections to inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt out of marketing communications at any time</li>
                </ul>
                <p className="mt-3">
                  California residents may have additional rights under the California Consumer Privacy Act (CCPA). To exercise any of these rights, contact us using the information below.
                </p>
              </div>

              <div>
                <h2 className="font-display text-[1.4rem] uppercase text-[#1A5C32] mb-3 tracking-wide">
                  7. Children&apos;s Privacy
                </h2>
                <p>
                  Our website and services are not directed at children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will promptly remove it.
                </p>
              </div>

              <div>
                <h2 className="font-display text-[1.4rem] uppercase text-[#1A5C32] mb-3 tracking-wide">
                  8. Changes to This Policy
                </h2>
                <p>
                  We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this page periodically.
                </p>
              </div>

              <div>
                <h2 className="font-display text-[1.4rem] uppercase text-[#1A5C32] mb-3 tracking-wide">
                  9. Contact
                </h2>
                <p>
                  For privacy-related questions or requests:
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
