"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useState } from "react";
import { ProductCard } from "@/components/home/product-card";
import { Icon } from "@/components/ui/icon";
import { PlaceholderMedia } from "@/components/ui/placeholder-media";
import type { Garment } from "@/data/garments";

type Hotspot = { x: number; y: number; garment: Garment };

type ShopTheLookProps = {
  hotspots: Hotspot[];
  image?: { src: string; alt: string; ratio?: string };
};

export function ShopTheLook({ hotspots, image }: ShopTheLookProps) {
  const [active, setActive] = useState(0);
  const current = hotspots[active];
  const mediaStyle = image?.ratio ? ({ "--look-ratio": image.ratio } as CSSProperties) : undefined;

  return (
    <div className="look">
      <div className="look__image" data-has-image={image ? "true" : undefined} style={mediaStyle}>
        {image ? (
          <Image
            alt={image.alt}
            className="look__img"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            src={image.src}
          />
        ) : (
          <PlaceholderMedia label="The look · 9:16" ratio="9 / 16" />
        )}
        {hotspots.map((spot, i) => {
          const title = spot.garment.name;
          return (
            <button
              aria-label={`Show ${title}`}
              aria-pressed={i === active}
              className="hotspot"
              data-active={i === active ? "true" : undefined}
              key={spot.garment.id}
              onClick={() => setActive(i)}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              type="button"
            >
              <Icon name="plus" size={10} />
            </button>
          );
        })}
      </div>
      <div aria-live="polite" className="look__card">
        {current ? <ProductCard garment={current.garment} index={active} key={current.garment.id} /> : null}
      </div>
    </div>
  );
}
