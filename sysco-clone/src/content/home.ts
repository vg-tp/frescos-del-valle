/**
 * Editable homepage copy + media paths.
 * Nav labels intentionally match Sysco chrome structure (Spanish UI).
 * Body blocks stay Latin lorem; headlines/CTAs are Spanish placeholders.
 */

export { headerChrome, navItems } from "./nav";

export const site = {
  title: "Frescos del Valle",
  description: "Distribución de alimentos frescos para operadores de foodservice.",
  logo: {
    src: "/logo-frescos-del-valle.png",
    alt: "Frescos del Valle",
  },
};

export const heroSlides = [
  {
    headline: "Ingredientes frescos para tu operación",
    body: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    cta: "EXPLORA AHORA",
    href: "/about",
    image: "/hero.jpg",
  },
  {
    headline: "Todo lo que necesitas, en un solo lugar",
    body: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    cta: "COMPRA AHORA",
    href: "/shop-now",
    image: "/section-produce.jpg",
  },
  {
    headline: "Soluciones pensadas para tu cocina",
    body: "In reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    cta: "CONOCE MÁS",
    href: "/products",
    image: "/section-kitchen.jpg",
  },
  {
    headline: "Crece con un socio de confianza",
    body: "Cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    cta: "CONOCE MÁS",
    href: "/become-a-customer",
    image: "/cta.jpg",
  },
];

export const partnerBanner = {
  leftTagline: "Compromiso con tu negocio",
  rightLabel: "Sustentabilidad",
  headline: "Personas, productos y planeta: trabajando juntos",
  cta: "CONOCE MÁS",
  href: "/sustainability",
};

export const photoSections = [
  {
    id: "roots",
    headline: "Nuestras raíces en el valle",
    body: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    cta: "CONOCE MÁS",
    href: "/about/company-profile/the-sysco-story",
    image: "/section-produce.jpg",
    align: "left" as const,
  },
  {
    id: "future",
    headline: "Productos que impulsan tu menú",
    body: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
    cta: "CONOCE MÁS",
    href: "/products",
    image: "/section-cold.jpg",
    align: "right" as const,
  },
  {
    id: "people",
    headline: "Personas detrás de cada entrega",
    body: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
    cta: "CONOCE MÁS",
    href: "/about/our-people/better-together",
    image: "/section-kitchen.jpg",
    align: "left" as const,
  },
  {
    id: "careers",
    headline: "Construye tu carrera con nosotros",
    body: "Qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.",
    cta: "CONOCE MÁS",
    href: "/careers",
    image: "/hero.jpg",
    align: "right" as const,
  },
  {
    id: "locations",
    headline: "Cerca de donde operas",
    body: "Et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.",
    cta: "CONTÁCTANOS",
    href: "/contact/our-locations",
    image: "/card-2.jpg",
    align: "center" as const,
  },
];

export const footer = {
  blurb:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Nulla quis lorem ut libero malesuada feugiat.",
  stats: "Lorem · ipsum · dolor sit amet",
  columns: [
    {
      title: "Nosotros",
      links: [
        { label: "La historia de Sysco", href: "/about/company-profile/the-sysco-story" },
        { label: "Informe anual", href: "/about/company-profile/annual-report" },
        { label: "Sustentabilidad", href: "/sustainability" },
        { label: "Mejores juntos", href: "/about/our-people/better-together" },
        { label: "Sala de prensa", href: "/about/sysco-today/newsroom" },
        { label: "De un vistazo", href: "/about" },
      ],
    },
    {
      title: "Soluciones para clientes",
      links: [
        { label: "Categorías de productos", href: "/products/product-categories" },
        { label: "Familia de marcas Sysco", href: "/products/sysco-brand-family" },
        { label: "Servicios", href: "/products/solutions-and-services/services" },
        {
          label: "Soluciones culinarias",
          href: "/products/solutions-and-services/culinary-and-product-solutions",
        },
        {
          label: "Soluciones tecnológicas",
          href: "/products/solutions-and-services/technology-solutions",
        },
      ],
    },
    {
      title: "Recursos",
      links: [
        { label: "Proveedores", href: "/suppliers" },
        { label: "Inversionistas", href: "/investors" },
        { label: "Carreras", href: "/careers" },
      ],
    },
    {
      title: "Contáctanos",
      links: [
        { label: "Hazte cliente", href: "/become-a-customer" },
        { label: "Nuestras ubicaciones", href: "/contact/our-locations" },
      ],
    },
    {
      title: "Soporte",
      links: [
        { label: "Reportar una inquietud", href: "/contact/customer-care" },
        {
          label: "Limitar el uso de mi información personal sensible",
          href: "/contact/contact-us",
        },
        { label: "Preferencias de cookies", href: "/contact/contact-us" },
      ],
    },
  ],
  legal: [
    { label: "Términos de uso", href: "/about" },
    { label: "Aviso de privacidad", href: "/about" },
    { label: "Política de uso del sistema", href: "/about" },
  ],
  copyright: "©2026 Todos los derechos reservados. Frescos del Valle",
};

export const cookieBanner = {
  body: "Usamos cookies para mejorar tu experiencia. Texto de política de cookies para revisión de diseño.",
  customize: "Personalizar",
  accept: "¡De acuerdo!",
  policyLabel: "Política de cookies",
  noticeLabel: "Aviso de cookies",
  closeLabel: "Cerrar",
};
