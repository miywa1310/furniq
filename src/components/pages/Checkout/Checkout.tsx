import { CheckoutForm } from "@/components/shared";
import { CartSummary } from "@/components/shared/CartComp/CartSummary";
import { RightOutlined } from "@ant-design/icons";
import { Col, Flex, Row } from "antd";
import Title from "antd/es/typography/Title";

const Checkout = () => {
  return (
    <div>
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
          Home <RightOutlined /> Cart <RightOutlined /> Checkout
        </Title>
      </Flex>
      <Row gutter={24}>
        <Col xs={24} md={16}>
          <CheckoutForm />
        </Col>

        <Col xs={24} md={8}>
          <CartSummary />
        </Col>
      </Row>
    </div>
  );
};

export { Checkout };
