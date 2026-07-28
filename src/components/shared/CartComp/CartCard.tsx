import { useResponsive } from "@/hooks";
import {
  useCartPersistStore,
  type CartItem,
} from "@/store/useCartPersistStore";
import { useFavPersistStore } from "@/store/useFavPersistStore";
import {
  DeleteOutlined,
  HeartFilled,
  HeartOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Card, Flex, Image, Tag, theme } from "antd";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import type React from "react";

type CartCardProps = {
  item: CartItem;
};

const CartCard: React.FC<CartCardProps> = ({ item }) => {
  const { token } = theme.useToken();
  const { isMobile } = useResponsive(768);

  const removeItem = useCartPersistStore((s) => s.removeFromCart);
  const increaseItem = useCartPersistStore((s) => s.increaseQty);
  const decreaseItem = useCartPersistStore((s) => s.decreaseQty);

  const toggleFav = useFavPersistStore((s) => s.toggleFavorite);

  const isFav = useFavPersistStore((s) =>
    s.isFavorite(item.productId, item.variantId),
  );

  return (
    <div
      style={{
        marginBottom: 16,
        border: "1px solid #EDF1F4",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      <Flex
        vertical={isMobile}
        gap={16}
        style={{
          padding: 16,
        }}
      >
        <Card
          styles={{
            body: {
              padding: 0,
            },
          }}
          style={{
            minWidth: isMobile ? "100%" : 150,
            width: isMobile ? "100%" : 150,
          }}
        >
          <Image
            src={item.image}
            alt={item.title}
            style={{
              width: "100%",
              cursor: "pointer",
            }}
          />
        </Card>

        <Flex flex={1} vertical={isMobile} justify="space-between" gap={20}>
          <Flex
            vertical
            justify="space-between"
            style={{
              flex: 1,
            }}
          >
            <Flex vertical gap={6}>
              <Title level={5} style={{ margin: 0 }}>
                {item.title}
              </Title>

              <Text type="secondary">Color: {item.color}</Text>
              {item.discount && (
                <Tag
                  style={{
                    width: "fit-content",
                    borderRadius: 20,
                    fontWeight: 700,
                    padding: "4px 10px",
                    margin: 0,
                    background: token.colorPrimary,
                    color: "#fff",
                    border: "none",
                  }}
                >
                  -{item.discount}%
                </Tag>
              )}
            </Flex>

            <Flex align="center" gap={8} wrap>
              <Title
                level={4}
                style={{
                  margin: 0,
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                {item.price.toLocaleString()}
              </Title>

              {item.oldPrice && (
                <Text
                  delete
                  style={{
                    color: "#AAB0B8",
                    fontSize: 14,
                  }}
                >
                  {item.oldPrice?.toLocaleString()}
                </Text>
              )}
            </Flex>
          </Flex>

          <Flex
            vertical
            justify="space-between"
            align={isMobile ? "start" : "end"}
            gap={16}
          >
            <Flex
              align="center"
              style={{
                background: "#EDF1F4",
                borderRadius: 16,
                padding: "2px 8px",
                gap: 8,
              }}
            >
              <Button
                type="text"
                icon={<MinusOutlined />}
                onClick={() => decreaseItem(item.productId, item.variantId)}
              />

              <span style={{ minWidth: 20, textAlign: "center" }}>
                {item.qty}
              </span>

              <Button
                type="text"
                icon={<PlusOutlined />}
                onClick={() => increaseItem(item.productId, item.variantId)}
              />
            </Flex>

            <Flex gap={12}>
              <Button
                shape="circle"
                onClick={() => toggleFav(item.productId, item.variantId)}
                icon={
                  isFav ? (
                    <HeartFilled style={{ color: "red" }} />
                  ) : (
                    <HeartOutlined />
                  )
                }
              />

              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => removeItem(item.productId, item.variantId)}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export { CartCard };
