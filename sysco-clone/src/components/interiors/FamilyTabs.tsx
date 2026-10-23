"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { CardItem } from "@/content/interiors";
import styles from "./about.module.css";

export default function FamilyTabs({
  heading,
  cards,
}: {
  heading: string;
  cards: CardItem[];
}) {
  const items = cards.slice(0, 4);
  const [active, setActive] = useState(0);
  const current = items[active] || items[0];
  if (!current) return null;

  return (
    <section className={styles.familySection}>
      <div className="container">
        <header className={styles.familyHead}>
          <h2>{heading}</h2>
        </header>
        <ul className={styles.familyTabs} role="tablist" aria-label={heading}>
          {items.map((card, i) => (
            <li key={card.title} role="presentation">
              <button
                type="button"
                role="tab"
                aria-selected={i === active}
                className={`${styles.familyTab}${
                  i === active ? ` ${styles.familyTabActive}` : ""
                }`}
                onClick={() => setActive(i)}
              >
                {card.title}
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.familyPanel} role="tabpanel">
          <div className={styles.familyPanelMedia}>
            {current.image ? (
              <Image
                src={current.image}
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className={styles.familyPanelImg}
              />
            ) : null}
          </div>
          <div className={styles.familyPanelCopy}>
            <h3>{current.title}</h3>
            <p>{current.body}</p>
            <Link href={current.href || "#"} className="btn btn-green">
              CONOCE MÁS
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
