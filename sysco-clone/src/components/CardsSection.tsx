import Image from "next/image";
import { cardsSection } from "@/content/home";
import styles from "./CardsSection.module.css";

export default function CardsSection() {
  return (
    <section className={styles.section} aria-label="Audience cards">
      <div className="container">
        <div className={styles.intro}>
          <h2>{cardsSection.headline}</h2>
          <p>{cardsSection.body}</p>
        </div>
        <div className={styles.grid}>
          {cardsSection.cards.map((card) => (
            <a key={card.title} href="#" className={styles.card}>
              <div className={styles.media}>
                <Image
                  src={card.image}
                  alt=""
                  width={480}
                  height={300}
                  sizes="(max-width: 900px) 100vw, 25vw"
                />
              </div>
              <div className={styles.pad}>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
