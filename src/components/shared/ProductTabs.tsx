import { useResponsive } from "@/hooks";
import type { Product } from "@/services/Products/products.types";
import { useGetReviewsQuery } from "@/services/Reviews/reviews.api";
import { Tabs } from "antd";
import { DeliveryTab } from "./Tabs/DeliveryTab";
import { ReviewsTab } from "./Tabs/ReviewsTab";
import { SpecsTab } from "./Tabs/SpecsTab";

type Props = {
  product: Product;
  variantId: string;
};

const ProductTabs = ({ product, variantId }: Props) => {
  const { isMobile } = useResponsive(768);
  const { data = [] } = useGetReviewsQuery();
  const reviews = data.filter((r) => r.variantId === variantId);

  const items = [
    {
      key: "reviews",
      label: `Reviews (${reviews.length})`,
      children: <ReviewsTab reviews={reviews} />,
    },
    {
      key: "specs",
      label: "Specifications",
      children: <SpecsTab product={product} />,
    },
    {
      key: "delivery",
      label: "Delivery",
      children: <DeliveryTab />,
    },
  ];

  return (
    <div style={{ marginTop: isMobile ? 24 : 48 }}>
      <Tabs items={items} size="large" />
    </div>
  );
};

export { ProductTabs };
