"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";

type HeroVideoProps = {
  sources: string[];
  poster: string;
};

/** Seconds before a clip ends at which the next clip begins fading in. */
const CROSSFADE_LEAD = 0.9;

export function HeroVideo({ sources, poster }: HeroVideoProps) {
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const advancingRef = useRef(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(mq.matches);
    syncMotion();
    mq.addEventListener("change", syncMotion);
    return () => mq.removeEventListener("change", syncMotion);
  }, []);

  useEffect(() => {
    const el = videoRefs.current[0];
    if (!el || reducedMotion) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry) setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    advancingRef.current = false;
    const el = videoRefs.current[activeIndex];
    if (el) {
      try {
        el.currentTime = 0;
      } catch {
        // currentTime may be unsettable until metadata loads; ignored.
      }
    }
  }, [activeIndex]);

  useEffect(() => {
    const videos = videoRefs.current;
    const syncPlayback = () => {
      const shouldPause = reducedMotion || userPaused || !inView || document.hidden;
      videos.forEach((el, index) => {
        if (!el) return;
        if (index === activeIndex && !shouldPause) {
          void el.play().catch(() => {});
        } else {
          el.pause();
        }
      });
    };

    syncPlayback();
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      document.removeEventListener("visibilitychange", syncPlayback);
      videos.forEach((el) => el?.pause());
    };
  }, [reducedMotion, userPaused, inView, activeIndex]);

  const handleTimeUpdate = (index: number) => {
    if (index !== activeIndex || advancingRef.current) return;
    const el = videoRefs.current[index];
    if (!el || !el.duration || Number.isNaN(el.duration)) return;
    if (el.currentTime >= el.duration - CROSSFADE_LEAD) {
      advancingRef.current = true;
      setActiveIndex((prev) => (prev + 1) % sources.length);
    }
  };

  if (reducedMotion) {
    return null;
  }

  return (
    <>
      {sources.map((src, index) => (
        <video
          aria-hidden="true"
          className="hero__video"
          data-active={index === activeIndex}
          key={src}
          muted
          onTimeUpdate={() => handleTimeUpdate(index)}
          playsInline
          poster={poster}
          preload="auto"
          ref={(el) => {
            videoRefs.current[index] = el;
          }}
          src={src}
        />
      ))}
      <button
        aria-label={userPaused ? "Play background video" : "Pause background video"}
        aria-pressed={userPaused}
        className="hero__control"
        onClick={() => setUserPaused((p) => !p)}
        type="button"
      >
        <Icon name={userPaused ? "play" : "pause"} size={18} />
      </button>
    </>
  );
}
