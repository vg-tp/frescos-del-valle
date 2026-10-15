import Image from "next/image";
import Link from "next/link";
import { partnerBanner, site } from "@/content/home";
import styles from "./PartnerBanner.module.css";

export default function PartnerBanner() {
  return (
    <section className={styles.section} aria-label="Banner de socios">
      <div className={`container ${styles.inner}`}>
        <div className={styles.logos}>
          <div className={styles.brand}>
            <Image src={site.logo.src} alt={site.logo.alt} width={180} height={44} />
            <p>{partnerBanner.leftTagline}</p>
          </div>
          <div className={styles.divider} aria-hidden />
          <div className={styles.seal} aria-hidden>
            <span>{partnerBanner.rightLabel}</span>
          </div>
        </div>
        <h2>{partnerBanner.headline}</h2>
        <Link href={partnerBanner.href} className="btn btn-outline-white">
          {partnerBanner.cta}
        </Link>
      </div>
    </section>
  );
}
