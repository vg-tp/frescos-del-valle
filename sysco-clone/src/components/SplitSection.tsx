import Image from "next/image";
import { splitSection } from "@/content/home";
import styles from "./SplitSection.module.css";

export default function SplitSection() {
  return (
    <section className={styles.section} aria-label="Split feature">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{splitSection.eyebrow}</p>
          <h2>{splitSection.headline}</h2>
          <p>{splitSection.body}</p>
          <a href="#" className="btn btn-dark">
            {splitSection.cta}
          </a>
        </div>
        <div className={styles.media}>
          <Image
            src={splitSection.image}
            alt=""
            width={720}
            height={480}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
