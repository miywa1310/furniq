import {
  getPopularProducts,
  getSaleProducts,
  getTopRatedProducts,
} from "@/utils/productTags";

import { useGetProductsQuery } from "@/services/Products/products.api";
import { RightOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import type React from "react";
import { useState } from "react";
import { ProductCard } from "./ProductCard";

const Products: React.FC = () => {
  const { data = [], isLoading } = useGetProductsQuery();
  const skeletons = Array.from({ length: 4 });

  const [visibleCounts, setVisibleCounts] = useState({
    Popular: 4,
    TopRated: 4,
    Sale: 4,
  });

  const sections = [
    {
      title: "Popular",
      products: getPopularProducts(data),
    },

    {
      title: "TopRated",
      products: getTopRatedProducts(data),
    },

    {
      title: "Sale",
      products: getSaleProducts(data),
    },
  ];

  const handleShowMore = (sectionTitle: string) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [sectionTitle]: prev[sectionTitle as keyof typeof prev] + 4,
    }));
  };

  return (
    <>
      {sections.map((section) => {
        const visibleProducts = section.products.slice(
          0,
          visibleCounts[section.title as keyof typeof visibleCounts],
        );

        if (!isLoading && section.products.length === 0) {
          return null;
        }

        return (
          <div key={section.title} style={{ marginBottom: 40 }}>
            <Title
              level={3}
              style={{
                marginBottom: 20,
                color: "#425463",
              }}
            >
              {section.title} <RightOutlined />
            </Title>

            <Row gutter={[16, 16]}>
              {isLoading
                ? skeletons.map((_, index) => (
                    <Col key={index} xs={24} sm={12} md={8} lg={6}>
                      <Card
                        loading
                        style={{
                          borderRadius: 12,
                          height: 280,
                        }}
                      />
                    </Col>
                  ))
                : visibleProducts.map((item) => (
                    <Col
                      key={item.variant.variantId}
                      xs={24}
                      sm={12}
                      md={8}
                      lg={6}
                    >
                      <ProductCard
                        product={item.product}
                        variantId={item.variant.variantId}
                      />
                    </Col>
                  ))}
            </Row>

            {visibleCounts[section.title as keyof typeof visibleCounts] <
              section.products.length && (
              <div
                style={{
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                <Button
                  onClick={() => handleShowMore(section.title)}
                  size="large"
                  style={{
                    borderRadius: 8,
                    width: "50%",
                    border: "none",
                    background: "#EDF1F4",
                    color: "#425463",
                    fontSize: 16,
                  }}
                >
                  Show more
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export { Products };
