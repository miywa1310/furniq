import { useCreateOrdersMutation } from "@/services/Orders/orders.api";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from "@/services/Users/users.api";
import { useAuthStore } from "@/store/useAuthPersistStore";
import { useCartPersistStore } from "@/store/useCartPersistStore";
import { Button, Card, Form, Input, message, Radio, Space } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const pickupPoints = [
  {
    id: "n1",
    name: "Uzum Market Nukus Center",
    address: "Berdaq ko‘chasi 45, Nukus",
  },
  {
    id: "n2",
    name: "Nukus Plaza Pickup",
    address: "Amudaryo ko‘chasi 12, Nukus Plaza yonida",
  },
  {
    id: "n3",
    name: "Tinchlik Market Point",
    address: "Tinchlik massivi, 3-kvartal, Nukus",
  },
  {
    id: "n4",
    name: "Qoraqalpog‘iston Mall Pickup",
    address: "Mustaqillik ko‘chasi 88, Mall ichida",
  },
];

type CheckoutFormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  address?: string;
  payment: "cash" | "card";
};

const CheckoutForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">(
    "delivery",
  );

  const items = useCartPersistStore((s) => s.items);
  const totalPrice = useCartPersistStore((s) => s.totalPrice);
  const clearCart = useCartPersistStore((s) => s.clearCart);
  const [selectedPickup, setSelectedPickup] = useState<string | null>(null);

  const user = useAuthStore((s) => s.user);
  const setAuth = useAuthStore((s) => s.setAuth);

  const { mutateAsync: createUser } = useCreateUserMutation();
  const { mutateAsync: updateUser } = useUpdateUserMutation();

  const { mutateAsync: createOrder } = useCreateOrdersMutation();

  const onFinish = async (values: CheckoutFormValues) => {
    try {
      if (deliveryType === "pickup" && !selectedPickup) {
        return message.error("Please select pickup point");
      }

      const userPayload = {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        address: deliveryType === "delivery" ? values.address : undefined,
      };

      let finalUser = user;

      if (user?.id) {
        finalUser = await updateUser({
          id: user.id,
          data: userPayload,
        });
      } else {
        finalUser = await createUser(userPayload);
      }

      setAuth({
        user: {
          ...user,
          ...finalUser,
        },
        token: "fake-token",
      });

      const orderPayload = {
        userId: finalUser.id,
        items,
        totalPrice,
        deliveryType,
        address: deliveryType === "delivery" ? values.address : undefined,
        pickupPointId:
          deliveryType === "pickup" ? selectedPickup || undefined : undefined,
        payment: values.payment,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      await createOrder(orderPayload);
      message.success("Succesfully created");
      navigate("/profile/orders");
      clearCart();
    } catch (err) {
      const error = err as Error;
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        address: user.address,
      });
    }
  }, [user, form]);

  return (
    <Card style={{ background: "transparent", border: "2px solid #EDF1F4" }}>
      <Title level={4}>Checkout</Title>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Delivery method">
          <Radio.Group
            value={deliveryType}
            onChange={(e) => {
              const value = e.target.value;
              setDeliveryType(value);
              if (value === "delivery") {
                setSelectedPickup(null);
              }
            }}
          >
            <Space>
              <Radio value="delivery">Home delivery</Radio>
              <Radio value="pickup">Pickup</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="firstName"
          rules={[{ required: true, message: "Enter first name" }]}
          style={{ flex: 1 }}
        >
          <Input size="large" placeholder="First name" />
        </Form.Item>

        <Form.Item
          name="lastName"
          rules={[{ required: true, message: "Enter last name" }]}
          style={{ flex: 1 }}
        >
          <Input size="large" placeholder="Last name" />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[{ required: true, message: "Enter phone" }]}
        >
          <Input size="large" placeholder="+998901234567" />
        </Form.Item>

        {deliveryType === "delivery" && (
          <Form.Item
            name="address"
            rules={[{ required: true, message: "Enter address" }]}
          >
            <Input size="large" placeholder="City, street, house" />
          </Form.Item>
        )}

        {deliveryType === "pickup" && (
          <Space orientation="vertical" style={{ width: "100%" }}>
            {pickupPoints.map((point) => (
              <Card
                key={point.id}
                onClick={() => setSelectedPickup(point.id)}
                style={{
                  cursor: "pointer",
                  border:
                    selectedPickup === point.id
                      ? "2px solid #52c41a"
                      : "1px solid #f0f0f0",
                  background:
                    selectedPickup === point.id ? "#f6ffed" : "#fafafa",
                  borderRadius: 12,
                }}
                styles={{
                  body: {
                    padding: 12,
                  },
                }}
              >
                <div style={{ fontWeight: 600 }}>{point.name}</div>
                <div style={{ fontSize: 12, color: "#666" }}>
                  {point.address}
                </div>
              </Card>
            ))}
          </Space>
        )}

        <Form.Item
          name="payment"
          initialValue="cash"
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Space>
              <Radio value="cash">Cash</Radio>
              <Radio value="card">Card</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <Button type="primary" htmlType="submit" block size="large">
          Place Order
        </Button>
      </Form>
    </Card>
  );
};

export { CheckoutForm };
