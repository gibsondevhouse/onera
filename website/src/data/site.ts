export type NavLink = { label: string; href: string };
export type NavItem = NavLink & { children?: NavLink[] };

/**
 * Site chrome content. Every destination is a route that exists in the app.
 * Menu depth mirrors the reference storefront; the labels are Onéra's own.
 */
export const site = {
  name: "Onéra",
  tagline: "An independent fashion house",
  statement: "Dreams given form.",
  subStatement: "A study in feeling.",
  announcement: "Dreams given form · A study in feeling · The house opens soon",
  menu: [
    { label: "New in", href: "/collections" },
    { label: "Home", href: "/" },
    {
      label: "Collections",
      href: "/collections",
      children: [
        { label: "All collections", href: "/collections" },
        { label: "Chapter I · Dreams", href: "/collections" },
        { label: "Chapter II · Form", href: "/collections" },
        { label: "Chapter III · Feeling", href: "/collections" },
      ],
    },
    {
      label: "Garments",
      href: "/collections",
      children: [
        { label: "All garments", href: "/collections" },
        { label: "Outerwear", href: "/collections" },
        { label: "Dresses", href: "/collections" },
        { label: "Tailoring", href: "/collections" },
      ],
    },
    { label: "The house", href: "/philosophy" },
    {
      label: "Care & policies",
      href: "/info",
      children: [
        { label: "Care", href: "/info#care" },
        { label: "Delivery", href: "/info#delivery" },
        { label: "Returns", href: "/info#returns" },
        { label: "Contact", href: "/info#contact" },
      ],
    },
    { label: "Size guide", href: "/info#sizing" },
  ] satisfies NavItem[],
  region: { label: "United States (USD $)" },
  contact: {
    eyebrow: "Correspondence",
    heading: "Contact the house",
    lede: "For private appointments, press and partnership enquiries, the house welcomes considered correspondence.",
    channels: [
      { label: "Clientele", detail: "Private appointments and order enquiries." },
      { label: "Press", detail: "Editorial requests and lookbook access." },
      { label: "Partnerships", detail: "Stockists, collaborations and ateliers." },
    ],
    note: "Direct channels open with the first collection.",
  },
  footer: {
    about: {
      heading: "About us",
      lines: ["Atelier address to be confirmed.", "Opening hours to be confirmed."],
    },
    info: {
      heading: "Info",
      links: [
        { label: "Contact", href: "/info#contact" },
        { label: "About us", href: "/philosophy" },
        { label: "Returns & refunds", href: "/info#returns" },
        { label: "Delivery", href: "/info#delivery" },
        { label: "Search", href: "/collections" },
      ],
    },
    letters: {
      heading: "Stay in touch",
      copy: "Subscribe to receive updates, access to the first looks, and more.",
    },
  },
  year: 2026,
} as const;
