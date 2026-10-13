"use client";

import { useState } from "react";
import Image from "next/image";
import { headerChrome, navItems, site } from "@/content/home";
import styles from "./Header.module.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  return (
    <header className={styles.header}>
      <div className={styles.announce}>
        <div className="container">
          <a href="#">{headerChrome.announcement}</a>
        </div>
      </div>

      <div className={styles.bar}>
        <div className={`container ${styles.barInner}`}>
          <a href="/" className={styles.logo} aria-label={site.logo.alt}>
            <Image
              src={site.logo.src}
              alt={site.logo.alt}
              width={220}
              height={54}
              priority
            />
          </a>

          <nav className={styles.desktopNav} aria-label="Primary">
            <ul>
              {navItems.map((item) => (
                <li
                  key={item.label}
                  className={styles.navItem}
                  onMouseEnter={() => setActive(item.label)}
                  onMouseLeave={() => setActive(null)}
                >
                  <button
                    type="button"
                    className={styles.navBtn}
                    aria-expanded={active === item.label}
                  >
                    {item.label}
                    {"children" in item && item.children ? (
                      <span className={styles.caret} aria-hidden>
                        ▾
                      </span>
                    ) : null}
                  </button>
                  {"children" in item && item.children && active === item.label ? (
                    <div className={styles.mega}>
                      {item.children.map((group) => (
                        <div key={group.group} className={styles.megaCol}>
                          <h3>{group.group}</h3>
                          <ul>
                            {group.links.map((link) => (
                              <li key={link}>
                                <a href="#">{link}</a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <a href="#" className={styles.signIn}>
              {headerChrome.signIn}
            </a>
            <a href="#" className={`btn btn-primary ${styles.shop}`}>
              {headerChrome.shopNow}
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
            {navItems.map((item) => (
              <li key={item.label}>
                <a href="#" onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#">{headerChrome.signIn}</a>
            </li>
            <li>
              <a href="#" className="btn btn-primary">
                {headerChrome.shopNow}
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
