import Image from "next/image";
import { photoSections } from "@/content/home";
import styles from "./PhotoSections.module.css";

export default function PhotoSections() {
  return (
    <>
      {photoSections.map((section) => (
        <section
          key={section.id}
          className={`${styles.section} ${styles[section.align]}`}
          aria-label={section.headline}
        >
          <div className={styles.media}>
            <Image
              src={section.image}
              alt=""
              fill
              sizes="100vw"
              className={styles.img}
            />
            <div className={styles.shade} />
          </div>
          <div className={`container ${styles.copy}`}>
            <h2>{section.headline}</h2>
            <p>{section.body}</p>
            <a href="#" className="btn btn-green">
              {section.cta}
            </a>
          </div>
        </section>
      ))}
    </>
  );
}
