/**
 * Editable homepage copy + media paths.
 * Nav labels intentionally match Sysco chrome (do not lorem those).
 * Everything else is placeholder lorem for design review.
 */

export const site = {
  title: "Frescos del Valle",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  logo: {
    src: "/logo-frescos-del-valle.png",
    alt: "Frescos del Valle",
  },
};

/** Exact Sysco top-nav labels / order */
export const navItems = [
  {
    label: "About",
    children: [
      {
        group: "Company Profile",
        links: ["The Sysco Story", "Our Purpose", "Annual Report", "Public Policy Engagement"],
      },
      {
        group: "Our People",
        links: ["Our Management", "Better Together"],
      },
      {
        group: "Sysco Today",
        links: ["Newsroom", "Events"],
      },
    ],
  },
  {
    label: "Products",
    children: [
      {
        group: "Products",
        links: ["Product Categories", "Sysco Brand Family", "Sysco Foodie", "Quality Assurance"],
      },
      {
        group: "Solutions & Services",
        links: [
          "Services",
          "Culinary and Product Solutions",
          "Technology Solutions",
          "Multicultural",
          "Specialty Companies",
        ],
      },
    ],
  },
  {
    label: "Customers",
    children: [
      {
        group: "Who We Serve",
        links: [
          "Restaurants",
          "Healthcare and Senior Living",
          "Higher Education",
          "Government",
          "Food Service Management",
          "Travel",
          "Leisure",
          "Retail",
        ],
      },
    ],
  },
  {
    label: "Suppliers",
    children: [
      {
        group: "Supplier Partnerships",
        links: ["Supplier Resources", "Supplier Diversity"],
      },
    ],
  },
  { label: "Investors" },
  { label: "Careers" },
  {
    label: "Sustainability",
    children: [
      {
        group: "Sustainability",
        links: ["Our Approach", "Human Rights", "People", "Products", "Planet"],
      },
    ],
  },
  {
    label: "Contact",
    children: [
      {
        group: "Contact",
        links: ["Contact Us", "Our Locations", "Customer Care"],
      },
    ],
  },
] as const;

export const headerChrome = {
  announcement: "Lorem ipsum dolor sit amet — consectetur adipiscing elit",
  signIn: "Sign In",
  shopNow: "Shop Now",
};

export const hero = {
  eyebrow: "Lorem ipsum",
  headline: "Lorem ipsum dolor sit amet consectetur",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  primaryCta: "Lorem ipsum",
  secondaryCta: "Dolor sit amet",
  image: "/hero.jpg",
};

export const featureStrip = {
  items: [
    {
      title: "Lorem ipsum dolor",
      body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
    },
    {
      title: "Consectetur adipiscing",
      body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    },
    {
      title: "Sed do eiusmod",
      body: "Excepteur sint occaecat cupidatat dunt culpa qui officia deserunt mollit.",
    },
  ],
};

export const splitSection = {
  eyebrow: "Lorem ipsum",
  headline: "Ut enim ad minim veniam quis nostrud",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
  cta: "Lorem ipsum dolor",
  image: "/section-produce.jpg",
};

export const cardsSection = {
  headline: "Lorem ipsum dolor sit amet",
  body: "Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.",
  cards: [
    {
      title: "Lorem ipsum",
      body: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
      image: "/card-1.jpg",
    },
    {
      title: "Dolor sit amet",
      body: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit.",
      image: "/card-2.jpg",
    },
    {
      title: "Consectetur",
      body: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.",
      image: "/card-3.jpg",
    },
    {
      title: "Adipiscing elit",
      body: "Ut enim ad minima veniam, quis nostrum exercitationem ullam.",
      image: "/card-4.jpg",
    },
  ],
};

export const specialtyBand = {
  headline: "Specialty Products",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
  cta: "Lorem ipsum",
  image: "/section-kitchen.jpg",
};

export const ctaBand = {
  headline: "Lorem ipsum dolor sit amet consectetur",
  body: "Quisque velit nisi, pretium ut lacinia in, elementum id enim. Curabitur aliquet quam id dui posuere blandit.",
  cta: "Lorem ipsum dolor",
  image: "/cta.jpg",
};

export const footer = {
  blurb:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.",
  columns: [
    {
      title: "About",
      links: [
        "The Sysco Story",
        "Annual Report",
        "Sustainability",
        "Better Together",
        "News Room",
        "At a Glance",
      ],
    },
    {
      title: "Customer Solutions",
      links: [
        "Product Categories",
        "Sysco Brand Family",
        "Services",
        "Culinary Solutions",
        "Technology Solutions",
      ],
    },
    {
      title: "Resources",
      links: ["Suppliers", "Investors", "Careers"],
    },
    {
      title: "Contact Us",
      links: ["Become A Customer", "Our Locations"],
    },
    {
      title: "Support",
      links: [
        "Report A Concern",
        "Limit the Use of My Sensitive Personal Information",
        "Cookie Settings",
      ],
    },
  ],
  legal: ["Terms of Use", "Privacy Notice", "System Usage Policy"],
  copyright: "©2026 All Rights Reserved. Frescos del Valle",
};
