import { useCartPersistStore } from "@/store/useCartPersistStore";
import { Button, Card, Flex } from "antd";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import { useLocation, useNavigate } from "react-router-dom";

const CartSummary = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const cartItems = useCartPersistStore((s) => s.items);
  const total = useCartPersistStore((s) => s.total);
  const totalPrice = useCartPersistStore((s) => s.totalPrice);
  return (
    <Card style={{ background: "transparent", border: "1px solid #EDF1F4" }}>
      <Title level={4}>Your order</Title>

      <Flex justify="space-between" style={{ marginBlock: 20 }}>
        <Text>Products:</Text>
        <Text>{total.toLocaleString()}</Text>
      </Flex>
      <Flex gap={10} style={{ marginBottom: 20, flexDirection: "column" }}>
        {cartItems.map((item, index) => (
          <Flex
            key={index}
            justify="space-between"
            style={{
              background: "#F7F9FB",
              borderRadius: 12,
              padding: "10px 14px",
            }}
          >
            <Text>{item.title}</Text>
            <Text type="secondary">x{item.qty}</Text>
          </Flex>
        ))}
      </Flex>

      <Flex justify="space-between" style={{ fontWeight: 700 }}>
        <Text style={{ fontSize: 18 }}>Total:</Text>
        <Text style={{ fontSize: 18 }}>{totalPrice.toLocaleString()}</Text>
      </Flex>

      <Button
        type="primary"
        size="large"
        block
        style={{ marginBlock: 20 }}
        onClick={() => pathname !== "/checkout" && navigate("/checkout")}
      >
        {pathname !== "/checkout" ? "Checkout" : "Confirm"}
      </Button>
    </Card>
  );
};

export { CartSummary };
