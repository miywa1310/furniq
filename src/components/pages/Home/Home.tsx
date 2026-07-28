import { Banner } from "@/components/shared/Banner";
import { Products } from "@/components/shared/Products";
import { Flex } from "antd";

const Home = () => {
  return (
    <Flex style={{ flexDirection: "column" }} gap={30}>
      <Banner />
      <Products />
    </Flex>
  );
};

export { Home };
