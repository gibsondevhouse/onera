import type { Metadata } from "next";
import Link from "next/link";
import { ContactChannels } from "@/components/home/contact-channels";

export const metadata: Metadata = { title: "Information" };

const sections = [
  { id: "care", title: "Care", body: "Care guidance for each garment will be published with the first collection." },
  { id: "delivery", title: "Delivery", body: "Delivery regions, timing and costs will be confirmed before the house opens." },
  { id: "returns", title: "Returns & refunds", body: "The returns and refunds policy will be published before the house opens." },
  { id: "sizing", title: "Size guide", body: "Measurements for the house's size run will be published with the first collection." },
  {
    id: "contact",
    title: "Contact",
    body: "The house welcomes considered correspondence — private appointments, press requests and partnerships alike. The channels below open with the first collection; until then, the house list is the surest way to reach us first.",
  },
];

export default function InfoPage() {
  return (
    <main className="page-shell interior-page interior-page--long" id="main-content">
      <p className="eyebrow">Onéra / Information</p>
      <h1 className="interior-title">Information</h1>
      <p className="interior-copy">Policies and guidance are being prepared. Nothing below is final.</p>
      <div className="info-list">
        {sections.map((section) => (
          <section aria-labelledby={`${section.id}-title`} className="info-item" id={section.id} key={section.id}>
            <h2 className="h4" id={`${section.id}-title`}>
              {section.title}
            </h2>
            <p className="prose">{section.body}</p>
            {section.id === "contact" ? (
              <div className="info-item__contact">
                <ContactChannels withNote={false} />
              </div>
            ) : null}
          </section>
        ))}
      </div>
      <Link className="text-link" href="/">
        <span aria-hidden="true">←</span> Return home
      </Link>
    </main>
  );
}
