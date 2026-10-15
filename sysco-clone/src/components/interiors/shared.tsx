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
    );
  }
  return (
    <p className={`${styles.crumb} ${toneClass}`}>
      <Link href="/">Home</Link>
    </p>
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
            <textarea name={field.name} rows={5} placeholder="Lorem ipsum…" />
          ) : (
            <input
              type={field.type}
              name={field.name}
              placeholder={
                field.type === "search" ? "Search…" : "Lorem ipsum"
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
