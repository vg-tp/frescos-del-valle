# Sysco-layout homepage clone (Frescos del Valle)

Visual marketing homepage inspired by [sysco.com](https://www.sysco.com), branded with the Frescos del Valle logo. Body copy is lorem ipsum; **nav labels match Sysco**.

## Edit content

All editable copy and image paths: [`src/content/home.ts`](src/content/home.ts)

Components (one file per section):

- `src/components/Header.tsx` — utility bar, transparent/solid nav, Search / Shop Now / Become A Customer / Sign In
- `src/components/Hero.tsx` — carousel (arrows + dots)
- `src/components/PartnerBanner.tsx` — blue co-brand band
- `src/components/PhotoSections.tsx` — full-bleed photo bands
- `src/components/Footer.tsx`
- `src/components/CookieBanner.tsx`

Page composition: `src/app/page.tsx`

## Run locally

```bash
cd sysco-clone
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Logo: `public/logo-frescos-del-valle.png` (from repo `img/logo-frescos-del-valle.png`).
