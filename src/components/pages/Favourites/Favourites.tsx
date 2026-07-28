import { ProductCard } from "@/components/shared";
import { useGetProductsQuery } from "@/services/Products/products.api";
import { useFavPersistStore } from "@/store/useFavPersistStore";
import { RightOutlined } from "@ant-design/icons";
import { Button, Col, Empty, Row } from "antd";
import Title from "antd/es/typography/Title";
import { type FC, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Favourites: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname);

  const { data = [], isLoading } = useGetProductsQuery();

  const favorites = useFavPersistStore((s) => s.favorites);

  const favoriteProducts = useMemo(() => {
    return favorites
      .map((fav) => {
        const product = data.find((p) => p.id === fav.productId);

        if (!product) return null;

        const variant = product.variants.find(
          (v) => v.variantId === fav.variantId,
        );

        if (!variant) return null;

        return {
          product,
          variant,
        };
      })
      .filter(
        (
          item,
        ): item is {
          product: (typeof data)[number];
          variant: (typeof data)[number]["variants"][number];
        } => item !== null,
      );
  }, [favorites, data]);

  if (isLoading) return null;

  return (
    <div style={{ marginBottom: 40 }}>
      <Title
        level={4}
        style={{
          marginBottom: 20,
          color: "#425463",
          fontSize: 20,
          fontWeight: 600,
        }}
      >
        Home <RightOutlined /> My favorite
      </Title>

      {favoriteProducts.length === 0 ? (
        <div
          style={{
            minHeight: "65vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            textAlign: "center",
          }}
        >
          <div>
            <Empty
              styles={{
                image: {
                  height: 200,
                },
              }}
              description={
                <>
                  <h2
                    style={{
                      marginBottom: 8,
                      color: "#425463",
                    }}
                  >
                    No favorites yet
                  </h2>

                  <p style={{ color: "#425463" }}>
                    Save items you like to see them here
                  </p>
                </>
              }
            />

            <Button
              type="primary"
              size="large"
              style={{ marginTop: 16 }}
              onClick={() => navigate("/")}
            >
              Browse products
            </Button>
          </div>
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {favoriteProducts.map((item, index) => {
            return (
              <Col
                key={index}
                xs={24}
                sm={12}
                md={pathname == "/profile/favorites" ? 12 : 8}
                lg={pathname == "/profile/favorites" ? 8 : 6}
              >
                <ProductCard
                  product={item.product}
                  variantId={item.variant.variantId}
                />
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
};

export { Favourites };
