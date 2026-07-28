import { Flex } from "antd";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";

const DELIVERY_OPTIONS = [
  {
    title: "Courier delivery",
    desc: "Delivery to your door",
    details: [
      "Delivery within 24 hours",
      "10:00 – 20:00",
      "Call 1 hour before",
      "Floor delivery included",
    ],
  },
  {
    title: "Pickup",
    desc: "Pick up from our point",
    details: [
      "Ready in 1 hour",
      "Working hours: 9:00 – 18:00",
      "Storage: 1 day",
    ],
  },
];

const DeliveryTab = () => (
  <div>
    <Title level={4}>Delivery options</Title>
    <Flex vertical gap={16}>
      {DELIVERY_OPTIONS.map((opt) => (
        <div
          key={opt.title}
          style={{ background: "#f9f9f9", borderRadius: 12, padding: 20 }}
        >
          <Flex
            justify="space-between"
            align="center"
            style={{ marginBottom: 6 }}
          >
            <Text strong style={{ fontSize: 16 }}>
              {opt.title}
            </Text>
            <Text style={{ color: "#13c2c2", fontWeight: 600 }}>Free</Text>
          </Flex>
          <Text type="secondary" style={{ display: "block", marginBottom: 10 }}>
            {opt.desc}
          </Text>
          {opt.details.map((d) => (
            <Text
              key={d}
              type="secondary"
              style={{ display: "block", fontSize: 13 }}
            >
              • {d}
            </Text>
          ))}
        </div>
      ))}
    </Flex>
  </div>
);

export { DeliveryTab };
