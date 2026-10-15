"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { headerChrome, navItems, type NavItem } from "@/content/nav";
import { site } from "@/content/home";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);
  const menuId = useId();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setActiveMenu(null);
    setMobileExpanded(null);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!activeMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveMenu(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activeMenu]);

  const clearClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearClose();
    closeTimer.current = window.setTimeout(() => setActiveMenu(null), 140);
  };

  const openMenu = (label: string) => {
    clearClose();
    setActiveMenu(label);
  };

  // Match Sysco: opening a dropdown over the hero must NOT paint the nav solid white.
  // Solid chrome only when scrolled, on interior pages, or when the mobile drawer is open.
  const forceSolid = !isHome || solid || open;
  const shellClass = `${styles.header} ${forceSolid ? styles.solid : styles.overHero}`;

  return (
    <header className={shellClass}>
      <div className={styles.announce}>
        <div className="container">
          <Link href={headerChrome.announcementHref}>
            {headerChrome.announcement} — <span>{headerChrome.announcementLink}</span>
          </Link>
        </div>
      </div>

      <div className={styles.bar}>
        <div className={`container ${styles.barInner}`}>
          <Link href="/" className={styles.logo} aria-label={site.logo.alt}>
            <Image
              src={site.logo.src}
              alt={site.logo.alt}
              width={200}
              height={50}
              priority
            />
          </Link>

          <nav className={styles.desktopNav} aria-label="Primary">
            <ul>
              {navItems.map((item) => {
                const hasMenu = item.columns.length > 0;
                const isOpen = activeMenu === item.label;
                return (
                  <li
                    key={item.label}
                    className={`${styles.navItem} ${isOpen ? styles.navItemOpen : ""}`}
                    onMouseEnter={() => (hasMenu ? openMenu(item.label) : setActiveMenu(null))}
                    onMouseLeave={hasMenu ? scheduleClose : undefined}
                  >
                    {hasMenu ? (
                      <>
                        <Link
                          href={item.href}
                          className={styles.navTrigger}
                          aria-expanded={isOpen}
                          aria-haspopup="true"
                          aria-controls={`${menuId}-${item.label}`}
                          onFocus={() => openMenu(item.label)}
                          onBlur={(e) => {
                            const next = e.relatedTarget as Node | null;
                            if (!e.currentTarget.parentElement?.contains(next)) {
                              scheduleClose();
                            }
                          }}
                        >
                          {item.label}
                          <span className={styles.caret} aria-hidden />
                        </Link>
                        <DropdownPanel
                          item={item}
                          id={`${menuId}-${item.label}`}
                          open={isOpen}
                          onEnter={() => openMenu(item.label)}
                          onLeave={scheduleClose}
                        />
                      </>
                    ) : (
                      <Link href={item.href} className={styles.navLink}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className={styles.actions}>
            <Link href={headerChrome.searchHref} className={styles.search} aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
                <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="2" />
              </svg>
            </Link>
            <Link href={headerChrome.shopNowHref} className={styles.linkGreen}>
              {headerChrome.shopNow}
            </Link>
            <Link
              href={headerChrome.becomeCustomerHref}
              className={`btn btn-green ${styles.become}`}
            >
              {headerChrome.becomeCustomer}
            </Link>
            <Link href={headerChrome.signInHref} className={styles.linkGreen}>
              {headerChrome.signIn}
            </Link>
            <button
              type="button"
              className={styles.burger}
              aria-label={open ? "Close menu" : "Open menu"}
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
            {navItems.map((item) => {
              const hasMenu = item.columns.length > 0;
              const expanded = mobileExpanded === item.label;
              return (
                <li key={item.label} className={styles.mobileItem}>
                  {hasMenu ? (
                    <>
                      <div className={styles.mobileRow}>
                        <Link href={item.href} onClick={() => setOpen(false)}>
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          aria-expanded={expanded}
                          aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label}`}
                          onClick={() =>
                            setMobileExpanded(expanded ? null : item.label)
                          }
                        >
                          <span className={`${styles.caret} ${expanded ? styles.caretOpen : ""}`} />
                        </button>
                      </div>
                      {expanded ? (
                        <div className={styles.mobileSub}>
                          {item.columns.map((col) => (
                            <div key={col.label || item.label}>
                              {col.label ? <p className={styles.mobileColTitle}>{col.label}</p> : null}
                              <ul>
                                {col.pages.map((page) => (
                                  <li key={page.href}>
                                    <Link href={page.href} onClick={() => setOpen(false)}>
                                      {page.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </>
                  ) : (
                    <Link href={item.href} onClick={() => setOpen(false)}>
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
            <li>
              <Link href={headerChrome.shopNowHref} onClick={() => setOpen(false)}>
                {headerChrome.shopNow}
              </Link>
            </li>
            <li>
              <Link href={headerChrome.signInHref} onClick={() => setOpen(false)}>
                {headerChrome.signIn}
              </Link>
            </li>
            <li className={styles.mobileCta}>
              <Link
                href={headerChrome.becomeCustomerHref}
                className="btn btn-green"
                onClick={() => setOpen(false)}
              >
                {headerChrome.becomeCustomer}
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}

function DropdownPanel({
  item,
  id,
  open,
  onEnter,
  onLeave,
}: {
  item: NavItem;
  id: string;
  open: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const sections = item.columns.filter((c) => c.pages.length > 0);
  return (
    <div
      id={id}
      className={`${styles.dropdown} ${open ? styles.dropdownOpen : ""}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      role="region"
      aria-label={`${item.label} menu`}
      aria-hidden={!open}
      // Closed panels stay in the DOM for open/close motion but are not interactive.
      inert={open ? undefined : true}
    >
      <div className={styles.dropdownInner}>
        {sections.map((col, index) => (
          <div
            key={col.label || `${item.label}-${index}`}
            className={`${styles.dropdownSection}${index > 0 ? ` ${styles.dropdownSectionDivided}` : ""}`}
          >
            {col.label ? <p className={styles.dropdownHeading}>{col.label}</p> : null}
            <ul>
              {col.pages.map((page) => (
                <li key={page.href}>
                  <Link href={page.href}>{page.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
