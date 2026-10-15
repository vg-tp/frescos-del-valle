import Image from "next/image";
import Link from "next/link";
import type { InteriorContent } from "@/content/interiors";
import {
  Crumbs,
  CtaBand,
  FeatureGrid,
  FormFields,
  PageShell,
  PhotoHero,
} from "./shared";
import { sharedStyles } from "./shared";
import styles from "./contact.module.css";

export function ContactHubLayout({ content }: { content: InteriorContent }) {
  return (
    <PageShell>
      <section className={styles.contactHub}>
        <div className="container">
          <Crumbs content={content} tone="light" />
          <h1>{content.title}</h1>
          <p>{content.lead}</p>
        </div>
      </section>

      {content.cards?.length ? (
        <section className={styles.pathways}>
          <div className="container">
            <header className={sharedStyles.sectionHead}>
              <h2>{content.cardsHeading || "¿Cómo podemos ayudarte?"}</h2>
            </header>
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
          </div>
        </section>
      ) : null}

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
      <section className={styles.formPage}>
        <div className={`container ${styles.formLayout}`}>
          <div className={styles.formCopy}>
            <Crumbs content={content} tone="light" />
            <h1>{content.title}</h1>
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
        <section className={styles.pathways}>
          <div className="container">
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
          </div>
        </section>
      ) : null}

      {content.cta ? <CtaBand cta={content.cta} /> : null}
    </PageShell>
  );
}

export function LocationsLayout({ content }: { content: InteriorContent }) {
  return (
    <PageShell>
      <section className={styles.locHero}>
        <div className="container">
          <Crumbs content={content} tone="light" />
          <h1>{content.title}</h1>
          <p>{content.lead}</p>
        </div>
      </section>

      <div className={styles.mapBand} aria-hidden>
        Mapa · Ubicaciones
      </div>

      {content.cards?.length ? (
        <section className={styles.locGrid}>
          <div className="container">
            <header className={sharedStyles.sectionHead}>
              <h2>{content.cardsHeading || "Ubicaciones"}</h2>
            </header>
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

      {split ? (
        <section className={styles.utilSplit}>
          <div className={styles.utilSplitMedia}>
            <Image
              src={split.image}
              alt=""
              fill
              sizes="50vw"
              className={styles.utilSplitImg}
            />
          </div>
          <div className={styles.utilSplitCopy}>
            {split.eyebrow ? <p className={styles.meta}>{split.eyebrow}</p> : null}
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

      {content.cta ? <CtaBand cta={content.cta} /> : null}
    </PageShell>
  );
}

export function SearchLayout({ content }: { content: InteriorContent }) {
  const field = content.form?.fields[0];
  return (
    <PageShell>
      <section className={styles.searchPage}>
        <div className="container">
          <div className={styles.searchHead}>
            <Crumbs content={content} tone="light" />
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
      <section className={styles.defaultHero}>
        <div className="container">
          <Crumbs content={content} />
          <h1>{content.title}</h1>
          <p>{content.lead}</p>
        </div>
      </section>
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
