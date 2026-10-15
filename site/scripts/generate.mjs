#!/usr/bin/env node
/**
 * One-time / regen static HTML from site/js/content.json.
 * Viewing the site does NOT require this script.
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE = join(__dirname, "..");
const data = JSON.parse(readFileSync(join(SITE, "js/content.json"), "utf8"));

const {
  site,
  headerChrome,
  navItems,
  heroSlides,
  partnerBanner,
  photoSections,
  footer,
  cookieBanner,
  interiors,
} = data;

function img(src) {
  if (!src) return "/img/hero.jpg";
  if (src.startsWith("/img/")) return src;
  if (src.startsWith("/")) return `/img${src}`;
  return `/img/${src}`;
}

function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pagePath(href) {
  const clean = href.replace(/\/$/, "") || "";
  if (!clean || clean === "/") return "index.html";
  return `${clean.replace(/^\//, "")}/index.html`;
}

function overPhotoHero(pathname) {
  if (pathname === "/" || pathname === "") return true;
  return (
    pathname !== "/search" &&
    pathname !== "/sign-in" &&
    pathname !== "/become-a-customer" &&
    pathname !== "/shop-now" &&
    !pathname.includes("our-purpose")
  );
}

function headerHTML(pathname) {
  const over = overPhotoHero(pathname);
  const shell = `header${over ? " overHero" : " solid"}`;
  const nav = navItems
    .map((item) => {
      const hasMenu = item.columns.length > 0;
      if (!hasMenu) {
        return `<li class="navItem"><a class="navLink" href="${esc(item.href)}">${esc(item.label)}</a></li>`;
      }
      const panels = item.columns
        .filter((c) => c.pages.length)
        .map(
          (col, index) => `
          <div class="dropdownSection${index > 0 ? " dropdownSectionDivided" : ""}">
            ${col.label ? `<p class="dropdownHeading">${esc(col.label)}</p>` : ""}
            <ul>
              ${col.pages.map((p) => `<li><a href="${esc(p.href)}">${esc(p.label)}</a></li>`).join("")}
            </ul>
          </div>`
        )
        .join("");
      return `
        <li class="navItem" data-has-menu="true">
          <a href="${esc(item.href)}" class="navTrigger" aria-expanded="false" aria-haspopup="true">
            ${esc(item.label)}<span class="caret" aria-hidden="true"></span>
          </a>
          <div class="dropdown" role="region" aria-label="${esc(item.label)} ${esc(headerChrome.menuSuffix)}" aria-hidden="true" inert>
            <div class="dropdownInner">${panels}</div>
          </div>
        </li>`;
    })
    .join("");

  const mobile = navItems
    .map((item) => {
      const hasMenu = item.columns.length > 0;
      if (!hasMenu) {
        return `<li class="mobileItem"><a href="${esc(item.href)}">${esc(item.label)}</a></li>`;
      }
      const sub = item.columns
        .map(
          (col) => `
          <div>
            ${col.label ? `<p class="mobileColTitle">${esc(col.label)}</p>` : ""}
            <ul>${col.pages.map((p) => `<li><a href="${esc(p.href)}">${esc(p.label)}</a></li>`).join("")}</ul>
          </div>`
        )
        .join("");
      return `
        <li class="mobileItem" data-has-menu="true">
          <div class="mobileRow">
            <a href="${esc(item.href)}">${esc(item.label)}</a>
            <button type="button" aria-expanded="false" aria-label="${esc(headerChrome.expand)} ${esc(item.label)}">
              <span class="caret"></span>
            </button>
          </div>
          <div class="mobileSub" hidden>${sub}</div>
        </li>`;
    })
    .join("");

  return `
<header class="${shell}" data-over-photo="${over ? "1" : "0"}">
  <div class="announce">
    <div class="container">
      <a href="${esc(headerChrome.announcementHref)}">${esc(headerChrome.announcement)} — <span>${esc(headerChrome.announcementLink)}</span></a>
    </div>
  </div>
  <div class="bar">
    <div class="container barInner">
      <a href="/" class="logo" aria-label="${esc(site.logo.alt)}">
        <img src="${img(site.logo.src)}" alt="${esc(site.logo.alt)}" width="200" height="50" />
      </a>
      <nav class="desktopNav" aria-label="${esc(headerChrome.primaryNavLabel)}">
        <ul>${nav}</ul>
      </nav>
      <div class="actions">
        <a href="${esc(headerChrome.searchHref)}" class="search" aria-label="${esc(headerChrome.searchLabel)}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="2"/><path d="M16 16l4.5 4.5" stroke="currentColor" stroke-width="2"/></svg>
        </a>
        <a href="${esc(headerChrome.shopNowHref)}" class="linkGreen">${esc(headerChrome.shopNow)}</a>
        <a href="${esc(headerChrome.becomeCustomerHref)}" class="btn btn-green become">${esc(headerChrome.becomeCustomer)}</a>
        <a href="${esc(headerChrome.signInHref)}" class="linkGreen">${esc(headerChrome.signIn)}</a>
        <button type="button" class="burger" aria-label="${esc(headerChrome.openMenu)}" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </div>
  <div class="mobileDrawer" hidden>
    <ul>
      ${mobile}
      <li><a href="${esc(headerChrome.shopNowHref)}">${esc(headerChrome.shopNow)}</a></li>
      <li><a href="${esc(headerChrome.signInHref)}">${esc(headerChrome.signIn)}</a></li>
      <li class="mobileCta"><a href="${esc(headerChrome.becomeCustomerHref)}" class="btn btn-green">${esc(headerChrome.becomeCustomer)}</a></li>
    </ul>
  </div>
</header>`;
}

function footerHTML() {
  const cols = footer.columns
    .map(
      (col) => `
      <div class="col">
        <h5>${esc(col.title)}</h5>
        <ul>${col.links.map((l) => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`).join("")}</ul>
      </div>`
    )
    .join("");
  const legal = footer.legal
    .map(
      (item, i) =>
        `<span><a href="${esc(item.href)}">${esc(item.label)}</a>${i < footer.legal.length - 1 ? '<span class="bar">|</span>' : ""}</span>`
    )
    .join("");
  return `
<footer class="footer">
  <div class="container top">
    <div class="blurb">
      <p>${esc(footer.blurb)}</p>
      <p class="stats">${esc(footer.stats)}</p>
    </div>
    <div class="columns">${cols}</div>
    <ul class="social" aria-label="Redes sociales">
      ${["f", "x", "in", "ig", "yt"].map((l) => `<li><a href="/about/sysco-today/newsroom" aria-label="${l}">${l}</a></li>`).join("")}
    </ul>
  </div>
  <div class="container bottom">
    <div class="brand">
      <img src="${img(site.logo.src)}" alt="${esc(site.logo.alt)}" width="120" height="30" />
      <p>${esc(footer.copyright)}</p>
    </div>
    <div class="legal">${legal}</div>
  </div>
</footer>`;
}

function cookieHTML() {
  return `
<div class="cookieBanner" id="cookie-banner" role="dialog" aria-label="${esc(cookieBanner.noticeLabel)}">
  <p>${esc(cookieBanner.body)} <a href="#">${esc(cookieBanner.policyLabel)}</a></p>
  <div class="cookieActions">
    <a href="#">${esc(cookieBanner.customize)}</a>
    <button type="button" class="btn btn-blue-pill" data-cookie-accept>${esc(cookieBanner.accept)}</button>
    <button type="button" class="cookieClose" aria-label="${esc(cookieBanner.closeLabel)}" data-cookie-close>×</button>
  </div>
</div>`;
}

function documentShell({ title, pathname, body, extraScripts = "" }) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)} | ${esc(site.title)}</title>
  <meta name="description" content="${esc(site.description)}" />
  <link rel="stylesheet" href="/css/site.css" />
</head>
<body data-path="${esc(pathname)}">
${headerHTML(pathname)}
${body}
${footerHTML()}
${cookieHTML()}
<script src="/js/chrome.js" defer></script>
${extraScripts}
</body>
</html>
`;
}

/* ---------- Shared interior bits ---------- */

function crumbs(c, tone = "dark") {
  const toneClass = tone === "dark" ? "crumbOnDark" : "crumbOnLight";
  if (c.parentLabel && c.parentHref) {
    const mid =
      c.sectionLabel && c.sectionLabel !== c.parentLabel
        ? `<span aria-hidden="true"> / </span><span>${esc(c.sectionLabel)}</span>`
        : "";
    return `<p class="crumb ${toneClass}"><a href="/">Inicio</a><span aria-hidden="true"> / </span><a href="${esc(c.parentHref)}">${esc(c.parentLabel)}</a>${mid}</p>`;
  }
  return `<p class="crumb ${toneClass}"><a href="/">Inicio</a></p>`;
}

function photoHero(c, { compact = false, tall = false, showCrumbs = true } = {}) {
  const size = compact ? "photoHeroCompact" : tall ? "photoHeroTall" : "";
  const title = (c.title || "Sysco").trim();
  const lead = (c.lead || "Lorem ipsum dolor sit amet, consectetur adipiscing elit.").trim();
  return `
<section class="photoHero ${size}" aria-label="Encabezado de página">
  <img class="photoHeroImg" src="${img(c.heroImage)}" alt="" />
  <div class="photoHeroShade"></div>
  <div class="container photoHeroInner">
    ${showCrumbs ? crumbs(c) : ""}
    <h1>${esc(title)}</h1>
    <p class="photoHeroLead">${esc(lead)}</p>
  </div>
</section>`;
}

function centeredHead(title, lead) {
  return `<header class="centeredHead"><h2>${esc(title)}</h2>${lead ? `<p>${esc(lead)}</p>` : ""}</header>`;
}

function featureGrid(heading, items) {
  if (!items?.length) return "";
  return `
<section class="featureSection">
  <div class="container">
    ${centeredHead(heading)}
    <ul class="featureGrid">
      ${items.map((f) => `<li><h3>${esc(f.title)}</h3><p>${esc(f.body)}</p></li>`).join("")}
    </ul>
  </div>
</section>`;
}

function imageTileGrid(heading, cards, columns = 3) {
  if (!cards?.length) return "";
  const colClass = columns === 4 ? "tileGrid4" : "tileGrid3";
  return `
<section class="tileSection">
  <div class="container">
    ${centeredHead(heading)}
    <ul class="tileGrid ${colClass}">
      ${cards
        .map(
          (card) => `
        <li>
          <a href="${esc(card.href || "#")}" class="imageTile">
            ${card.image ? `<img class="imageTileImg" src="${img(card.image)}" alt="" />` : ""}
            <div class="imageTileShade"></div>
            <span class="imageTileLabel">${esc(card.title)}</span>
          </a>
        </li>`
        )
        .join("")}
    </ul>
  </div>
</section>`;
}

function cardGrid(heading, cards, columns = 3, tone = "white") {
  if (!cards?.length) return "";
  const colClass = columns === 2 ? "cardGrid2" : columns === 4 ? "cardGrid4" : "cardGrid3";
  return `
<section class="cardSection${tone === "band" ? " cardSectionBand" : ""}">
  <div class="container">
    ${heading ? centeredHead(heading) : ""}
    <ul class="cardGrid ${colClass}">
      ${cards
        .map(
          (card) => `
        <li>
          <a href="${esc(card.href || "#")}" class="mediaCard">
            ${
              card.image
                ? `<div class="mediaCardMedia"><img class="mediaCardImg" src="${img(card.image)}" alt="" /></div>`
                : ""
            }
            <div class="mediaCardBody">
              ${card.meta ? `<p class="mediaCardMeta">${esc(card.meta)}</p>` : ""}
              <h3>${esc(card.title)}</h3>
              <p>${esc(card.body)}</p>
            </div>
          </a>
        </li>`
        )
        .join("")}
    </ul>
  </div>
</section>`;
}

function featureCallout(block, band = "white") {
  if (!block) return "";
  return `
<section class="featureCallout ${block.align === "right" ? "featureCalloutRight" : ""} ${band === "gray" ? "featureCalloutGray" : ""}">
  <div class="featureCalloutMedia">
    <img class="featureCalloutImg" src="${img(block.image)}" alt="" />
  </div>
  <div class="featureCalloutCopy">
    ${block.eyebrow ? `<p class="featureCalloutEyebrow">${esc(block.eyebrow)}</p>` : ""}
    <h2>${esc(block.title)}</h2>
    <p>${esc(block.body)}</p>
    ${block.cta ? `<a href="${esc(block.cta.href)}" class="btn btn-green">${esc(block.cta.label)}</a>` : ""}
  </div>
</section>`;
}

function blueLogoCallout(callout) {
  if (!callout) return "";
  return `
<section class="blueLogoCallout" aria-label="${esc(callout.title)}">
  <div class="container blueLogoInner">
    <div class="blueLogoMark" aria-hidden="true"><span>${esc(callout.brand || "FOODIE")}</span></div>
    <div class="blueLogoCopy">
      <h2>${esc(callout.title)}</h2>
      <p>${esc(callout.body)}</p>
      <a href="${esc(callout.cta.href)}" class="btn btn-white-border">${esc(callout.cta.label)}</a>
    </div>
  </div>
</section>`;
}

function ctaBand(cta) {
  if (!cta) return "";
  return `
<section class="ctaBand">
  <div class="container ctaInner">
    <h2>${esc(cta.title)}</h2>
    <p>${esc(cta.body)}</p>
    <div class="ctaActions">
      <a href="${esc(cta.primary.href)}" class="btn btn-green">${esc(cta.primary.label)}</a>
      ${cta.secondary ? `<a href="${esc(cta.secondary.href)}" class="btn btn-outline-white">${esc(cta.secondary.label)}</a>` : ""}
    </div>
  </div>
</section>`;
}

function formFields(form) {
  const fields = form.fields
    .map((field) => {
      if (field.type === "textarea") {
        return `<label class="field"><span>${esc(field.label)}</span><textarea name="${esc(field.name)}" rows="5" placeholder="Escribe aquí…"></textarea></label>`;
      }
      return `<label class="field"><span>${esc(field.label)}</span><input type="${esc(field.type)}" name="${esc(field.name)}" placeholder="${field.type === "search" ? "Buscar…" : "Escribe aquí"}" /></label>`;
    })
    .join("");
  return `<form action="${esc(form.kind === "search" ? "/search" : "#")}" method="get" class="formStack">${fields}<button type="submit" class="btn btn-green">${esc(form.submit)}</button></form>`;
}

function quoteBand() {
  return `
<section class="quoteBand">
  <div class="container">
    ${centeredHead("Lo que dicen nuestros clientes")}
    <blockquote class="quoteBlock">
      <p class="quoteText">“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.”</p>
      <footer><strong>Dimple y Sumesh Bakshi</strong><span>Clientes · Restaurante familiar</span></footer>
    </blockquote>
    <div class="quoteDots" aria-hidden="true"><span class="quoteDotActive"></span><span></span><span></span></div>
  </div>
</section>`;
}

function familyTabs(heading, cards) {
  const items = (cards || []).slice(0, 4);
  if (!items.length) return "";
  const tabs = items
    .map(
      (card, i) => `
      <li role="presentation">
        <button type="button" role="tab" aria-selected="${i === 0}" class="familyTab${i === 0 ? " familyTabActive" : ""}" data-family-tab="${i}">${esc(card.title)}</button>
      </li>`
    )
    .join("");
  const panels = items
    .map(
      (card, i) => `
    <div class="familyPanel" role="tabpanel" data-family-panel="${i}" ${i === 0 ? "" : "hidden"}>
      <div class="familyPanelMedia">${card.image ? `<img class="familyPanelImg" src="${img(card.image)}" alt="" />` : ""}</div>
      <div class="familyPanelCopy">
        <h3>${esc(card.title)}</h3>
        <p>${esc(card.body)}</p>
        <a href="${esc(card.href || "#")}" class="btn btn-green">CONOCE MÁS</a>
      </div>
    </div>`
    )
    .join("");
  return `
<section class="familySection" data-family-tabs>
  <div class="container">
    <header class="familyHead"><h2>${esc(heading)}</h2></header>
    <ul class="familyTabs" role="tablist" aria-label="${esc(heading)}">${tabs}</ul>
    ${panels}
  </div>
</section>`;
}

function introBand(paragraphs) {
  if (!paragraphs?.length) return "";
  return `<section class="introBand"><div class="container introInner">${paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}</div></section>`;
}

/* ---------- Layouts ---------- */

function renderInterior(c) {
  switch (c.template) {
    case "hub-about":
      return `<main class="main">
        ${photoHero(c, { tall: true })}
        ${
          c.stats?.length
            ? `<section class="hubStats" aria-label="Destacados"><div class="container hubStatsGrid">${c.stats.map((s) => `<div><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`).join("")}</div></section>`
            : ""
        }
        ${cardGrid(c.cardsHeading || "Explorar", c.cards, 3)}
        ${featureGrid(c.featuresHeading || "Quiénes somos", c.features)}
        ${(c.splits || []).map((b) => featureCallout(b)).join("")}
        ${ctaBand(c.cta)}
      </main>`;

    case "story": {
      const familyCards = c.cards?.length
        ? c.cards
        : (c.features || []).slice(0, 4).map((f, i) => ({
            title: f.title,
            body: f.body,
            image: c.splits?.[i % (c.splits.length || 1)]?.image || c.heroImage,
            href: c.href,
          }));
      const careerCards = c.list?.length
        ? c.list.map((item, i) => ({
            title: item.title,
            body: item.body,
            href: item.href || "/careers",
            meta: item.meta,
            image: ["/section-kitchen.jpg", "/section-cold.jpg", "/cta.jpg"][i % 3],
          }))
        : (c.features || []).slice(0, 3).map((f, i) => ({
            title: f.title,
            body: f.body,
            href: "/careers",
            image: ["/section-kitchen.jpg", "/section-cold.jpg", "/cta.jpg"][i % 3],
          }));
      return `<main class="main">
        ${photoHero(c, { tall: true })}
        ${familyTabs(c.cardsHeading || "La familia Sysco", familyCards)}
        ${quoteBand()}
        ${c.splits?.[0] ? featureCallout({ ...c.splits[0], align: "left" }) : ""}
        ${cardGrid(c.listHeading || c.featuresHeading || "Oportunidades frescas cada día", careerCards, 3)}
        ${(c.splits || []).slice(1).map((b) => featureCallout(b)).join("")}
        ${ctaBand(c.cta)}
      </main>`;
    }

    case "purpose":
      return `<main class="main mainPadded">
        <section class="purposeHero">
          <div class="container">
            <p class="purposeEyebrow">${esc(c.sectionLabel || "Nuestro propósito")}</p>
            <h1 class="purposeHeadline">${esc(c.title === "Nuestro propósito" ? "Conectando al mundo para compartir comida y cuidarnos unos a otros" : c.title)}</h1>
            <p class="purposeLead">${esc(c.lead)}</p>
          </div>
        </section>
        <section class="purposeVideo">
          <div class="container">
            <div class="purposeVideoFrame">
              <img class="purposeVideoImg" src="${img(c.heroImage || "/section-kitchen.jpg")}" alt="" />
              <div class="purposeVideoShade"></div>
              <button type="button" class="playBtn" aria-label="Reproducir">▶</button>
              <p class="purposeVideoCaption">¿Cómo se ve cuando estamos en nuestro mejor momento?</p>
            </div>
          </div>
        </section>
        ${
          c.features?.length
            ? `<section class="ingredients"><div class="container">${centeredHead(c.featuresHeading || "Nuestros ingredientes para el éxito")}<ul class="ingredientsGrid">${c.features.map((f) => `<li><h3>${esc(f.title)}</h3><p>${esc(f.body)}</p></li>`).join("")}</ul></div></section>`
            : ""
        }
        ${cardGrid(c.cardsHeading || "Más videos sobre nuestro propósito", c.cards, 2)}
        ${ctaBand(c.cta)}
      </main>`;

    case "news":
      return `<main class="main">
        ${photoHero(c, { tall: true })}
        ${
          c.cards?.length
            ? `<section class="newsMosaic"><div class="container">${c.lead ? `<p class="newsIntro">${esc(c.lead)}</p>` : ""}<ul class="newsMosaicGrid">${c.cards
                .slice(0, 4)
                .map(
                  (card) => `<li><a href="${esc(card.href || c.href)}" class="newsMosaicTile">${card.image ? `<img class="newsMosaicImg" src="${img(card.image)}" alt="" />` : ""}<div class="newsMosaicShade"></div><div class="newsMosaicBody"><h3>${esc(card.title)}</h3><p>${esc(card.body)}</p></div></a></li>`
                )
                .join("")}</ul></div></section>`
            : ""
        }
        ${ctaBand(c.cta)}
      </main>`;

    case "events":
      return `<main class="main">
        ${photoHero(c)}
        ${
          c.list?.length
            ? `<section class="eventsList"><div class="container">${centeredHead(c.listHeading || "Otros eventos Sysco")}<ul class="eventsUl">${c.list
                .map((item) => {
                  const dateBits = (item.meta || "Por confirmar").split("·")[0]?.trim() || "Por confirmar";
                  return `<li><a href="${esc(item.href || c.href)}" class="eventRow"><div class="eventDate">${esc(dateBits)}</div><div class="eventBody"><strong>${esc(item.title)}</strong><p>${esc(item.body)}</p></div><span class="eventCta">Detalles</span></a></li>`;
                })
                .join("")}</ul></div></section>`
            : ""
        }
        ${ctaBand(c.cta)}
      </main>`;

    case "management":
      return `<main class="main">
        ${photoHero(c, { tall: true })}
        ${
          c.bios?.length
            ? `<section class="bioGrid"><div class="container">${centeredHead("Conoce al equipo directivo")}<ul class="bioUl">${c.bios
                .map(
                  (bio) => `<li class="bioCard"><div class="bioMedia"><img class="bioImg" src="${img(bio.image)}" alt="" /></div><div><h3>${esc(bio.name)}</h3><p class="bioRole">${esc(bio.role)}</p><p>${esc(bio.body)}</p></div></li>`
                )
                .join("")}</ul></div></section>`
            : ""
        }
        ${ctaBand(c.cta)}
      </main>`;

    case "report":
      return `<main class="main">
        ${photoHero(c)}
        ${
          c.stats?.length
            ? `<section class="reportStats" aria-label="Destacados"><div class="container reportStatsGrid">${c.stats.map((s) => `<div><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`).join("")}</div></section>`
            : ""
        }
        ${
          c.list?.length
            ? `<section class="reportDocs"><div class="container">${centeredHead(c.listHeading || "Informes anuales")}<ul class="docList">${c.list
                .map(
                  (item) => `<li><a href="${esc(item.href || c.href)}" class="docItem">${item.meta ? `<span class="meta">${esc(item.meta)}</span>` : ""}<strong>${esc(item.title)}</strong><p>${esc(item.body)}</p><span class="docDl">Descargar</span></a></li>`
                )
                .join("")}</ul></div></section>`
            : ""
        }
        ${ctaBand(c.cta)}
      </main>`;

    case "hub-products":
      return `<main class="main productsShell">
        ${photoHero({ ...c, title: "Nuestros productos" }, { tall: true, showCrumbs: false })}
        ${imageTileGrid(c.cardsHeading || "Nuestras categorías de productos", c.cards, 3)}
        ${c.splits?.[0] ? featureCallout({ ...c.splits[0], title: c.splits[0].title || "Soluciones de vanguardia" }, "gray") : ""}
        ${cardGrid(c.specialtyHeading || "Alimentos especializados", c.specialtyCards, 3, "band")}
        ${cardGrid(c.recipeHeading || "Recetas destacadas", c.recipeCards, 3)}
        ${blueLogoCallout(c.logoCallout)}
        ${cardGrid(c.resourceHeading || "Recursos de producto", c.resourceCards, 3, "band")}
      </main>`;

    case "products": {
      const v = c.productsVariant || "default";
      if (v === "brand-family") {
        return `<main class="main productsShell">
          ${photoHero(c, { tall: true })}
          ${imageTileGrid(c.cardsHeading || "Familia de marcas Sysco", c.cards, 3)}
          ${(c.splits || []).map((b) => featureCallout(b, "gray")).join("")}
          ${blueLogoCallout(c.logoCallout)}
          ${cardGrid(c.resourceHeading || "Explora más", c.resourceCards, 3)}
        </main>`;
      }
      if (v === "foodie") {
        return `<main class="main productsShell">
          ${photoHero(c, { tall: true })}
          ${introBand(c.intro)}
          ${blueLogoCallout(c.logoCallout)}
          ${cardGrid(c.recipeHeading || "Recetas destacadas", c.recipeCards, 3)}
          ${cardGrid(c.cardsHeading || "Explora Foodie", c.cards, 3, "band")}
          ${(c.splits || []).map((b) => featureCallout(b)).join("")}
        </main>`;
      }
      if (v === "quality") {
        return `<main class="main productsShell">
          ${photoHero(c, { tall: true })}
          ${introBand(c.intro)}
          ${featureGrid(c.featuresHeading || "Nuestro compromiso", c.features)}
          ${(c.splits || []).map((b, i) => featureCallout(b, i % 2 === 0 ? "gray" : "white")).join("")}
          ${cardGrid(c.resourceHeading || "Recursos", c.resourceCards, 3, "band")}
        </main>`;
      }
      const useCards = ["specialty", "services", "culinary", "technology", "multicultural"].includes(v);
      return `<main class="main productsShell">
        ${photoHero(c, { tall: true })}
        ${introBand(c.intro)}
        ${
          useCards
            ? cardGrid(c.cardsHeading || "Explora la oferta", c.cards, 3)
            : imageTileGrid(c.cardsHeading || "Explora la oferta", c.cards, 3)
        }
        ${(c.splits || []).map((b, i) => featureCallout(b, i % 2 === 0 ? "gray" : "white")).join("")}
        ${blueLogoCallout(c.logoCallout)}
        ${cardGrid(c.resourceHeading || "Recursos de producto", c.resourceCards, 3, "band")}
      </main>`;
    }

    case "hub-customers":
      return `<main class="main">
        <section class="custHero">
          <img class="custHeroImg" src="${img(c.heroImage)}" alt="" />
          <div class="custHeroShade"></div>
          <div class="container custHeroInner">
            <h1>${esc(c.title)}</h1>
            <p>${esc(c.lead)}</p>
            <div class="custActions">
              <a href="/become-a-customer" class="btn btn-green">Hazte cliente</a>
              <a href="/shop-now" class="btn btn-outline-white">Compra ahora</a>
            </div>
          </div>
        </section>
        ${
          c.cards?.length
            ? `<section class="segGrid" aria-label="A quiénes servimos"><ul class="segUl">${c.cards
                .map(
                  (card) => `<li><a href="${esc(card.href || "/customers")}" class="segTile">${card.image ? `<img class="segTileImg" src="${img(card.image)}" alt="" />` : ""}<div class="segTileShade"></div><div class="segTileBody"><h3>${esc(card.title)}</h3><p>${esc(card.body)}</p></div></a></li>`
                )
                .join("")}</ul></section>`
            : ""
        }
        ${ctaBand(c.cta)}
      </main>`;

    case "segment": {
      const introSplit = c.splits?.[0];
      const moreSplits = (c.splits || []).slice(1);
      const featureCards = (c.features || []).slice(0, 3).map((f, i) => ({
        title: f.title,
        body: f.body,
        href: "/become-a-customer",
        image: ["/section-kitchen.jpg", "/section-produce.jpg", "/card-2.jpg"][i],
      }));
      return `<main class="main">
        ${photoHero(c, { tall: true, showCrumbs: true })}
        ${
          introSplit
            ? `<section class="introSplit"><div class="introMedia"><img class="introImg" src="${img(introSplit.image)}" alt="" /></div><div class="introCopy"><h2>${esc(introSplit.title || "En el corazón de la comida y el servicio")}</h2><div class="introRule" aria-hidden="true"></div><p>${esc(introSplit.body)}</p>${(c.intro || []).slice(0, 1).map((p) => `<p>${esc(p)}</p>`).join("")}</div></section>`
            : ""
        }
        ${cardGrid(c.featuresHeading || "El poder de la alianza", featureCards, 3)}
        ${moreSplits.map((b) => featureCallout(b)).join("")}
        ${
          c.cards?.length
            ? `<section class="oneSysco"><div class="container">${centeredHead(c.cardsHeading || "One Sysco")}<ul class="specialtyGrid">${c.cards
                .map(
                  (card) => `<li><a href="${esc(card.href || "/customers")}" class="specialtyCard">${card.image ? `<div class="specialtyMedia"><img class="specialtyImg" src="${img(card.image)}" alt="" /></div>` : ""}<h3>${esc(card.title)}</h3><p>${esc(card.body)}</p></a></li>`
                )
                .join("")}</ul></div></section>`
            : ""
        }
        ${
          c.stats?.length
            ? `<section class="statsRow" aria-label="Destacados"><div class="container statsGrid">${c.stats.map((s) => `<div><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`).join("")}</div></section>`
            : ""
        }
        ${ctaBand(c.cta)}
      </main>`;
    }

    case "hub-suppliers":
    case "suppliers":
      return `<main class="main">
        ${photoHero(c, { tall: true })}
        ${
          c.list?.length || c.cards?.length
            ? `<section class="supResources"><div class="container">${centeredHead(c.listHeading || c.cardsHeading || "Recursos")}<ul class="supResUl">${(c.list || c.cards || [])
                .map((item) => `<li><a href="${esc(item.href || "/suppliers")}">${item.meta ? `<span class="meta">${esc(item.meta)}</span>` : ""}<strong>${esc(item.title)}</strong><p>${esc(item.body)}</p></a></li>`)
                .join("")}</ul></div></section>`
            : ""
        }
        ${cardGrid(
          c.featuresHeading || "Alianza",
          (c.features || []).map((f, i) => ({
            title: f.title,
            body: f.body,
            href: "/suppliers",
            image: ["/section-cold.jpg", "/section-produce.jpg", "/cta.jpg"][i % 3],
          })),
          3
        )}
        ${ctaBand(c.cta)}
      </main>`;

    case "investors": {
      const toolCards =
        c.cards?.length
          ? c.cards
          : (c.features || []).map((f, i) => ({
              title: f.title,
              body: f.body,
              href: "/investors",
              image: ["/cta.jpg", "/section-cold.jpg", "/hero.jpg", "/section-produce.jpg"][i % 4],
            }));
      return `<main class="main">
        ${photoHero(c, { tall: true })}
        <section class="irIntro"><div class="container"><h2>Líder global en distribución de foodservice</h2><p>${esc(c.lead)}</p></div></section>
        ${
          toolCards.length
            ? `<section class="irToolsGrid"><div class="container"><ul class="irToolUl">${toolCards.map((card) => `<li><a href="${esc(card.href || "/investors")}" class="irToolCard"><h3>${esc(card.title)}</h3><p>${esc(card.body)}</p></a></li>`).join("")}</ul></div></section>`
            : ""
        }
        <section class="irColumns"><div class="container irGrid">
          <div class="irPanel"><h2>${esc(c.listHeading || "Comunicados recientes")}</h2>
            <ul class="irTable">${(c.list || []).map((item) => `<li><a href="${esc(item.href || c.href)}">${item.meta ? `<span class="meta">${esc(item.meta)}</span>` : ""}<strong>${esc(item.title)}</strong><p>${esc(item.body)}</p></a></li>`).join("")}</ul>
          </div>
          <div class="irPanel"><h2>${esc(c.featuresHeading || "Gobierno y contactos")}</h2>
            <ul class="irTools">${(c.features || []).map((f) => `<li><a href="/investors">${esc(f.title)}<p>${esc(f.body)}</p></a></li>`).join("")}</ul>
          </div>
        </div></section>
        ${ctaBand(c.cta)}
      </main>`;
    }

    case "careers":
      return `<main class="main">
        ${photoHero(c, { tall: true, showCrumbs: false })}
        <section class="jobSearchBridge" aria-label="Buscar empleos">
          <form class="container jobSearchForm" action="/careers" method="get">
            <label><span>Buscar por palabra clave</span><input type="search" name="q" placeholder="p. ej. puesto, categoría o habilidades" /></label>
            <label><span>Ubicación</span><input type="text" name="loc" placeholder="Ciudad, estado o país" /></label>
            <label><span>Radio</span><select name="radius"><option value="25">25 km</option><option value="50" selected>50 km</option><option value="100">100 km</option></select></label>
            <button type="submit">Buscar empleos</button>
          </form>
        </section>
        ${
          c.cards?.length
            ? `<section class="paths" aria-label="Carreras destacadas"><div class="container" style="padding-top:48px">${centeredHead(c.cardsHeading || "Carreras destacadas")}</div><ul class="pathsUl">${c.cards
                .map(
                  (card) => `<li><a href="${esc(card.href || "/careers")}" class="pathTile">${card.image ? `<img class="pathImg" src="${img(card.image)}" alt="" />` : ""}<div class="pathShade"></div><div class="pathBody"><h3>${esc(card.title)}</h3><p>${esc(card.body)}</p><span class="pathCta">Ver vacantes</span></div></a></li>`
                )
                .join("")}</ul></section>`
            : ""
        }
        ${
          c.features?.length
            ? `<section class="culture"><div class="container">${centeredHead(c.featuresHeading || "Nuestra cultura")}<ul class="cultureGrid">${c.features.map((f) => `<li><h3>${esc(f.title)}</h3><p>${esc(f.body)}</p></li>`).join("")}</ul></div></section>`
            : ""
        }
        ${
          c.list?.length
            ? `<section class="openings"><div class="container">${centeredHead(c.listHeading || "Vacantes destacadas")}<ul class="openingsUl">${c.list
                .map(
                  (item) => `<li><a href="${esc(item.href || "/careers")}">${item.meta ? `<span class="meta">${esc(item.meta)}</span>` : ""}<strong>${esc(item.title)}</strong><p>${esc(item.body)}</p><span class="apply">Postularse</span></a></li>`
                )
                .join("")}</ul></div></section>`
            : ""
        }
        ${ctaBand(c.cta)}
      </main>`;

    case "sustainability": {
      const report = c.splits?.[0];
      return `<main class="main">
        ${photoHero({ ...c, title: c.title === "Sustentabilidad" ? "Juntos, podemos asegurar el futuro de la comida" : c.title }, { tall: true })}
        ${
          report
            ? `<section class="sustReport"><div class="container sustReportGrid"><div class="sustReportCopy"><h2>${esc(c.cardsHeading || "Informe de sustentabilidad")}</h2><div class="sustRule" aria-hidden="true"></div><p class="sustReportLead">${esc(report.title)}</p><p>${esc(report.body)}</p></div><a href="${esc(report.cta?.href || "/sustainability")}" class="sustReportCard"><img class="sustReportImg" src="${img(report.image)}" alt="" /><div class="sustReportShade"></div><div class="sustReportCardBody"><h3>${esc(report.cta?.label || "Asegurar el futuro de la comida")}</h3><p>Construyendo juntos un sistema alimentario más resiliente</p></div></a></div></section>`
            : ""
        }
        ${
          c.stats?.length
            ? `<section class="sustStats" aria-label="Avances"><div class="container">${centeredHead("Avances en sustentabilidad")}<div class="sustStatsGrid">${c.stats.map((s) => `<div><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`).join("")}</div></div></section>`
            : ""
        }
        ${cardGrid("Metas 2030", c.cards, 3)}
        ${ctaBand(c.cta)}
      </main>`;
    }

    case "sustainability-pillar":
      return `<main class="main">
        ${photoHero(c, { tall: true })}
        <section class="pillarContent"><div class="container">
          <div class="pillarProse">${(c.intro || []).map((p) => `<p>${esc(p)}</p>`).join("")}</div>
          ${
            c.features?.length
              ? `${centeredHead(c.featuresHeading || "Áreas de enfoque")}<ul class="focusGrid">${c.features.map((f) => `<li><h3>${esc(f.title)}</h3><p>${esc(f.body)}</p></li>`).join("")}</ul>`
              : ""
          }
        </div></section>
        ${(c.splits || []).map((b) => featureCallout(b)).join("")}
        ${cardGrid(c.cardsHeading || "Más", c.cards, 3)}
        ${ctaBand(c.cta)}
      </main>`;

    case "hub-contact":
      return `<main class="main">
        ${photoHero(c, { tall: true })}
        <section class="pathways"><div class="container">
          ${centeredHead(c.cardsHeading || "Te recomendamos contactar a tu compañía operativa local para la resolución más rápida")}
          ${
            c.cards?.length
              ? `<ul class="pathwayGrid">${c.cards
                  .map(
                    (card) => `<li><a href="${esc(card.href || "/contact")}" class="pathway">${card.image ? `<div class="pathwayMedia"><img class="pathwayImg" src="${img(card.image)}" alt="" /></div>` : ""}<div class="pathwayBody"><h3>${esc(card.title)}</h3><p>${esc(card.body)}</p><span class="pathwayCta">Ir</span></div></a></li>`
                  )
                  .join("")}</ul>`
              : ""
          }
        </div></section>
        ${featureGrid(c.featuresHeading || "Canales de soporte", c.features)}
        ${ctaBand(c.cta)}
      </main>`;

    case "contact":
      return `<main class="main">
        ${photoHero(c, { tall: true })}
        <section class="formPage"><div class="container formLayout">
          <div class="formCopy">
            <h2>${esc(c.form?.heading || c.title)}</h2>
            <p>${esc(c.lead)}</p>
            ${(c.intro || []).slice(0, 1).map((p) => `<p>${esc(p)}</p>`).join("")}
            ${
              c.features?.length
                ? `<ul class="helpList">${c.features.map((f) => `<li><h3>${esc(f.title)}</h3><p>${esc(f.body)}</p></li>`).join("")}</ul>`
                : ""
            }
          </div>
          <div class="formBox">${c.form ? formFields(c.form) : ""}</div>
        </div></section>
        ${cardGrid(undefined, c.cards, 3)}
        ${ctaBand(c.cta)}
      </main>`;

    case "locations":
      return `<main class="main">
        ${photoHero(c, { tall: true })}
        <section class="locSearch" aria-label="Buscar ubicaciones">
          <div class="container locSearchRow">
            <label><span>Ciudad o código postal</span><input type="search" name="q" placeholder="Buscar…" /></label>
            <label><span>Estado</span><select><option value="" disabled selected>Seleccionar</option><option>CDMX</option><option>Jalisco</option><option>Nuevo León</option></select></label>
            <label><span>Tipo</span><select><option value="all">Todas</option><option>Distribución</option><option>Oficina</option></select></label>
            <button type="button" class="btn btn-green">Buscar</button>
          </div>
        </section>
        <div class="mapBand" aria-hidden="true">Mapa · Ubicaciones</div>
        ${
          c.cards?.length
            ? `<section class="locGrid"><div class="container">${centeredHead(c.cardsHeading || "Ubicaciones")}<ul class="locUl">${c.cards
                .map(
                  (card) => `<li><a href="${esc(card.href || "/contact/contact-us")}" class="locCard"><div class="locThumb">${card.image ? `<img class="locImg" src="${img(card.image)}" alt="" />` : ""}</div><div>${card.meta ? `<p class="meta">${esc(card.meta)}</p>` : ""}<h3>${esc(card.title)}</h3><p>${esc(card.body)}</p></div></a></li>`
                )
                .join("")}</ul></div></section>`
            : ""
        }
        ${ctaBand(c.cta)}
      </main>`;

    case "form":
      return `<main class="main">
        ${photoHero(c, { compact: true })}
        <section class="utilPage"><div class="container utilLayout">
          <div class="utilIntro">${(c.intro || []).slice(0, 2).map((p) => `<p>${esc(p)}</p>`).join("")}</div>
          <div class="utilCard">
            <h2 class="utilCardTitle">${esc(c.form?.heading || c.title)}</h2>
            <div class="utilForm">${c.form ? formFields(c.form) : ""}</div>
          </div>
        </div></section>
        ${featureGrid(c.featuresHeading || "Qué esperar", c.features)}
        ${c.splits?.[0] ? featureCallout(c.splits[0]) : ""}
        ${ctaBand(c.cta)}
      </main>`;

    case "search":
      return `<main class="main mainPadded">
        <section class="searchPage"><div class="container">
          <div class="searchHead">
            <h1>${esc(c.title)}</h1>
            <p>${esc(c.lead)}</p>
            <form class="searchForm" action="/search" method="get">
              <input type="search" name="${esc(c.form?.fields?.[0]?.name || "q")}" placeholder="Buscar…" aria-label="Buscar" />
              <button type="submit">${esc(c.form?.submit || "BUSCAR")}</button>
            </form>
          </div>
          ${
            c.list?.length
              ? `<div class="results"><h2>${esc(c.listHeading || "Resultados sugeridos")}</h2><ul class="resultsUl">${c.list.map((item) => `<li><a href="${esc(item.href || "/")}"><strong>${esc(item.title)}</strong><p>${esc(item.body)}</p></a></li>`).join("")}</ul></div>`
              : ""
          }
        </div></section>
        ${featureGrid(c.featuresHeading || "Explora también", c.features)}
        ${ctaBand(c.cta)}
      </main>`;

    default:
      return `<main class="main">
        ${photoHero(c, { tall: true })}
        <section class="defaultBody"><div class="container">
          <div class="defaultProse">${(c.intro || []).map((p) => `<p>${esc(p)}</p>`).join("")}</div>
          ${
            c.features?.length
              ? `<ul class="defaultFeatures">${c.features.map((f) => `<li><h3>${esc(f.title)}</h3><p>${esc(f.body)}</p></li>`).join("")}</ul>`
              : ""
          }
        </div></section>
        ${ctaBand(c.cta)}
      </main>`;
  }
}

function homeBody() {
  const slides = heroSlides
    .map(
      (s, i) => `
      <div class="slide${i === 0 ? " active" : ""}" aria-hidden="${i === 0 ? "false" : "true"}"
        data-headline="${esc(s.headline)}" data-body="${esc(s.body)}" data-cta="${esc(s.cta)}" data-href="${esc(s.href)}">
        <img class="img" src="${img(s.image)}" alt="" />
      </div>`
    )
    .join("");
  const dots = heroSlides
    .map(
      (_, i) =>
        `<button type="button" role="tab" aria-selected="${i === 0}" aria-label="Diapositiva ${i + 1}" class="${i === 0 ? "dotActive" : "dot"}" data-hero-dot="${i}"></button>`
    )
    .join("");
  const sections = photoSections
    .map(
      (section) => `
    <section class="photoSection ${section.align}" aria-label="${esc(section.headline)}">
      <div class="media">
        <img class="img" src="${img(section.image)}" alt="" />
        <div class="shade"></div>
      </div>
      <div class="container copy">
        <h2>${esc(section.headline)}</h2>
        <p>${esc(section.body)}</p>
        <a href="${esc(section.href)}" class="btn btn-green">${esc(section.cta)}</a>
      </div>
    </section>`
    )
    .join("");

  return `
<main>
  <section class="hero" aria-label="Carrusel principal" data-hero>
    ${slides}
    <div class="shade"></div>
    <button type="button" class="arrow prev" aria-label="Diapositiva anterior" data-hero-prev>‹</button>
    <button type="button" class="arrow next" aria-label="Diapositiva siguiente" data-hero-next>›</button>
    <div class="content">
      <h1 data-hero-headline>${esc(heroSlides[0].headline)}</h1>
      <p data-hero-body>${esc(heroSlides[0].body)}</p>
      <a href="${esc(heroSlides[0].href)}" class="btn btn-green" data-hero-cta>${esc(heroSlides[0].cta)}</a>
    </div>
    <div class="dots" role="tablist" aria-label="Diapositivas">${dots}</div>
  </section>

  <section class="partnerBanner" aria-label="Banner de socios">
    <div class="container partnerInner">
      <div class="partnerLogos">
        <div class="partnerBrand">
          <img src="${img(site.logo.src)}" alt="${esc(site.logo.alt)}" width="180" height="44" />
          <p>${esc(partnerBanner.leftTagline)}</p>
        </div>
        <div class="partnerDivider" aria-hidden="true"></div>
        <div class="partnerSeal" aria-hidden="true"><span>${esc(partnerBanner.rightLabel)}</span></div>
      </div>
      <h2>${esc(partnerBanner.headline)}</h2>
      <a href="${esc(partnerBanner.href)}" class="btn btn-outline-white">${esc(partnerBanner.cta)}</a>
    </div>
  </section>
  ${sections}
</main>`;
}

/* ---------- Write pages ---------- */

function writePage(relPath, html) {
  const full = join(SITE, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, html);
}

const homeHtml = documentShell({
  title: site.title,
  pathname: "/",
  body: homeBody(),
  extraScripts: `<script src="/js/hero.js" defer></script>`,
});
writePage("index.html", homeHtml);

let count = 1;
for (const [href, content] of Object.entries(interiors)) {
  const html = documentShell({
    title: content.title,
    pathname: href,
    body: renderInterior(content),
    extraScripts: content.template === "story" ? `<script src="/js/family-tabs.js" defer></script>` : "",
  });
  writePage(pagePath(href), html);
  count++;
}

// 404
writePage(
  "404.html",
  documentShell({
    title: "Página no encontrada",
    pathname: "/404",
    body: `<main class="main mainPadded"><section class="searchPage"><div class="container searchHead"><h1>404</h1><p>No encontramos esa página.</p><a href="/" class="btn btn-green">Ir al inicio</a></div></section></main>`,
  })
);

console.log(`Generated ${count} pages (+ 404) under site/`);
