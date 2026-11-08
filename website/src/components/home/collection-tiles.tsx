import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { PlaceholderMedia } from "@/components/ui/placeholder-media";
import type { CollectionTile } from "@/data/collections";

type CollectionTilesProps = { tiles: CollectionTile[]; labelledBy: string };

export function CollectionTiles({ tiles, labelledBy }: CollectionTilesProps) {
  return (
    <ul aria-labelledby={labelledBy} className="tiles" data-count={tiles.length}>
      {tiles.map((tile, i) => (
        <Reveal as="li" className="tiles__item" index={i} key={tile.id}>
          <Link className="tile" href={tile.href}>
            <span className="tile__media">
              {tile.image ? (
                <Image alt={tile.image.alt} className="tile__img" fill sizes="(min-width: 768px) 33vw, 78vw" src={tile.image.src} />
              ) : (
                <PlaceholderMedia ratio="2 / 3" />
              )}
            </span>
            <span className="tile__shade" aria-hidden="true" />
            <span className="tile__text">
              <span className="caption tile__eyebrow">{tile.eyebrow}</span>
              <span className="h4 tile__label">{tile.label}</span>
            </span>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
