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
import { sharedStyles } from "./shared";
import styles from "./corporate.module.css";

/**
 * Sysco IR (investors.sysco.com pattern adapted under site chrome):
 * photo hero → centered intro → tool card grid → news/filings columns
 */
export function InvestorsLayout({ content }: { content: InteriorContent }) {
  const toolCards =
    content.cards?.length
      ? content.cards
      : (content.features || []).map((f, i) => ({
          title: f.title,
          body: f.body,
          href: "/investors",
          image: ["/cta.jpg", "/section-cold.jpg", "/hero.jpg", "/section-produce.jpg"][i % 4],
        }));

  return (
    <PageShell>
      <PhotoHero content={content} tall />

      <section className={styles.irIntro}>
        <div className="container">
          <h2>Líder global en distribución de foodservice</h2>
          <p>{content.lead}</p>
        </div>
      </section>

      {toolCards.length ? (
        <section className={styles.irToolsGrid}>
          <div className="container">
            <ul className={styles.irToolUl}>
              {toolCards.map((c) => (
                <li key={c.title}>
                  <Link href={c.href || "/investors"} className={styles.irToolCard}>
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className={styles.irColumns}>
        <div className={`container ${styles.irGrid}`}>
          <div className={styles.irPanel}>
            <h2>{content.listHeading || "Comunicados recientes"}</h2>
            <ul className={styles.irTable}>
              {(content.list || []).map((item) => (
                <li key={item.title}>
                  <Link href={item.href || content.href}>
                    {item.meta ? <span className={styles.meta}>{item.meta}</span> : null}
                    <strong>{item.title}</strong>
                    <p>{item.body}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.irPanel}>
            <h2>{content.featuresHeading || "Gobierno y contactos"}</h2>
            <ul className={styles.irTools}>
              {(content.features || []).map((f) => (
                <li key={f.title}>
                  <Link href="/investors">
                    {f.title}
                    <p>{f.body}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {content.cta ? <CtaBand cta={content.cta} /> : null}
    </PageShell>
  );
}

/**
 * Sysco Careers:
 * PhotoHero (shared Products/About title type) + green search bridge →
 * featured path tiles → culture quotes → openings → talent community CTA
 */
export function CareersLayout({ content }: { content: InteriorContent }) {
  return (
    <PageShell>
      {/* Same PhotoHero title scale as Products / About — no custom display face */}
      <PhotoHero content={content} tall showCrumbs={false} />

      <section className={styles.jobSearchBridge} aria-label="Buscar empleos">
        <form className={`container ${styles.jobSearchForm}`} action="/careers" method="get">
          <label>
            <span>Buscar por palabra clave</span>
            <input type="search" name="q" placeholder="p. ej. puesto, categoría o habilidades" />
          </label>
          <label>
            <span>Ubicación</span>
            <input type="text" name="loc" placeholder="Ciudad, estado o país" />
          </label>
          <label>
            <span>Radio</span>
            <select name="radius" defaultValue="50">
              <option value="25">25 km</option>
              <option value="50">50 km</option>
              <option value="100">100 km</option>
            </select>
          </label>
          <button type="submit">Buscar empleos</button>
        </form>
      </section>

      {content.cards?.length ? (
        <section className={styles.paths} aria-label="Carreras destacadas">
          <div className="container" style={{ paddingTop: 48 }}>
            <CenteredHead title={content.cardsHeading || "Carreras destacadas"} />
          </div>
          <ul className={styles.pathsUl}>
            {content.cards.map((card) => (
              <li key={card.title}>
                <Link href={card.href || "/careers"} className={styles.pathTile}>
                  {card.image ? (
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      sizes="50vw"
                      className={styles.pathImg}
                    />
                  ) : null}
                  <div className={styles.pathShade} />
                  <div className={styles.pathBody}>
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                    <span className={styles.pathCta}>Ver vacantes</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {content.features?.length ? (
        <section className={styles.culture}>
          <div className="container">
            <CenteredHead title={content.featuresHeading || "Nuestra cultura"} />
            <ul className={styles.cultureGrid}>
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

      {content.list?.length ? (
        <section className={styles.openings}>
          <div className="container">
            <CenteredHead title={content.listHeading || "Vacantes destacadas"} />
            <ul className={styles.openingsUl}>
              {content.list.map((item) => (
                <li key={item.title}>
                  <Link href={item.href || "/careers"}>
                    {item.meta ? <span className={styles.meta}>{item.meta}</span> : null}
                    <strong>{item.title}</strong>
                    <p>{item.body}</p>
                    <span className={styles.apply}>Postularse</span>
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

/** Supplier Resources — standard photo hero + resource list (Sysco pattern). */
export function SuppliersHubLayout({ content }: { content: InteriorContent }) {
  return (
    <PageShell>
      <PhotoHero content={content} tall />

      {(content.list?.length || content.cards?.length) ? (
        <section className={styles.supResources}>
          <div className="container">
            <CenteredHead
              title={content.listHeading || content.cardsHeading || "Recursos"}
            />
            <ul className={styles.supResUl}>
              {(content.list || content.cards || []).map((item) => {
                const title = "title" in item ? item.title : "";
                const body = "body" in item ? item.body : "";
                const href = "href" in item ? item.href : "/suppliers";
                const meta = "meta" in item ? item.meta : "Socio";
                return (
                  <li key={title}>
                    <Link href={href || "/suppliers"}>
                      {meta ? <span className={styles.meta}>{meta}</span> : null}
                      <strong>{title}</strong>
                      <p>{body}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ) : null}

      {content.features?.length ? (
        <CardGrid
          heading={content.featuresHeading || "Alianza"}
          cards={content.features.map((f, i) => ({
            title: f.title,
            body: f.body,
            href: "/suppliers",
            image: ["/section-cold.jpg", "/section-produce.jpg", "/cta.jpg"][i % 3],
          }))}
          columns={3}
        />
      ) : null}

      {content.cta ? <CtaBand cta={content.cta} /> : null}
    </PageShell>
  );
}

export function SuppliersDetailLayout({ content }: { content: InteriorContent }) {
  return <SuppliersHubLayout content={content} />;
}

/**
 * Sysco Sustainability / Our Approach:
 * tall photo hero → report split → progress highlights → 2030 goals cards
 */
export function SustainabilityLayout({ content }: { content: InteriorContent }) {
  const report = content.splits?.[0];
  return (
    <PageShell>
      <PhotoHero
        content={{
          ...content,
          title:
            content.title === "Sustentabilidad"
              ? "Juntos, podemos asegurar el futuro de la comida"
              : content.title,
        }}
        tall
      />

      {report ? (
        <section className={styles.sustReport}>
          <div className={`container ${styles.sustReportGrid}`}>
            <div className={styles.sustReportCopy}>
              <h2>{content.cardsHeading || "Informe de sustentabilidad"}</h2>
              <div className={styles.sustRule} aria-hidden />
              <p className={styles.sustReportLead}>{report.title}</p>
              <p>{report.body}</p>
            </div>
            <Link href={report.cta?.href || "/sustainability"} className={styles.sustReportCard}>
              <Image
                src={report.image}
                alt=""
                fill
                sizes="50vw"
                className={styles.sustReportImg}
              />
              <div className={styles.sustReportShade} />
              <div className={styles.sustReportCardBody}>
                <h3>{report.cta?.label || "Asegurar el futuro de la comida"}</h3>
                <p>Construyendo juntos un sistema alimentario más resiliente</p>
              </div>
            </Link>
          </div>
        </section>
      ) : null}

      {content.stats?.length ? (
        <section className={styles.sustStats} aria-label="Avances">
          <div className="container">
            <CenteredHead title="Avances en sustentabilidad" />
            <div className={styles.sustStatsGrid}>
              {content.stats.map((s) => (
                <div key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {content.cards?.length ? (
        <CardGrid
          heading="Metas 2030"
          cards={content.cards}
          columns={3}
        />
      ) : null}

      {content.cta ? <CtaBand cta={content.cta} /> : null}
    </PageShell>
  );
}

export function SustainabilityPillarLayout({
  content,
}: {
  content: InteriorContent;
}) {
  return (
    <PageShell>
      <PhotoHero content={content} tall />

      <section className={styles.pillarContent}>
        <div className="container">
          <div className={styles.pillarProse}>
            {content.intro.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          {content.features?.length ? (
            <>
              <CenteredHead title={content.featuresHeading || "Áreas de enfoque"} />
              <ul className={styles.focusGrid}>
                {content.features.map((f) => (
                  <li key={f.title}>
                    <h3>{f.title}</h3>
                    <p>{f.body}</p>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </section>

      {content.splits?.map((block) => (
        <FeatureCallout key={`${block.title}-${block.align}`} block={block} />
      ))}

      {content.cards?.length ? (
        <CardGrid
          heading={content.cardsHeading || "Más"}
          cards={content.cards}
          columns={3}
        />
      ) : null}

      {content.cta ? <CtaBand cta={content.cta} /> : null}
    </PageShell>
  );
}

void sharedStyles;
