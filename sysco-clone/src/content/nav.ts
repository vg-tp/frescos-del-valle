/**
 * Primary navigation tree (labels + structure from sysco.com, Spanish UI).
 * Local hrefs are kebab-case routes served by this clone.
 */

export type NavPage = {
  label: string;
  href: string;
};

export type NavColumn = {
  label: string;
  href?: string;
  pages: NavPage[];
};

export type NavItem = {
  label: string;
  href: string;
  columns: NavColumn[];
};

export const headerChrome = {
  announcement: "Lorem ipsum dolor sit amet — consectetur adipiscing elit",
  announcementLink: "Más información",
  announcementHref: "/about",
  shopNow: "Compra ahora",
  shopNowHref: "/shop-now",
  becomeCustomer: "Hazte cliente",
  becomeCustomerHref: "/become-a-customer",
  signIn: "Iniciar sesión",
  signInHref: "/sign-in",
  searchHref: "/search",
  searchLabel: "Buscar",
  primaryNavLabel: "Principal",
  openMenu: "Abrir menú",
  closeMenu: "Cerrar menú",
  expand: "Expandir",
  collapse: "Contraer",
  menuSuffix: "menú",
};

/** Exact Sysco primary nav order + mega-menu columns (Spanish labels) */
export const navItems: NavItem[] = [
  {
    label: "Nosotros",
    href: "/about",
    columns: [
      {
        label: "Perfil de la empresa",
        pages: [
          { label: "La historia de Sysco", href: "/about/company-profile/the-sysco-story" },
          { label: "Nuestro propósito", href: "/about/company-profile/our-purpose" },
          { label: "Informe anual", href: "/about/company-profile/annual-report" },
          {
            label: "Participación en políticas públicas",
            href: "/about/company-profile/public-policy-engagement",
          },
        ],
      },
      {
        label: "Nuestra gente",
        pages: [
          { label: "Nuestro equipo directivo", href: "/about/our-people/our-management" },
          { label: "Mejores juntos", href: "/about/our-people/better-together" },
        ],
      },
      {
        label: "Sysco hoy",
        pages: [
          { label: "Sala de prensa", href: "/about/sysco-today/newsroom" },
          { label: "Eventos", href: "/about/sysco-today/events" },
        ],
      },
    ],
  },
  {
    label: "Productos",
    href: "/products",
    columns: [
      {
        label: "Productos",
        pages: [
          { label: "Categorías de productos", href: "/products/product-categories" },
          { label: "Familia de marcas Sysco", href: "/products/sysco-brand-family" },
          { label: "Sysco Foodie", href: "/products/sysco-foodie" },
          { label: "Aseguramiento de calidad", href: "/products/quality-assurance" },
        ],
      },
      {
        label: "Soluciones y servicios",
        pages: [
          { label: "Servicios", href: "/products/solutions-and-services/services" },
          {
            label: "Soluciones culinarias y de producto",
            href: "/products/solutions-and-services/culinary-and-product-solutions",
          },
          {
            label: "Soluciones tecnológicas",
            href: "/products/solutions-and-services/technology-solutions",
          },
          {
            label: "Multicultural",
            href: "/products/solutions-and-services/multicultural",
          },
          {
            label: "Empresas especializadas",
            href: "/products/solutions-and-services/specialty-companies",
          },
        ],
      },
    ],
  },
  {
    label: "Clientes",
    href: "/customers",
    columns: [
      {
        label: "A quiénes servimos",
        pages: [
          { label: "Restaurantes", href: "/customers/who-we-serve/restaurants" },
          {
            label: "Salud y residencias",
            href: "/customers/who-we-serve/healthcare-and-senior-living",
          },
          {
            label: "Educación superior",
            href: "/customers/who-we-serve/higher-education",
          },
          { label: "Gobierno", href: "/customers/who-we-serve/government" },
          {
            label: "Gestión de servicios de alimentos",
            href: "/customers/who-we-serve/food-service-management",
          },
          { label: "Viajes", href: "/customers/who-we-serve/travel" },
          { label: "Ocio", href: "/customers/who-we-serve/leisure" },
          { label: "Comercio minorista", href: "/customers/who-we-serve/retail" },
        ],
      },
    ],
  },
  {
    label: "Proveedores",
    href: "/suppliers",
    columns: [
      {
        label: "Alianzas con proveedores",
        pages: [
          {
            label: "Recursos para proveedores",
            href: "/suppliers/supplier-partnerships/supplier-resources",
          },
          {
            label: "Diversidad de proveedores",
            href: "/suppliers/supplier-partnerships/supplier-diversity",
          },
        ],
      },
    ],
  },
  {
    label: "Inversionistas",
    href: "/investors",
    columns: [],
  },
  {
    label: "Carreras",
    href: "/careers",
    columns: [],
  },
  {
    label: "Sustentabilidad",
    href: "/sustainability",
    columns: [
      {
        label: "Sustentabilidad",
        pages: [
          { label: "Nuestro enfoque", href: "/sustainability/our-approach" },
          { label: "Derechos humanos", href: "/sustainability/human-rights" },
          { label: "Personas", href: "/sustainability/people" },
          { label: "Productos", href: "/sustainability/products" },
          { label: "Planeta", href: "/sustainability/planet" },
        ],
      },
    ],
  },
  {
    label: "Contacto",
    href: "/contact",
    columns: [
      {
        label: "Contacto",
        pages: [
          { label: "Contáctanos", href: "/contact/contact-us" },
          { label: "Nuestras ubicaciones", href: "/contact/our-locations" },
          { label: "Atención al cliente", href: "/contact/customer-care" },
        ],
      },
    ],
  },
];

/** Utility destinations that also get interior pages */
export const utilityPages: NavPage[] = [
  { label: headerChrome.shopNow, href: headerChrome.shopNowHref },
  { label: headerChrome.becomeCustomer, href: headerChrome.becomeCustomerHref },
  { label: headerChrome.signIn, href: headerChrome.signInHref },
  { label: headerChrome.searchLabel, href: headerChrome.searchHref },
];

export type PageMeta = {
  href: string;
  title: string;
  parentLabel?: string;
  parentHref?: string;
  sectionLabel?: string;
  related?: NavPage[];
};

function collectPages(): PageMeta[] {
  const pages: PageMeta[] = [];

  for (const item of navItems) {
    const related: NavPage[] = [];
    for (const col of item.columns) {
      for (const p of col.pages) related.push(p);
    }
    pages.push({
      href: item.href,
      title: item.label,
      parentLabel: item.label,
      parentHref: item.href,
      related: related.length ? related : undefined,
    });
    for (const col of item.columns) {
      for (const p of col.pages) {
        pages.push({
          href: p.href,
          title: p.label,
          parentLabel: item.label,
          parentHref: item.href,
          sectionLabel: col.label || item.label,
          related: col.pages.filter((x) => x.href !== p.href),
        });
      }
    }
  }

  for (const u of utilityPages) {
    pages.push({ href: u.href, title: u.label });
  }

  return pages;
}

export const allPages: PageMeta[] = collectPages();

export function findPage(pathname: string): PageMeta | undefined {
  const path = pathname.replace(/\/$/, "") || "/";
  return allPages.find((p) => p.href === path);
}

export const lorem = {
  lead: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  body: [
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
  ],
};
