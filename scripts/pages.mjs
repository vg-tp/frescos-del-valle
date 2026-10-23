import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const site = JSON.parse(fs.readFileSync(path.join(root, "data/site.json"), "utf8"));

const words = (value) => value.trim().split(/\s+/).filter(Boolean).length;
const check = (value, min, max, maxWords, where) => {
  const len = [...value].length;
  if (len < min || len > max || (maxWords && words(value) > maxWords)) {
    throw new Error(`${where} is ${len} chars / ${words(value)} words`);
  }
};

const rules = {
  kicker: (v, w) => check(v, 8, 12, null, w),
  sectionTitle: (v, w) => check(v, 24, 32, null, w),
  support: (v, w) => check(v, 110, 150, null, w),
  intro: (v, w) => check(v, 110, 150, null, w),
  outro: (v, w) => check(v, 110, 150, null, w),
  sideSupport: (v, w) => check(v, 110, 150, null, w),
  blurb: (v, w) => check(v, 110, 150, null, w),
  thanks: (v, w) => check(v, 110, 150, null, w),
  empty: (v, w) => check(v, 110, 150, null, w),
  h1: (v, w) => check(v, 1, 40, 6, w),
  h2: (v, w) => check(v, 1, 52, 8, w),
  h2b: (v, w) => check(v, 1, 52, 8, w),
  relatedTitle: (v, w) => check(v, 1, 52, 8, w),
  h3: (v, w) => check(v, 1, 32, 5, w),
  phrase: (v, w) => check(v, 22, 32, null, w),
  alt: (v, w) => check(v, 1, 32, 5, w),
  label: (v, w) => check(v, 2, 32, 6, w),
  skip: (v, w) => check(v, 2, 32, 6, w),
  legal: (v, w) => check(v, 20, 140, null, w),
};

function walk(node, trail) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    node.forEach((item, index) => walk(item, `${trail}/${index}`));
    return;
  }
  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith("_")) continue;
    const where = `${trail}.${key}`;
    if (typeof value === "string") {
      if (/sysco/i.test(value)) throw new Error(`${where} uses a forbidden name`);
      if (rules[key]) rules[key](value, where);
    } else {
      walk(value, where);
    }
  }
}

walk(site, "site");

const htmlFor = (page) => `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${site.brand}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/css/styles.css" />
</head>
<body class="${page.template === "home" ? "home" : "interior"}" data-page="${page.id}">
  <a class="skip" href="#contenido">${site.skip}</a>
  <div id="app"></div>
  <script src="/js/site.js" type="module"></script>
</body>
</html>
`;

for (const page of site.pages) {
  const file = page.href === "/" ? "index.html" : `${page.href.slice(1)}.html`;
  const dest = path.join(root, file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, htmlFor(page));
  if (page.href === "/nunc") {
    fs.writeFileSync(path.join(root, "nunc/index.html"), htmlFor(page));
  }
}

console.log(`validated and wrote ${site.pages.length} pages`);
