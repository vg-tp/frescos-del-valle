import Image from "next/image";
import Link from "next/link";
import type { InteriorContent } from "@/content/interiors";
import { Crumbs, CtaBand, FormFields, PageShell } from "./shared";
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
                      <span className={styles.pathwayCta}>Go</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
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
                      <span className={styles.pathwayCta}>Go</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
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
  return (
    <PageShell>
      <section className={styles.utilPage}>
        <div className="container">
          <div className={styles.utilCard}>
            <h1>{content.title}</h1>
            <p>{content.lead}</p>
            <div className={styles.utilForm}>
              <FormFields form={content.form} action={content.href} />
            </div>
            {content.features?.length ? (
              <div className={styles.utilExtras}>
                <h2>{content.featuresHeading || "Qué esperar"}</h2>
                <ul>
                  {content.features.map((f) => (
                    <li key={f.title}>
                      <strong>{f.title}</strong>
                      {f.body}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </section>
      {content.splits?.[0] && content.form.kind === "become" ? (
        <section
          style={{
            display: "grid",
            minHeight: 320,
            background: "#0b3d66",
            color: "#fff",
          }}
        >
          <div className="container" style={{ padding: "48px 24px" }}>
            <h2 style={{ marginTop: 0 }}>{content.splits[0].title}</h2>
            <p style={{ maxWidth: "48ch", lineHeight: 1.55, opacity: 0.92 }}>
              {content.splits[0].body}
            </p>
          </div>
        </section>
      ) : null}
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
