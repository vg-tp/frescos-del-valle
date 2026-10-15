import Image from "next/image";
import Link from "next/link";
import type { InteriorContent } from "@/content/interiors";
import { Crumbs, CtaBand, PageShell } from "./shared";
import { sharedStyles } from "./shared";
import styles from "./products.module.css";

export function ProductsHubLayout({ content }: { content: InteriorContent }) {
  return (
    <PageShell>
      <section className={styles.prodHero}>
        <div className="container">
          <Crumbs content={content} />
          <h1>{content.title}</h1>
          <p>{content.lead}</p>
        </div>
      </section>

      {content.cards?.length ? (
        <section className={styles.mosaic}>
          <div className="container">
            <header className={sharedStyles.sectionHead}>
              <h2>{content.cardsHeading || "Categories"}</h2>
            </header>
            <ul className={styles.mosaicGrid}>
              {content.cards.map((card) => (
                <li key={`${card.title}-${card.href}`}>
                  <Link href={card.href || "/products"} className={styles.mosaicTile}>
                    {card.image ? (
                      <Image
                        src={card.image}
                        alt=""
                        fill
                        sizes="25vw"
                        className={styles.mosaicImg}
                      />
                    ) : null}
                    <div className={styles.mosaicShade} />
                    <div className={styles.mosaicBody}>
                      <h3>{card.title}</h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {content.features?.length ? (
        <section className={styles.whyStrip}>
          <div className="container">
            <header className={sharedStyles.sectionHead}>
              <h2>{content.featuresHeading || "Why us"}</h2>
            </header>
            <ul className={styles.whyGrid}>
              {content.features.map((f) => (
                <li key={f.title}>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {content.cta ? <CtaBand cta={content.cta} /> : null}
    </PageShell>
  );
}

export function ProductsDetailLayout({ content }: { content: InteriorContent }) {
  const split = content.splits?.[0];
  return (
    <PageShell>
      <section className={styles.detailBar}>
        <div className="container">
          <Crumbs content={content} tone="light" />
          <h1>{content.title}</h1>
          <p>{content.lead}</p>
        </div>
      </section>

      <section className={styles.detailBody}>
        <div className={`container ${styles.detailProse}`}>
          {content.intro.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      </section>

      {split ? (
        <section className={styles.detailSplit}>
          <div className={styles.detailSplitMedia}>
            <Image
              src={split.image}
              alt=""
              fill
              sizes="50vw"
              className={styles.detailSplitImg}
            />
          </div>
          <div className={styles.detailSplitCopy}>
            <h2>{split.title}</h2>
            <p>{split.body}</p>
            {split.cta ? (
              <Link href={split.cta.href} className="btn btn-green">
                {split.cta.label}
              </Link>
            ) : null}
          </div>
        </section>
      ) : null}

      {content.features?.length ? (
        <section className={styles.whyStrip}>
          <div className="container">
            <header className={sharedStyles.sectionHead}>
              <h2>{content.featuresHeading || "Highlights"}</h2>
            </header>
            <ul className={styles.whyGrid}>
              {content.features.map((f) => (
                <li key={f.title}>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {content.cards?.length ? (
        <section className={styles.relatedStrip}>
          <div className="container">
            <header className={sharedStyles.sectionHead}>
              <h2>{content.cardsHeading || "Related"}</h2>
            </header>
            <ul className={styles.relatedGrid}>
              {content.cards.map((card) => (
                <li key={`${card.title}-${card.href}`}>
                  <Link href={card.href || "/products"} className={styles.relatedChip}>
                    {card.image ? (
                      <div className={styles.relatedMedia}>
                        <Image
                          src={card.image}
                          alt=""
                          fill
                          sizes="200px"
                          className={styles.relatedImg}
                        />
                      </div>
                    ) : null}
                    <span>{card.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {content.cta ? <CtaBand cta={content.cta} /> : null}
    </PageShell>
  );
}
