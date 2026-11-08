import type { ReactNode } from "react";

type ServiceBlockProps = { children: ReactNode; labelledBy: string; className?: string };

export function ServiceBlock({ children, labelledBy, className }: ServiceBlockProps) {
  return (
    <section aria-labelledby={labelledBy} className={["service-block", className ?? ""].filter(Boolean).join(" ")}>
      {children}
    </section>
  );
}
