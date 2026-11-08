import type { CSSProperties } from "react";

type PlaceholderMediaProps = {
  /** CSS aspect ratio, e.g. "2 / 3". */
  ratio?: string;
  /** Small caption in the lower-left corner. */
  label?: string;
  /** Draw the house's orbit motif in the centre. */
  motif?: boolean;
  className?: string;
};

/**
 * Stands in for photography that the house has not supplied yet.
 * It is decorative only; the surrounding component carries the meaning.
 */
export function PlaceholderMedia({ ratio = "2 / 3", label, motif = false, className }: PlaceholderMediaProps) {
  const style = { "--ph-ratio": ratio } as CSSProperties;
  return (
    <div aria-hidden="true" className={["ph", className ?? ""].filter(Boolean).join(" ")} style={style}>
      {motif ? (
        <div className="ph__motif">
          <span className="ph__orbit ph__orbit--outer" />
          <span className="ph__orbit ph__orbit--inner" />
          <span className="ph__core" />
        </div>
      ) : (
        <span className="ph__mark">O</span>
      )}
      {label ? <span className="ph__label">{label}</span> : null}
    </div>
  );
}
