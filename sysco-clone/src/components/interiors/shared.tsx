import Image from "next/image";
import Link from "next/link";
import type { InteriorContent } from "@/content/interiors";
import styles from "./shared.module.css";

export function PageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className={`${styles.main}${className ? ` ${className}` : ""}`}>
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

/** Full-bleed photo page header — breadcrumbs + title + lead (Sysco interior chrome). */
export function PhotoHero({
  content,
  compact = false,
}: {
  content: InteriorContent;
  compact?: boolean;
}) {
  const heroSrc = content.heroImage || "/hero.jpg";
  const title = content.title?.trim() || "Sysco";
  const lead =
    content.lead?.trim() ||
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  return (
    <section
      className={`${styles.photoHero}${compact ? ` ${styles.photoHeroCompact}` : ""}`}
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
        <Crumbs content={content} />
        <h1>{title}</h1>
        <p className={styles.photoHeroLead}>{lead}</p>
      </div>
    </section>
  );
}

export function FeatureGrid({
  heading,
  items,
}: {
  heading: string;
  items: NonNullable<InteriorContent["features"]>;
}) {
  return (
    <section className={styles.featureSection}>
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
