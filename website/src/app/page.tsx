import { Accordion } from "@/components/home/accordion";
import { CollectionTiles } from "@/components/home/collection-tiles";
import { ContactChannels } from "@/components/home/contact-channels";
import { DetailGallery } from "@/components/home/detail-gallery";
import { HeroStartCard } from "@/components/home/hero-start-card";
import { NewsletterForm } from "@/components/home/newsletter-form";
import { ProductGrid } from "@/components/home/product-grid";
import { SectionHeader } from "@/components/home/section-header";
import { ServiceBlock } from "@/components/home/service-block";
import { ShopTheLook } from "@/components/home/shop-the-look";
import { Slideshow } from "@/components/home/slideshow";
import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { collectionTiles } from "@/data/collections";
import { detailTiles } from "@/data/details";
import { faqItems } from "@/data/faq";
import { lookGarments, newInGarments, seasonGarments } from "@/data/garments";
import { site } from "@/data/site";

export default function Home() {
  return (
    <main id="main-content">
      <HeroStartCard />

      <section aria-labelledby="new-in-title" className="section section--padded">
        <div className="container">
          <SectionHeader id="new-in-title" link={{ label: "View all", href: "/collections" }} size="h4" title="New in" />
          <ProductGrid garments={newInGarments} labelledBy="new-in-title" />
        </div>
      </section>

      <Slideshow
        labelledBy="slideshow-title"
        slides={[
          {
            id: "season",
            title: "The first season",
            primary: { label: "Shop new in", href: "/collections" },
            secondary: { label: "The house", href: "/philosophy" },
            image: {
              src: "/media/editorial/slide-01-suite-campaign.jpg",
              alt: "Two women in sand and espresso Onéra button-down sets laughing over a board game in a sunlit suite",
              position: "center 35%",
            },
          },
          {
            id: "form",
            title: "The imagined, made tangible",
            primary: { label: "View collections", href: "/collections" },
            secondary: { label: "Size guide", href: "/info#sizing" },
            image: {
              src: "/media/editorial/slide-02-packaging-ceremony.jpg",
              alt: "Open olive Onéra garment box with ivory tissue paper, stationery and silk ribbon on travertine stone",
              position: "center center",
            },
          },
        ]}
      />

      <section aria-label="The season's looks" className="section section--padded">
        <div className="container">
          <ProductGrid garments={seasonGarments} labelledBy="slideshow-title" />
        </div>
      </section>

      <section aria-labelledby="collections-title" className="section section--padded">
        <div className="container">
          <SectionHeader id="collections-title" title="Shop our collections" />
          <CollectionTiles labelledBy="collections-title" tiles={collectionTiles} />
        </div>
      </section>

      <section aria-labelledby="look-title" className="section section--padded">
        <div className="container">
          <SectionHeader id="look-title" title="Shop the look" />
          <ShopTheLook
            hotspots={[
              { x: 16, y: 55, garment: lookGarments[0] },
              { x: 38, y: 53, garment: lookGarments[1] },
              { x: 62, y: 55, garment: lookGarments[2] },
              { x: 86, y: 54, garment: lookGarments[3] },
            ]}
            image={{
              src: "/media/editorial/shop-the-look-dresses-crop.jpg",
              alt: "Detail crop of four women arm-in-arm at night wearing olive, burgundy, crimson and cobalt Onéra dresses",
              ratio: "615 / 768",
            }}
          />
        </div>
      </section>

      <section aria-labelledby="details-title" className="section section--padded">
        <div className="container">
          <SectionHeader
            eyebrow="The house in detail"
            id="details-title"
            title="A study in feeling"
          />
          <DetailGallery labelledBy="details-title" tiles={detailTiles} />
        </div>
      </section>

      <div className="container service-blocks">
        <Reveal>
          <ServiceBlock labelledBy="questions-title">
            <SectionHeader id="questions-title" lede="Browse the questions the house expects to answer about its garments, policies and service." title="Frequently asked questions" variant="service" />
            <Accordion items={faqItems} />
          </ServiceBlock>
        </Reveal>

        <Reveal>
          <ServiceBlock labelledBy="contact-title">
            <SectionHeader eyebrow={site.contact.eyebrow} id="contact-title" lede={site.contact.lede} title={site.contact.heading} variant="service" />
            <ContactChannels />
          </ServiceBlock>
        </Reveal>

        <Reveal>
          <ServiceBlock labelledBy="letters-title">
            <SectionHeader eyebrow="The list" icon={<Icon name="mail" size={44} />} id="letters-title" lede="Join the house list for first word on the opening collection, private previews and quiet invitations — never anything more." title="Stay in touch" variant="service" />
            <NewsletterForm />
          </ServiceBlock>
        </Reveal>
      </div>
    </main>
  );
}
