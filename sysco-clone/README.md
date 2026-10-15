# Sysco-layout homepage clone (Frescos del Valle)

Visual marketing homepage inspired by [sysco.com](https://www.sysco.com), branded with the Frescos del Valle logo. Body copy is lorem ipsum; **nav labels match Sysco**.

## Edit content

Homepage copy/media: [`src/content/home.ts`](src/content/home.ts)  
Nav tree + utility routes: [`src/content/nav.ts`](src/content/nav.ts)  
Interior page blueprints (templates by section type): [`src/content/interiors.ts`](src/content/interiors.ts)

Components:

- `src/components/Header.tsx` — utility bar, mega-menus, Search / Shop Now / Become A Customer / Sign In
- `src/components/Hero.tsx` — carousel (arrows + dots)
- `src/components/PartnerBanner.tsx` — blue co-brand band
- `src/components/PhotoSections.tsx` — full-bleed photo bands
- `src/components/InteriorPage.tsx` — shared interior layout (hero, cards, splits, forms, CTA)
- `src/components/Footer.tsx`
- `src/components/CookieBanner.tsx`

Homepage: `src/app/page.tsx` · Interiors: `src/app/[...slug]/page.tsx`

## Run locally

```bash
cd sysco-clone
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Logo: `public/logo-frescos-del-valle.png` (from repo `img/logo-frescos-del-valle.png`).
