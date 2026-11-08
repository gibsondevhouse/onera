import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/home/newsletter-form";
import { Icon } from "@/components/ui/icon";
import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__blocks">
          <div className="footer__block footer__block--about">
            <Link aria-label="Onéra home" className="footer__wordmark" href="/">
              <Image alt="" height={38} src="/brand/onera-wordmark-white.svg" width={130} />
            </Link>
            <p className="footer__heading">{site.footer.about.heading}</p>
            <div className="footer__prose">
              <p>
                <strong>{site.tagline}.</strong>
                <br />
                {site.statement} {site.subStatement}
              </p>
              <p>
                {site.footer.about.lines.map((line) => (
                  <span className="footer__line" key={line}>
                    {line}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <nav aria-label="Footer navigation" className="footer__block">
            <p className="footer__heading">{site.footer.info.heading}</p>
            <ul className="footer__links">
              {site.footer.info.links.map((item) => (
                <li key={item.label}>
                  <Link className="footer__link" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__block footer__block--letters">
            <p className="footer__heading">{site.footer.letters.heading}</p>
            <p className="footer__prose">{site.footer.letters.copy}</p>
            <div className="footer__form">
              <NewsletterForm compact />
            </div>
          </div>
        </div>

        <div className="footer__row">
          <p className="region region--static">
            <Icon name="globe" size={16} />
            <span className="region__label">{site.region.label}</span>
            <Icon name="chevron-down" size={14} />
          </p>
          <p className="footer__social">
            <span aria-label="Instagram, coming soon" className="footer__social-icon" role="img">
              <Icon name="instagram" size={24} />
            </span>
            <span className="footer__social-note">Channels open with the first collection</span>
          </p>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">{site.tagline}</p>
          <p className="footer__copyright">
            © {site.year} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
