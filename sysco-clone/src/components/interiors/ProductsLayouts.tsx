import type { InteriorContent } from "@/content/interiors";
import {
  CardGrid,
  CtaBand,
  FeatureCallout,
  ImageTileGrid,
  PageShell,
  PhotoHero,
} from "./shared";

/**
 * Sysco Products hub (= product-categories destination):
 * tall photo hero “Our Products” → centered tile mosaic →
 * feature callouts → specialty card grid → CTA
 */
export function ProductsHubLayout({ content }: { content: InteriorContent }) {
  const tiles = content.cards || [];
  const specialty = tiles.slice(0, 3);
  return (
    <PageShell>
      <PhotoHero
        content={{
          ...content,
          title: content.title === "Productos" ? "Nuestros productos" : content.title,
        }}
        tall
      />

      {tiles.length ? (
        <ImageTileGrid
          heading={content.cardsHeading || "Nuestras categorías de productos"}
          cards={tiles}
        />
      ) : null}

      {content.splits?.[0] ? (
        <FeatureCallout
          block={{
            ...content.splits[0],
            title: content.splits[0].title || "Soluciones de vanguardia",
          }}
        />
      ) : null}

      {specialty.length ? (
        <CardGrid
          heading={content.featuresHeading || "Alimentos especializados"}
          cards={specialty}
          columns={3}
        />
      ) : null}

      {content.splits?.[1] ? (
        <FeatureCallout block={content.splits[1]} />
      ) : null}

      {content.cta ? <CtaBand cta={content.cta} /> : null}
    </PageShell>
  );
}

/**
 * Product detail — same Sysco chrome as hubs: photo hero + tiles/callouts
 * (Sysco Brand Family uses standard-page-hero + image tiles).
 */
export function ProductsDetailLayout({ content }: { content: InteriorContent }) {
  return (
    <PageShell>
      <PhotoHero content={content} tall />

      {content.intro?.length ? (
        <section style={{ padding: "48px 0 8px", background: "#fff" }}>
          <div className="container" style={{ maxWidth: "68ch" }}>
            {content.intro.map((p) => (
              <p
                key={p.slice(0, 40)}
                style={{
                  margin: "0 0 1.1rem",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                  color: "var(--sysco-ink)",
                }}
              >
                {p}
              </p>
            ))}
          </div>
        </section>
      ) : null}

      {content.cards?.length ? (
        <ImageTileGrid
          heading={content.cardsHeading || "Explora la oferta"}
          cards={content.cards}
        />
      ) : null}

      {content.splits?.map((block) => (
        <FeatureCallout key={`${block.title}-${block.align}`} block={block} />
      ))}

      {content.features?.length ? (
        <CardGrid
          heading={content.featuresHeading || "Recursos de producto"}
          cards={content.features.map((f, i) => ({
            title: f.title,
            body: f.body,
            href: content.href,
            image: ["/section-produce.jpg", "/section-kitchen.jpg", "/card-1.jpg"][i % 3],
          }))}
          columns={3}
        />
      ) : null}

      {content.cta ? <CtaBand cta={content.cta} /> : null}
    </PageShell>
  );
}
