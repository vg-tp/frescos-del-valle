import Image from "next/image";
import Link from "next/link";
import type { InteriorContent } from "@/content/interiors";
import FamilyTabs from "./FamilyTabs";
import {
  CardGrid,
  CenteredHead,
  CtaBand,
  FeatureCallout,
  FeatureGrid,
  PageShell,
  PhotoHero,
  QuoteBand,
} from "./shared";
import styles from "./about.module.css";
import { sharedStyles } from "./shared";

const STORY_QUOTES = [
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    author: "Dimple y Sumesh Bakshi",
    role: "Clientes · Restaurante familiar",
  },
  {
    quote: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    author: "Lorem Ipsum",
    role: "Operaciones",
  },
  {
    quote: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    author: "Consectetur Elit",
    role: "Chef propietario",
  },
];

/** About hub — mirrors Sysco Story destination ( /about redirects there ). */
export function AboutHubLayout({ content }: { content: InteriorContent }) {
  return (
    <PageShell>
      <PhotoHero content={content} tall />

      {content.stats?.length ? (
        <section className={styles.hubStats} aria-label="Destacados">
          <div className={`container ${styles.hubStatsGrid}`}>
            {content.stats.map((s) => (
              <div key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {content.cards?.length ? (
        <CardGrid
          heading={content.cardsHeading || "Explorar"}
          cards={content.cards}
          columns={3}
        />
      ) : null}

      {content.features?.length ? (
        <FeatureGrid
          heading={content.featuresHeading || "Quiénes somos"}
          items={content.features}
        />
      ) : null}

      {content.splits?.map((block) => (
        <FeatureCallout key={`${block.title}-${block.align}`} block={block} />
      ))}

      {content.cta ? <CtaBand cta={content.cta} /> : null}
    </PageShell>
  );
}

/**
 * Sysco Story stack:
 * tall photo hero → Family tab strip + image-caption → quote slider →
 * people feature callout → career cards → CTA
 */
export function StoryLayout({ content }: { content: InteriorContent }) {
  const familyCards =
    content.cards?.length
      ? content.cards
      : (content.features || []).slice(0, 4).map((f, i) => ({
          title: f.title,
          body: f.body,
          image: content.splits?.[i % (content.splits.length || 1)]?.image || content.heroImage,
          href: content.href,
        }));
  return (
    <PageShell>
      <PhotoHero content={content} tall />

      {familyCards.length ? (
        <FamilyTabs
          heading={content.cardsHeading || "La familia Sysco"}
          cards={familyCards}
        />
      ) : null}

      <QuoteBand heading="Lo que dicen nuestros clientes" quotes={STORY_QUOTES} />

      {content.splits?.[0] ? (
        <FeatureCallout
          block={{
            ...content.splits[0],
            title: content.splits[0].title || "Nuestra gente cuenta la historia",
            align: "left",
          }}
        />
      ) : null}

      {content.list?.length ? (
        <CardGrid
          heading={content.listHeading || "Oportunidades frescas cada día"}
          cards={content.list.map((item, i) => ({
            title: item.title,
            body: item.body,
            href: item.href || "/careers",
            meta: item.meta,
            image: ["/section-kitchen.jpg", "/section-cold.jpg", "/cta.jpg"][i % 3],
          }))}
          columns={3}
        />
      ) : content.features?.length ? (
        <CardGrid
          heading={content.featuresHeading || "Oportunidades frescas cada día"}
          cards={content.features.slice(0, 3).map((f, i) => ({
            title: f.title,
            body: f.body,
            href: "/careers",
            image: ["/section-kitchen.jpg", "/section-cold.jpg", "/cta.jpg"][i % 3],
          }))}
          columns={3}
        />
      ) : null}

      {content.splits?.slice(1).map((block) => (
        <FeatureCallout key={`${block.title}-${block.align}`} block={block} />
      ))}

      {content.cta ? <CtaBand cta={content.cta} /> : null}
    </PageShell>
  );
}

/** Purpose-style: cream statement band + ingredients + video/media + cards */
export function PurposeLayout({ content }: { content: InteriorContent }) {
  return (
    <PageShell padded>
      <section className={styles.purposeHero}>
        <div className="container">
          <p className={styles.purposeEyebrow}>{content.sectionLabel || "Nuestro propósito"}</p>
          <h1 className={styles.purposeHeadline}>
            {content.title === "Nuestro propósito"
              ? "Conectando al mundo para compartir comida y cuidarnos unos a otros"
              : content.title}
          </h1>
          <p className={styles.purposeLead}>{content.lead}</p>
        </div>
      </section>

      <section className={styles.purposeVideo}>
        <div className="container">
          <div className={styles.purposeVideoFrame}>
            <Image
              src={content.heroImage || "/section-kitchen.jpg"}
              alt=""
              fill
              sizes="100vw"
              className={styles.purposeVideoImg}
            />
            <div className={styles.purposeVideoShade} />
            <button type="button" className={styles.playBtn} aria-label="Reproducir">
              ▶
            </button>
            <p className={styles.purposeVideoCaption}>
              ¿Cómo se ve cuando estamos en nuestro mejor momento?
            </p>
          </div>
        </div>
      </section>

      {content.features?.length ? (
        <section className={styles.ingredients}>
          <div className="container">
            <CenteredHead title={content.featuresHeading || "Nuestros ingredientes para el éxito"} />
            <ul className={styles.ingredientsGrid}>
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
        <CardGrid
          heading={content.cardsHeading || "Más videos sobre nuestro propósito"}
          cards={content.cards}
          columns={2}
        />
      ) : null}

      {content.cta ? <CtaBand cta={content.cta} /> : null}
    </PageShell>
  );
}

/** Sysco Newsroom: tall hero → 4 equal category image tiles */
export function NewsLayout({ content }: { content: InteriorContent }) {
  return (
    <PageShell>
      <PhotoHero content={content} tall />

      {content.cards?.length ? (
        <section className={styles.newsMosaic}>
          <div className="container">
            {content.lead ? (
              <p className={styles.newsIntro}>{content.lead}</p>
            ) : null}
            <ul className={styles.newsMosaicGrid}>
              {content.cards.slice(0, 4).map((card) => (
                <li key={card.title}>
                  <Link href={card.href || content.href} className={styles.newsMosaicTile}>
                    {card.image ? (
                      <Image
                        src={card.image}
                        alt=""
                        fill
                        sizes="25vw"
                        className={styles.newsMosaicImg}
                      />
                    ) : null}
                    <div className={styles.newsMosaicShade} />
                    <div className={styles.newsMosaicBody}>
                      <h3>{card.title}</h3>
                      <p>{card.body}</p>
                    </div>
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

export function EventsLayout({ content }: { content: InteriorContent }) {
  return (
    <PageShell>
      <PhotoHero content={content} />

      {content.list?.length ? (
        <section className={styles.eventsList}>
          <div className="container">
            <CenteredHead title={content.listHeading || "Otros eventos Sysco"} />
            <ul className={styles.eventsUl}>
              {content.list.map((item) => {
                const dateBits =
                  (item.meta || "Por confirmar").split("·")[0]?.trim() || "Por confirmar";
                return (
                  <li key={item.title}>
                    <Link href={item.href || content.href} className={styles.eventRow}>
                      <div className={styles.eventDate}>{dateBits}</div>
                      <div className={styles.eventBody}>
                        <strong>{item.title}</strong>
                        <p>{item.body}</p>
                      </div>
                      <span className={styles.eventCta}>Detalles</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ) : null}

      {content.cta ? <CtaBand cta={content.cta} /> : null}
    </PageShell>
  );
}

/** Sysco Management: photo hero → centered “Meet the Executive Team” → bio grid */
export function ManagementLayout({ content }: { content: InteriorContent }) {
  return (
    <PageShell>
      <PhotoHero content={content} tall />

      {content.bios?.length ? (
        <section className={styles.bioGrid}>
          <div className="container">
            <CenteredHead title="Conoce al equipo directivo" />
            <ul className={styles.bioUl}>
              {content.bios.map((bio) => (
                <li key={bio.name} className={styles.bioCard}>
                  <div className={styles.bioMedia}>
                    <Image
                      src={bio.image}
                      alt=""
                      fill
                      sizes="33vw"
                      className={styles.bioImg}
                    />
                  </div>
                  <div>
                    <h3>{bio.name}</h3>
                    <p className={styles.bioRole}>{bio.role}</p>
                    <p>{bio.body}</p>
                  </div>
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

export function ReportLayout({ content }: { content: InteriorContent }) {
  return (
    <PageShell>
      <PhotoHero content={content} />

      {content.stats?.length ? (
        <section className={styles.reportStats} aria-label="Destacados">
          <div className={`container ${styles.reportStatsGrid}`}>
            {content.stats.map((s) => (
              <div key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {content.list?.length ? (
        <section className={styles.reportDocs}>
          <div className="container">
            <CenteredHead title={content.listHeading || "Informes anuales"} />
            <ul className={styles.docList}>
              {content.list.map((item) => (
                <li key={item.title}>
                  <Link href={item.href || content.href} className={styles.docItem}>
                    {item.meta ? <span className={styles.meta}>{item.meta}</span> : null}
                    <strong>{item.title}</strong>
                    <p>{item.body}</p>
                    <span className={styles.docDl}>Descargar</span>
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

// re-export for unused sharedStyles reference silence in older imports
void sharedStyles;
