import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { headerChrome, navItems, allPages, utilityPages, lorem } from "../src/content/nav";
import { site, heroSlides, partnerBanner, photoSections, footer, cookieBanner } from "../src/content/home";
import { getInterior, interiorHrefs } from "../src/content/interiors";

const interiors: Record<string, unknown> = {};
for (const href of interiorHrefs) {
  interiors[href] = getInterior(href);
}

const out = {
  site,
  headerChrome,
  navItems,
  utilityPages,
  allPages,
  lorem,
  heroSlides,
  partnerBanner,
  photoSections,
  footer,
  cookieBanner,
  interiors,
  interiorHrefs,
};

const destDir = join(process.cwd(), "..", "site", "js");
mkdirSync(destDir, { recursive: true });
writeFileSync(join(destDir, "content.json"), JSON.stringify(out, null, 2));
console.log("Wrote", Object.keys(interiors).length, "interiors to site/js/content.json");
