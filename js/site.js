const esc = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[ch]));

const svg = {
  search: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="1.8"/><path d="M16 16.5 20 20.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  chevL: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.5 5 8 12l6.5 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chevR: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9.5 5 16 12l-6.5 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  social: [
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1Z"/></svg>',
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 4h4.2l4.1 6.2L16.8 4H20l-6.3 8.2L20.4 20h-4.2l-4.5-6.6L7.2 20H4l6.6-8.5L4 4Z"/></svg>',
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.5 9H4V20h2.5V9ZM5.2 4A1.6 1.6 0 1 0 5.2 7.2 1.6 1.6 0 0 0 5.2 4ZM20 20h-2.5v-5.6c0-1.6-.6-2.6-2-2.6-1 0-1.6.7-1.9 1.4-.1.2-.1.6-.1.9V20H11V9h2.4v1.5c.4-.7 1.3-1.8 3.2-1.8 2.3 0 4 1.5 4 4.8V20Z"/></svg>',
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3.2" stroke="currentColor" stroke-width="1.8"/><circle cx="17.2" cy="6.8" r="0.8" fill="currentColor"/></svg>',
  ],
};

function linkList(links) {
  return links.map((link) => `<a href="${esc(link.href)}">${esc(link.label)}</a>`).join("");
}

function chrome(data, page) {
  const nav = data.nav.map((item) => {
    const current = page.id === item.id || (item.href && page.href === item.href);
    if (!item.groups) {
      return `<a class="nav-link" href="${esc(item.href)}"${current ? ' aria-current="page"' : ""}>${esc(item.label)}</a>`;
    }
    const groups = item.groups.map((group) => `
      <div class="mega-group">
        <h3>${esc(group.h3)}</h3>
        ${linkList(group.links)}
      </div>`).join("");
    return `<div class="nav-item">
      <button class="nav-link" type="button" aria-expanded="false">${esc(item.label)}</button>
      <div class="mega">
        <div class="mega-panel">
          <p class="mega-phrase">${esc(item.phrase)}</p>
          ${groups}
        </div>
      </div>
    </div>`;
  }).join("");

  const drawer = data.nav.map((item) => {
    if (!item.groups) {
      return `<div class="acc"><a class="top" href="${esc(item.href)}">${esc(item.label)}</a></div>`;
    }
    const groups = item.groups.map((group) => `
      <div class="mega-group">
        <h3>${esc(group.h3)}</h3>
        ${linkList(group.links)}
      </div>`).join("");
    return `<div class="acc">
      <button type="button" aria-expanded="false">${esc(item.label)}</button>
      <div class="sub">
        <p class="mega-phrase">${esc(item.phrase)}</p>
        ${groups}
      </div>
    </div>`;
  }).join("");

  const social = data.footer.social.map((item, i) =>
    `<a href="${esc(item.href)}" aria-label="${esc(item.label)}">${svg.social[i % svg.social.length]}</a>`
  ).join("");

  const columns = data.footer.columns.map((col) => `
    <div>
      <h3>${esc(col.h3)}</h3>
      <ul>${col.links.map((link) => `<li><a href="${esc(link.href)}">${esc(link.label)}</a></li>`).join("")}</ul>
    </div>`).join("");

  return `
    <div class="chrome">
      <div class="topbar"><a href="${esc(data.utility.href)}">${esc(data.utility.label)}</a></div>
      <header class="site-header">
        <div class="bar">
          <a class="wordmark" href="/">${esc(data.brand)}</a>
          <nav class="nav-links" aria-label="${esc(data.navLabel)}">${nav}</nav>
          <div class="utils">
            <div class="search-wrap" style="position:relative">
              <button class="icon-btn" type="button" id="search-open" aria-expanded="false" aria-controls="search-pop" aria-label="${esc(data.utils.searchLabel)}">${svg.search}</button>
              <div class="search-pop" id="search-pop">
                <input id="search-input" type="search" aria-label="${esc(data.utils.searchLabel)}" />
                <div id="search-results"></div>
              </div>
            </div>
            <a class="util-link" href="${esc(data.utils.shop.href)}">${esc(data.utils.shop.label)}</a>
            <a class="btn btn-green btn-nav" href="${esc(data.utils.cta.href)}">${esc(data.utils.cta.label)}</a>
            <a class="util-link" href="${esc(data.utils.account.href)}">${esc(data.utils.account.label)}</a>
          </div>
          <button class="burger" id="burger" type="button" aria-expanded="false" aria-controls="drawer" aria-label="${esc(data.utils.menuLabel)}"><span></span><span></span><span></span></button>
        </div>
      </header>
    </div>
    <div class="drawer" id="drawer">
      ${drawer}
      <div class="cta-row">
        <a class="btn btn-green btn-nav" href="${esc(data.utils.cta.href)}">${esc(data.utils.cta.label)}</a>
        <a class="util-link" href="${esc(data.utils.shop.href)}">${esc(data.utils.shop.label)}</a>
        <a class="util-link" href="${esc(data.utils.account.href)}">${esc(data.utils.account.label)}</a>
      </div>
    </div>`;
}

function footer(data) {
  const social = data.footer.social.map((item, i) =>
    `<a href="${esc(item.href)}" aria-label="${esc(item.label)}">${svg.social[i % svg.social.length]}</a>`
  ).join("");
  const columns = data.footer.columns.map((col) => `
    <div>
      <h3>${esc(col.h3)}</h3>
      <ul>${col.links.map((link) => `<li><a href="${esc(link.href)}">${esc(link.label)}</a></li>`).join("")}</ul>
    </div>`).join("");
  return `
    <footer class="site-footer">
      <div class="foot-grid">
        <p class="foot-blurb">${esc(data.footer.blurb)}</p>
        ${columns}
        <div class="social">${social}</div>
      </div>
      <div class="legal">
        <span>${esc(data.footer.legal)}</span>
        ${data.footer.legalLinks.map((link) => `<a href="${esc(link.href)}">${esc(link.label)}</a>`).join("")}
      </div>
    </footer>`;
}

function cards(items) {
  if (!items.length) return `<p class="empty support" data-empty></p>`;
  return `<div class="cards">${items.map((item) => `
    <a class="card" href="${esc(item.href)}">
      <img src="${esc(item.image)}" alt="${esc(item.alt)}" width="640" height="360" />
      <h3>${esc(item.h3)}</h3>
      <p class="support">${esc(item.support)}</p>
    </a>`).join("")}</div>`;
}

function band(block) {
  const links = (block.links || []).map((link) => `<a href="${esc(link.href)}">${esc(link.label)}</a>`).join("");
  const cta = block.cta ? `<a class="btn ${block.cta.ghost ? "btn-ghost" : "btn-green btn-hero"}" href="${esc(block.cta.href)}">${esc(block.cta.label)}</a>` : "";
  return `
    <section class="band align-${esc(block.align || "start")}">
      <img class="bg" src="${esc(block.image)}" alt="" />
      <div class="band-inner">
        <p class="kicker">${esc(block.kicker)}</p>
        <h2>${esc(block.sectionTitle)}</h2>
        <div class="rule"></div>
        ${block.support ? `<p class="support">${esc(block.support)}</p>` : ""}
        ${links ? `<div class="band-links">${links}</div>` : ""}
        ${cta}
      </div>
    </section>`;
}

function renderPage(data, page) {
  if (page.template === "home") {
    const slides = page.slides.map((slide, index) => `
      <div class="hero-slide${index === 0 ? " on" : ""}">
        <img src="${esc(slide.image)}" alt="${esc(slide.alt)}" />
      </div>`).join("");
    const dots = page.slides.map((_, index) => `<button type="button" class="${index === 0 ? "on" : ""}" aria-label="${esc(page.dotLabel)} ${index + 1}"></button>`).join("");
    const first = page.slides[0];
    return `
      <section class="hero" id="hero">
        ${slides}
        <div class="hero-copy">
          <p class="kicker" id="hero-kicker">${esc(first.kicker)}</p>
          <h1 id="hero-title">${esc(first.sectionTitle)}</h1>
          <p class="support" id="hero-support">${esc(first.support)}</p>
          <a class="btn btn-green btn-hero" id="hero-cta" href="${esc(first.cta.href)}">${esc(first.cta.label)}</a>
        </div>
        <button class="hero-arrow prev" type="button" id="hero-prev" aria-label="${esc(page.prevLabel)}">${svg.chevL}</button>
        <button class="hero-arrow next" type="button" id="hero-next" aria-label="${esc(page.nextLabel)}">${svg.chevR}</button>
        <div class="dots" id="hero-dots">${dots}</div>
      </section>
      <section class="blue-band">
        <h2>${esc(page.blue.sectionTitle)}</h2>
        <a class="btn btn-ghost" href="${esc(page.blue.cta.href)}">${esc(page.blue.cta.label)}</a>
      </section>
      ${page.bands.map(band).join("")}
      ${band(page.closer)}`;
  }

  if (page.template === "simple") {
    const blocks = page.blocks.map((block) => `
      <h2>${esc(block.h2)}</h2>
      <p class="support">${esc(block.support)}</p>`).join("");
    const figure = page.image ? `<figure class="figure"><img src="${esc(page.image)}" alt="${esc(page.alt)}" width="1200" height="675" /></figure>` : "";
    return `
      <article class="simple">
        <div class="wrap prose">
          <p class="kicker">${esc(page.kicker)}</p>
          <h1>${esc(page.h1)}</h1>
          <p class="support">${esc(page.support)}</p>
          ${figure}
          ${blocks}
        </div>
      </article>`;
  }

  const hero = `
    <section class="page-hero">
      <img class="bg" src="${esc(page.image)}" alt="" />
      <div class="inner">
        <p class="kicker">${esc(page.kicker)}</p>
        <h1>${esc(page.h1)}</h1>
        <p class="support">${esc(page.support)}</p>
      </div>
    </section>`;

  if (page.template === "hub" || page.template === "listing") {
    const filter = page.template === "listing" ? `
      <div class="filter-band">
        <div class="wrap">
          <label for="filter">${esc(page.filterLabel)}</label>
          <input id="filter" type="search" />
        </div>
      </div>` : "";
    return `
      ${hero}
      ${filter}
      <section class="section">
        <div class="wrap">
          <p class="kicker">${esc(page.kicker)}</p>
          <h2>${esc(page.h2)}</h2>
          <p class="support">${esc(page.intro)}</p>
          <div id="card-grid">${cards(page.cards)}</div>
        </div>
      </section>`;
  }

  if (page.template === "detail") {
    return `
      ${hero}
      <section class="section">
        <div class="wrap prose">
          <p class="kicker">${esc(page.kicker)}</p>
          <h2>${esc(page.h2)}</h2>
          <p class="support">${esc(page.intro)}</p>
          <figure class="figure"><img src="${esc(page.figure)}" alt="${esc(page.alt)}" width="1200" height="675" /></figure>
          <h2>${esc(page.h2b)}</h2>
          <p class="support">${esc(page.outro)}</p>
        </div>
      </section>
      <section class="section">
        <div class="wrap">
          <h2>${esc(page.relatedTitle)}</h2>
          ${cards(page.cards)}
        </div>
      </section>`;
  }

  if (page.template === "contact") {
    const fields = page.fields.map((field) => {
      const control = field.type === "textarea"
        ? `<textarea id="${esc(field.name)}" name="${esc(field.name)}" required></textarea>`
        : `<input id="${esc(field.name)}" name="${esc(field.name)}" type="${esc(field.type)}" required />`;
      return `<div><label for="${esc(field.name)}">${esc(field.label)}</label>${control}</div>`;
    }).join("");
    return `
      ${hero}
      <section class="section">
        <div class="wrap form-grid">
          <form id="contact-form">
            ${fields}
            <button class="btn btn-green btn-hero" type="submit">${esc(page.submit)}</button>
          </form>
          <div class="side">
            <p class="kicker">${esc(page.kicker)}</p>
            <h3>${esc(page.sideH3)}</h3>
            <p class="support">${esc(page.sideSupport)}</p>
          </div>
          <p class="support form-note" id="form-note" hidden>${esc(page.thanks)}</p>
        </div>
      </section>`;
  }

  return `<section class="section"><div class="wrap"><h1>${esc(page.h1 || "")}</h1></div></section>`;
}

function bind(data, page) {
  const header = document.querySelector(".site-header");
  const onScroll = () => header.classList.toggle("is-solid", window.scrollY > 12);
  if (document.body.classList.contains("home")) {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const burger = document.getElementById("burger");
  burger.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    burger.setAttribute("aria-expanded", String(open));
  });
  document.querySelectorAll(".drawer .acc > button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const acc = btn.parentElement;
      const open = acc.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  const searchPop = document.getElementById("search-pop");
  const searchBtn = document.getElementById("search-open");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  const pages = data.pages.filter((item) => item.template !== "home");
  const showResults = () => {
    const q = searchInput.value.trim().toLowerCase();
    const hits = pages.filter((item) => !q || `${item.h1} ${item.sectionTitle || ""}`.toLowerCase().includes(q)).slice(0, 6);
    searchResults.innerHTML = hits.map((item) => `<a href="${esc(item.href)}">${esc(item.h1 || item.sectionTitle)}</a>`).join("");
  };
  searchBtn.addEventListener("click", () => {
    const open = searchPop.classList.toggle("open");
    searchBtn.setAttribute("aria-expanded", String(open));
    if (open) {
      showResults();
      searchInput.focus();
    }
  });
  searchInput.addEventListener("input", showResults);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.body.classList.remove("nav-open");
      burger.setAttribute("aria-expanded", "false");
      searchPop.classList.remove("open");
      searchBtn.setAttribute("aria-expanded", "false");
    }
  });

  if (page.template === "home") {
    const slides = page.slides;
    let index = 0;
    const title = document.getElementById("hero-title");
    const kicker = document.getElementById("hero-kicker");
    const support = document.getElementById("hero-support");
    const cta = document.getElementById("hero-cta");
    const nodes = [...document.querySelectorAll(".hero-slide")];
    const dots = [...document.querySelectorAll("#hero-dots button")];
    const go = (next) => {
      index = (next + slides.length) % slides.length;
      nodes.forEach((node, i) => node.classList.toggle("on", i === index));
      dots.forEach((node, i) => node.classList.toggle("on", i === index));
      const slide = slides[index];
      title.textContent = slide.sectionTitle;
      kicker.textContent = slide.kicker;
      support.textContent = slide.support;
      cta.textContent = slide.cta.label;
      cta.setAttribute("href", slide.cta.href);
    };
    document.getElementById("hero-prev").addEventListener("click", () => go(index - 1));
    document.getElementById("hero-next").addEventListener("click", () => go(index + 1));
    dots.forEach((dot, i) => dot.addEventListener("click", () => go(i)));
    let timer = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      timer = window.setInterval(() => go(index + 1), 7000);
      document.getElementById("hero").addEventListener("mouseenter", () => window.clearInterval(timer));
    }
  }

  const filter = document.getElementById("filter");
  if (filter && page.cards) {
    const grid = document.getElementById("card-grid");
    filter.addEventListener("input", () => {
      const q = filter.value.trim().toLowerCase();
      const hits = page.cards.filter((item) => item.h3.toLowerCase().includes(q) || item.support.toLowerCase().includes(q));
      grid.innerHTML = cards(hits);
      const empty = grid.querySelector("[data-empty]");
      if (empty) empty.textContent = page.empty;
    });
  }

  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      form.hidden = true;
      const note = document.getElementById("form-note");
      note.hidden = false;
    });
  }
}

const data = await fetch("/data/site.json").then((res) => res.json());
const id = document.body.dataset.page;
const page = data.pages.find((item) => item.id === id) || data.pages[0];
const app = document.getElementById("app");
app.innerHTML = `${chrome(data, page)}<main id="contenido">${renderPage(data, page)}</main>${footer(data)}`;
document.title = `${data.brand} — ${page.h1 || page.slides?.[0]?.sectionTitle || data.brand}`;
bind(data, page);
