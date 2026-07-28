import { useResponsive } from "@/hooks";
import { useGetProductsQuery } from "@/services/Products/products.api";
import type { Product } from "@/services/Products/products.types";
import { RightOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import { ProductCard } from "./ProductCard";

type Props = {
  currentProduct: Product;
};

const RelatedProducts = ({ currentProduct }: Props) => {
  const { isMobile } = useResponsive(768);
  const { data: products = [] } = useGetProductsQuery();
  const related = products
    .filter(
      (p) =>
        p.category === currentProduct.category && p.id !== currentProduct.id,
    )
    .slice(0, 4);

  if (!related.length) return null;

  return (
    <div style={{ marginTop: isMobile ? 0 : 20, marginBottom: 20 }}>
      <Title level={4} style={{ marginBottom: 20, color: "#425463" }}>
        Related products <RightOutlined />
      </Title>

      <Row gutter={[16, 16]}>
        {related.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <ProductCard
              product={product}
              variantId={product.variants[0].variantId}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export { RelatedProducts };
