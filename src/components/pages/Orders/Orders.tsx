import { useGetOrdersQuery } from "@/services/Orders/orders.api";
import type { Order } from "@/services/Orders/orders.types copy";
import { useAuthStore } from "@/store/useAuthPersistStore";
import { Button, Card, Collapse, Flex, Image, Tag, Typography } from "antd";
import { useState } from "react";

const { Text } = Typography;

const Orders = () => {
  const { data: orders = [] } = useGetOrdersQuery();
  const user = useAuthStore((s) => s.user);

  const myOrders = orders
    .filter((o: Order) => o.userId === user?.id)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  const [tab, setTab] = useState<"active" | "history">("active");

  const active = myOrders.filter((o: Order) => o.status !== "delivered");
  const history = myOrders.filter((o: Order) => o.status === "delivered");

  const list = tab === "active" ? active : history;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div style={{ margin: 4 }}>
      <Flex gap={10} style={{ marginBottom: 20 }}>
        <Button
          type={tab === "active" ? "primary" : "default"}
          onClick={() => setTab("active")}
          block
          style={{ padding: 18 }}
        >
          Active
        </Button>

        <Button
          type={tab === "history" ? "primary" : "default"}
          onClick={() => setTab("history")}
          block
          style={{ padding: 18 }}
        >
          History
        </Button>
      </Flex>

      {list.length === 0 ? (
        <div
          style={{
            height: "50vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Empty
          <Text type="secondary">No orders found</Text>
        </div>
      ) : (
        <Collapse defaultActiveKey={["0"]}>
          {list.map((order, index) => (
            <Collapse.Panel
              key={index}
              header={
                <Flex justify="space-between" align="center">
                  <div>
                    <Text strong>Order #{index + 1}</Text>

                    <div>
                      <Text type="secondary">
                        {formatDate(order.createdAt)}
                      </Text>
                    </div>
                  </div>

                  <Flex gap={8} align="center">
                    <Tag
                      color={
                        order.status === "delivered"
                          ? "green"
                          : order.status === "pending"
                            ? "orange"
                            : "blue"
                      }
                    >
                      {order.status}
                    </Tag>

                    <Text strong>{order.totalPrice.toLocaleString()} so'm</Text>
                  </Flex>
                </Flex>
              }
            >
              <Flex vertical gap={12}>
                {order.items.map((item, index) => (
                  <Card key={index}>
                    <Flex gap={12} align="center">
                      <Image
                        width={60}
                        src={item.image}
                        style={{ borderRadius: 8 }}
                        preview={false}
                      />

                      <div style={{ flex: 1 }}>
                        <Text strong>{item.title}</Text>

                        <div>
                          <Text type="secondary">Qty: {item.qty}</Text>
                        </div>

                        <div>
                          <Text type="secondary">Color: {item.color}</Text>
                        </div>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <Text strong>{item.price.toLocaleString()} swm</Text>
                      </div>
                    </Flex>
                  </Card>
                ))}

                <Card size="small">
                  <Flex vertical gap={4}>
                    <Text>Delivery: {order.deliveryType}</Text>

                    <Text>Payment: {order.payment}</Text>

                    <Text>Address: {order.address}</Text>
                  </Flex>
                </Card>
              </Flex>
            </Collapse.Panel>
          ))}
        </Collapse>
      )}
    </div>
  );
};

export { Orders };
