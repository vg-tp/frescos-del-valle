import SiteChrome from "@/components/SiteChrome";
import Hero from "@/components/Hero";
import PartnerBanner from "@/components/PartnerBanner";
import PhotoSections from "@/components/PhotoSections";

/**
 * Homepage composition — edit section order here.
 * Copy/images live in src/content/home.ts
 */
export default function HomePage() {
  return (
    <SiteChrome>
      <main>
        <Hero />
        <PartnerBanner />
        <PhotoSections />
      </main>
    </SiteChrome>
  );
}
