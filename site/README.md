# Frescos del Valle — vanilla site

Static HTML / CSS / JS port of the Sysco-style clone. No React, no Next.js, no build step to view.

## Preview locally

From the repo root:

```bash
# Option A — npx serve (recommended)
npx --yes serve site -l 4173

# Option B — Python
python3 -m http.server 4173 --directory site
```

Then open [http://localhost:4173](http://localhost:4173).

## Folder layout

```
site/
  index.html          # homepage
  about/…             # interiors (route → folder/index.html)
  products/…
  css/site.css        # consolidated styles
  js/                 # chrome, hero carousel, family tabs, content.json
  img/                # assets from sysco-clone/public
  scripts/generate.mjs # optional regen from content.json
  vercel.json
  README.md
```

## Regenerate pages (optional)

If you edit `js/content.json` (or re-dump from `sysco-clone`):

```bash
node site/scripts/generate.mjs
```

## Vercel

Set the project **Root Directory** to `site` (static). Do not deploy production unless asked to **push**.

The Next.js app remains in `sysco-clone/` for reference until migration is complete.
