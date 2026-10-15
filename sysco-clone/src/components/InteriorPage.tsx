import Image from "next/image";
import Link from "next/link";
import type { InteriorContent } from "@/content/interiors";
import styles from "./InteriorPage.module.css";

export default function InteriorPage({ content }: { content: InteriorContent }) {
  return (
    <main className={styles.main}>
      <Hero content={content} />
      <Intro content={content} />
      {content.stats?.length ? <Stats items={content.stats} /> : null}
      {content.form ? <FormPanel content={content} /> : null}
      {content.list?.length ? (
        <ListSection
          heading={content.listHeading || "Updates"}
          items={content.list}
        />
      ) : null}
      {content.cards?.length ? (
        <CardGrid
          heading={content.cardsHeading || "Explore"}
          items={content.cards}
        />
      ) : null}
      {content.features?.length ? (
        <Features
          heading={content.featuresHeading || "Highlights"}
          items={content.features}
        />
      ) : null}
      {content.splits?.map((block) => (
        <Split key={`${block.title}-${block.align}`} block={block} />
      ))}
      {content.cta ? <CtaBand cta={content.cta} /> : null}
      {content.related && content.related.length > 0 && !content.cards?.length ? (
        <RelatedNav
          items={content.related}
          parentLabel={content.parentLabel}
        />
      ) : null}
    </main>
  );
}

function Hero({ content }: { content: InteriorContent }) {
  return (
    <section className={styles.hero}>
      <Image
        src={content.heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.heroImg}
      />
      <div className={styles.heroShade} />
      <div className={`container ${styles.heroInner}`}>
        {content.parentLabel && content.parentHref ? (
          <p className={styles.crumb}>
            <Link href="/">Home</Link>
            <span aria-hidden> / </span>
            <Link href={content.parentHref}>{content.parentLabel}</Link>
            {content.sectionLabel && content.sectionLabel !== content.parentLabel ? (
              <>
                <span aria-hidden> / </span>
                <span>{content.sectionLabel}</span>
              </>
            ) : null}
          </p>
        ) : (
          <p className={styles.crumb}>
            <Link href="/">Home</Link>
          </p>
        )}
        <h1>{content.title}</h1>
        <p className={styles.lead}>{content.lead}</p>
      </div>
    </section>
  );
}

function Intro({ content }: { content: InteriorContent }) {
  if (!content.intro?.length) return null;
  return (
    <section className={styles.intro}>
      <div className={`container ${styles.introInner}`}>
        <div className={styles.introCopy}>
          {content.intro.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
        {content.related && content.related.length > 0 ? (
          <aside className={styles.aside}>
            <h2>In this section</h2>
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
  );
}

function Stats({ items }: { items: NonNullable<InteriorContent["stats"]> }) {
  return (
    <section className={styles.stats} aria-label="Highlights">
      <div className={`container ${styles.statsGrid}`}>
        {items.map((s) => (
          <div key={s.label} className={styles.stat}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CardGrid({
  heading,
  items,
}: {
  heading: string;
  items: NonNullable<InteriorContent["cards"]>;
}) {
  return (
    <section className={styles.cards}>
      <div className="container">
        <header className={styles.sectionHead}>
          <h2>{heading}</h2>
        </header>
        <ul className={styles.cardGrid}>
          {items.map((card) => {
            const inner = (
              <>
                {card.image ? (
                  <div className={styles.cardMedia}>
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      sizes="(max-width: 700px) 100vw, 33vw"
                      className={styles.cardImg}
                    />
                  </div>
                ) : null}
                <div className={styles.cardBody}>
                  {card.meta ? <p className={styles.meta}>{card.meta}</p> : null}
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                  {card.href ? <span className={styles.cardCta}>Learn more</span> : null}
                </div>
              </>
            );
            return (
              <li key={`${card.title}-${card.href || card.meta || ""}`}>
                {card.href ? (
                  <Link href={card.href} className={styles.card}>
                    {inner}
                  </Link>
                ) : (
                  <div className={styles.card}>{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Features({
  heading,
  items,
}: {
  heading: string;
  items: NonNullable<InteriorContent["features"]>;
}) {
  return (
    <section className={styles.features}>
      <div className="container">
        <header className={styles.sectionHead}>
          <h2>{heading}</h2>
        </header>
        <ul className={styles.featureGrid}>
          {items.map((f) => (
            <li key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Split({ block }: { block: NonNullable<InteriorContent["splits"]>[number] }) {
  return (
    <section
      className={`${styles.split} ${block.align === "right" ? styles.splitRight : ""}`}
    >
      <div className={styles.splitMedia}>
        <Image src={block.image} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" className={styles.splitImg} />
      </div>
      <div className={styles.splitCopy}>
        {block.eyebrow ? <p className={styles.eyebrow}>{block.eyebrow}</p> : null}
        <h2>{block.title}</h2>
        <p>{block.body}</p>
        {block.cta ? (
          <Link href={block.cta.href} className="btn btn-green">
            {block.cta.label}
          </Link>
        ) : null}
      </div>
    </section>
  );
}

function ListSection({
  heading,
  items,
}: {
  heading: string;
  items: NonNullable<InteriorContent["list"]>;
}) {
  return (
    <section className={styles.listSection}>
      <div className="container">
        <header className={styles.sectionHead}>
          <h2>{heading}</h2>
        </header>
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.title}>
              {item.href ? (
                <Link href={item.href} className={styles.listItem}>
                  {item.meta ? <span className={styles.meta}>{item.meta}</span> : null}
                  <strong>{item.title}</strong>
                  <p>{item.body}</p>
                </Link>
              ) : (
                <div className={styles.listItem}>
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
  );
}

function FormPanel({ content }: { content: InteriorContent }) {
  const form = content.form!;
  return (
    <section className={styles.formSection}>
      <div className={`container ${styles.formLayout}`}>
        <div className={styles.formCopy}>
          <h2>{form.heading}</h2>
          <p>{content.lead}</p>
          {content.intro.slice(0, 1).map((p) => (
            <p key={p.slice(0, 28)}>{p}</p>
          ))}
        </div>
        <form className={styles.form} action={content.href} method="get">
          {form.fields.map((field) => (
            <label key={field.name} className={styles.field}>
              <span>{field.label}</span>
              {field.type === "textarea" ? (
                <textarea name={field.name} rows={5} placeholder="Lorem ipsum…" />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.type === "search" ? "Search…" : "Lorem ipsum"}
                />
              )}
            </label>
          ))}
          <button type="submit" className="btn btn-green">
            {form.submit}
          </button>
        </form>
      </div>
    </section>
  );
}

function CtaBand({ cta }: { cta: NonNullable<InteriorContent["cta"]> }) {
  return (
    <section className={styles.ctaBand}>
      <div className={`container ${styles.ctaInner}`}>
        <h2>{cta.title}</h2>
        <p>{cta.body}</p>
        <div className={styles.ctaActions}>
          <Link href={cta.primary.href} className="btn btn-green">
            {cta.primary.label}
          </Link>
          {cta.secondary ? (
            <Link href={cta.secondary.href} className="btn btn-outline-white">
              {cta.secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function RelatedNav({
  items,
  parentLabel,
}: {
  items: NonNullable<InteriorContent["related"]>;
  parentLabel?: string;
}) {
  return (
    <section className={styles.related}>
      <div className="container">
        <h2>{parentLabel ? `More in ${parentLabel}` : "Related"}</h2>
        <ul>
          {items.map((r) => (
            <li key={r.href}>
              <Link href={r.href}>{r.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
