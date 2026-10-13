import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PartnerBanner from "@/components/PartnerBanner";
import PhotoSections from "@/components/PhotoSections";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

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
        <PartnerBanner />
        <PhotoSections />
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}
