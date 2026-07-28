import { ProductCard } from "@/components/shared";
import { useGetProductsQuery } from "@/services/Products/products.api";
import { RightOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Col, Empty, Flex, Row, Slider } from "antd";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import { useMemo, useState, type FC } from "react";
import { useSearchParams } from "react-router-dom";

const Catalog: FC = () => {
  const { data = [] } = useGetProductsQuery();
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search")?.toLowerCase() || "";

  const [selectedCategory, setSelectedCategory] = useState("all");

  const [price, setPrice] = useState<[number, number]>([0, 7000000]);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const brands = useMemo(() => {
    return Array.from(new Set(data.map((item) => item.brand)));
  }, [data]);

  const categories = useMemo(() => {
    const catArr = Array.from(new Set(data.map((product) => product.category)));

    return [
      {
        label: "All",
        value: "all",
      },

      ...catArr.map((cat) => ({
        label: cat.charAt(0).toUpperCase() + cat.slice(1),

        value: cat,
      })),
    ];
  }, [data]);

  const filteredProducts = useMemo(() => {
    return data.filter((product) => {
      const firstVariant = product.variants?.[0];

      if (!firstVariant) return false;

      const matchCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      const matchPrice =
        firstVariant.price >= price[0] && firstVariant.price <= price[1];

      const matchBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);

      const matchSearch =
        search.length === 0 ||
        product.title.toLowerCase().includes(search) ||
        product.brand.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search) ||
        product.tags?.some((tag) => tag.toLowerCase().includes(search));

      return matchCategory && matchPrice && matchBrand && matchSearch;
    });
  }, [data, selectedCategory, price, selectedBrands, search]);

  return (
    <div style={{ marginBottom: 40 }}>
      <Title level={4} style={{ marginBottom: 20 }}>
        Home <RightOutlined /> Catalog
      </Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={6}>
          <Card
            variant="outlined"
            style={{
              backgroundColor: "transparent",
              borderRadius: 16,
            }}
          >
            <Title level={5}>Category</Title>

            <Flex vertical gap={8}>
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  type={selectedCategory === cat.value ? "primary" : "default"}
                  onClick={() => setSelectedCategory(cat.value)}
                  style={{
                    textAlign: "left",
                    justifyContent: "flex-start",
                  }}
                >
                  {cat.label}
                </Button>
              ))}
            </Flex>

            <Title level={5} style={{ marginTop: 24 }}>
              Price
            </Title>

            <Slider
              range
              min={0}
              max={7000000}
              step={50000}
              value={price}
              onChange={(val) => setPrice(val as [number, number])}
            />

            <Flex justify="space-between">
              <Text>{price[0].toLocaleString()} sum</Text>

              <Text>{price[1].toLocaleString()} sum</Text>
            </Flex>

            <Title level={5} style={{ marginTop: 24 }}>
              Brand
            </Title>

            <Checkbox.Group
              value={selectedBrands}
              onChange={(val) => setSelectedBrands(val as string[])}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {brands.map((brand) => (
                <Checkbox key={brand} value={brand}>
                  {brand}
                </Checkbox>
              ))}
            </Checkbox.Group>

            <Button
              block
              style={{ marginTop: 24 }}
              onClick={() => {
                setSelectedCategory("all");
                setSelectedBrands([]);
                setPrice([0, 7000000]);
              }}
            >
              Reset filters
            </Button>
          </Card>
        </Col>

        <Col xs={24} md={18}>
          <Card
            variant="outlined"
            style={{
              backgroundColor: "transparent",
              borderRadius: 16,
            }}
          >
            <Title level={4}>Products ({filteredProducts.length})</Title>

            {filteredProducts.length > 0 ? (
              <Row gutter={[16, 16]}>
                {filteredProducts.map((item) => (
                  <Col key={item.id} xs={24} sm={12} lg={8}>
                    <ProductCard product={item} />
                  </Col>
                ))}
              </Row>
            ) : (
              <Empty
                description={
                  search
                    ? `No products found for "${search}"`
                    : "No products found"
                }
                style={{
                  marginTop: 40,
                }}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export { Catalog };
