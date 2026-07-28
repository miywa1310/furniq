import { ProductDetail } from "@/components/shared";
import { RelatedProducts } from "@/components/shared/RelatedProducts";
import { useGetProductsQuery } from "@/services/Products/products.api";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  const { data } = useGetProductsQuery();

  const product = useMemo(() => {
    return data?.find((p) => String(p.id) === id);
  }, [data, id]);

  if (!product) return <div>Product not found</div>;

  return (
    <>
      <ProductDetail product={product} />
      <RelatedProducts currentProduct={product} />
    </>
  );
};

export { Product };
