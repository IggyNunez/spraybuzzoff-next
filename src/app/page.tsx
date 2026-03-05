import { Nav } from "@/components/layout/Nav";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Statement } from "@/components/sections/Statement";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { AreasBar } from "@/components/sections/AreasBar";
import { Difference } from "@/components/sections/Difference";
import { Plans } from "@/components/sections/Plans";
import { Pests } from "@/components/sections/Pests";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTAContact } from "@/components/sections/CTAContact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Intro />
        <Statement />
        <Services />
        <Process />
        <AreasBar />
        <Difference />
        <Plans />
        <Pests />
        <Testimonials />
        <FAQ />
        <CTAContact />
      </main>
      <Footer />
    </>
  );
}
