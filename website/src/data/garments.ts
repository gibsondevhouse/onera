/**
 * Garment records for the beta storefront. Every value here follows decision
 * D02: names are roman-numeral looks, prices are dashes, sizes are the house's
 * planned size run with a fixture availability pattern, and each card pairs
 * distinct approved photography from the 6 photographed house garments.
 */
export type Size = { label: string; available: boolean };

export type Garment = {
  id: string;
  name: string;
  href: string;
  /** Shown after the "Regular price" label; a dash while unconfirmed. */
  price: string;
  compareAtPrice?: string;
  sizes: Size[];
  badge?: { kind: "soldout" | "sale" | "custom"; label: string };
  image?: { src: string; alt: string };
  hoverImage?: { src: string; alt: string };
};

const run = ["XS", "S", "M", "L", "XL"];

function sizes(unavailable: number[] = []): Size[] {
  return run.map((label, i) => ({ label, available: !unavailable.includes(i) }));
}

const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI"];

function look(n: number, extra: Partial<Garment> = {}): Garment {
  return {
    id: `look-${n}`,
    name: `Look ${roman[n - 1]}`,
    href: "/collections",
    price: "— —",
    sizes: sizes(),
    ...extra,
  };
}

export const newInGarments: Garment[] = [
  look(1, {
    image: {
      src: "/media/garments/look-01-primary.jpg",
      alt: "Crimson one-shoulder mermaid gown with beaded waist trim in a marble hallway",
    },
    hoverImage: {
      src: "/media/garments/look-01-hover.jpg",
      alt: "Crimson one-shoulder mermaid gown on a chandelier balcony landing",
    },
  }),
  look(2, {
    sizes: sizes([0, 4]),
    image: {
      src: "/media/garments/look-02-primary.jpg",
      alt: "Burgundy off-the-shoulder floor-length gown standing in a wood-panelled library",
    },
    hoverImage: {
      src: "/media/garments/look-02-hover.jpg",
      alt: "Burgundy off-the-shoulder gown beside a lit fireplace",
    },
  }),
  look(3, {
    badge: { kind: "soldout", label: "Sold out" },
    sizes: sizes([0, 1, 2, 3, 4]),
    image: {
      src: "/media/garments/look-03-primary.jpg",
      alt: "Olive asymmetric cap-sleeve column gown standing on a stone café terrace",
    },
    hoverImage: {
      src: "/media/garments/look-03-hover.jpg",
      alt: "Olive column gown seated at an outdoor café table",
    },
  }),
  look(4, {
    sizes: sizes([0]),
    image: {
      src: "/media/garments/look-04-primary.jpg",
      alt: "Cobalt blue asymmetric sleeveless midi dress walking along a garden path",
    },
    hoverImage: {
      src: "/media/garments/look-04-hover.jpg",
      alt: "Cobalt blue midi dress leaning against a wooden garden pergola",
    },
  }),
  look(5, {
    image: {
      src: "/media/garments/look-05-primary.jpg",
      alt: "Sand relaxed button-down shirt and trouser set standing full-length in studio",
    },
    hoverImage: {
      src: "/media/garments/look-05-hover.jpg",
      alt: "Sand button-down shirt and trouser set seated in studio",
    },
  }),
  look(6, {
    sizes: sizes([3, 4]),
    image: {
      src: "/media/garments/look-06-primary.jpg",
      alt: "Espresso relaxed button-down shirt and trouser set standing in studio",
    },
    hoverImage: {
      src: "/media/garments/look-06-hover.jpg",
      alt: "Espresso button-down shirt and trouser set leaning beside a studio stool",
    },
  }),
  look(7, {
    image: {
      src: "/media/garments/look-07-primary.jpg",
      alt: "Crimson beaded mermaid gown framed beneath a marble archway",
    },
    hoverImage: {
      src: "/media/garments/look-07-hover.jpg",
      alt: "Crimson beaded mermaid gown beside an arched window",
    },
  }),
  look(8, {
    sizes: sizes([1]),
    image: {
      src: "/media/garments/look-08-primary.jpg",
      alt: "Cobalt blue asymmetric midi dress standing before a glass garden pavilion",
    },
    hoverImage: {
      src: "/media/garments/look-08-hover.jpg",
      alt: "Cobalt blue midi dress seated on a stone garden bench",
    },
  }),
];

export const seasonGarments: Garment[] = [
  look(9, {
    image: {
      src: "/media/garments/look-09-primary.jpg",
      alt: "Burgundy off-the-shoulder gown posed beside a library reading table",
    },
    hoverImage: {
      src: "/media/garments/look-09-hover.jpg",
      alt: "Burgundy off-the-shoulder gown holding a volume beside library bookshelves",
    },
  }),
  look(10, {
    sizes: sizes([0, 1]),
    image: {
      src: "/media/garments/look-10-primary.jpg",
      alt: "Ivory-sand relaxed button-down set lounging on a sunlit balcony",
    },
    hoverImage: {
      src: "/media/garments/look-10-hover.jpg",
      alt: "Sand button-down set resting along a panoramic window bench",
    },
  }),
  look(11, {
    image: {
      src: "/media/garments/look-11-primary.jpg",
      alt: "Espresso button-down shirt and trouser set looking out an evening window",
    },
    hoverImage: {
      src: "/media/garments/look-11-hover.jpg",
      alt: "Espresso button-down set pouring tea in a sunlit suite",
    },
  }),
  look(12, {
    badge: { kind: "custom", label: "Made to order" },
    image: {
      src: "/media/garments/look-12-primary.jpg",
      alt: "Olive column gown seated on a terrace adjusting an earring",
    },
    hoverImage: {
      src: "/media/garments/look-12-hover.jpg",
      alt: "Olive column gown reading on a café terrace",
    },
  }),
  look(13, {
    sizes: sizes([4]),
    image: {
      src: "/media/garments/look-13-primary.jpg",
      alt: "Espresso button-down shirt and trouser set perched on a studio stool",
    },
    hoverImage: {
      src: "/media/garments/look-13-hover.jpg",
      alt: "Espresso button-down set seated on the studio floor",
    },
  }),
  look(14, {
    image: {
      src: "/media/garments/look-14-primary.jpg",
      alt: "Sand button-down set reading on a corner sofa in a high-rise suite",
    },
    hoverImage: {
      src: "/media/garments/look-14-hover.jpg",
      alt: "Sand button-down set smiling beside a panoramic city window",
    },
  }),
  look(15, {
    sizes: sizes([0, 2]),
    image: {
      src: "/media/garments/look-15-primary.jpg",
      alt: "Sand button-down shirt and trouser set seated in profile in studio",
    },
    hoverImage: {
      src: "/media/garments/look-15-hover.jpg",
      alt: "Sand button-down set in a relaxed floor pose in studio",
    },
  }),
  look(16, {
    image: {
      src: "/media/garments/look-16-primary.jpg",
      alt: "Espresso button-down set seated in an armchair overlooking the water",
    },
    hoverImage: {
      src: "/media/garments/look-16-hover.jpg",
      alt: "Close studio portrait in the espresso button-down shirt",
    },
  }),
];

/** Matches left-to-right dress order in shop-the-look-dresses-crop.jpg. */
export const lookGarments: Garment[] = [
  newInGarments[2],
  newInGarments[1],
  newInGarments[0],
  newInGarments[3],
];
