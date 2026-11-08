import { Icon } from "@/components/ui/icon";
import type { FaqItem } from "@/data/faq";

type AccordionProps = { items: FaqItem[] };

export function Accordion({ items }: AccordionProps) {
  return (
    <div className="accordion">
      {items.map((item) => (
        <details className="accordion__item" key={item.id} name="faq">
          <summary className="accordion__summary">
            <span>{item.question}</span>
            <Icon name="chevron-down" size={20} />
          </summary>
          <div className="accordion__body">
            <p className="prose">{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
