import { Reveal } from "@/components/motion/reveal";
import { ProductCard } from "@/components/home/product-card";
import type { Garment } from "@/data/garments";

type ProductGridProps = { garments: Garment[]; labelledBy: string };

export function ProductGrid({ garments, labelledBy }: ProductGridProps) {
  return (
    <ul aria-labelledby={labelledBy} className="product-grid">
      {garments.map((garment, i) => (
        <Reveal as="li" index={i} key={garment.id}>
          <ProductCard garment={garment} index={i} />
        </Reveal>
      ))}
    </ul>
  );
}
