import type { Product } from "@/services/Products/products.types";
import { useCartPersistStore } from "@/store/useCartPersistStore";
import { useFavPersistStore } from "@/store/useFavPersistStore";
import {
  ArrowRightOutlined,
  HeartFilled,
  HeartOutlined,
  ShoppingCartOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Button, Card, Flex, Space } from "antd";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import type React from "react";
import { useNavigate } from "react-router-dom";

type FavoriteCardProps = {
  product: Product;
  variantId: string;
};

const FavoriteCard: React.FC<FavoriteCardProps> = ({ product, variantId }) => {
  const navigate = useNavigate();

  const variant =
    product.variants.find((v) => v.variantId === variantId) ??
    product.variants?.[0];

  const toggleFavorite = useFavPersistStore((s) => s.toggleFavorite);

  const isFavoriteStore = useFavPersistStore((s) => s.isFavorite);

  const addCart = useCartPersistStore((s) => s.addToCart);

  const isFav = variant
    ? isFavoriteStore(product.id, variant.variantId)
    : false;

  const isCart = useCartPersistStore((s) =>
    variant ? s.isCart(product.id, variant.variantId) : false,
  );

  const handleFav = () => {
    if (!variant) return;

    toggleFavorite(product.id, variant.variantId);
  };

  const handleAddCart = () => {
    if (!variant) return;

    addCart({
      productId: product.id,
      variantId: variant.variantId,
      title: product.title,
      price: variant.price,
      color: variant.color,
      image: variant.images?.[0],
      qty: 1,
    });
  };

  if (!variant) return null;

  return (
    <Flex
      justify="center"
      gap={15}
      style={{
        flexDirection: "column",
      }}
    >
      <Card
        style={{
          width: "100%",
          borderRadius: 16,
          backgroundColor: "#EDF1F4",
          position: "relative",
          overflow: "hidden",
        }}
        bodyStyle={{
          padding: 12,
        }}
      >
        <img
          src={variant.images?.[0]}
          alt={product.title}
          style={{
            width: "100%",
            cursor: "pointer",
            objectFit: "contain",
          }}
          onClick={() =>
            navigate(`/product/${product.id}?variant=${variant.variantId}`)
          }
        />

        <Button
          shape="circle"
          onClick={handleFav}
          icon={
            isFav ? <HeartFilled style={{ color: "red" }} /> : <HeartOutlined />
          }
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            border: "none",
            boxShadow: "none",
          }}
        />
      </Card>

      <Text
        style={{
          fontSize: 15,
          color: "#425463",
        }}
      >
        {product.title}
      </Text>

      <Space wrap>
        <Text type="secondary">Color: {variant.color}</Text>

        <Flex
          align="center"
          gap={5}
          style={{
            color: "#A0A9B0",
          }}
        >
          <StarFilled style={{ color: "#E57351" }} />

          <Text
            style={{
              color: "#A0A9B0",
            }}
          >
            {variant.rating} ({variant.reviewsCount})
          </Text>
        </Flex>
      </Space>

      <Flex justify="space-between" align="center" gap={10}>
        <Flex vertical>
          <Title level={4} style={{ margin: 0 }}>
            {variant.price.toLocaleString()}{" "}
            <span style={{ fontSize: 14 }}>sum</span>
          </Title>

          {variant.oldPrice && (
            <Text delete style={{ color: "#999" }}>
              {variant.oldPrice.toLocaleString()} sum
            </Text>
          )}
        </Flex>

        <Button
          type={isCart ? "default" : "primary"}
          icon={isCart ? <ArrowRightOutlined /> : <ShoppingCartOutlined />}
          onClick={() => (isCart ? navigate("/cart") : handleAddCart())}
        />
      </Flex>
    </Flex>
  );
};

export { FavoriteCard };
