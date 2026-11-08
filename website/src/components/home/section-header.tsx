import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/icon";

type CommerceProps = {
  variant?: "commerce";
  id: string;
  eyebrow?: string;
  title: ReactNode;
  /** Heading scale; the reference uses h4 for product rows and h2 elsewhere. */
  size?: "h2" | "h4";
  link?: { label: string; href: string };
};

type ServiceProps = {
  variant: "service";
  id: string;
  eyebrow?: string;
  title: ReactNode;
  lede?: string;
  icon?: ReactNode;
};

export type SectionHeaderProps = CommerceProps | ServiceProps;

export function SectionHeader(props: SectionHeaderProps) {
  if (props.variant === "service") {
    return (
      <header className="section-header section-header--service">
        {props.icon ? <div className="section-header__icon">{props.icon}</div> : null}
        {props.eyebrow ? <p className="eyebrow">{props.eyebrow}</p> : null}
        <h2 className="h2" id={props.id}>
          {props.title}
        </h2>
        {props.lede ? <p className="prose section-header__lede">{props.lede}</p> : null}
      </header>
    );
  }

  return (
    <header className="section-header section-header--commerce">
      <div>
        {props.eyebrow ? <p className="eyebrow">{props.eyebrow}</p> : null}
        <h2 className={props.size === "h4" ? "h4" : "h2"} id={props.id}>
          {props.title}
        </h2>
      </div>
      {props.link ? (
        <Link className="section-header__link" href={props.link.href}>
          {props.link.label}
          <Icon name="chevron-right" size={16} />
        </Link>
      ) : null}
    </header>
  );
}
