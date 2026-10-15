import Image from "next/image";
import Link from "next/link";
import type {
  InteriorContent,
  CardItem,
  LogoCallout,
  SplitBlock,
} from "@/content/interiors";
import styles from "./shared.module.css";

export function PageShell({
  children,
  className,
  padded = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** Use for cream/utility pages without a bleeding PhotoHero */
  padded?: boolean;
}) {
  return (
    <main
      className={`${styles.main}${padded ? ` ${styles.mainPadded}` : ""}${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </main>
  );
}

export function Crumbs({
  content,
  tone = "dark",
}: {
  content: InteriorContent;
  tone?: "dark" | "light";
}) {
  const toneClass = tone === "dark" ? styles.crumbOnDark : styles.crumbOnLight;
  if (content.parentLabel && content.parentHref) {
    return (
      <p className={`${styles.crumb} ${toneClass}`}>
        <Link href="/">Inicio</Link>
        <span aria-hidden> / </span>
        <Link href={content.parentHref}>{content.parentLabel}</Link>
        {content.sectionLabel && content.sectionLabel !== content.parentLabel ? (
          <>
            <span aria-hidden> / </span>
            <span>{content.sectionLabel}</span>
          </>
        ) : null}
      </p>
    );
  }
  return (
    <p className={`${styles.crumb} ${toneClass}`}>
      <Link href="/">Inicio</Link>
    </p>
  );
}

/**
 * Sysco `standard-page-hero`: tall full-bleed photo, dark overlay,
 * left-aligned title + lead (crumbs kept subtle).
 */
export function PhotoHero({
  content,
  compact = false,
  tall = false,
  showCrumbs = true,
}: {
  content: InteriorContent;
  compact?: boolean;
  /** ~70vh Sysco marketing interior */
  tall?: boolean;
  showCrumbs?: boolean;
}) {
  const heroSrc = content.heroImage || "/hero.jpg";
  const title = content.title?.trim() || "Sysco";
  const lead =
    content.lead?.trim() ||
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  const sizeClass = compact
    ? styles.photoHeroCompact
    : tall
      ? styles.photoHeroTall
      : "";
  return (
    <section
      className={`${styles.photoHero}${sizeClass ? ` ${sizeClass}` : ""}`}
      aria-label="Encabezado de página"
    >
      <Image
        src={heroSrc}
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.photoHeroImg}
      />
      <div className={styles.photoHeroShade} />
      <div className={`container ${styles.photoHeroInner}`}>
        {showCrumbs ? <Crumbs content={content} /> : null}
        <h1>{title}</h1>
        <p className={styles.photoHeroLead}>{lead}</p>
      </div>
    </section>
  );
}

/** Centered section title — Sysco pattern under white content bands. */
export function CenteredHead({
  title,
  lead,
}: {
  title: string;
  lead?: string;
}) {
  return (
    <header className={styles.centeredHead}>
      <h2>{title}</h2>
      {lead ? <p>{lead}</p> : null}
    </header>
  );
}

export function FeatureGrid({
  heading,
  items,
  centered = true,
}: {
  heading: string;
  items: NonNullable<InteriorContent["features"]>;
  centered?: boolean;
}) {
  return (
    <section className={styles.featureSection}>
      <div className="container">
        {centered ? (
          <CenteredHead title={heading} />
        ) : (
          <header className={styles.sectionHead}>
            <h2>{heading}</h2>
          </header>
        )}
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

/** Sysco image-tile mosaic (product categories / brand family). */
export function ImageTileGrid({
  heading,
  cards,
  columns = 3,
}: {
  heading: string;
  cards: CardItem[];
  /** Live Sysco Products uses 3-col tiles */
  columns?: 3 | 4;
}) {
  const colClass = columns === 4 ? styles.tileGrid4 : styles.tileGrid3;
  return (
    <section className={styles.tileSection}>
      <div className="container">
        <CenteredHead title={heading} />
        <ul className={`${styles.tileGrid} ${colClass}`}>
          {cards.map((card) => (
            <li key={`${card.title}-${card.href}`}>
              <Link href={card.href || "#"} className={styles.imageTile}>
                {card.image ? (
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    sizes="(max-width: 700px) 50vw, 33vw"
                    className={styles.imageTileImg}
                  />
                ) : null}
                <div className={styles.imageTileShade} />
                <span className={styles.imageTileLabel}>{card.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Sysco card-grid with optional media (partnership / specialty / careers). */
export function CardGrid({
  heading,
  cards,
  columns = 3,
  tone = "white",
}: {
  heading?: string;
  cards: CardItem[];
  columns?: 2 | 3 | 4;
  tone?: "white" | "band";
}) {
  const colClass =
    columns === 2
      ? styles.cardGrid2
      : columns === 4
        ? styles.cardGrid4
        : styles.cardGrid3;
  return (
    <section
      className={`${styles.cardSection}${
        tone === "band" ? ` ${styles.cardSectionBand}` : ""
      }`}
    >
      <div className="container">
        {heading ? <CenteredHead title={heading} /> : null}
        <ul className={`${styles.cardGrid} ${colClass}`}>
          {cards.map((card) => (
            <li key={`${card.title}-${card.href}`}>
              <Link href={card.href || "#"} className={styles.mediaCard}>
                {card.image ? (
                  <div className={styles.mediaCardMedia}>
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      sizes="33vw"
                      className={styles.mediaCardImg}
                    />
                  </div>
                ) : null}
                <div className={styles.mediaCardBody}>
                  {card.meta ? (
                    <p className={styles.mediaCardMeta}>{card.meta}</p>
                  ) : null}
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Full-bleed feature callout (image + copy), Sysco alternating bands. */
export function FeatureCallout({
  block,
  band = "white",
}: {
  block: SplitBlock;
  band?: "white" | "gray";
}) {
  return (
    <section
      className={`${styles.featureCallout} ${
        block.align === "right" ? styles.featureCalloutRight : ""
      } ${band === "gray" ? styles.featureCalloutGray : ""}`}
    >
      <div className={styles.featureCalloutMedia}>
        <Image
          src={block.image}
          alt=""
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          className={styles.featureCalloutImg}
        />
      </div>
      <div className={styles.featureCalloutCopy}>
        {block.eyebrow ? (
          <p className={styles.featureCalloutEyebrow}>{block.eyebrow}</p>
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
  );
}

/** Sysco `.blue-logo-callout` — solid #008CD2 Foodie band. */
export function BlueLogoCallout({ callout }: { callout: LogoCallout }) {
  return (
    <section className={styles.blueLogoCallout} aria-label={callout.title}>
      <div className={`container ${styles.blueLogoInner}`}>
        <div className={styles.blueLogoMark} aria-hidden>
          <span>{callout.brand || "FOODIE"}</span>
        </div>
        <div className={styles.blueLogoCopy}>
          <h2>{callout.title}</h2>
          <p>{callout.body}</p>
          <Link href={callout.cta.href} className="btn btn-white-border">
            {callout.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Customer quote band (Sysco Story “Hear What Customers Are Saying”). */
export function QuoteBand({
  heading,
  quotes,
}: {
  heading: string;
  quotes: { quote: string; author: string; role?: string }[];
}) {
  const q = quotes[0];
  if (!q) return null;
  return (
    <section className={styles.quoteBand}>
      <div className="container">
        <CenteredHead title={heading} />
        <blockquote className={styles.quoteBlock}>
          <p className={styles.quoteText}>“{q.quote}”</p>
          <footer>
            <strong>{q.author}</strong>
            {q.role ? <span>{q.role}</span> : null}
          </footer>
        </blockquote>
        {quotes.length > 1 ? (
          <div className={styles.quoteDots} aria-hidden>
            {quotes.map((_, i) => (
              <span key={i} className={i === 0 ? styles.quoteDotActive : undefined} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function CtaBand({ cta }: { cta: NonNullable<InteriorContent["cta"]> }) {
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

export function FormFields({
  form,
  action,
}: {
  form: NonNullable<InteriorContent["form"]>;
  action: string;
}) {
  return (
    <form action={action} method="get" className={styles.formStack}>
      {form.fields.map((field) => (
        <label key={field.name} className={styles.field}>
          <span>{field.label}</span>
          {field.type === "textarea" ? (
            <textarea name={field.name} rows={5} placeholder="Escribe aquí…" />
          ) : (
            <input
              type={field.type}
              name={field.name}
              placeholder={
                field.type === "search" ? "Buscar…" : "Escribe aquí"
              }
            />
          )}
        </label>
      ))}
      <button type="submit" className="btn btn-green">
        {form.submit}
      </button>
    </form>
  );
}

export { styles as sharedStyles };
