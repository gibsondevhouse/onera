/**
 * Collection tiles. The chapter words come from the house's own statement
 * ("Dreams given form. A study in feeling.") paired with dedicated editorial
 * portraits from the house archive.
 */
export type CollectionTile = {
  id: string;
  eyebrow: string;
  label: string;
  href: string;
  image?: { src: string; alt: string };
};

export const collectionTiles: CollectionTile[] = [
  {
    id: "dreams",
    eyebrow: "Chapter I",
    label: "Dreams",
    href: "/collections",
    image: {
      src: "/media/collections/chapter-01-dreams.jpg",
      alt: "Crimson evening gown seated on an emerald velvet sofa under crystal chandeliers",
    },
  },
  {
    id: "form",
    eyebrow: "Chapter II",
    label: "Form",
    href: "/collections",
    image: {
      src: "/media/collections/chapter-02-form.jpg",
      alt: "Cobalt asymmetric midi dress pausing on stone steps beside a garden pond",
    },
  },
  {
    id: "feeling",
    eyebrow: "Chapter III",
    label: "Feeling",
    href: "/collections",
    image: {
      src: "/media/collections/chapter-03-feeling.jpg",
      alt: "Espresso relaxed tailoring set sipping morning tea beside an open balcony",
    },
  },
];
