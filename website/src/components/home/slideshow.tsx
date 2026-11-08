"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { PlaceholderMedia } from "@/components/ui/placeholder-media";

export type Slide = {
  id: string;
  eyebrow?: string;
  title: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  mediaLabel?: string;
  image?: { src: string; alt: string; position?: string };
};

type SlideshowProps = { slides: Slide[]; labelledBy: string };

export function Slideshow({ slides, labelledBy }: SlideshowProps) {
  const [active, setActive] = useState(0);
  const count = slides.length;
  const go = (delta: number) => setActive((i) => (i + delta + count) % count);

  return (
    <section aria-labelledby={labelledBy} aria-roledescription="carousel" className="section section--media slideshow">
      {slides.map((slide, i) => (
        <div
          aria-hidden={i !== active}
          aria-label={`Slide ${i + 1} of ${count}`}
          aria-roledescription="slide"
          className="slide"
          data-active={i === active ? "true" : undefined}
          key={slide.id}
          role="group"
        >
          <div className="slide__media">
            {slide.image ? (
              <Image
                alt={slide.image.alt}
                className="slide__img"
                fill
                sizes="100vw"
                src={slide.image.src}
                style={slide.image.position ? { objectPosition: slide.image.position } : undefined}
              />
            ) : (
              <PlaceholderMedia label={slide.mediaLabel} motif={i % 2 === 0} ratio="16 / 7" />
            )}
          </div>
          <div aria-hidden="true" className="slide__scrim" />
          <div className="container slide__content">
            {slide.eyebrow ? <p className="eyebrow slide__eyebrow">{slide.eyebrow}</p> : null}
            <h2 className="h0 slide__title" id={i === 0 ? labelledBy : undefined}>
              {slide.title}
            </h2>
            <div className="slide__actions">
              <Button href={slide.primary.href} size="compact" tabIndex={i === active ? 0 : -1} variant="inverse">
                {slide.primary.label}
              </Button>
              {slide.secondary ? (
                <Button href={slide.secondary.href} size="compact" tabIndex={i === active ? 0 : -1} variant="ghost">
                  {slide.secondary.label}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      ))}

      {count > 1 ? (
        <div className="slideshow__controls container">
          <span aria-live="polite" className="slideshow__counter">
            {active + 1}/{count}
          </span>
          <button aria-label="Previous slide" className="slideshow__arrow" onClick={() => go(-1)} type="button">
            <Icon name="chevron-left" size={20} />
          </button>
          <button aria-label="Next slide" className="slideshow__arrow" onClick={() => go(1)} type="button">
            <Icon name="chevron-right" size={20} />
          </button>
        </div>
      ) : null}
    </section>
  );
}
