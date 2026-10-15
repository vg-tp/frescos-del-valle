import Image from "next/image";
import Link from "next/link";
import type { InteriorContent } from "@/content/interiors";
import { Crumbs, CtaBand, PageShell } from "./shared";
import { sharedStyles } from "./shared";
import styles from "./corporate.module.css";

export function InvestorsLayout({ content }: { content: InteriorContent }) {
  return (
    <PageShell>
      <section className={styles.irHeader}>
        <div className="container">
          <Crumbs content={content} />
          <h1>{content.title}</h1>
          <p>{content.lead}</p>
        </div>
      </section>

      {content.stats?.length ? (
        <section className={styles.irKpis} aria-label="Key figures">
          <div className={`container ${styles.irKpiGrid}`}>
            {content.stats.map((s) => (
              <div key={s.label} className={styles.irKpi}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className={styles.irColumns}>
        <div className={`container ${styles.irGrid}`}>
          <div className={styles.irPanel}>
            <h2>{content.listHeading || "Recent releases"}</h2>
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
            <h2>{content.featuresHeading || "Investor tools"}</h2>
            <ul className={styles.irTools}>
              {(content.features || []).map((f) => (
                <li key={f.title}>
                  <Link href="/investors">
                    {f.title}
                    <p>{f.body}</p>
                  </Link>
                </li>
              ))}
              {(content.cards || []).slice(0, 4).map((c) => (
                <li key={c.title}>
                  <Link href={c.href || "/investors"}>
                    {c.title}
                    <p>{c.body}</p>
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

export function CareersLayout({ content }: { content: InteriorContent }) {
  return (
    <PageShell>
      <section className={styles.careersHero}>
        <Image
          src={content.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.careersHeroImg}
        />
        <div className={styles.careersHeroShade} />
        <div className={`container ${styles.careersHeroInner}`}>
          <Crumbs content={content} />
          <h1>{content.title}</h1>
          <p>{content.lead}</p>
          <form className={styles.searchBar} action="/careers" method="get">
            <input type="search" name="q" placeholder="Search jobs…" aria-label="Search jobs" />
            <button type="submit">Search</button>
          </form>
        </div>
      </section>

      {content.cards?.length ? (
        <section className={styles.paths} aria-label="Career paths">
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
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {content.list?.length ? (
        <section className={styles.openings}>
          <div className="container">
            <header className={sharedStyles.sectionHead}>
              <h2>{content.listHeading || "Open roles"}</h2>
            </header>
            <ul className={styles.openingsUl}>
              {content.list.map((item) => (
                <li key={item.title}>
                  <Link href={item.href || "/careers"}>
                    {item.meta ? <span className={styles.meta}>{item.meta}</span> : null}
                    <strong>{item.title}</strong>
                    <p>{item.body}</p>
                    <span className={styles.apply}>Apply</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {content.features?.length ? (
        <section className={styles.culture}>
          <div className="container">
            <header className={sharedStyles.sectionHead}>
              <h2>{content.featuresHeading || "Our culture"}</h2>
            </header>
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

      {content.cta ? <CtaBand cta={content.cta} /> : null}
    </PageShell>
  );
}

export function SuppliersHubLayout({ content }: { content: InteriorContent }) {
  return (
    <PageShell>
      <section className={styles.supSplit}>
        <div className={styles.supMedia}>
          <Image
            src={content.heroImage}
            alt=""
            fill
            priority
            sizes="50vw"
            className={styles.supImg}
          />
        </div>
        <div className={styles.supCopy}>
          <Crumbs content={content} />
          <h1>{content.title}</h1>
          <p>{content.lead}</p>
        </div>
      </section>

      {(content.list?.length || content.cards?.length) ? (
        <section className={styles.supResources}>
          <div className="container">
            <header className={sharedStyles.sectionHead}>
              <h2>{content.listHeading || content.cardsHeading || "Resources"}</h2>
            </header>
            <ul className={styles.supResUl}>
              {(content.list || content.cards || []).map((item) => {
                const title = "title" in item ? item.title : "";
                const body = "body" in item ? item.body : "";
                const href = "href" in item ? item.href : "/suppliers";
                const meta = "meta" in item ? item.meta : "Partner";
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
        <section className={styles.supPillars}>
          <div className="container">
            <header className={sharedStyles.sectionHead}>
              <h2>{content.featuresHeading || "Partnership"}</h2>
            </header>
            <ul className={styles.supPillarGrid}>
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

export function SuppliersDetailLayout({ content }: { content: InteriorContent }) {
  return <SuppliersHubLayout content={content} />;
}

export function SustainabilityLayout({ content }: { content: InteriorContent }) {
  return (
    <PageShell>
      <section className={styles.sustHero}>
        <Image
          src={content.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.sustHeroImg}
        />
        <div className={styles.sustHeroShade} />
        <div className={`container ${styles.sustHeroInner}`}>
          <Crumbs content={content} />
          <h1>{content.title}</h1>
          <p>{content.lead}</p>
        </div>
      </section>

      {content.stats?.length ? (
        <section className={styles.sustStats} aria-label="Progress">
          <div className={`container ${styles.sustStatsGrid}`}>
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
        <section className={styles.pillars}>
          <div className="container">
            <header className={sharedStyles.sectionHead}>
              <h2>{content.cardsHeading || "Our pillars"}</h2>
            </header>
            <ul className={styles.pillarGrid}>
              {content.cards.map((card) => (
                <li key={`${card.title}-${card.href}`}>
                  <Link href={card.href || "/sustainability"} className={styles.pillarCard}>
                    {card.image ? (
                      <div className={styles.pillarMedia}>
                        <Image
                          src={card.image}
                          alt=""
                          fill
                          sizes="33vw"
                          className={styles.pillarImg}
                        />
                      </div>
                    ) : null}
                    <div className={styles.pillarBody}>
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

export function SustainabilityPillarLayout({
  content,
}: {
  content: InteriorContent;
}) {
  return (
    <PageShell>
      <section className={styles.pillarTitle}>
        <div className="container">
          <Crumbs content={content} tone="light" />
          <h1>{content.title}</h1>
          <p>{content.lead}</p>
        </div>
      </section>

      <section className={styles.pillarContent}>
        <div className="container">
          <div className={styles.pillarProse}>
            {content.intro.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          {content.features?.length ? (
            <>
              <header className={sharedStyles.sectionHead} style={{ marginTop: 36 }}>
                <h2>{content.featuresHeading || "Focus areas"}</h2>
              </header>
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
        <section key={`${block.title}-${block.align}`} className={styles.supSplit}>
          <div className={styles.supMedia}>
            <Image
              src={block.image}
              alt=""
              fill
              sizes="50vw"
              className={styles.supImg}
            />
          </div>
          <div className={styles.supCopy} style={{ background: "#1b4332" }}>
            <h1 style={{ fontSize: "1.8rem" }}>{block.title}</h1>
            <p>{block.body}</p>
            {block.cta ? (
              <Link
                href={block.cta.href}
                className="btn btn-green"
                style={{ marginTop: 20, alignSelf: "flex-start" }}
              >
                {block.cta.label}
              </Link>
            ) : null}
          </div>
        </section>
      ))}

      {content.cards?.length ? (
        <section className={styles.pillars}>
          <div className="container">
            <header className={sharedStyles.sectionHead}>
              <h2>{content.cardsHeading || "More"}</h2>
            </header>
            <ul className={styles.pillarGrid}>
              {content.cards.map((card) => (
                <li key={`${card.title}-${card.href}`}>
                  <Link href={card.href || "/sustainability"} className={styles.pillarCard}>
                    {card.image ? (
                      <div className={styles.pillarMedia}>
                        <Image
                          src={card.image}
                          alt=""
                          fill
                          sizes="33vw"
                          className={styles.pillarImg}
                        />
                      </div>
                    ) : null}
                    <div className={styles.pillarBody}>
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
