import Image from "next/image";
import Link from "next/link";
import type { InteriorContent } from "@/content/interiors";
import { CtaBand, FeatureGrid, PageShell, PhotoHero } from "./shared";
import styles from "./about.module.css";
import { sharedStyles } from "./shared";

export function AboutHubLayout({ content }: { content: InteriorContent }) {
  return (
    <PageShell>
      {/* Sysco About hub: full-bleed photo hero + crumbs + title */}
      <PhotoHero content={content} />

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
        <section className={styles.hubMosaic}>
          <div className="container">
            <header className={sharedStyles.sectionHead}>
              <h2>{content.cardsHeading || "Explorar"}</h2>
            </header>
            <ul className={styles.hubMosaicGrid}>
              {content.cards.map((card) => (
                <li key={`${card.title}-${card.href}`}>
                  <Link href={card.href || "/about"} className={styles.hubTile}>
                    {card.image ? (
                      <Image
                        src={card.image}
                        alt=""
                        fill
                        sizes="(max-width: 700px) 100vw, 50vw"
                        className={styles.hubTileImg}
                      />
                    ) : null}
                    <div className={styles.hubTileShade} />
                    <div className={styles.hubTileBody}>
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

      {content.features?.length ? (
        <FeatureGrid
          heading={content.featuresHeading || "Quiénes somos"}
          items={content.features}
        />
      ) : null}

      {content.splits?.map((block) => (
        <section
          key={`${block.title}-${block.align}`}
          className={`${styles.storyBand} ${block.align === "right" ? styles.storyBandRight : ""}`}
        >
          <div className={styles.storyBandMedia}>
            <Image
              src={block.image}
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.storyBandImg}
            />
          </div>
          <div className={styles.storyBandCopy}>
            {block.eyebrow ? (
              <p className={styles.timelineYear}>{block.eyebrow}</p>
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

      {content.cta ? <CtaBand cta={content.cta} /> : null}
    </PageShell>
  );
}

export function StoryLayout({ content }: { content: InteriorContent }) {
  return (
    <PageShell>
      {/* Previous white title band read as “no header”; Sysco About children use photo chrome */}
      <PhotoHero content={content} />

      <section className={styles.storyBody}>
        <div className={`container ${styles.storyColumns}`}>
          <div className={styles.storyProse}>
            {content.intro.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          {content.related?.length ? (
            <aside className={styles.storyAside}>
              <h2>En esta sección</h2>
              <ul>
                {content.related.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href}>{r.label}</Link>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </div>
      </section>

      {content.timeline?.length ? (
        <section className={styles.timeline}>
          <div className="container">
            <header className={sharedStyles.sectionHead}>
              <h2>Nuestra historia</h2>
            </header>
            <ol className={styles.timelineList}>
              {content.timeline.map((t) => (
                <li key={t.year} className={styles.timelineItem}>
                  <span className={styles.timelineYear}>{t.year}</span>
                  <h3>{t.title}</h3>
                  <p>{t.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {content.features?.length ? (
        <FeatureGrid
          heading={content.featuresHeading || "Nuestros compromisos"}
          items={content.features}
        />
      ) : null}

      {content.splits?.map((block) => (
        <section
          key={`${block.title}-${block.align}`}
          className={`${styles.storyBand} ${block.align === "right" ? styles.storyBandRight : ""}`}
        >
          <div className={styles.storyBandMedia}>
            <Image
              src={block.image}
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.storyBandImg}
            />
          </div>
          <div className={styles.storyBandCopy}>
            {block.eyebrow ? <p className={styles.timelineYear}>{block.eyebrow}</p> : null}
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

      {content.cta ? <CtaBand cta={content.cta} /> : null}
    </PageShell>
  );
}

export function NewsLayout({ content }: { content: InteriorContent }) {
  return (
    <PageShell>
      <PhotoHero content={content} />

      {content.cards?.length ? (
        <section className={styles.newsFeatured}>
          <div className="container">
            <header className={sharedStyles.sectionHead}>
              <h2>{content.cardsHeading || "Destacados"}</h2>
            </header>
            <ul className={styles.newsFeaturedGrid}>
              {content.cards.map((card) => (
                <li key={card.title}>
                  <Link href={card.href || content.href} className={styles.newsCard}>
                    {card.image ? (
                      <div className={styles.newsCardMedia}>
                        <Image
                          src={card.image}
                          alt=""
                          fill
                          sizes="33vw"
                          className={styles.newsCardImg}
                        />
                      </div>
                    ) : null}
                    <div className={styles.newsCardBody}>
                      {card.meta ? <p className={styles.meta}>{card.meta}</p> : null}
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

      {content.list?.length ? (
        <section className={styles.newsList}>
          <div className="container">
            <header className={sharedStyles.sectionHead}>
              <h2>{content.listHeading || "Lo más reciente"}</h2>
            </header>
            <ul>
              {content.list.map((item) => (
                <li key={item.title}>
                  {item.href ? (
                    <Link href={item.href}>
                      {item.meta ? <span className={styles.meta}>{item.meta}</span> : null}
                      <strong>{item.title}</strong>
                      <p>{item.body}</p>
                    </Link>
                  ) : (
                    <div>
                      {item.meta ? <span className={styles.meta}>{item.meta}</span> : null}
                      <strong>{item.title}</strong>
                      <p>{item.body}</p>
                    </div>
                  )}
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
            <header className={sharedStyles.sectionHead}>
              <h2>{content.listHeading || "Próximos"}</h2>
            </header>
            <ul className={styles.eventsUl}>
              {content.list.map((item) => {
                const dateBits = (item.meta || "Por confirmar").split("·")[0]?.trim() || "Por confirmar";
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

export function ManagementLayout({ content }: { content: InteriorContent }) {
  return (
    <PageShell>
      <PhotoHero content={content} />

      {content.bios?.length ? (
        <section className={styles.bioGrid}>
          <div className="container">
            <header className={sharedStyles.sectionHead}>
              <h2>Liderazgo</h2>
            </header>
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

      {content.features?.length ? (
        <FeatureGrid
          heading={content.featuresHeading || "Principios de liderazgo"}
          items={content.features}
        />
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
            <header className={sharedStyles.sectionHead}>
              <h2>{content.listHeading || "Documentos"}</h2>
            </header>
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
