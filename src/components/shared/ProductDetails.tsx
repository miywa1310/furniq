import { useResponsive } from "@/hooks";
import type { Product, Variant } from "@/services/Products/products.types";
import { useCartPersistStore } from "@/store/useCartPersistStore";
import { useFavPersistStore } from "@/store/useFavPersistStore";
import {
  HeartFilled,
  HeartOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Button, Carousel, Col, Flex, Image, Rate, Row, Space } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ProductTabs } from "./ProductTabs";

type Props = {
  product: Product;
};

const ProductDetail = ({ product }: Props) => {
  const { isMobile } = useResponsive(768);
  const toggleFavorite = useFavPersistStore((s) => s.toggleFavorite);
  const addCart = useCartPersistStore((s) => s.addToCart);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const carouselRef = useRef<CarouselRef>(null);

  const [searchParams] = useSearchParams();
  const variantIdFromUrl = searchParams.get("variant");
  const currentVariant = useMemo(() => {
    return (
      product.variants.find((v) => v.variantId === variantIdFromUrl) ??
      product.variants?.[0]
    );
  }, [product, variantIdFromUrl]);

  const [activeIndex, setActiveIndex] = useState(0);

  const images = currentVariant?.images ?? [];

  const isFav = useFavPersistStore((s) =>
    currentVariant
      ? s.favorites.some(
          (f) =>
            f.productId === product.id &&
            f.variantId === currentVariant.variantId,
        )
      : false,
  );

  const isCart = useCartPersistStore((s) =>
    currentVariant ? s.isCart(product.id, currentVariant.variantId) : false,
  );

  const handleToggleFav = () => {
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
      color: currentVariant.color,
      image: currentVariant.images?.[0],
      qty: 1,
    });
  };

  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

  const handleVariantChange = (v: Variant) => {
    navigate(`/product/${product.id}?variant=${v.variantId}`);
    setActiveIndex(0);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  if (!currentVariant) return null;

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={14}>
          <Flex
            gap={16}
            style={{
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <Flex
              gap={12}
              style={{
                flexDirection: isMobile ? "row" : "column",
                overflowX: isMobile ? "auto" : "unset",
                order: isMobile ? 2 : 1,
              }}
            >
              {images.map((img, index) => (
                <Image
                  key={img}
                  src={img}
                  width={isMobile ? 60 : 80}
                  height={isMobile ? 60 : 80}
                  preview={false}
                  onClick={() => {
                    setActiveIndex(index);
                    carouselRef.current?.goTo(index);
                  }}
                  style={{
                    borderRadius: 12,
                    cursor: "pointer",
                    border:
                      activeIndex === index
                        ? "2px solid #000"
                        : "1px solid #eee",
                    objectFit: "cover",
                  }}
                />
              ))}
            </Flex>

            <div
              style={{
                flex: 1,
                background: "#F5F7FA",
                borderRadius: 20,
                position: "relative",
                overflow: "hidden",
                padding: 20,
                order: isMobile ? 1 : 2,
              }}
            >
              <Carousel
                autoplay
                dots
                ref={carouselRef}
                afterChange={(current) => setActiveIndex(current)}
              >
                {images.map((img) => (
                  <div key={img}>
                    <div
                      style={{
                        height: isMobile ? 300 : 450,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        src={img}
                        preview={{
                          mask: "Preview",
                        }}
                        style={{
                          maxHeight: 400,
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </Carousel>

              <Button
                shape="circle"
                icon={<LeftOutlined />}
                onClick={handlePrev}
                style={{
                  position: "absolute",
                  left: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 42,
                  height: 42,
                  border: "none",
                  background: "#fff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                }}
              />

              <Button
                shape="circle"
                icon={<RightOutlined />}
                onClick={handleNext}
                style={{
                  position: "absolute",
                  right: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 42,
                  height: 42,
                  border: "none",
                  background: "#fff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                }}
              />

              <Button
                shape="circle"
                onClick={handleToggleFav}
                icon={
                  isFav ? (
                    <HeartFilled style={{ color: "red" }} />
                  ) : (
                    <HeartOutlined />
                  )
                }
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  width: 36,
                  height: 36,
                  border: "none",
                  background: "#fff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                }}
              />
            </div>
          </Flex>
        </Col>

        <Col xs={24} md={10}>
          <Title level={3}>{product.title}</Title>
          <Flex gap={isMobile ? 8 : 16} wrap>
            <Text type="secondary">Seller: {product.seller}</Text>
            <Text type="secondary">Delivery: {product.delivery}</Text>
          </Flex>
          <div style={{ marginTop: 8 }}>
            <Rate disabled allowHalf value={currentVariant.rating} />

            <Text style={{ marginLeft: 8 }}>
              ({currentVariant.reviewsCount} reviews)
            </Text>
          </div>
          <Space align="center">
            <Title level={2} style={{ marginTop: isMobile ? 8 : 16 }}>
              {currentVariant.price.toLocaleString()}
            </Title>
            {currentVariant.oldPrice && (
              <Text delete>{currentVariant.oldPrice.toLocaleString()} </Text>
            )}
          </Space>
          {currentVariant.discount && (
            <div>
              <Text style={{ color: "#E57351" }}>
                -{currentVariant.discount}% OFF
              </Text>
            </div>
          )}
          <div style={{ marginTop: isMobile ? 8 : 16 }}>
            <Text strong>Color: {currentVariant.color}</Text>

            <br />

            <Space style={{ marginTop: 10 }} wrap>
              {product.variants?.map((v) => (
                <Image
                  key={v.variantId}
                  src={v.images?.[0]}
                  width={isMobile ? 60 : 80}
                  height={isMobile ? 60 : 80}
                  preview={false}
                  onClick={() => handleVariantChange(v)}
                  style={{
                    borderRadius: 10,
                    cursor: "pointer",
                    border:
                      currentVariant.variantId === v.variantId
                        ? "2px solid #000"
                        : "1px solid #ddd",
                    objectFit: "cover",
                  }}
                />
              ))}
            </Space>
          </div>
          <div style={{ marginTop: 20 }}>
            <Title level={4}>Description</Title>

            <Text type="secondary">{product.description}</Text>
          </div>
          <div style={{ marginTop: 20 }}>
            <Title level={5}>Dimensions</Title>

            <Text>
              W: {product.dimensions.width}cm | H: {product.dimensions.height}cm
              | D: {product.dimensions.depth}cm
            </Text>
          </div>
          <Button
            type="primary"
            size="large"
            block
            style={{
              marginTop: 30,
              height: 50,
            }}
            onClick={() => (!isCart ? handleAddCart() : navigate("/cart"))}
          >
            {isCart ? "Go to cart" : "Add to cart"}
          </Button>
        </Col>
      </Row>
      <ProductTabs product={product} variantId={currentVariant.variantId} />
    </div>
  );
};

export { ProductDetail };
