import type { InteriorContent } from "@/content/interiors";
import {
  BlueLogoCallout,
  CardGrid,
  FeatureCallout,
  FeatureGrid,
  ImageTileGrid,
  PageShell,
  PhotoHero,
} from "./shared";
import styles from "./products.module.css";

/**
 * Sysco Products hub (= product-categories destination):
 * tall photo hero “Our Products” → 3-col category tiles →
 * feature callout → Specialty Foods → Featured Recipes →
 * blue Foodie logo callout → Product Resources
 */
export function ProductsHubLayout({ content }: { content: InteriorContent }) {
  const heroContent: InteriorContent = {
    ...content,
    title: "Nuestros productos",
  };

  return (
    <PageShell className={styles.productsShell}>
      <PhotoHero content={heroContent} tall showCrumbs={false} />

      {content.cards?.length ? (
        <ImageTileGrid
          heading={content.cardsHeading || "Nuestras categorías de productos"}
          cards={content.cards}
          columns={3}
        />
      ) : null}

      {content.splits?.[0] ? (
        <FeatureCallout
          block={{
            ...content.splits[0],
            title: content.splits[0].title || "Soluciones de vanguardia",
          }}
          band="gray"
        />
      ) : null}

      {content.specialtyCards?.length ? (
        <CardGrid
          heading={content.specialtyHeading || "Alimentos especializados"}
          cards={content.specialtyCards}
          columns={3}
          tone="band"
        />
      ) : null}

      {content.recipeCards?.length ? (
        <CardGrid
          heading={content.recipeHeading || "Recetas destacadas"}
          cards={content.recipeCards}
          columns={3}
        />
      ) : null}

      {content.logoCallout ? (
        <BlueLogoCallout callout={content.logoCallout} />
      ) : null}

      {content.resourceCards?.length ? (
        <CardGrid
          heading={content.resourceHeading || "Recursos de producto"}
          cards={content.resourceCards}
          columns={3}
          tone="band"
        />
      ) : null}
    </PageShell>
  );
}

/**
 * Product detail variants — Brand Family, Foodie, QA, Solutions —
 * each mirrors the corresponding Sysco Products child stack.
 */
export function ProductsDetailLayout({ content }: { content: InteriorContent }) {
  const variant = content.productsVariant || "default";

  if (variant === "brand-family") {
    return (
      <PageShell className={styles.productsShell}>
        <PhotoHero content={content} tall />
        {content.cards?.length ? (
          <ImageTileGrid
            heading={content.cardsHeading || "Familia de marcas Sysco"}
            cards={content.cards}
            columns={3}
          />
        ) : null}
        {content.splits?.map((block) => (
          <FeatureCallout key={`${block.title}-${block.align}`} block={block} band="gray" />
        ))}
        {content.logoCallout ? <BlueLogoCallout callout={content.logoCallout} /> : null}
        {content.resourceCards?.length ? (
          <CardGrid
            heading={content.resourceHeading || "Explora más"}
            cards={content.resourceCards}
            columns={3}
          />
        ) : null}
      </PageShell>
    );
  }

  if (variant === "foodie") {
    return (
      <PageShell className={styles.productsShell}>
        <PhotoHero content={content} tall />
        {content.intro?.length ? (
          <section className={styles.introBand}>
            <div className={`container ${styles.introInner}`}>
              {content.intro.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </section>
        ) : null}
        {content.logoCallout ? <BlueLogoCallout callout={content.logoCallout} /> : null}
        {content.recipeCards?.length ? (
          <CardGrid
            heading={content.recipeHeading || "Recetas destacadas"}
            cards={content.recipeCards}
            columns={3}
          />
        ) : null}
        {content.cards?.length ? (
          <CardGrid
            heading={content.cardsHeading || "Explora Foodie"}
            cards={content.cards}
            columns={3}
            tone="band"
          />
        ) : null}
        {content.splits?.map((block) => (
          <FeatureCallout key={`${block.title}-${block.align}`} block={block} />
        ))}
      </PageShell>
    );
  }

  if (variant === "quality") {
    return (
      <PageShell className={styles.productsShell}>
        <PhotoHero content={content} tall />
        {content.intro?.length ? (
          <section className={styles.introBand}>
            <div className={`container ${styles.introInner}`}>
              {content.intro.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </section>
        ) : null}
        {content.features?.length ? (
          <FeatureGrid
            heading={content.featuresHeading || "Nuestro compromiso"}
            items={content.features}
          />
        ) : null}
        {content.splits?.map((block, i) => (
          <FeatureCallout
            key={`${block.title}-${block.align}`}
            block={block}
            band={i % 2 === 0 ? "gray" : "white"}
          />
        ))}
        {content.resourceCards?.length ? (
          <CardGrid
            heading={content.resourceHeading || "Recursos"}
            cards={content.resourceCards}
            columns={3}
            tone="band"
          />
        ) : null}
      </PageShell>
    );
  }

  /* services / culinary / technology / multicultural / specialty / default */
  return (
    <PageShell className={styles.productsShell}>
      <PhotoHero content={content} tall />

      {content.intro?.length ? (
        <section className={styles.introBand}>
          <div className={`container ${styles.introInner}`}>
            {content.intro.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </section>
      ) : null}

      {content.cards?.length ? (
        variant === "specialty" ||
        variant === "services" ||
        variant === "culinary" ||
        variant === "technology" ||
        variant === "multicultural" ? (
          <CardGrid
            heading={content.cardsHeading || "Explora la oferta"}
            cards={content.cards}
            columns={3}
          />
        ) : (
          <ImageTileGrid
            heading={content.cardsHeading || "Explora la oferta"}
            cards={content.cards}
            columns={3}
          />
        )
      ) : null}

      {content.splits?.map((block, i) => (
        <FeatureCallout
          key={`${block.title}-${block.align}`}
          block={block}
          band={i % 2 === 0 ? "gray" : "white"}
        />
      ))}

      {content.logoCallout ? <BlueLogoCallout callout={content.logoCallout} /> : null}

      {content.resourceCards?.length ? (
        <CardGrid
          heading={content.resourceHeading || "Recursos de producto"}
          cards={content.resourceCards}
          columns={3}
          tone="band"
        />
      ) : null}
    </PageShell>
  );
}
