/**
 * Editable homepage copy + media paths.
 * Nav labels intentionally match Sysco chrome (do not lorem those).
 * Everything else is placeholder lorem for design review.
 */

export { headerChrome, navItems } from "./nav";

export const site = {
  title: "Frescos del Valle",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  logo: {
    src: "/logo-frescos-del-valle.png",
    alt: "Frescos del Valle",
  },
};

export const heroSlides = [
  {
    headline: "Lorem ipsum dolor sit amet",
    body: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    cta: "EXPLORE NOW",
    image: "/hero.jpg",
  },
  {
    headline: "Ut enim ad minim veniam",
    body: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    cta: "SHOP NOW",
    image: "/section-produce.jpg",
  },
  {
    headline: "Duis aute irure dolor",
    body: "In reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    cta: "LEARN MORE",
    image: "/section-kitchen.jpg",
  },
  {
    headline: "Excepteur sint occaecat",
    body: "Cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    cta: "LEARN MORE",
    image: "/cta.jpg",
  },
];

export const partnerBanner = {
  leftTagline: "Lorem ipsum dolor sit amet",
  rightLabel: "Lorem Ipsum",
  headline: "Lorem ipsum & dolor sit: amet consectetur",
  cta: "LEARN MORE",
};

export const photoSections = [
  {
    id: "roots",
    headline: "Lorem ipsum dolor sit amet",
    body: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    cta: "LEARN MORE",
    image: "/section-produce.jpg",
    align: "left" as const,
  },
  {
    id: "future",
    headline: "Consectetur adipiscing elit",
    body: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
    cta: "LEARN MORE",
    image: "/section-cold.jpg",
    align: "right" as const,
  },
  {
    id: "people",
    headline: "Ut enim ad minima veniam",
    body: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
    cta: "LEARN MORE",
    image: "/section-kitchen.jpg",
    align: "left" as const,
  },
  {
    id: "careers",
    headline: "Neque porro quisquam est",
    body: "Qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.",
    cta: "LEARN MORE",
    image: "/hero.jpg",
    align: "right" as const,
  },
  {
    id: "locations",
    headline: "At vero eos et accusamus",
    body: "Et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.",
    cta: "GET IN TOUCH",
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
      title: "About",
      links: [
        { label: "The Sysco Story", href: "/about/company-profile/the-sysco-story" },
        { label: "Annual Report", href: "/about/company-profile/annual-report" },
        { label: "Sustainability", href: "/sustainability" },
        { label: "Better Together", href: "/about/our-people/better-together" },
        { label: "News Room", href: "/about/sysco-today/newsroom" },
        { label: "At a Glance", href: "/about" },
      ],
    },
    {
      title: "Customer Solutions",
      links: [
        { label: "Product Categories", href: "/products/product-categories" },
        { label: "Sysco Brand Family", href: "/products/sysco-brand-family" },
        { label: "Services", href: "/products/solutions-and-services/services" },
        {
          label: "Culinary Solutions",
          href: "/products/solutions-and-services/culinary-and-product-solutions",
        },
        {
          label: "Technology Solutions",
          href: "/products/solutions-and-services/technology-solutions",
        },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Suppliers", href: "/suppliers" },
        { label: "Investors", href: "/investors" },
        { label: "Careers", href: "/careers" },
      ],
    },
    {
      title: "Contact Us",
      links: [
        { label: "Become A Customer", href: "/become-a-customer" },
        { label: "Our Locations", href: "/contact/our-locations" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Report A Concern", href: "/contact/customer-care" },
        {
          label: "Limit the Use of My Sensitive Personal Information",
          href: "/contact/contact-us",
        },
        { label: "Cookie Preferences", href: "/contact/contact-us" },
      ],
    },
  ],
  legal: [
    { label: "Terms of Use", href: "/about" },
    { label: "Privacy Notice", href: "/about" },
    { label: "System Usage Policy", href: "/about" },
  ],
  copyright: "©2026 All Rights Reserved. Frescos del Valle",
};

export const cookieBanner = {
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cookie policy placeholder text for layout review.",
  customize: "Customize Settings",
  accept: "Sounds, Good!",
};
