/**
 * Full interior page blueprints for every Sysco-nav destination.
 * Labels stay Sysco; body copy is lorem. Each family maps to a distinct layout.
 */

import {
  allPages,
  lorem,
  navItems,
  type NavPage,
  type PageMeta,
} from "./nav";

/** Page-type keys — each maps to a visually distinct layout component. */
export type InteriorTemplate =
  | "hub-about"
  | "hub-customers"
  | "hub-suppliers"
  | "hub-contact"
  | "hub-products"
  | "story"
  | "management"
  | "report"
  | "news"
  | "events"
  | "products"
  | "segment"
  | "suppliers"
  | "investors"
  | "careers"
  | "sustainability"
  | "sustainability-pillar"
  | "contact"
  | "locations"
  | "form"
  | "search"
  | "default";

export type CardItem = {
  title: string;
  body: string;
  href?: string;
  image?: string;
  meta?: string;
};

export type SplitBlock = {
  eyebrow?: string;
  title: string;
  body: string;
  image: string;
  align: "left" | "right";
  cta?: { label: string; href: string };
};

export type StatItem = { value: string; label: string };

export type ListItem = {
  title: string;
  body: string;
  meta?: string;
  href?: string;
};

export type TimelineItem = { year: string; title: string; body: string };

export type BioItem = {
  name: string;
  role: string;
  body: string;
  image: string;
};

export type InteriorContent = {
  href: string;
  title: string;
  template: InteriorTemplate;
  heroImage: string;
  lead: string;
  intro: string[];
  cards?: CardItem[];
  cardsHeading?: string;
  splits?: SplitBlock[];
  stats?: StatItem[];
  list?: ListItem[];
  listHeading?: string;
  features?: { title: string; body: string }[];
  featuresHeading?: string;
  timeline?: TimelineItem[];
  bios?: BioItem[];
  cta?: {
    title: string;
    body: string;
    primary: NavPage;
    secondary?: NavPage;
  };
  form?: {
    kind: "contact" | "signin" | "become" | "shop" | "search" | "care";
    heading: string;
    fields: { label: string; type: string; name: string }[];
    submit: string;
  };
  related?: NavPage[];
  parentLabel?: string;
  parentHref?: string;
  sectionLabel?: string;
};

const IMAGES = [
  "/hero.jpg",
  "/section-produce.jpg",
  "/section-kitchen.jpg",
  "/section-cold.jpg",
  "/cta.jpg",
  "/card-1.jpg",
  "/card-2.jpg",
  "/card-3.jpg",
  "/card-4.jpg",
] as const;

function img(i: number) {
  return IMAGES[i % IMAGES.length];
}

function pickTemplate(page: PageMeta): InteriorTemplate {
  const h = page.href;
  if (h === "/search") return "search";
  if (h === "/sign-in" || h === "/become-a-customer" || h === "/shop-now")
    return "form";
  if (h === "/contact/contact-us" || h === "/contact/customer-care")
    return "contact";
  if (h === "/contact/our-locations") return "locations";
  if (h === "/careers") return "careers";
  if (h === "/investors") return "investors";
  if (h === "/about/sysco-today/newsroom") return "news";
  if (h === "/about/sysco-today/events") return "events";
  if (h === "/about/our-people/our-management") return "management";
  if (h === "/about/company-profile/annual-report") return "report";
  if (h === "/about") return "hub-about";
  if (h === "/customers") return "hub-customers";
  if (h === "/suppliers") return "hub-suppliers";
  if (h === "/contact") return "hub-contact";
  if (h === "/products") return "hub-products";
  if (h === "/sustainability") return "sustainability";
  if (h.startsWith("/sustainability/")) return "sustainability-pillar";
  if (h.startsWith("/customers/who-we-serve/")) return "segment";
  if (h.startsWith("/products/")) return "products";
  if (h.startsWith("/suppliers/")) return "suppliers";
  if (h.startsWith("/about/")) return "story";
  return "default";
}

function childLinks(page: PageMeta): NavPage[] {
  const item = navItems.find(
    (n) => n.href === page.href || n.href === page.parentHref,
  );
  if (!item) return page.related || [];
  if (page.href === item.href) {
    return item.columns.flatMap((c) => c.pages);
  }
  return page.related || [];
}

function para(seed: number): string {
  return lorem.body[seed % lorem.body.length];
}

function buildCards(page: PageMeta, count = 6): CardItem[] {
  const children = childLinks(page);
  if (children.length) {
    return children.map((c, i) => ({
      title: c.label,
      body: lorem.lead,
      href: c.href,
      image: img(i + 2),
    }));
  }
  return Array.from({ length: count }, (_, i) => ({
    title: `Lorem ipsum ${i + 1}`,
    body: lorem.lead,
    image: img(i + 1),
    href: page.parentHref || "/contact/contact-us",
  }));
}

function buildSplits(page: PageMeta): SplitBlock[] {
  return [
    {
      eyebrow: page.sectionLabel || page.parentLabel || page.title,
      title: "Lorem ipsum dolor sit amet",
      body: para(0),
      image: img(1),
      align: "left",
      cta: { label: "CONOCE MÁS", href: "/contact/contact-us" },
    },
    {
      title: "Consectetur adipiscing elit",
      body: para(1),
      image: img(3),
      align: "right",
      cta: { label: "EXPLORAR", href: page.parentHref || "/products" },
    },
  ];
}

function buildStats(): StatItem[] {
  return [
    { value: "Lorem", label: "Ipsum dolor" },
    { value: "99+", label: "Sit amet" },
    { value: "24/7", label: "Consectetur" },
    { value: "1.2k", label: "Adipiscing" },
  ];
}

function buildFeatures(): { title: string; body: string }[] {
  return [
    { title: "Lorem ipsum", body: lorem.lead },
    { title: "Dolor sit amet", body: para(0) },
    { title: "Consectetur elit", body: para(1) },
    { title: "Sed do eiusmod", body: para(2) },
  ];
}

function buildTimeline(): TimelineItem[] {
  return [
    { year: "1969", title: "Lorem ipsum founded", body: para(0) },
    { year: "1985", title: "Dolor sit expansion", body: para(1) },
    { year: "2001", title: "Consectetur network", body: para(2) },
    { year: "2018", title: "Adipiscing innovation", body: para(0) },
    { year: "2024", title: "Eiusmod tomorrow", body: para(1) },
  ];
}

function defaultCta(): InteriorContent["cta"] {
  return {
    title: "Lorem ipsum dolor sit amet",
    body: lorem.lead,
    primary: { label: "Hazte cliente", href: "/become-a-customer" },
    secondary: { label: "Contáctanos", href: "/contact/contact-us" },
  };
}

function baseFor(page: PageMeta, template: InteriorTemplate): InteriorContent {
  return {
    href: page.href,
    title: page.title,
    template,
    heroImage: img(hash(page.href) % IMAGES.length),
    lead: lorem.lead,
    intro: [para(0), para(1)],
    related: page.related,
    parentLabel: page.parentLabel,
    parentHref: page.parentHref,
    sectionLabel: page.sectionLabel,
    cta: defaultCta(),
  };
}

function buildForPage(page: PageMeta): InteriorContent {
  const template = pickTemplate(page);
  const base = baseFor(page, template);

  switch (template) {
    case "hub-about":
      return {
        ...base,
        heroImage: "/hero.jpg",
        cardsHeading: "Perfil de la empresa",
        cards: buildCards(page),
        stats: buildStats(),
        splits: [buildSplits(page)[0]],
        features: buildFeatures().slice(0, 3),
        featuresHeading: "Quiénes somos",
      };
    case "hub-customers":
      return {
        ...base,
        heroImage: "/section-kitchen.jpg",
        cardsHeading: "A quiénes servimos",
        cards: buildCards(page),
        intro: [para(0)],
        cta: {
          title: "¿Listo para asociarte?",
          body: lorem.lead,
          primary: { label: "Hazte cliente", href: "/become-a-customer" },
          secondary: { label: "Compra ahora", href: "/shop-now" },
        },
      };
    case "hub-suppliers":
      return {
        ...base,
        heroImage: "/section-cold.jpg",
        cardsHeading: "Alianzas con proveedores",
        cards: buildCards(page),
        features: buildFeatures().slice(0, 3),
        featuresHeading: "Sé nuestro socio",
        listHeading: "Enlaces rápidos",
        list: [
          {
            title: "Recursos para proveedores",
            body: lorem.lead,
            href: "/suppliers/supplier-partnerships/supplier-resources",
          },
          {
            title: "Diversidad de proveedores",
            body: para(0),
            href: "/suppliers/supplier-partnerships/supplier-diversity",
          },
        ],
      };
    case "hub-contact":
      return {
        ...base,
        heroImage: "/cta.jpg",
        cardsHeading: "¿Cómo podemos ayudarte?",
        cards: buildCards(page),
        features: buildFeatures().slice(0, 3),
        featuresHeading: "Canales de soporte",
      };
    case "hub-products":
      return {
        ...base,
        heroImage: "/section-produce.jpg",
        cardsHeading: "Productos y soluciones",
        cards: buildCards(page),
        features: buildFeatures(),
        featuresHeading: "Por qué nos eligen",
        splits: [buildSplits(page)[1]],
      };
    case "story":
      return {
        ...base,
        intro: [para(0), para(1), para(2)],
        timeline: buildTimeline(),
        splits: buildSplits(page),
        features: buildFeatures().slice(0, 3),
        featuresHeading: "Nuestros compromisos",
      };
    case "management":
      return {
        ...base,
        heroImage: "/section-kitchen.jpg",
        intro: [para(0)],
        bios: Array.from({ length: 6 }, (_, i) => ({
          name: `Lorem Ipsum ${i + 1}`,
          role: ["Dirección general", "Operaciones", "Culinaria", "Finanzas", "Tecnología", "Personas"][i],
          body: lorem.lead,
          image: img(i + 2),
        })),
        features: buildFeatures().slice(0, 2),
        featuresHeading: "Principios de liderazgo",
      };
    case "report":
      return {
        ...base,
        heroImage: "/cta.jpg",
        intro: [para(0), para(1)],
        listHeading: "Informes y documentos",
        list: Array.from({ length: 5 }, (_, i) => ({
          title: `Informe anual FY202${6 - i}`,
          body: para(i),
          meta: `PDF · ${12 + i} MB`,
          href: "/about/company-profile/annual-report",
        })),
        stats: buildStats(),
        cardsHeading: "Relacionados",
        cards: (page.related || []).slice(0, 3).map((r, i) => ({
          title: r.label,
          body: lorem.lead,
          href: r.href,
          image: img(i),
        })),
      };
    case "news":
      return {
        ...base,
        listHeading: "Últimas noticias",
        list: Array.from({ length: 8 }, (_, i) => ({
          title: `Lorem ipsum news headline ${i + 1}`,
          body: lorem.lead,
          meta: `Oct ${8 + i}, 2026 · Comunicado de prensa`,
          href: "/about/sysco-today/newsroom",
        })),
        cardsHeading: "Destacados",
        cards: Array.from({ length: 3 }, (_, i) => ({
          title: `Historia destacada ${i + 1}`,
          body: para(i),
          image: img(i),
          meta: `Oct ${12 + i}, 2026`,
          href: "/about/sysco-today/newsroom",
        })),
      };
    case "events":
      return {
        ...base,
        listHeading: "Próximos eventos",
        list: Array.from({ length: 6 }, (_, i) => ({
          title: `Lorem ipsum event ${i + 1}`,
          body: para(i),
          meta: `Nov ${5 + i * 3}, 2026 · Virtual y presencial`,
          href: "/about/sysco-today/events",
        })),
        splits: [buildSplits(page)[0]],
      };
    case "products":
      return {
        ...base,
        cardsHeading: "Explora la oferta",
        cards: buildCards(page, 6),
        features: buildFeatures(),
        featuresHeading: "Calidad y servicio",
        splits: [buildSplits(page)[0]],
      };
    case "segment":
      return {
        ...base,
        featuresHeading: `Atendiendo a ${page.title}`,
        features: buildFeatures(),
        splits: buildSplits(page),
        stats: buildStats(),
        cardsHeading: "Segmentos relacionados",
        cards: (page.related || []).slice(0, 4).map((r, i) => ({
          title: r.label,
          body: lorem.lead,
          href: r.href,
          image: img(i + 4),
        })),
      };
    case "suppliers":
      return {
        ...base,
        intro: [para(0), para(1)],
        listHeading: "Recursos",
        list: Array.from({ length: 5 }, (_, i) => ({
          title: `Recurso para proveedores ${i + 1}`,
          body: para(i),
          meta: "Guía",
          href: page.href,
        })),
        features: buildFeatures().slice(0, 3),
        featuresHeading: "Pilares de la alianza",
        splits: [buildSplits(page)[0]],
      };
    case "investors":
      return {
        ...base,
        heroImage: "/cta.jpg",
        stats: buildStats(),
        listHeading: "Publicaciones recientes",
        list: Array.from({ length: 5 }, (_, i) => ({
          title: `Actualización para inversionistas ${i + 1}`,
          body: para(i),
          meta: `FY2026 Q${(i % 4) + 1}`,
          href: "/investors",
        })),
        cardsHeading: "Informes y recursos",
        cards: [
          {
            title: "Informe anual",
            body: lorem.lead,
            href: "/about/company-profile/annual-report",
            image: img(0),
          },
          {
            title: "Presentaciones ante la SEC",
            body: lorem.lead,
            href: "/investors",
            image: img(1),
          },
          {
            title: "Gobierno corporativo",
            body: lorem.lead,
            href: "/about",
            image: img(2),
          },
          {
            title: "Eventos",
            body: lorem.lead,
            href: "/about/sysco-today/events",
            image: img(3),
          },
        ],
        features: [
          { title: "Gobierno corporativo", body: lorem.lead },
          { title: "Contactos para inversionistas", body: para(0) },
          { title: "Información bursátil", body: para(1) },
        ],
        featuresHeading: "Herramientas para inversionistas",
        cta: {
          title: "Relaciones con inversionistas",
          body: lorem.lead,
          primary: { label: "Contactar RI", href: "/contact/contact-us" },
          secondary: {
            label: "Informe anual",
            href: "/about/company-profile/annual-report",
          },
        },
      };
    case "careers":
      return {
        ...base,
        heroImage: "/section-kitchen.jpg",
        cardsHeading: "Rutas profesionales",
        cards: [
          {
            title: "Transporte",
            body: lorem.lead,
            image: img(2),
            href: "/careers",
          },
          {
            title: "Almacén y operaciones",
            body: lorem.lead,
            image: img(3),
            href: "/careers",
          },
          {
            title: "Ventas y culinaria",
            body: lorem.lead,
            image: img(1),
            href: "/careers",
          },
          {
            title: "Tecnología",
            body: lorem.lead,
            image: img(4),
            href: "/careers",
          },
        ],
        listHeading: "Vacantes (ejemplo)",
        list: Array.from({ length: 5 }, (_, i) => ({
          title: `Lorem ipsum role ${i + 1}`,
          body: "Ciudad · Tiempo completo",
          meta: ["Operaciones", "Ventas", "Tecnología", "Flota", "Corporativo"][i],
          href: "/careers",
        })),
        features: buildFeatures().slice(0, 3),
        featuresHeading: "La vida en Frescos del Valle",
        stats: buildStats(),
        cta: {
          title: "Únete a nuestro equipo",
          body: lorem.lead,
          primary: { label: "Ver vacantes", href: "/careers" },
          secondary: { label: "Contáctanos", href: "/contact/contact-us" },
        },
      };
    case "sustainability":
      return {
        ...base,
        heroImage: "/section-produce.jpg",
        cardsHeading: "Nuestros pilares",
        cards: childLinks(page).map((c, i) => ({
          title: c.label,
          body: lorem.lead,
          href: c.href,
          image: img(i + 1),
        })),
        stats: buildStats(),
        features: buildFeatures().slice(0, 3),
        featuresHeading: "Avances destacados",
        splits: [buildSplits(page)[0]],
      };
    case "sustainability-pillar":
      return {
        ...base,
        intro: [para(0), para(1)],
        features: buildFeatures(),
        featuresHeading: "Áreas de enfoque",
        splits: buildSplits(page),
        stats: buildStats(),
        cardsHeading: "Más sobre sustentabilidad",
        cards: (page.related || []).slice(0, 4).map((r, i) => ({
          title: r.label,
          body: lorem.lead,
          href: r.href,
          image: img(i + 2),
        })),
      };
    case "contact":
      return {
        ...base,
        form: {
          kind: page.href.includes("customer-care") ? "care" : "contact",
          heading: page.title,
          fields: [
            { label: "Nombre completo", type: "text", name: "name" },
            { label: "Correo electrónico", type: "email", name: "email" },
            { label: "Teléfono", type: "tel", name: "phone" },
            { label: "Mensaje", type: "textarea", name: "message" },
          ],
          submit: "ENVIAR",
        },
        features: buildFeatures().slice(0, 3),
        featuresHeading: "Cómo podemos ayudar",
        cards: [
          {
            title: "Nuestras ubicaciones",
            body: lorem.lead,
            href: "/contact/our-locations",
            image: img(6),
          },
          {
            title: "Atención al cliente",
            body: lorem.lead,
            href: "/contact/customer-care",
            image: img(7),
          },
          {
            title: "Hazte cliente",
            body: lorem.lead,
            href: "/become-a-customer",
            image: img(5),
          },
        ],
      };
    case "locations":
      return {
        ...base,
        cardsHeading: "Centros de distribución",
        cards: Array.from({ length: 8 }, (_, i) => ({
          title: `Centro de distribución ${i + 1}`,
          body: "Calle Lorem ipsum, Ciudad, CP 00000",
          meta: "Lun–Vie · 6:00–18:00",
          image: img(i),
          href: "/contact/contact-us",
        })),
        cta: {
          title: "¿Necesitas ayuda para encontrar una ubicación?",
          body: lorem.lead,
          primary: { label: "Contáctanos", href: "/contact/contact-us" },
          secondary: {
            label: "Atención al cliente",
            href: "/contact/customer-care",
          },
        },
      };
    case "form": {
      const kind =
        page.href === "/sign-in"
          ? "signin"
          : page.href === "/become-a-customer"
            ? "become"
            : "shop";
      const fields =
        kind === "signin"
          ? [
              { label: "Correo electrónico", type: "email", name: "email" },
              { label: "Contraseña", type: "password", name: "password" },
            ]
          : kind === "shop"
            ? [
                { label: "ID de cuenta", type: "text", name: "account" },
                { label: "Correo electrónico", type: "email", name: "email" },
              ]
            : [
                { label: "Nombre del negocio", type: "text", name: "business" },
                { label: "Nombre de contacto", type: "text", name: "name" },
                { label: "Correo electrónico", type: "email", name: "email" },
                { label: "Teléfono", type: "tel", name: "phone" },
                { label: "Código postal", type: "text", name: "zip" },
              ];
      return {
        ...base,
        form: {
          kind,
          heading: page.title,
          fields,
          submit:
            kind === "signin"
              ? "INICIAR SESIÓN"
              : kind === "shop"
                ? "CONTINUAR"
                : "COMENZAR",
        },
        features: buildFeatures().slice(0, 3),
        featuresHeading: "Qué esperar",
        splits: kind === "become" ? [buildSplits(page)[0]] : undefined,
      };
    }
    case "search":
      return {
        ...base,
        form: {
          kind: "search",
          heading: "Buscar",
          fields: [{ label: "Buscar", type: "search", name: "q" }],
          submit: "BUSCAR",
        },
        listHeading: "Resultados sugeridos",
        list: [
          {
            title: "Categorías de productos",
            body: lorem.lead,
            href: "/products/product-categories",
          },
          {
            title: "La historia de Sysco",
            body: lorem.lead,
            href: "/about/company-profile/the-sysco-story",
          },
          {
            title: "Restaurantes",
            body: lorem.lead,
            href: "/customers/who-we-serve/restaurants",
          },
          { title: "Carreras", body: lorem.lead, href: "/careers" },
          {
            title: "Nuestras ubicaciones",
            body: lorem.lead,
            href: "/contact/our-locations",
          },
          {
            title: "Sustentabilidad",
            body: lorem.lead,
            href: "/sustainability",
          },
        ],
      };
    default:
      return {
        ...base,
        intro: [para(0), para(1), para(2)],
        features: buildFeatures(),
        featuresHeading: "Destacados",
        splits: buildSplits(page),
        cards: buildCards(page, 4),
        cardsHeading: "Explora más",
      };
  }
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const byHref = new Map<string, InteriorContent>();
for (const page of allPages) {
  byHref.set(page.href, buildForPage(page));
}

/** Ensure hub pages list all mega-menu children */
for (const item of navItems) {
  const content = byHref.get(item.href);
  if (!content) continue;
  const hubs = new Set([
    "hub-about",
    "hub-customers",
    "hub-suppliers",
    "hub-contact",
    "hub-products",
    "sustainability",
  ]);
  if (hubs.has(content.template)) {
    const kids = item.columns.flatMap((c) => c.pages);
    if (kids.length) {
      content.cards = kids.map((c, i) => ({
        title: c.label,
        body: lorem.lead,
        href: c.href,
        image: img(i + 1),
      }));
      content.cardsHeading = content.cardsHeading || `Explora ${item.label}`;
    }
  }
}

export function getInterior(pathname: string): InteriorContent | undefined {
  const path = pathname.replace(/\/$/, "") || "/";
  return byHref.get(path);
}

export const interiorHrefs = [...byHref.keys()];
