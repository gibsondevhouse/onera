/**
 * Questions the house expects to answer, written in the house voice. Answers
 * keep an editorial, pre-launch tone: they set expectations without committing
 * to figures, dates or policies that are still being finalised.
 */
export type FaqItem = { id: string; question: string; answer: string };

export const faqItems: FaqItem[] = [
  {
    id: "fit",
    question: "How do the garments fit?",
    answer:
      "Each piece follows the house size run, XS to XL, cut to a considered, true-to-size silhouette. Full measurements and a size guide arrive with the first collection, so every choice feels certain.",
  },
  {
    id: "made",
    question: "Where are the garments made?",
    answer:
      "Onéra is imagined in Paris and finished by hand in specialist ateliers. Every piece carries the house label and the quiet marks of its making.",
  },
  {
    id: "care",
    question: "How should a piece be cared for?",
    answer:
      "Our cloth is natural — silk, wool and linen — and rewards gentle, specialist care. Instructions are sewn into every garment and detailed alongside each collection.",
  },
  {
    id: "delivery",
    question: "Where does the house deliver?",
    answer:
      "The house ships from its atelier to clients worldwide. Destinations, timing and any duties are confirmed as the first collection opens.",
  },
  {
    id: "returns",
    question: "Can a piece be returned or exchanged?",
    answer:
      "We want every piece to feel right. Full returns and exchange terms are published before the house opens.",
  },
];
