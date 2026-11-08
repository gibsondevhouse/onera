/**
 * Craft detail tiles for the homepage "A study in feeling" band. Each entry
 * pairs a square macro of material or construction from the house archive with
 * a short caption, telling the materials-and-finishing story behind the looks.
 */
export type DetailTile = {
  id: string;
  label: string;
  note: string;
  image: { src: string; alt: string };
};

export const detailTiles: DetailTile[] = [
  {
    id: "silk",
    label: "Champagne silk",
    note: "A liquid drape with a quiet sheen.",
    image: {
      src: "/media/details/champagne-silk.jpg",
      alt: "Macro close-up of champagne silk falling in soft, liquid folds",
    },
  },
  {
    id: "wool",
    label: "Charcoal wool",
    note: "A dry, structured hand.",
    image: {
      src: "/media/details/charcoal-wool.jpg",
      alt: "Macro close-up of charcoal wool in a fine, dry weave",
    },
  },
  {
    id: "linen",
    label: "Natural linen",
    note: "An open, breathable weave.",
    image: {
      src: "/media/details/natural-linen.jpg",
      alt: "Macro close-up of natural oatmeal linen in an open plain weave",
    },
  },
  {
    id: "beadwork",
    label: "Hand-set beadwork",
    note: "Beads and sequins placed by hand.",
    image: {
      src: "/media/details/hand-beading.jpg",
      alt: "Champagne bodice embellished with hand-set gold beads and sequins",
    },
  },
  {
    id: "bullion",
    label: "Gold bullion work",
    note: "Metal thread couched by hand.",
    image: {
      src: "/media/details/gold-bullion.jpg",
      alt: "Macro close-up of gold bullion embroidery couched by hand over midnight cloth",
    },
  },
  {
    id: "lapel",
    label: "Pick-stitched edges",
    note: "Finished by hand along the seam.",
    image: {
      src: "/media/details/lapel-stitch.jpg",
      alt: "Hand pick-stitching running along a tailored charcoal lapel edge",
    },
  },
  {
    id: "lining",
    label: "Silk lining",
    note: "Jacquard silk, finished in Italy.",
    image: {
      src: "/media/details/silk-lining.jpg",
      alt: "Navy jacquard silk lining with burgundy piping and a 100% silk, made in Italy tag",
    },
  },
  {
    id: "label",
    label: "The ONÉRA label",
    note: "Signed inside every piece.",
    image: {
      src: "/media/details/neck-label.jpg",
      alt: "Navy satin ONÉRA Paris neck label stitched inside a charcoal wool coat",
    },
  },
];
