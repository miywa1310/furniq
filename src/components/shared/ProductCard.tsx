import type { Product } from "@/services/Products/products.types";
import { useCartPersistStore } from "@/store/useCartPersistStore";
import { useFavPersistStore } from "@/store/useFavPersistStore";
import {
  HeartFilled,
  HeartOutlined,
  ShoppingCartOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Button, Carousel, Flex, theme } from "antd";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type ProductCardProps = {
  product: Product;
  variantId?: string;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, variantId }) => {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const [hovered, setHovered] = useState(false);

  const currentVariant =
    product.variants.find((v) => v.variantId === variantId) ??
    product.variants[0];

  const toggleFavorite = useFavPersistStore((s) => s.toggleFavorite);

  const addCart = useCartPersistStore((s) => s.addToCart);

  const isFav = useFavPersistStore((s) => {
    if (!currentVariant) return false;

    return s.isFavorite(product.id, currentVariant.variantId);
  });

  const isCart = useCartPersistStore((s) => {
    if (!currentVariant) return false;

    return s.isCart(product.id, currentVariant.variantId);
  });

  const handleFav = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!currentVariant) return;

    toggleFavorite(product.id, currentVariant.variantId);
  };

  const handleAddCart = () => {
    if (!currentVariant) return;

    addCart({
      productId: product.id,
      variantId: currentVariant.variantId,
      title: product.title,
      price: currentVariant.price,
      oldPrice: currentVariant.oldPrice,
      discount: currentVariant.discount,
      color: currentVariant.color,
      image: currentVariant.images?.[0],
      qty: 1,
    });
  };

  if (!currentVariant) return null;

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCart) {
      navigate("/cart");
      return;
    }
    handleAddCart();
  };

  return (
    <div
      onClick={() =>
        navigate(`/product/${product.id}?variant=${currentVariant.variantId}`)
      }
      style={{
        width: "100%",
        borderRadius: 16,
        background: "#fff",
        border: "1px solid #E8ECEF",
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        transition: "0.2s",
      }}
    >
      <div
        style={{
          position: "relative",
          background: "#F7F9FA",
          padding: "20px 16px",
          minHeight: 220,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {currentVariant.discount && (
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              background: token.colorPrimary,
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              borderRadius: 20,
              padding: "4px 10px",
              zIndex: 2,
            }}
          >
            -{currentVariant.discount}%
          </div>
        )}

        <Button
          shape="circle"
          type="text"
          onClick={handleFav}
          icon={
            isFav ? (
              <HeartFilled
                style={{
                  color: "#E53935",
                  fontSize: 18,
                }}
              />
            ) : (
              <HeartOutlined
                style={{
                  color: "#B0BEC5",
                  fontSize: 18,
                }}
              />
            )
          }
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 2,
          }}
        />

        <Carousel
          dots={hovered}
          adaptiveHeight
          autoplay={hovered}
          autoplaySpeed={300}
          speed={500}
        >
          {currentVariant.images?.map((image, index) => (
            <div key={index}>
              <div
                style={{
                  width: "100%",
                  height: 180,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={image}
                  alt={`${product.title}-${index}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    userSelect: "none",
                  }}
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      <Flex
        vertical
        gap={6}
        style={{
          padding: 16,
        }}
      >
        <Flex align="center" gap={8} wrap>
          <Title
            level={4}
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            {currentVariant.price.toLocaleString()}
          </Title>

          {currentVariant.oldPrice && (
            <Text
              delete
              style={{
                color: "#AAB0B8",
                fontSize: 14,
              }}
            >
              {currentVariant.oldPrice?.toLocaleString()}
            </Text>
          )}
        </Flex>

        <Text
          style={{
            fontSize: 14,
            lineHeight: 1.4,
          }}
        >
          {product.title}
        </Text>

        <Flex align="center" gap={4}>
          <span
            style={{
              color: "gold",
              fontSize: 14,
            }}
          >
            <StarFilled />
          </span>

          <Text
            style={{
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {currentVariant.rating}
          </Text>

          <Text
            style={{
              fontSize: 13,
            }}
          >
            | {currentVariant.reviewsCount} reviews
          </Text>
        </Flex>

        <Button
          type={isCart ? "default" : "primary"}
          size="large"
          icon={<ShoppingCartOutlined />}
          onClick={handleCartClick}
          style={{
            marginTop: 10,
            height: 46,
            borderRadius: 10,
            fontWeight: 600,
          }}
        >
          {isCart ? "Go to cart" : "Add to cart"}
        </Button>
      </Flex>
    </div>
  );
};

export { ProductCard };
