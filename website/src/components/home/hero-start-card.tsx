import Image from "next/image";
import { HeroVideo } from "@/components/home/hero-video";
import { site } from "@/data/site";

const HERO_POSTER = "/media/hero/evening-street-walk-poster.jpg";
const HERO_VIDEOS = ["/media/hero/evening-street-walk.mp4", "/media/hero/board-games.mp4"];

/**
 * Full-bleed hero with server-rendered poster photography, ambient motion
 * video (with reduced-motion fallback and pause control), and the house
 * statement centred over a contrast scrim.
 */
export function HeroStartCard() {
  return (
    <section aria-labelledby="home-title" className="section section--media hero">
      <div className="hero__media">
        <Image
          alt="Four women walking together down a city street at night in olive, crimson, cobalt and burgundy Onéra dresses"
          className="hero__img"
          fill
          preload
          sizes="100vw"
          src={HERO_POSTER}
        />
        <HeroVideo poster={HERO_POSTER} sources={HERO_VIDEOS} />
      </div>
      <div aria-hidden="true" className="hero__scrim" />
      <div className="hero__content">
        <h1 className="h1 hero__title" id="home-title">
          {site.statement}
        </h1>
        <p className="hero__subtitle">
          {site.subStatement} {site.tagline}.
        </p>
      </div>
    </section>
  );
}
