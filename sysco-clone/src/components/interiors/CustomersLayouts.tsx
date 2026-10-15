import Image from "next/image";
import Link from "next/link";
import type { InteriorContent } from "@/content/interiors";
import { Crumbs, PageShell } from "./shared";
import { sharedStyles } from "./shared";
import styles from "./customers.module.css";

export function CustomersHubLayout({ content }: { content: InteriorContent }) {
  return (
    <PageShell>
      <section className={styles.custHero}>
        <Image
          src={content.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.custHeroImg}
        />
        <div className={styles.custHeroShade} />
        <div className={`container ${styles.custHeroInner}`}>
          <Crumbs content={content} />
          <h1>{content.title}</h1>
          <p>{content.lead}</p>
          <div className={styles.custActions}>
            <Link href="/become-a-customer" className="btn btn-green">
              Hazte cliente
            </Link>
            <Link href="/shop-now" className="btn btn-outline-white">
              Compra ahora
            </Link>
          </div>
        </div>
      </section>

      {content.cards?.length ? (
        <section className={styles.segGrid} aria-label="A quiénes servimos">
          <ul className={styles.segUl}>
            {content.cards.map((card) => (
              <li key={`${card.title}-${card.href}`}>
                <Link href={card.href || "/customers"} className={styles.segTile}>
                  {card.image ? (
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      sizes="25vw"
                      className={styles.segTileImg}
                    />
                  ) : null}
                  <div className={styles.segTileShade} />
                  <div className={styles.segTileBody}>
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </PageShell>
  );
}

export function SegmentLayout({ content }: { content: InteriorContent }) {
  return (
    <PageShell>
      <section className={styles.industryHero}>
        <Image
          src={content.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.industryHeroImg}
        />
        <div className={styles.industryHeroShade} />
        <div className={`container ${styles.industryHeroInner}`}>
          <Crumbs content={content} />
          <p className={styles.industryEyebrow}>
            {content.parentLabel || "A quiénes servimos"}
          </p>
          <h1>{content.title}</h1>
          <p>{content.lead}</p>
          <Link href="/become-a-customer" className="btn btn-green">
            Hazte cliente
          </Link>
        </div>
      </section>

      {content.features?.length ? (
        <section className={styles.benefits}>
          <div className="container">
            <header className={sharedStyles.sectionHead}>
              <h2>{content.featuresHeading || "Cómo te ayudamos"}</h2>
            </header>
            <ul className={styles.benefitsGrid}>
              {content.features.slice(0, 3).map((f) => (
                <li key={f.title}>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {content.stats?.length ? (
        <section className={styles.statsRow} aria-label="Destacados">
          <div className={`container ${styles.statsGrid}`}>
            {content.stats.map((s) => (
              <div key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {content.splits?.map((block, i) => (
        <section
          key={`${block.title}-${block.align}`}
          className={`${styles.photoCta} ${i % 2 === 1 ? styles.photoCtaFlip : ""}`}
        >
          <div className={styles.photoCtaMedia}>
            <Image
              src={block.image}
              alt=""
              fill
              sizes="50vw"
              className={styles.photoCtaImg}
            />
          </div>
          <div className={styles.photoCtaCopy}>
            {block.eyebrow ? (
              <p className={styles.industryEyebrow}>{block.eyebrow}</p>
            ) : null}
            <h2>{block.title}</h2>
            <p>{block.body}</p>
            {block.cta ? (
              <Link href={block.cta.href} className="btn btn-green">
                {block.cta.label}
              </Link>
            ) : null}
          </div>
        </section>
      ))}

      {content.cards?.length || content.related?.length ? (
        <section className={styles.relatedSeg}>
          <div className="container">
            <header className={sharedStyles.sectionHead}>
              <h2>{content.cardsHeading || "Segmentos relacionados"}</h2>
            </header>
            <ul className={styles.relatedSegUl}>
              {content.cards?.length
                ? content.cards.map((card) => (
                    <li key={card.href || card.title}>
                      <Link href={card.href || "/customers"}>{card.title}</Link>
                    </li>
                  ))
                : content.related?.map((r) => (
                    <li key={r.href}>
                      <Link href={r.href}>{r.label}</Link>
                    </li>
                  ))}
            </ul>
          </div>
        </section>
      ) : null}
    </PageShell>
  );
}
