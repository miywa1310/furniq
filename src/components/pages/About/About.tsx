import { logo } from "@/assets";
import { Flex, Typography } from "antd";
import React from "react";

const { Title, Paragraph, Text } = Typography;

const About: React.FC = () => {
  return (
    <div style={{ marginBottom: 40 }}>
      <Title level={3} style={{}}>
        About the company
      </Title>

      <Flex style={{ flexDirection: "column" }} gap={24}>
        <Flex align="center" justify="center">
          <img
            src={logo}
            alt="FurniQ logo"
            style={{ width: 320, height: "auto" }}
          />
        </Flex>

        <Paragraph style={{ fontSize: 18 }}>
          <Text strong style={{ fontSize: 20 }}>
            FurniQ
          </Text>{" "}
          - is a modern furniture brand focused on creating high-quality,
          stylish and durable furniture for homes and offices. We combine
          craftsmanship with modern technology to deliver comfort, simplicity
          and long-lasting value. Our products are designed to match modern
          lifestyles and meet international quality standards. We continuously
          improve our production process to ensure better design, durability and
          user experience.
        </Paragraph>

        <Paragraph style={{ fontSize: 18 }}>
          The main goal of our company is to create furniture that combines
          exquisite design, comfort and simplicity for modern living spaces. We
          focus not only on quality, but also on aesthetics that bring harmony
          to your home.
        </Paragraph>

        <div style={{ textAlign: "center" }}>
          <iframe
            width="70%"
            height="550"
            src="https://www.youtube.com/embed/0VIZfxmclsI"
            title="Furniture design video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: 12 }}
          />
        </div>
      </Flex>
    </div>
  );
};

export { About };
