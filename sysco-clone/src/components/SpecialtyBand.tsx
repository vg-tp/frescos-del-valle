import Image from "next/image";
import { specialtyBand } from "@/content/home";
import styles from "./SpecialtyBand.module.css";

export default function SpecialtyBand() {
  return (
    <section className={styles.section} aria-label="Specialty">
      <div className={styles.media}>
        <Image
          src={specialtyBand.image}
          alt=""
          fill
          sizes="100vw"
          className={styles.img}
        />
        <div className={styles.shade} />
      </div>
      <div className={`container ${styles.content}`}>
        <h2>{specialtyBand.headline}</h2>
        <p>{specialtyBand.body}</p>
        <a href="#" className="btn btn-primary">
          {specialtyBand.cta}
        </a>
      </div>
    </section>
  );
}
