"use client";

import { useState } from "react";
import { cookieBanner } from "@/content/home";
import styles from "./CookieBanner.module.css";

export default function CookieBanner() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className={styles.banner} role="dialog" aria-label="Cookie notice">
      <p>
        {cookieBanner.body}{" "}
        <a href="#">Cookie Policy</a>
      </p>
      <div className={styles.actions}>
        <a href="#">{cookieBanner.customize}</a>
        <button type="button" className="btn btn-blue-pill" onClick={() => setOpen(false)}>
          {cookieBanner.accept}
        </button>
        <button
          type="button"
          className={styles.close}
          aria-label="Close"
          onClick={() => setOpen(false)}
        >
          ×
        </button>
      </div>
    </div>
  );
}
