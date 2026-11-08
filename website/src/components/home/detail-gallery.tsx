import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import type { DetailTile } from "@/data/details";

type DetailGalleryProps = { tiles: DetailTile[]; labelledBy: string };

export function DetailGallery({ tiles, labelledBy }: DetailGalleryProps) {
  return (
    <ul aria-labelledby={labelledBy} className="details">
      {tiles.map((tile, i) => (
        <Reveal as="li" className="details__item" index={i} key={tile.id}>
          <figure className="detail">
            <span className="detail__media">
              <Image
                alt={tile.image.alt}
                className="detail__img"
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                src={tile.image.src}
              />
            </span>
            <figcaption className="detail__text">
              <span className="caption detail__label">{tile.label}</span>
              <span className="detail__note">{tile.note}</span>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </ul>
  );
}
