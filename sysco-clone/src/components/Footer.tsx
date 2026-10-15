import Image from "next/image";
import Link from "next/link";
import { footer, site } from "@/content/home";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.blurb}>
          <p>{footer.blurb}</p>
          <p className={styles.stats}>{footer.stats}</p>
        </div>
        <div className={styles.columns}>
          {footer.columns.map((col) => (
            <div key={col.title} className={styles.col}>
              <h5>{col.title}</h5>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <ul className={styles.social} aria-label="Redes sociales">
          {["f", "x", "in", "ig", "yt"].map((label) => (
            <li key={label}>
              <Link href="/about/sysco-today/newsroom" aria-label={label}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={`container ${styles.bottom}`}>
        <div className={styles.brand}>
          <Image src={site.logo.src} alt={site.logo.alt} width={120} height={30} />
          <p>{footer.copyright}</p>
        </div>
        <div className={styles.legal}>
          {footer.legal.map((item, i) => (
            <span key={item.label}>
              <Link href={item.href}>{item.label}</Link>
              {i < footer.legal.length - 1 ? <span className={styles.bar}>|</span> : null}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
