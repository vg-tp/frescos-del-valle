import Image from "next/image";
import { hero } from "@/content/home";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} aria-label="Hero">
      <div className={styles.media}>
        <Image
          src={hero.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.img}
        />
        <div className={styles.shade} />
      </div>
      <div className={`container ${styles.content}`}>
        <p className={styles.eyebrow}>{hero.eyebrow}</p>
        <h1>{hero.headline}</h1>
        <p className={styles.body}>{hero.body}</p>
        <div className={styles.ctas}>
          <a href="#" className="btn btn-primary">
            {hero.primaryCta}
          </a>
          <a href="#" className="btn btn-outline">
            {hero.secondaryCta}
          </a>
        </div>
      </div>
    </section>
  );
}
