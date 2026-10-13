import Link from "next/link";
import { lorem, type PageMeta } from "@/content/nav";
import styles from "./InteriorPage.module.css";

export default function InteriorPage({ page }: { page: PageMeta }) {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          {page.parentLabel && page.parentHref ? (
            <p className={styles.crumb}>
              <Link href="/">Home</Link>
              <span aria-hidden> / </span>
              <Link href={page.parentHref}>{page.parentLabel}</Link>
              {page.sectionLabel && page.sectionLabel !== page.parentLabel ? (
                <>
                  <span aria-hidden> / </span>
                  <span>{page.sectionLabel}</span>
                </>
              ) : null}
            </p>
          ) : null}
          <h1>{page.title}</h1>
          <p className={styles.lead}>{lorem.lead}</p>
        </div>
      </section>

      <section className={styles.body}>
        <div className={`container ${styles.grid}`}>
          <article className={styles.copy}>
            {lorem.body.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
            <Link href="/contact/contact-us" className="btn btn-green">
              LEARN MORE
            </Link>
          </article>

          {page.related && page.related.length > 0 ? (
            <aside className={styles.aside}>
              <h2>Explore</h2>
              <ul>
                {page.related.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href}>{r.label}</Link>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </div>
      </section>
    </main>
  );
}
