import { useResponsive } from "@/hooks";
import { useCartPersistStore } from "@/store/useCartPersistStore";
import { DeleteOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Row } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { CartCard } from "./CartCard";
import { CartSummary } from "./CartSummary";

const CartProducts: React.FC = () => {
  const { isMobile } = useResponsive(768);
  const cartItems = useCartPersistStore((s) => s.items);
  const clearCart = useCartPersistStore((s) => s.clearCart);

  return (
    <div style={{ marginTop: isMobile ? 16 : 0 }}>
      <Flex justify="space-between" gap={8}>
        <Title
          level={4}
          style={{
            marginBottom: 20,
            color: "#425463",
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          Home <RightOutlined /> Cart
        </Title>
        <Button
          style={{ backgroundColor: "transparent" }}
          danger
          onClick={() => clearCart()}
        >
          Clear Cart <DeleteOutlined />
        </Button>
      </Flex>
      <Row gutter={24}>
        <Col xs={24} md={16}>
          {cartItems.map((item) => (
            <CartCard item={item} />
          ))}
        </Col>

        <Col xs={24} md={8}>
          <CartSummary />
        </Col>
      </Row>
    </div>
  );
};

export { CartProducts };
