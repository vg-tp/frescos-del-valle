"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { headerChrome, navItems, site } from "@/content/home";
import styles from "./Header.module.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${solid ? styles.solid : styles.overHero}`}>
      <div className={styles.announce}>
        <div className="container">
          <a href="#">
            {headerChrome.announcement} — <span>{headerChrome.announcementLink}</span>
          </a>
        </div>
      </div>

      <div className={styles.bar}>
        <div className={`container ${styles.barInner}`}>
          <a href="/" className={styles.logo} aria-label={site.logo.alt}>
            <Image
              src={site.logo.src}
              alt={site.logo.alt}
              width={200}
              height={50}
              priority
            />
          </a>

          <nav className={styles.desktopNav} aria-label="Primary">
            <ul>
              {navItems.map((label) => (
                <li key={label}>
                  <a href="#">{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <button type="button" className={styles.search} aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
                <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            <a href="#" className={styles.linkGreen}>
              {headerChrome.shopNow}
            </a>
            <a href="#" className={`btn btn-green ${styles.become}`}>
              {headerChrome.becomeCustomer}
            </a>
            <a href="#" className={styles.linkGreen}>
              {headerChrome.signIn}
            </a>
            <button
              type="button"
              className={styles.burger}
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div className={styles.mobileDrawer}>
          <ul>
            {navItems.map((label) => (
              <li key={label}>
                <a href="#" onClick={() => setOpen(false)}>
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a href="#">{headerChrome.shopNow}</a>
            </li>
            <li>
              <a href="#">{headerChrome.signIn}</a>
            </li>
            <li>
              <a href="#" className="btn btn-green">
                {headerChrome.becomeCustomer}
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
