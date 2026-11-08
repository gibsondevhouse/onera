import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "inverse" | "ghost" | "link";
type Size = "default" | "compact" | "circle";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type AnchorProps = CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;
type NativeProps = CommonProps & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

export type ButtonProps = AnchorProps | NativeProps;

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "default", className, children, ...rest } = props;
  const cls = ["btn", `btn--${variant}`, size !== "default" ? `btn--${size}` : "", className ?? ""].filter(Boolean).join(" ");

  if (rest.href !== undefined) {
    const { href, ...anchorRest } = rest;
    return (
      <Link className={cls} href={href} {...anchorRest}>
        {children}
      </Link>
    );
  }

  const { href: _unused, type, ...buttonRest } = rest;
  void _unused;
  return (
    <button className={cls} type={type ?? "button"} {...buttonRest}>
      {children}
    </button>
  );
}
