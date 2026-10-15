import Image from "next/image";
import Link from "next/link";
import type { InteriorContent } from "@/content/interiors";
import {
  CardGrid,
  CenteredHead,
  CtaBand,
  FeatureCallout,
  FeatureGrid,
  FormFields,
  PageShell,
  PhotoHero,
} from "./shared";
import { sharedStyles } from "./shared";
import styles from "./contact.module.css";

/**
 * Sysco Contact hub / Contact Us:
 * tall photo hero → centered recommendation → 3 pathway cards
 */
export function ContactHubLayout({ content }: { content: InteriorContent }) {
  return (
    <PageShell>
      <PhotoHero content={content} tall />

      <section className={styles.pathways}>
        <div className="container">
          <CenteredHead
            title={
              content.cardsHeading ||
              "Te recomendamos contactar a tu compañía operativa local para la resolución más rápida"
            }
          />
          {content.cards?.length ? (
            <ul className={styles.pathwayGrid}>
              {content.cards.map((card) => (
                <li key={`${card.title}-${card.href}`}>
                  <Link href={card.href || "/contact"} className={styles.pathway}>
                    {card.image ? (
                      <div className={styles.pathwayMedia}>
                        <Image
                          src={card.image}
                          alt=""
                          fill
                          sizes="33vw"
                          className={styles.pathwayImg}
                        />
                      </div>
                    ) : null}
                    <div className={styles.pathwayBody}>
                      <h3>{card.title}</h3>
                      <p>{card.body}</p>
                      <span className={styles.pathwayCta}>Ir</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      {content.features?.length ? (
        <FeatureGrid
          heading={content.featuresHeading || "Canales de soporte"}
          items={content.features}
        />
      ) : null}

      {content.cta ? <CtaBand cta={content.cta} /> : null}
    </PageShell>
  );
}

export function ContactFormLayout({ content }: { content: InteriorContent }) {
  if (!content.form) return null;
  return (
    <PageShell>
      <PhotoHero content={content} tall />

      <section className={styles.formPage}>
        <div className={`container ${styles.formLayout}`}>
          <div className={styles.formCopy}>
            <h2>{content.form.heading}</h2>
            <p>{content.lead}</p>
            {content.intro.slice(0, 1).map((p) => (
              <p key={p.slice(0, 28)}>{p}</p>
            ))}
            {content.features?.length ? (
              <ul className={styles.helpList}>
                {content.features.map((f) => (
                  <li key={f.title}>
                    <h3>{f.title}</h3>
                    <p>{f.body}</p>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className={styles.formBox}>
            <FormFields form={content.form} action={content.href} />
          </div>
        </div>
      </section>

      {content.cards?.length ? (
        <CardGrid cards={content.cards} columns={3} />
      ) : null}

      {content.cta ? <CtaBand cta={content.cta} /> : null}
    </PageShell>
  );
}

/** Sysco Our Locations: photo hero → map + search filters → location cards */
export function LocationsLayout({ content }: { content: InteriorContent }) {
  return (
    <PageShell>
      <PhotoHero content={content} tall />

      <section className={styles.locSearch} aria-label="Buscar ubicaciones">
        <div className={`container ${styles.locSearchRow}`}>
          <label>
            <span>Ciudad o código postal</span>
            <input type="search" name="q" placeholder="Buscar…" />
          </label>
          <label>
            <span>Estado</span>
            <select defaultValue="">
              <option value="" disabled>
                Seleccionar
              </option>
              <option>CDMX</option>
              <option>Jalisco</option>
              <option>Nuevo León</option>
            </select>
          </label>
          <label>
            <span>Tipo</span>
            <select defaultValue="all">
              <option value="all">Todas</option>
              <option>Distribución</option>
              <option>Oficina</option>
            </select>
          </label>
          <button type="button" className="btn btn-green">
            Buscar
          </button>
        </div>
      </section>

      <div className={styles.mapBand} aria-hidden>
        Mapa · Ubicaciones
      </div>

      {content.cards?.length ? (
        <section className={styles.locGrid}>
          <div className="container">
            <CenteredHead title={content.cardsHeading || "Ubicaciones"} />
            <ul className={styles.locUl}>
              {content.cards.map((card) => (
                <li key={card.title}>
                  <Link href={card.href || "/contact/contact-us"} className={styles.locCard}>
                    <div className={styles.locThumb}>
                      {card.image ? (
                        <Image
                          src={card.image}
                          alt=""
                          fill
                          sizes="88px"
                          className={styles.locImg}
                        />
                      ) : null}
                    </div>
                    <div>
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

      {content.cta ? <CtaBand cta={content.cta} /> : null}
    </PageShell>
  );
}

export function UtilityFormLayout({ content }: { content: InteriorContent }) {
  if (!content.form) return null;
  const split = content.splits?.[0];
  return (
    <PageShell>
      <PhotoHero content={content} compact />

      <section className={styles.utilPage}>
        <div className={`container ${styles.utilLayout}`}>
          <div className={styles.utilIntro}>
            {content.intro.slice(0, 2).map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
          <div className={styles.utilCard}>
            <h2 className={styles.utilCardTitle}>{content.form.heading}</h2>
            <div className={styles.utilForm}>
              <FormFields form={content.form} action={content.href} />
            </div>
          </div>
        </div>
      </section>

      {content.features?.length ? (
        <FeatureGrid
          heading={content.featuresHeading || "Qué esperar"}
          items={content.features}
        />
      ) : null}

      {split ? <FeatureCallout block={split} /> : null}

      {content.cta ? <CtaBand cta={content.cta} /> : null}
    </PageShell>
  );
}

export function SearchLayout({ content }: { content: InteriorContent }) {
  const field = content.form?.fields[0];
  return (
    <PageShell padded>
      <section className={styles.searchPage}>
        <div className="container">
          <div className={styles.searchHead}>
            <h1>{content.title}</h1>
            <p>{content.lead}</p>
            <form className={styles.searchForm} action="/search" method="get">
              <input
                type="search"
                name={field?.name || "q"}
                placeholder="Buscar…"
                aria-label="Buscar"
              />
              <button type="submit">{content.form?.submit || "BUSCAR"}</button>
            </form>
          </div>

          {content.list?.length ? (
            <div className={styles.results}>
              <h2>{content.listHeading || "Resultados sugeridos"}</h2>
              <ul className={styles.resultsUl}>
                {content.list.map((item) => (
                  <li key={item.title}>
                    <Link href={item.href || "/"}>
                      <strong>{item.title}</strong>
                      <p>{item.body}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      {content.features?.length ? (
        <FeatureGrid
          heading={content.featuresHeading || "Explora también"}
          items={content.features}
        />
      ) : null}

      {content.cta ? <CtaBand cta={content.cta} /> : null}
    </PageShell>
  );
}

export function DefaultLayout({ content }: { content: InteriorContent }) {
  return (
    <PageShell>
      <PhotoHero content={content} tall />
      <section className={styles.defaultBody}>
        <div className="container">
          <div className={styles.defaultProse}>
            {content.intro.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          {content.features?.length ? (
            <ul className={styles.defaultFeatures}>
              {content.features.map((f) => (
                <li key={f.title}>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>
      {content.cta ? <CtaBand cta={content.cta} /> : null}
    </PageShell>
  );
}

void sharedStyles;
