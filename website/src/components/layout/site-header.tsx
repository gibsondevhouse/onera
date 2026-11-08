"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { site } from "@/data/site";

const HIDE_AFTER = 120;

type Notice = "search" | "account" | "bag" | "region" | null;

const noticeText: Record<Exclude<Notice, null>, string> = {
  search: "Search opens with the first collection.",
  account: "Accounts open with the first collection.",
  bag: "The bag opens with the first collection.",
  region: "One region for now: United States (USD $).",
};

export function SiteHeader() {
  const [hidden, setHidden] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const lastY = useRef(0);
  const ticking = useRef(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const noticeTimer = useRef<number | null>(null);
  const drawerId = useId();

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY.current;
        setStuck(y > 8);
        if (y <= HIDE_AFTER) setHidden(false);
        else if (delta > 4) setHidden(true);
        else if (delta < -4) setHidden(false);
        lastY.current = y;
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const drawer = drawerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = drawer?.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), summary");
    focusables?.[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key === "Tab" && focusables && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  const announce = (kind: Exclude<Notice, null>) => {
    setNotice(kind);
    if (noticeTimer.current) window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(() => setNotice(null), 3200);
  };

  useEffect(() => () => {
    if (noticeTimer.current) window.clearTimeout(noticeTimer.current);
  }, []);

  return (
    <div className="site-header" data-hidden={hidden && !open ? "true" : undefined} data-stuck={stuck ? "true" : undefined}>
      <header className="header container">
        <div className="header__logo">
          <button
            aria-controls={drawerId}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="icon-button header__menu"
            onClick={() => (open ? close() : setOpen(true))}
            ref={menuButtonRef}
            type="button"
          >
            <Icon name={open ? "close" : "menu"} size={22} />
          </button>
          <Link aria-label="Onéra home" className="header__wordmark" href="/">
            <Image alt="" className="wordmark" height={36} priority src="/brand/onera-wordmark-white.svg" width={124} />
          </Link>
        </div>

        <nav aria-label="Primary" className="header__nav">
          <ul className="menu">
            {site.menu.map((item) => (
              <li className="menu__item" key={item.label}>
                {item.children ? (
                  <details className="menu__details" name="header-menu">
                    <summary className="menu__link menu__link--parent">
                      {item.label}
                      <Icon name="chevron-down" size={14} />
                    </summary>
                    <ul className="dropdown">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link className="dropdown__link" href={child.href}>
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link className="menu__link" href={item.href}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__utilities">
          <button aria-label={`Region: ${site.region.label}`} className="region" onClick={() => announce("region")} type="button">
            <Icon name="globe" size={16} />
            <span className="region__label">{site.region.label}</span>
            <Icon name="chevron-down" size={14} />
          </button>
          <button aria-label="Search" className="icon-button header__utility header__utility--search" onClick={() => announce("search")} type="button">
            <Icon name="search" size={24} />
          </button>
          <button aria-label="Account" className="icon-button header__utility header__utility--account" onClick={() => announce("account")} type="button">
            <Icon name="user" size={24} />
          </button>
          <button aria-label="Bag" className="icon-button header__utility" onClick={() => announce("bag")} type="button">
            <Icon name="bag" size={24} />
          </button>
        </div>
      </header>

      <p aria-live="polite" className="header__notice" data-visible={notice ? "true" : undefined} role="status">
        {notice ? noticeText[notice] : ""}
      </p>

      <div aria-hidden={!open} className="drawer" data-open={open ? "true" : undefined} id={drawerId} ref={drawerRef}>
        <div aria-label="Menu" aria-modal="true" className="drawer__panel" role="dialog">
          <ul className="drawer__list">
            {site.menu.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <details className="drawer__details">
                    <summary className="drawer__link">
                      {item.label}
                      <Icon name="chevron-down" size={18} />
                    </summary>
                    <ul className="drawer__sublist">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link className="drawer__sublink" href={child.href} onClick={close}>
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link className="drawer__link" href={item.href} onClick={close}>
                    {item.label}
                    <Icon name="arrow-right" size={18} />
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <p className="drawer__foot caption">{site.region.label}</p>
        </div>
        <button aria-label="Close menu" className="drawer__scrim" onClick={close} tabIndex={-1} type="button" />
      </div>
    </div>
  );
}
