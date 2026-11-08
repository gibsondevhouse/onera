import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { PlaceholderMedia } from "@/components/ui/placeholder-media";
import type { Garment } from "@/data/garments";

type ProductCardProps = { garment: Garment; index?: number };

export function ProductCard({ garment, index = 0 }: ProductCardProps) {
  return (
    <article className="card">
      <div className="card__media">
        {garment.image ? (
          <>
            <Image alt={garment.image.alt} className="card__img" fill sizes="(min-width: 1200px) 25vw, (min-width: 768px) 33vw, 50vw" src={garment.image.src} />
            {garment.hoverImage ? (
              <Image alt="" aria-hidden="true" className="card__img card__img--hover" fill sizes="(min-width: 1200px) 25vw, (min-width: 768px) 33vw, 50vw" src={garment.hoverImage.src} />
            ) : null}
          </>
        ) : (
          <PlaceholderMedia label={`№ ${String(index + 1).padStart(2, "0")}`} ratio="2 / 3" />
        )}
        {garment.badge ? (
          <div className="card__badge">
            <Badge kind={garment.badge.kind}>{garment.badge.label}</Badge>
          </div>
        ) : null}
        <Link aria-label={`View ${garment.name}`} className="btn btn--primary btn--circle card__action" href={garment.href}>
          <Icon name="bag" size={22} />
        </Link>
      </div>

      <div className="card__info">
        <h3 className="card__title">
          <Link className="card__title-link" href={garment.href}>
            {garment.name}
          </Link>
        </h3>
        <p className="card__price">
          <span className="card__price-label">Regular price</span>
          {garment.compareAtPrice ? (
            <>
              <span className="card__price--sale">{garment.price}</span> <s className="card__price--compare">{garment.compareAtPrice}</s>
            </>
          ) : (
            <span>{garment.price}</span>
          )}
        </p>
        {garment.sizes.length > 0 ? (
          <ul aria-label={`Sizes for ${garment.name}`} className="sizes">
            {garment.sizes.map((size) => (
              <li key={size.label}>
                <Link
                  aria-disabled={!size.available || undefined}
                  aria-label={`Size ${size.label}${size.available ? "" : ", unavailable"}`}
                  className="size-chip"
                  data-unavailable={size.available ? undefined : "true"}
                  href={garment.href}
                  tabIndex={size.available ? 0 : -1}
                >
                  {size.label}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
