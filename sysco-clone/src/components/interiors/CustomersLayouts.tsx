import Image from "next/image";
import Link from "next/link";
import type { InteriorContent } from "@/content/interiors";
import {
  CardGrid,
  CenteredHead,
  CtaBand,
  FeatureCallout,
  PageShell,
  PhotoHero,
} from "./shared";
import styles from "./customers.module.css";

/**
 * Customers hub — Sysco redirects /customers → restaurants.
 * Keep a segment mosaic under a tall photo hero + CTAs.
 */
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

      {content.cta ? <CtaBand cta={content.cta} /> : null}
    </PageShell>
  );
}

/**
 * Sysco Restaurants / segment stack:
 * tall photo hero → intro split (image + “At the Heart…”) →
 * Power of Partnership cards → multicultural / One Sysco callouts →
 * specialty company grid → brand/QA callouts → Become a Customer CTA
 */
export function SegmentLayout({ content }: { content: InteriorContent }) {
  const introSplit = content.splits?.[0];
  const moreSplits = content.splits?.slice(1) || [];

  return (
    <PageShell>
      <PhotoHero content={content} tall showCrumbs />

      {introSplit ? (
        <section className={styles.introSplit}>
          <div className={styles.introMedia}>
            <Image
              src={introSplit.image}
              alt=""
              fill
              sizes="50vw"
              className={styles.introImg}
            />
          </div>
          <div className={styles.introCopy}>
            <h2>{introSplit.title || "En el corazón de la comida y el servicio"}</h2>
            <div className={styles.introRule} aria-hidden />
            <p>{introSplit.body}</p>
            {content.intro.slice(0, 1).map((p) => (
              <p key={p.slice(0, 28)}>{p}</p>
            ))}
          </div>
        </section>
      ) : null}

      {content.features?.length ? (
        <CardGrid
          heading={content.featuresHeading || "El poder de la alianza"}
          cards={content.features.slice(0, 3).map((f, i) => ({
            title: f.title,
            body: f.body,
            href: "/become-a-customer",
            image: ["/section-kitchen.jpg", "/section-produce.jpg", "/card-2.jpg"][i],
          }))}
          columns={3}
        />
      ) : null}

      {moreSplits.map((block) => (
        <FeatureCallout key={`${block.title}-${block.align}`} block={block} />
      ))}

      {content.cards?.length ? (
        <section className={styles.oneSysco}>
          <div className="container">
            <CenteredHead title={content.cardsHeading || "One Sysco"} />
            <ul className={styles.specialtyGrid}>
              {content.cards.map((card) => (
                <li key={`${card.title}-${card.href}`}>
                  <Link href={card.href || "/customers"} className={styles.specialtyCard}>
                    {card.image ? (
                      <div className={styles.specialtyMedia}>
                        <Image
                          src={card.image}
                          alt=""
                          fill
                          sizes="33vw"
                          className={styles.specialtyImg}
                        />
                      </div>
                    ) : null}
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </Link>
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

      {content.cta ? (
        <CtaBand
          cta={{
            ...content.cta,
            title: content.cta.title || "Hazte cliente",
            primary: content.cta.primary || {
              label: "Hazte cliente",
              href: "/become-a-customer",
            },
          }}
        />
      ) : null}
    </PageShell>
  );
}
