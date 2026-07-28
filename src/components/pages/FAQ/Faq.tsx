import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Card, Collapse, Flex, Input, Layout, Typography } from "antd";
import { useState } from "react";

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const faqData = [
  {
    key: "1",
    question: "How do I place an order?",
    answer:
      "Browse our products, choose your favorite furniture, add it to cart and proceed to checkout. Fill in your details and confirm your order.",
  },
  {
    key: "2",
    question: "Do you offer delivery?",
    answer:
      "Yes, we provide home delivery across multiple regions. You can also choose pickup during checkout.",
  },
  {
    key: "3",
    question: "How long does delivery take?",
    answer:
      "Delivery usually takes 2-5 business days depending on your location.",
  },
  {
    key: "4",
    question: "Can I return a product?",
    answer:
      "Yes, you can return products within 7 days if they are unused and in original condition.",
  },
  {
    key: "5",
    question: "What payment methods are available?",
    answer: "We accept cash on delivery and card payments.",
  },
];

const FAQ = () => {
  const [search, setSearch] = useState("");

  const filtered = faqData.filter((item) =>
    item.question.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div style={{ marginBottom: 60 }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Frequently Asked Questions
      </Title>

      <Flex justify="center" style={{ marginBottom: 30 }}>
        <Input
          placeholder="Search for a question"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            maxWidth: 500,
            borderRadius: 30,
            padding: "10px 20px",
          }}
        />
      </Flex>

      <Layout style={{ maxWidth: 800, margin: "0 auto" }}>
        <Collapse
          accordion
          bordered={false}
          expandIconPlacement="end"
          style={{ background: "transparent" }}
        >
          {filtered.map((item) => (
            <Panel
              header={
                <Text strong style={{ fontSize: 16 }}>
                  {item.question}
                </Text>
              }
              key={item.key}
              style={{
                marginBottom: 12,
                borderRadius: 12,
                overflow: "hidden",
                background: "#f7f7f7",
                border: "1px solid #eee",
              }}
            >
              <Paragraph style={{ margin: 0, color: "#555" }}>
                {item.answer}
              </Paragraph>
            </Panel>
          ))}
        </Collapse>
      </Layout>

      <Flex
        gap={24}
        justify="center"
        style={{ marginTop: 40, flexWrap: "wrap" }}
      >
        <a href="mailto:support@furniq.uz" style={{ textDecoration: "none" }}>
          <Card
            hoverable
            style={{
              width: 280,
              textAlign: "center",
              borderRadius: 16,
              transition: "0.3s",
            }}
          >
            <MailOutlined style={{ fontSize: 28, marginBottom: 10 }} />

            <Title level={4} style={{ marginBottom: 8 }}>
              Email Us
            </Title>

            <Paragraph style={{ color: "#666" }}>
              support@furniq.uz <br />
              We reply within 24 hours.
            </Paragraph>
          </Card>
        </a>

        <a href="tel:+998555080000" style={{ textDecoration: "none" }}>
          <Card
            hoverable
            style={{
              width: 280,
              textAlign: "center",
              borderRadius: 16,
              transition: "0.3s",
            }}
          >
            <PhoneOutlined style={{ fontSize: 28, marginBottom: 10 }} />

            <Title level={4} style={{ marginBottom: 8 }}>
              Call Us
            </Title>

            <Paragraph style={{ color: "#666" }}>
              +998 (55) 508-11-88 <br />
              Mon - Sat, 9:00 - 18:00
            </Paragraph>
          </Card>
        </a>
      </Flex>
    </div>
  );
};

export { FAQ };
