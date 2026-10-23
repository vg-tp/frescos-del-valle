/**
 * Sysco primary navigation tree (labels + structure from sysco.com).
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
  announcementLink: "Lorem",
  announcementHref: "/about",
  shopNow: "Shop Now",
  shopNowHref: "/shop-now",
  becomeCustomer: "Become A Customer",
  becomeCustomerHref: "/become-a-customer",
  signIn: "Sign In",
  signInHref: "/sign-in",
  searchHref: "/search",
};

/** Exact Sysco primary nav labels / order + mega-menu columns */
export const navItems: NavItem[] = [
  {
    label: "About",
    href: "/about",
    columns: [
      {
        label: "Company Profile",
        pages: [
          { label: "The Sysco Story", href: "/about/company-profile/the-sysco-story" },
          { label: "Our Purpose", href: "/about/company-profile/our-purpose" },
          { label: "Annual Report", href: "/about/company-profile/annual-report" },
          {
            label: "Public Policy Engagement",
            href: "/about/company-profile/public-policy-engagement",
          },
        ],
      },
      {
        label: "Our People",
        pages: [
          { label: "Our Management", href: "/about/our-people/our-management" },
          { label: "Better Together", href: "/about/our-people/better-together" },
        ],
      },
      {
        label: "Sysco Today",
        pages: [
          { label: "Newsroom", href: "/about/sysco-today/newsroom" },
          { label: "Events", href: "/about/sysco-today/events" },
        ],
      },
    ],
  },
  {
    label: "Products",
    href: "/products",
    columns: [
      {
        label: "Products",
        pages: [
          { label: "Product Categories", href: "/products/product-categories" },
          { label: "Sysco Brand Family", href: "/products/sysco-brand-family" },
          { label: "Sysco Foodie", href: "/products/sysco-foodie" },
          { label: "Quality Assurance", href: "/products/quality-assurance" },
        ],
      },
      {
        label: "Solutions & Services",
        pages: [
          { label: "Services", href: "/products/solutions-and-services/services" },
          {
            label: "Culinary and Product Solutions",
            href: "/products/solutions-and-services/culinary-and-product-solutions",
          },
          {
            label: "Technology Solutions",
            href: "/products/solutions-and-services/technology-solutions",
          },
          {
            label: "Multicultural",
            href: "/products/solutions-and-services/multicultural",
          },
          {
            label: "Specialty Companies",
            href: "/products/solutions-and-services/specialty-companies",
          },
        ],
      },
    ],
  },
  {
    label: "Customers",
    href: "/customers",
    columns: [
      {
        label: "Who We Serve",
        pages: [
          { label: "Restaurants", href: "/customers/who-we-serve/restaurants" },
          {
            label: "Healthcare and Senior Living",
            href: "/customers/who-we-serve/healthcare-and-senior-living",
          },
          {
            label: "Higher Education",
            href: "/customers/who-we-serve/higher-education",
          },
          { label: "Government", href: "/customers/who-we-serve/government" },
          {
            label: "Food Service Management",
            href: "/customers/who-we-serve/food-service-management",
          },
          { label: "Travel", href: "/customers/who-we-serve/travel" },
          { label: "Leisure", href: "/customers/who-we-serve/leisure" },
          { label: "Retail", href: "/customers/who-we-serve/retail" },
        ],
      },
    ],
  },
  {
    label: "Suppliers",
    href: "/suppliers",
    columns: [
      {
        label: "Supplier Partnerships",
        pages: [
          {
            label: "Supplier Resources",
            href: "/suppliers/supplier-partnerships/supplier-resources",
          },
          {
            label: "Supplier Diversity",
            href: "/suppliers/supplier-partnerships/supplier-diversity",
          },
        ],
      },
    ],
  },
  {
    label: "Investors",
    href: "/investors",
    columns: [],
  },
  {
    label: "Careers",
    href: "/careers",
    columns: [],
  },
  {
    label: "Sustainability",
    href: "/sustainability",
    columns: [
      {
        label: "Sustainability",
        pages: [
          { label: "Our Approach", href: "/sustainability/our-approach" },
          { label: "Human Rights", href: "/sustainability/human-rights" },
          { label: "People", href: "/sustainability/people" },
          { label: "Products", href: "/sustainability/products" },
          { label: "Planet", href: "/sustainability/planet" },
        ],
      },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
    columns: [
      {
        label: "Contact",
        pages: [
          { label: "Contact Us", href: "/contact/contact-us" },
          { label: "Our Locations", href: "/contact/our-locations" },
          { label: "Customer Care", href: "/contact/customer-care" },
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
  { label: "Search", href: headerChrome.searchHref },
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
