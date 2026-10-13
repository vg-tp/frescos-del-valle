import Image from "next/image";
import { ctaBand } from "@/content/home";
import styles from "./CtaBand.module.css";

export default function CtaBand() {
  return (
    <section className={styles.section} aria-label="Call to action">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <h2>{ctaBand.headline}</h2>
          <p>{ctaBand.body}</p>
          <a href="#" className="btn btn-primary">
            {ctaBand.cta}
          </a>
        </div>
        <div className={styles.media}>
          <Image
            src={ctaBand.image}
            alt=""
            width={640}
            height={400}
            sizes="(max-width: 900px) 100vw, 45vw"
          />
        </div>
      </div>
    </section>
  );
}
