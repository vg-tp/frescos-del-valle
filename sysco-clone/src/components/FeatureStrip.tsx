import { featureStrip } from "@/content/home";
import styles from "./FeatureStrip.module.css";

export default function FeatureStrip() {
  return (
    <section className={styles.section} aria-label="Highlights">
      <div className={`container ${styles.grid}`}>
        {featureStrip.items.map((item, i) => (
          <article key={item.title} className={styles.item}>
            <div className={styles.icon} aria-hidden>
              {i + 1}
            </div>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
