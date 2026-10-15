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
  | "purpose"
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

export type LogoCallout = {
  title: string;
  body: string;
  cta: { label: string; href: string };
  brand?: string;
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
  /** Secondary card row (e.g. Specialty Foods on Products hub) */
  specialtyCards?: CardItem[];
  specialtyHeading?: string;
  /** Tertiary card row (e.g. Featured Recipes) */
  recipeCards?: CardItem[];
  recipeHeading?: string;
  /** Resource card row (e.g. Product Resources) */
  resourceCards?: CardItem[];
  resourceHeading?: string;
  /** Solid #008CD2 Foodie / logo callout band */
  logoCallout?: LogoCallout;
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
  /** Products child variant for layout dispatch */
  productsVariant?:
    | "hub"
    | "categories"
    | "brand-family"
    | "foodie"
    | "quality"
    | "services"
    | "culinary"
    | "technology"
    | "multicultural"
    | "specialty"
    | "default";
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

/** Stable photo heroes for About/Nosotros story children (Sysco interior chrome). */
function aboutStoryHero(href: string): string {
  const map: Record<string, string> = {
    "/about/company-profile/the-sysco-story": "/section-produce.jpg",
    "/about/company-profile/our-purpose": "/hero.jpg",
    "/about/company-profile/public-policy-engagement": "/cta.jpg",
    "/about/our-people/better-together": "/section-kitchen.jpg",
  };
  return map[href] || img(hash(href) % IMAGES.length);
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
  if (h === "/about/company-profile/our-purpose") return "purpose";
  if (h === "/about/company-profile/annual-report") return "report";
  if (h === "/about") return "hub-about";
  if (h === "/customers") return "hub-customers";
  if (h === "/suppliers") return "hub-suppliers";
  if (h === "/contact") return "hub-contact";
  if (h === "/products" || h === "/products/product-categories")
    return "hub-products";
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

/** Sysco Product Categories tile mosaic (Spanish). */
function productCategoryTiles(): CardItem[] {
  const cats = [
    "Carne y aves",
    "Mariscos",
    "Lácteos",
    "Productos frescos",
    "Panadería y postres",
    "Foodservice",
    "Bebidas",
    "Especialidades y étnicos",
    "Ver todas las categorías",
  ];
  return cats.map((title, i) => ({
    title,
    body: lorem.lead,
    href: "/products/product-categories",
    image: img(i + 1),
  }));
}

function productsHubBlueprint(page: PageMeta): Partial<InteriorContent> {
  return {
    title: page.href === "/products" ? "Productos" : page.title,
    heroImage: "/section-produce.jpg",
    lead:
      "Una alianza garantiza acceso a la mejor red de distribución — tendencias, productos frescos e ideas nuevas.",
    productsVariant: "hub",
    cardsHeading: "Nuestras categorías de productos",
    cards: productCategoryTiles(),
    splits: [
      {
        eyebrow: "Soluciones",
        title: "Soluciones de vanguardia",
        body: para(0),
        image: "/section-kitchen.jpg",
        align: "left",
        cta: {
          label: "CONOCE MÁS",
          href: "/products/solutions-and-services/culinary-and-product-solutions",
        },
      },
    ],
    specialtyHeading: "Alimentos especializados",
    specialtyCards: [
      {
        title: "Buckhead & Newport Meat and Seafood",
        body: para(0),
        href: "/products/solutions-and-services/specialty-companies",
        image: "/section-cold.jpg",
      },
      {
        title: "FreshPoint Specialty Produce",
        body: para(1),
        href: "/products/solutions-and-services/specialty-companies",
        image: "/section-produce.jpg",
      },
      {
        title: "Specialty Foods",
        body: para(2),
        href: "/products/solutions-and-services/specialty-companies",
        image: "/cta.jpg",
      },
    ],
    recipeHeading: "Recetas destacadas",
    recipeCards: [
      {
        title: "Hamburguesa artesanal",
        body: lorem.lead,
        meta: "Plato principal",
        href: "/products/sysco-foodie",
        image: "/card-1.jpg",
      },
      {
        title: "Chile poblano asado",
        body: para(0),
        meta: "Entrada",
        href: "/products/sysco-foodie",
        image: "/card-2.jpg",
      },
      {
        title: "Guacamole de temporada",
        body: para(1),
        meta: "Acompañamiento",
        href: "/products/sysco-foodie",
        image: "/card-3.jpg",
      },
    ],
    logoCallout: {
      brand: "FOODIE",
      title: "Sysco Foodie",
      body: "Recetas, tendencias y tips operativos del equipo culinario Sysco para impulsar tu menú.",
      cta: { label: "EXPLORAR FOODIE", href: "/products/sysco-foodie" },
    },
    resourceHeading: "Recursos de producto",
    resourceCards: [
      {
        title: "Videos de producto",
        body: para(0),
        href: "/products/sysco-foodie",
        image: "/section-kitchen.jpg",
      },
      {
        title: "Market Corner",
        body: para(1),
        href: "/products/sysco-brand-family",
        image: "/section-produce.jpg",
      },
      {
        title: "Hojas de seguridad (MSDS)",
        body: para(2),
        href: "/products/quality-assurance",
        image: "/cta.jpg",
      },
    ],
  };
}

function productsVariantFor(href: string): NonNullable<InteriorContent["productsVariant"]> {
  if (href.endsWith("/sysco-brand-family")) return "brand-family";
  if (href.endsWith("/sysco-foodie")) return "foodie";
  if (href.endsWith("/quality-assurance")) return "quality";
  if (href.endsWith("/services")) return "services";
  if (href.endsWith("/culinary-and-product-solutions")) return "culinary";
  if (href.endsWith("/technology-solutions")) return "technology";
  if (href.endsWith("/multicultural")) return "multicultural";
  if (href.endsWith("/specialty-companies")) return "specialty";
  if (href.endsWith("/product-categories")) return "categories";
  return "default";
}

function buildProductsDetail(page: PageMeta): Partial<InteriorContent> {
  const variant = productsVariantFor(page.href);
  const baseLead =
    "Una alianza garantiza acceso a la mejor red de distribución — productos frescos e ideas nuevas.";

  switch (variant) {
    case "brand-family":
      return {
        productsVariant: variant,
        heroImage: "/cta.jpg",
        lead: baseLead,
        cardsHeading: "Familia de marcas Sysco",
        cards: [
          "Sysco Classic",
          "Sysco Imperial",
          "Sysco Reliance",
          "Sysco Natural",
          "Block & Barrel",
          "Wholesome Farms",
          "Arrezzio",
          "House Recipe",
          "Portico",
        ].map((title, i) => ({
          title,
          body: lorem.lead,
          href: page.href,
          image: img(i + 1),
        })),
        splits: [
          {
            title: "Calidad que lidera",
            body: para(0),
            image: "/section-kitchen.jpg",
            align: "left",
            cta: { label: "CONOCE MÁS", href: "/products/quality-assurance" },
          },
        ],
        logoCallout: {
          brand: "FOODIE",
          title: "Inspiración culinaria",
          body: "Descubre recetas y tendencias con productos de la familia de marcas Sysco.",
          cta: { label: "VER FOODIE", href: "/products/sysco-foodie" },
        },
        resourceHeading: "Explora más",
        resourceCards: [
          {
            title: "Categorías de productos",
            body: para(0),
            href: "/products/product-categories",
            image: "/section-produce.jpg",
          },
          {
            title: "Aseguramiento de calidad",
            body: para(1),
            href: "/products/quality-assurance",
            image: "/section-cold.jpg",
          },
          {
            title: "Servicios",
            body: para(2),
            href: "/products/solutions-and-services/services",
            image: "/section-kitchen.jpg",
          },
        ],
      };
    case "foodie":
      return {
        productsVariant: variant,
        heroImage: "/section-kitchen.jpg",
        lead: "Tendencias, recetas y datos para operadores de foodservice.",
        intro: [para(0), para(1)],
        recipeHeading: "Recetas destacadas",
        recipeCards: [
          {
            title: "Parrillada",
            body: para(0),
            meta: "Equipo culinario Sysco",
            href: page.href,
            image: "/card-1.jpg",
          },
          {
            title: "Chili Tex Mex",
            body: para(1),
            meta: "Plato principal",
            href: page.href,
            image: "/card-2.jpg",
          },
          {
            title: "Costilla Denver BBQ",
            body: para(2),
            meta: "Plato principal",
            href: page.href,
            image: "/card-3.jpg",
          },
        ],
        cardsHeading: "Formas de explorar Foodie",
        cards: [
          {
            title: "Revista Foodie",
            body: lorem.lead,
            href: page.href,
            image: "/cta.jpg",
          },
          {
            title: "Market Corner",
            body: para(0),
            href: page.href,
            image: "/section-produce.jpg",
          },
          {
            title: "Marcas Sysco",
            body: para(1),
            href: "/products/sysco-brand-family",
            image: "/section-cold.jpg",
          },
        ],
        logoCallout: {
          brand: "FOODIE",
          title: "Sysco Foodie",
          body: "La revista y hub de tendencias para operadores — recetas, tips y reportes de mercado.",
          cta: { label: "CONOCE MÁS", href: "/products/product-categories" },
        },
        splits: [
          {
            title: "Soluciones de vanguardia",
            body: para(0),
            image: "/section-kitchen.jpg",
            align: "right",
            cta: {
              label: "EXPLORAR",
              href: "/products/solutions-and-services/culinary-and-product-solutions",
            },
          },
        ],
      };
    case "quality":
      return {
        productsVariant: variant,
        heroImage: "/section-cold.jpg",
        lead: "Calidad y seguridad alimentaria en cada eslabón de la cadena.",
        intro: [para(0), para(1)],
        featuresHeading: "Nuestro compromiso",
        features: [
          { title: "Seguridad alimentaria", body: para(0) },
          { title: "Auditorías y estándares", body: para(1) },
          { title: "Trazabilidad", body: para(2) },
          { title: "Sostenibilidad del suministro", body: lorem.lead },
        ],
        splits: [
          {
            title: "Frescura garantizada",
            body: para(0),
            image: "/section-produce.jpg",
            align: "left",
            cta: { label: "CONOCE MÁS", href: "/products/product-categories" },
          },
          {
            title: "Socio de confianza",
            body: para(1),
            image: "/section-kitchen.jpg",
            align: "right",
            cta: { label: "CONTÁCTANOS", href: "/contact/contact-us" },
          },
        ],
        resourceHeading: "Recursos",
        resourceCards: [
          {
            title: "Hojas de seguridad (MSDS)",
            body: para(0),
            href: page.href,
            image: "/cta.jpg",
          },
          {
            title: "Videos de producto",
            body: para(1),
            href: "/products/sysco-foodie",
            image: "/card-2.jpg",
          },
          {
            title: "Market Corner",
            body: para(2),
            href: "/products/sysco-foodie",
            image: "/card-3.jpg",
          },
        ],
      };
    case "services":
    case "culinary":
    case "technology":
    case "multicultural":
    case "specialty": {
      const headings: Record<string, string> = {
        services: "Servicios para tu operación",
        culinary: "Soluciones culinarias y de producto",
        technology: "Soluciones tecnológicas",
        multicultural: "Recursos multiculturales",
        specialty: "Empresas especializadas",
      };
      const serviceCards: CardItem[] =
        variant === "specialty"
          ? [
              {
                title: "FreshPoint",
                body: para(0),
                href: page.href,
                image: "/section-produce.jpg",
              },
              {
                title: "Buckhead & Newport",
                body: para(1),
                href: page.href,
                image: "/section-cold.jpg",
              },
              {
                title: "European Imports",
                body: para(2),
                href: page.href,
                image: "/cta.jpg",
              },
              {
                title: "International Food Group",
                body: lorem.lead,
                href: page.href,
                image: "/section-kitchen.jpg",
              },
              {
                title: "Edward Don & Company",
                body: para(0),
                href: page.href,
                image: "/card-1.jpg",
              },
              {
                title: "SYGMA",
                body: para(1),
                href: page.href,
                image: "/card-2.jpg",
              },
            ]
          : [
              {
                title: "Servicios",
                body: para(0),
                href: "/products/solutions-and-services/services",
                image: "/section-kitchen.jpg",
              },
              {
                title: "Soluciones culinarias",
                body: para(1),
                href: "/products/solutions-and-services/culinary-and-product-solutions",
                image: "/section-produce.jpg",
              },
              {
                title: "Tecnología",
                body: para(2),
                href: "/products/solutions-and-services/technology-solutions",
                image: "/cta.jpg",
              },
              {
                title: "Multicultural",
                body: lorem.lead,
                href: "/products/solutions-and-services/multicultural",
                image: "/section-cold.jpg",
              },
              {
                title: "Empresas especializadas",
                body: para(0),
                href: "/products/solutions-and-services/specialty-companies",
                image: "/card-3.jpg",
              },
              {
                title: "Familia de marcas",
                body: para(1),
                href: "/products/sysco-brand-family",
                image: "/card-4.jpg",
              },
            ];
      return {
        productsVariant: variant,
        heroImage:
          variant === "technology"
            ? "/cta.jpg"
            : variant === "specialty"
              ? "/section-cold.jpg"
              : "/section-kitchen.jpg",
        lead: baseLead,
        intro: [para(0)],
        cardsHeading: headings[variant],
        cards: serviceCards,
        splits: [
          {
            title:
              variant === "culinary"
                ? "Ideas frescas para tu menú"
                : variant === "technology"
                  ? "Herramientas que impulsan tu negocio"
                  : "El poder de la alianza",
            body: para(1),
            image: "/section-produce.jpg",
            align: "left",
            cta: { label: "CONOCE MÁS", href: "/become-a-customer" },
          },
          {
            title: "Hazte cliente",
            body: para(2),
            image: "/hero.jpg",
            align: "right",
            cta: { label: "COMENZAR", href: "/become-a-customer" },
          },
        ],
        logoCallout:
          variant === "culinary" || variant === "multicultural"
            ? {
                brand: "FOODIE",
                title: "Sysco Foodie",
                body: "Recetas y tendencias para complementar tus soluciones de producto.",
                cta: { label: "EXPLORAR", href: "/products/sysco-foodie" },
              }
            : undefined,
      };
    }
    default:
      return {
        productsVariant: "default",
        heroImage: "/section-produce.jpg",
        lead: baseLead,
        cardsHeading: "Explora la oferta",
        cards: buildCards(page, 6),
        splits: [buildSplits(page)[0]],
        resourceHeading: "Recursos de producto",
        resourceCards: [
          {
            title: "Categorías",
            body: para(0),
            href: "/products/product-categories",
            image: img(1),
          },
          {
            title: "Marcas Sysco",
            body: para(1),
            href: "/products/sysco-brand-family",
            image: img(2),
          },
          {
            title: "Foodie",
            body: para(2),
            href: "/products/sysco-foodie",
            image: img(3),
          },
        ],
      };
  }
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
        lead: "¿Preguntas, comentarios o inquietudes? Llámanos.",
        cardsHeading:
          "Te recomendamos contactar a tu compañía operativa local para la resolución más rápida",
        cards: buildCards(page),
        features: buildFeatures().slice(0, 3),
        featuresHeading: "Canales de soporte",
      };
    case "hub-products":
      return {
        ...base,
        ...productsHubBlueprint(page),
        title:
          page.href === "/products" || page.href === "/products/product-categories"
            ? "Nuestros productos"
            : page.title,
      };
    case "story":
      return {
        ...base,
        heroImage: aboutStoryHero(page.href),
        lead:
          "Líder global en la venta, marketing y distribución de productos alimenticios y no alimenticios para restaurantes, salud, educación y hospedaje.",
        intro: [para(0), para(1), para(2)],
        cardsHeading: "La familia Sysco",
        cards: [
          {
            title: "Broadline",
            body: lorem.lead,
            image: "/section-produce.jpg",
            href: "/products",
          },
          {
            title: "Empresas especializadas",
            body: para(0),
            image: "/section-kitchen.jpg",
            href: "/products/solutions-and-services/specialty-companies",
          },
          {
            title: "Internacional",
            body: para(1),
            image: "/hero.jpg",
            href: "/about",
          },
          {
            title: "SYGMA",
            body: para(2),
            image: "/section-cold.jpg",
            href: "/customers/who-we-serve/restaurants",
          },
        ],
        listHeading: "Oportunidades frescas cada día",
        list: [
          {
            title: "Conductores",
            body: lorem.lead,
            meta: "Transporte",
            href: "/careers",
          },
          {
            title: "Almacén",
            body: para(0),
            meta: "Operaciones",
            href: "/careers",
          },
          {
            title: "Ventas",
            body: para(1),
            meta: "Comercial",
            href: "/careers",
          },
        ],
        splits: [
          {
            eyebrow: "Nuestra gente",
            title: "Nuestra gente cuenta la historia",
            body: para(0),
            image: "/section-kitchen.jpg",
            align: "left",
            cta: { label: "CONOCE MÁS", href: "/about/our-people/better-together" },
          },
          buildSplits(page)[1],
        ],
        features: buildFeatures().slice(0, 3),
        featuresHeading: "Oportunidades frescas cada día",
      };
    case "purpose":
      return {
        ...base,
        heroImage: "/section-kitchen.jpg",
        featuresHeading: "Nuestros ingredientes para el éxito",
        features: [
          { title: "Nuestro propósito", body: lorem.lead },
          { title: "Nuestra misión", body: para(0) },
          { title: "Nuestra identidad", body: para(1) },
          { title: "Nuestros valores", body: para(2) },
          { title: "Nuestra receta de crecimiento", body: lorem.lead },
        ],
        cardsHeading: "Más videos sobre nuestro propósito",
        cards: [
          {
            title: "Demostrando nuestro propósito",
            body: para(0),
            image: "/section-produce.jpg",
            href: page.href,
          },
          {
            title: "Mensaje del CEO",
            body: para(1),
            image: "/cta.jpg",
            href: page.href,
          },
        ],
      };
    case "management":
      return {
        ...base,
        heroImage: "/section-kitchen.jpg",
        lead:
          "El talento y la dedicación de nuestra fuerza laboral son la base del éxito.",
        intro: [para(0)],
        bios: Array.from({ length: 6 }, (_, i) => ({
          name: `Lorem Ipsum ${i + 1}`,
          role: ["Dirección general", "Operaciones", "Culinaria", "Finanzas", "Tecnología", "Personas"][i],
          body: lorem.lead,
          image: img(i + 2),
        })),
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
        heroImage: "/section-cold.jpg",
        lead: "Comunicados, perspectivas y el impacto de nuestra comunidad.",
        /* Sysco newsroom: 4 equal category tiles (no featured+list) */
        cardsHeading: "Sala de prensa",
        cards: [
          {
            title: "Avisos a medios",
            body: para(0),
            image: "/section-cold.jpg",
            href: "/about/sysco-today/newsroom",
          },
          {
            title: "Comunicados de prensa",
            body: para(1),
            image: "/cta.jpg",
            href: "/about/sysco-today/newsroom",
          },
          {
            title: "Perspectivas frescas",
            body: para(2),
            image: "/section-produce.jpg",
            href: "/about/sysco-today/newsroom",
          },
          {
            title: "Impacto comunitario",
            body: lorem.lead,
            image: "/section-kitchen.jpg",
            href: "/about/sysco-today/newsroom",
          },
        ],
      };
    case "events":
      return {
        ...base,
        heroImage: "/section-produce.jpg",
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
        ...buildProductsDetail(page),
      };
    case "segment":
      return {
        ...base,
        lead:
          page.href.includes("restaurants")
            ? "Una alianza es una receta para el éxito."
            : lorem.lead,
        featuresHeading: "El poder de la alianza",
        features: buildFeatures().slice(0, 3),
        splits: [
          {
            title: "En el corazón de la comida y el servicio",
            body: para(0),
            image: "/section-kitchen.jpg",
            align: "left",
          },
          {
            eyebrow: "Recursos",
            title: "Recursos multiculturales",
            body: para(1),
            image: "/section-produce.jpg",
            align: "right",
            cta: { label: "CONOCE MÁS", href: "/products/solutions-and-services/multicultural" },
          },
          {
            eyebrow: "Marcas",
            title: "La familia de marcas Sysco",
            body: para(2),
            image: "/cta.jpg",
            align: "left",
            cta: { label: "EXPLORAR", href: "/products/sysco-brand-family" },
          },
        ],
        stats: buildStats(),
        cardsHeading: "One Sysco",
        cards: [
          {
            title: "FreshPoint",
            body: lorem.lead,
            href: "/products/solutions-and-services/specialty-companies",
            image: img(1),
          },
          {
            title: "Buckhead & Newport",
            body: para(0),
            href: "/products/solutions-and-services/specialty-companies",
            image: img(2),
          },
          {
            title: "European Imports",
            body: para(1),
            href: "/products/solutions-and-services/specialty-companies",
            image: img(3),
          },
          {
            title: "International Food Group",
            body: para(2),
            href: "/products/solutions-and-services/specialty-companies",
            image: img(4),
          },
          {
            title: "Edward Don & Company",
            body: lorem.lead,
            href: "/products/solutions-and-services/specialty-companies",
            image: img(5),
          },
          {
            title: "Nuestro alcance global",
            body: para(0),
            href: "/about",
            image: img(6),
          },
        ],
        cta: {
          title: "Hazte cliente",
          body: lorem.lead,
          primary: { label: "Hazte cliente", href: "/become-a-customer" },
          secondary: { label: "Compra ahora", href: "/shop-now" },
        },
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
        listHeading: "Comunicados recientes",
        list: Array.from({ length: 5 }, (_, i) => ({
          title: `Actualización para inversionistas ${i + 1}`,
          body: para(i),
          meta: `Oct ${6 + i}, 2026`,
          href: "/investors",
        })),
        cardsHeading: "Herramientas para inversionistas",
        cards: [
          {
            title: "Información bursátil",
            body: lorem.lead,
            href: "/investors",
            image: img(0),
          },
          {
            title: "Comunicados de prensa",
            body: lorem.lead,
            href: "/about/sysco-today/newsroom",
            image: img(1),
          },
          {
            title: "Eventos recientes y próximos",
            body: lorem.lead,
            href: "/about/sysco-today/events",
            image: img(2),
          },
          {
            title: "Presentaciones ante la SEC",
            body: lorem.lead,
            href: "/investors",
            image: img(3),
          },
          {
            title: "Gobierno corporativo",
            body: lorem.lead,
            href: "/about",
            image: img(4),
          },
          {
            title: "Contactos para inversionistas",
            body: lorem.lead,
            href: "/contact/contact-us",
            image: img(5),
          },
        ],
        features: [
          { title: "Gobierno corporativo", body: lorem.lead },
          { title: "Contactos para inversionistas", body: para(0) },
          { title: "Información bursátil", body: para(1) },
        ],
        featuresHeading: "Gobierno y contactos",
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
        cardsHeading: "Carreras destacadas",
        cards: [
          {
            title: "TRANSPORTE",
            body: lorem.lead,
            image: img(2),
            href: "/careers",
          },
          {
            title: "ALMACÉN",
            body: lorem.lead,
            image: img(3),
            href: "/careers",
          },
          {
            title: "VENTAS",
            body: lorem.lead,
            image: img(1),
            href: "/careers",
          },
          {
            title: "MERCHANDISING",
            body: lorem.lead,
            image: img(4),
            href: "/careers",
          },
          {
            title: "MANTENIMIENTO",
            body: para(0),
            image: img(5),
            href: "/careers",
          },
          {
            title: "TECNOLOGÍA",
            body: para(1),
            image: img(6),
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
        lead: "¿Preguntas, comentarios o inquietudes? Llámanos.",
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
        splits: [buildSplits(page)[0]],
        intro: [para(0), para(1)],
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
        features: buildFeatures().slice(0, 3),
        featuresHeading: "Explora también",
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

/**
 * Ensure hub pages list mega-menu children — except Products, which uses
 * Sysco category tiles (Meat/Seafood/…) instead of nav destinations.
 */
for (const item of navItems) {
  const content = byHref.get(item.href);
  if (!content) continue;
  const hubs = new Set([
    "hub-about",
    "hub-customers",
    "hub-suppliers",
    "hub-contact",
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

/* Keep /products and /products/product-categories on the same Sysco hub stack */
const productsHub = byHref.get("/products");
const productsCategories = byHref.get("/products/product-categories");
if (productsHub && productsCategories) {
  const shared = productsHubBlueprint(productsCategories);
  Object.assign(productsCategories, shared, {
    title: "Nuestros productos",
    template: "hub-products" as const,
    parentLabel: productsCategories.parentLabel,
    parentHref: productsCategories.parentHref,
    sectionLabel: productsCategories.sectionLabel,
    related: productsCategories.related,
    href: productsCategories.href,
  });
  Object.assign(productsHub, productsHubBlueprint(allPages.find((p) => p.href === "/products")!), {
    title: "Nuestros productos",
    href: "/products",
    template: "hub-products" as const,
    parentLabel: productsHub.parentLabel,
    parentHref: productsHub.parentHref,
    related: productsHub.related,
  });
}

export function getInterior(pathname: string): InteriorContent | undefined {
  const path = pathname.replace(/\/$/, "") || "/";
  return byHref.get(path);
}

export const interiorHrefs = [...byHref.keys()];
