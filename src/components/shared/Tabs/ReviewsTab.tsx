import type { Review } from "@/services/Reviews/reviews.types";
import { CheckCircleFilled } from "@ant-design/icons";
import { Button, Divider, Flex, Progress, Rate } from "antd";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import { useState } from "react";

type Props = {
  reviews: Review[];
};

const ReviewsTab = ({ reviews }: Props) => {
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? reviews : reviews.slice(0, 3);

  if (!reviews.length) {
    return (
      <div style={{ marginTop: 32 }}>
        <Title level={4}>Reviews</Title>
        <Text type="secondary">No reviews yet for this variant.</Text>
      </div>
    );
  }

  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  const dist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  return (
    <div style={{ marginTop: 32 }}>
      <Title level={4}>Reviews ({reviews.length})</Title>

      <Flex gap={24} align="center" style={{ marginBottom: 24 }}>
        <Flex vertical align="center" gap={4}>
          <Text style={{ fontSize: 40, fontWeight: 700, lineHeight: 1 }}>
            {avg.toFixed(1)}
          </Text>
          <Rate disabled allowHalf value={avg} style={{ fontSize: 14 }} />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {reviews.length} reviews
          </Text>
        </Flex>

        <Flex vertical gap={4} style={{ flex: 1 }}>
          {dist.map(({ star, count }) => (
            <Flex key={star} align="center" gap={8}>
              <Text style={{ width: 8, fontSize: 12 }}>{star}</Text>
              <Progress
                percent={Math.round((count / reviews.length) * 100)}
                showInfo={false}
                strokeColor="#FAAD14"
                size="small"
                style={{ flex: 1, margin: 0 }}
              />
              <Text type="secondary" style={{ width: 16, fontSize: 12 }}>
                {count}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>

      <Divider />

      <Flex vertical gap={20}>
        {visible.map((review, index) => (
          <div key={index}>
            <Flex justify="space-between" align="center">
              <Flex align="center" gap={8}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 600,
                    fontSize: 13,
                  }}
                >
                  {review.userName[0]}
                </div>
                <Flex vertical gap={0}>
                  <Flex align="center" gap={6}>
                    <Text strong style={{ fontSize: 13 }}>
                      {review.userName}
                    </Text>
                    {review.verified && (
                      <Flex align="center" gap={3}>
                        <CheckCircleFilled
                          style={{ color: "#52c41a", fontSize: 12 }}
                        />
                        <Text style={{ fontSize: 11, color: "#52c41a" }}>
                          Verified
                        </Text>
                      </Flex>
                    )}
                  </Flex>
                  <Rate
                    disabled
                    value={review.rating}
                    style={{ fontSize: 12 }}
                  />
                </Flex>
              </Flex>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {new Date(review.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Text>
            </Flex>

            <Text style={{ marginTop: 8, display: "block", color: "#555" }}>
              {review.comment}
            </Text>

            <Divider style={{ margin: "16px 0 0" }} />
          </div>
        ))}
        {reviews.length > 3 && (
          <Button
            type="link"
            onClick={() => setShowAll((prev) => !prev)}
            style={{ padding: 0 }}
          >
            {showAll ? "Show less" : `Show more (${reviews.length - 3} more)`}
          </Button>
        )}
      </Flex>
    </div>
  );
};

export { ReviewsTab };
