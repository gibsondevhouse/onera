type BadgeProps = {
  kind: "soldout" | "sale" | "custom";
  children: React.ReactNode;
};

export function Badge({ kind, children }: BadgeProps) {
  return <span className={`badge badge--${kind}`}>{children}</span>;
}
