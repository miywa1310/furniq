import type { Product, Variant } from "@/services/Products/products.types";

export type ProductWithVariant = {
  product: Product;
  variant: Variant;
};

const getBestVariant = (
  variants: Variant[],
  selector: (v: Variant) => number,
): Variant => {
  return variants.reduce((best, curr) =>
    selector(curr) > selector(best) ? curr : best,
  );
};

export const getPopularProducts = (
  products: Product[],
): ProductWithVariant[] => {
  return products
    .filter((p) => p.variants.some((v) => v.reviewsCount >= 10))
    .map((product) => ({
      product,
      variant: getBestVariant(product.variants, (v) => v.reviewsCount),
    }));
};

export const getSaleProducts = (products: Product[]): ProductWithVariant[] => {
  return products
    .filter((p) => p.variants.some((v) => !!v.oldPrice && v.oldPrice > v.price))
    .map((product) => {
      const saleVariants = product.variants.filter(
        (v) => !!v.oldPrice && v.oldPrice > v.price,
      );
      return {
        product,
        variant: getBestVariant(saleVariants, (v) => v.discount ?? 0),
      };
    });
};

export const getTopRatedProducts = (
  products: Product[],
): ProductWithVariant[] => {
  return products
    .filter((p) => p.variants.some((v) => v.rating >= 4.7))
    .map((product) => ({
      product,
      variant: getBestVariant(product.variants, (v) => v.rating),
    }));
};
