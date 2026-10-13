import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeatureStrip from "@/components/FeatureStrip";
import SplitSection from "@/components/SplitSection";
import CardsSection from "@/components/CardsSection";
import SpecialtyBand from "@/components/SpecialtyBand";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";

/**
 * Homepage composition — edit section order here.
 * Copy/images live in src/content/home.ts
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeatureStrip />
        <SplitSection />
        <CardsSection />
        <SpecialtyBand />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
