import type { Product } from "@/services/Products/products.types";
import { Flex } from "antd";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";

type Props = { product: Product };

const SpecsTab = ({ product }: Props) => {
  const specs = [
    { label: "Width", value: `${product.dimensions.width} cm` },
    { label: "Height", value: `${product.dimensions.height} cm` },
    { label: "Depth", value: `${product.dimensions.depth} cm` },
    { label: "Brand", value: product.brand },
    { label: "Seller", value: product.seller },
    { label: "Category", value: product.category },
  ];

  return (
    <div>
      <Title level={4}>Specifications</Title>
      <Flex vertical>
        {specs.map(({ label, value }, i) => (
          <Flex
            key={label}
            justify="space-between"
            style={{
              padding: "14px 0",
              borderBottom: i < specs.length - 1 ? "1px solid #f0f0f0" : "none",
            }}
          >
            <Text type="secondary">{label}</Text>
            <Text strong>{value}</Text>
          </Flex>
        ))}
      </Flex>
    </div>
  );
};

export { SpecsTab };
