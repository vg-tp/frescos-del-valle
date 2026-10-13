# Sysco-layout homepage clone (Frescos del Valle)

Visual marketing homepage inspired by [sysco.com](https://www.sysco.com), branded with the Frescos del Valle logo. Body copy is lorem ipsum; **nav labels match Sysco**.

## Edit content

All editable copy and image paths: [`src/content/home.ts`](src/content/home.ts)

Components (one file per section):

- `src/components/Header.tsx` — announcement, nav, Sign In, Shop Now
- `src/components/Hero.tsx`
- `src/components/FeatureStrip.tsx`
- `src/components/SplitSection.tsx`
- `src/components/CardsSection.tsx`
- `src/components/SpecialtyBand.tsx`
- `src/components/CtaBand.tsx`
- `src/components/Footer.tsx`

Page composition: `src/app/page.tsx`

## Run locally

```bash
cd sysco-clone
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Logo asset: `public/logo-frescos-del-valle.png` (from repo `img/logo-frescos-del-valle.png`).
