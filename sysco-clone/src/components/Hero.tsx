"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { heroSlides } from "@/content/home";
import styles from "./Hero.module.css";

export default function Hero() {
  const [index, setIndex] = useState(0);
  const total = heroSlides.length;

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 6000);
    return () => window.clearInterval(id);
  }, [total]);

  const go = (dir: -1 | 1) => setIndex((i) => (i + dir + total) % total);
  const slide = heroSlides[index];

  return (
    <section className={styles.hero} aria-label="Carrusel principal">
      {heroSlides.map((s, i) => (
        <div
          key={s.headline}
          className={`${styles.slide} ${i === index ? styles.active : ""}`}
          aria-hidden={i !== index}
        >
          <Image
            src={s.image}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={styles.img}
          />
        </div>
      ))}
      <div className={styles.shade} />

      <button
        type="button"
        className={`${styles.arrow} ${styles.prev}`}
        aria-label="Diapositiva anterior"
        onClick={() => go(-1)}
      >
        ‹
      </button>
      <button
        type="button"
        className={`${styles.arrow} ${styles.next}`}
        aria-label="Diapositiva siguiente"
        onClick={() => go(1)}
      >
        ›
      </button>

      <div className={styles.content}>
        <h1>{slide.headline}</h1>
        <p>{slide.body}</p>
        <Link href={slide.href} className="btn btn-green">
          {slide.cta}
        </Link>
      </div>

      <div className={styles.dots} role="tablist" aria-label="Diapositivas">
        {heroSlides.map((s, i) => (
          <button
            key={s.headline}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Diapositiva ${i + 1}`}
            className={i === index ? styles.dotActive : styles.dot}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
