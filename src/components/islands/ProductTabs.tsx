import { useState } from "react";

export interface ProductTab {
  slug: string;
  name: string;
  description: string;
}

export interface ProductTabsProps {
  products: ProductTab[];
}

export default function ProductTabs({ products }: ProductTabsProps) {
  const [activeSlug, setActiveSlug] = useState<string | undefined>(
    products[0]?.slug,
  );
  const activeProduct = products.find((product) => product.slug === activeSlug);

  return (
    <div>
      <div role="tablist">
        {products.map((product) => (
          <button
            key={product.slug}
            type="button"
            role="tab"
            aria-selected={product.slug === activeSlug}
            onClick={() => setActiveSlug(product.slug)}
          >
            {product.name}
          </button>
        ))}
      </div>
      <div role="tabpanel">{activeProduct?.description}</div>
    </div>
  );
}
