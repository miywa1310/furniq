import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
} from "@ant-design/icons";

import {
  Avatar,
  Button,
  Card,
  Empty,
  Flex,
  Input,
  Modal,
  Rate,
  Skeleton,
  Space,
  Typography,
} from "antd";

import { useState } from "react";

import { useResponsive } from "@/hooks";
import { useAuthStore } from "@/store/useAuthPersistStore";

import {
  useDeleteReviewMutation,
  useGetReviewsQuery,
  useUpdateReviewMutation,
} from "@/services/Reviews/reviews.api";
import type { Review } from "@/services/Reviews/reviews.types";

const { Text, Paragraph, Title } = Typography;
const { TextArea } = Input;

const Reviews = () => {
  const { isMobile } = useResponsive(768);

  const user = useAuthStore((s) => s.user);

  const { data = [], isLoading } = useGetReviewsQuery();

  const reviews = data.filter((review) => review.userId === user?.id);

  const updateMutation = useUpdateReviewMutation();

  const deleteMutation = useDeleteReviewMutation();

  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(0);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleEdit = (review: Review) => {
    setEditingReview(review);

    setEditComment(review.comment);

    setEditRating(review.rating);
  };

  const handleSaveEdit = async () => {
    if (!editingReview) return;

    try {
      await updateMutation.mutateAsync({
        id: editingReview.id,
        comment: editComment,
        rating: editRating,
      });

      setEditingReview(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteMutation.mutateAsync(deleteId);

      setDeleteId(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <Space orientation="vertical" size={16} style={{ width: "100%" }}>
        {[1, 2, 3].map((item) => (
          <Card
            key={item}
            style={{
              borderRadius: 16,
              backgroundColor: "transparent",
            }}
          >
            <Skeleton active avatar paragraph={{ rows: 2 }} />
          </Card>
        ))}
      </Space>
    );
  }

  if (reviews.length === 0) {
    return (
      <Card
        styles={{
          body: {
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          },
        }}
        style={{
          borderRadius: 20,
          background: "transparent",
          border: "1px solid #f0f0f0",
        }}
      >
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <Space orientation="vertical" size={4}>
              <Title
                level={4}
                style={{
                  margin: 0,
                }}
              >
                No reviews yet
              </Title>

              <Text type="secondary">You haven’t written any reviews yet.</Text>
            </Space>
          }
        ></Empty>
      </Card>
    );
  }

  return (
    <>
      <Space orientation="vertical" size={16} style={{ width: "100%" }}>
        {reviews.map((review, index) => (
          <Card
            key={index}
            style={{
              borderRadius: 18,
              height: "100%",
            }}
            styles={{
              body: {
                padding: isMobile ? 16 : 20,
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: "end",
                justifyContent: "space-between",
                height: "100%",
              },
            }}
          >
            <Flex gap={4} style={{ flexDirection: "column" }}>
              <Space align="start" size={14}>
                <Avatar size={54} icon={<UserOutlined />} />

                <div>
                  <Title
                    level={4}
                    style={{
                      margin: 0,
                      fontSize: 20,
                      fontWeight: 600,
                    }}
                  >
                    {review.userName}
                  </Title>

                  <Space
                    size={10}
                    wrap
                    style={{
                      marginTop: 4,
                    }}
                  >
                    <Rate disabled value={review.rating} />

                    <Space size={4}>
                      <CalendarOutlined
                        style={{
                          color: "#999",
                          fontSize: 12,
                        }}
                      />

                      <Text
                        type="secondary"
                        style={{
                          fontSize: 13,
                        }}
                      >
                        {new Date(review.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </Text>
                    </Space>
                  </Space>
                </div>
              </Space>
              <Paragraph
                style={{
                  marginTop: 18,
                  marginBottom: 0,
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: "#444",
                  flex: 1,
                }}
                ellipsis={{
                  rows: 3,
                  expandable: true,
                  symbol: "Read more",
                }}
              >
                {review.comment}
              </Paragraph>
            </Flex>

            <Flex
              justify={"space-between"}
              gap={8}
              style={{
                marginTop: 20,
              }}
            >
              <Button
                icon={<EditOutlined />}
                onClick={() => handleEdit(review)}
                block={isMobile}
              >
                Edit
              </Button>

              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => setDeleteId(review.id)}
                block={isMobile}
              >
                Delete
              </Button>
            </Flex>
          </Card>
        ))}
      </Space>

      <Modal
        open={!!editingReview}
        onCancel={() => setEditingReview(null)}
        onOk={handleSaveEdit}
        confirmLoading={updateMutation.isPending}
        okText="Save"
        cancelText="Cancel"
        title="Edit Review"
      >
        <Space
          orientation="vertical"
          size={18}
          style={{
            width: "100%",
            marginTop: 10,
          }}
        >
          <div>
            <Text type="secondary">Rating</Text>

            <div
              style={{
                marginTop: 8,
              }}
            >
              <Rate value={editRating} onChange={setEditRating} />
            </div>
          </div>

          <div>
            <Text type="secondary">Comment</Text>

            <TextArea
              rows={4}
              value={editComment}
              onChange={(e) => setEditComment(e.target.value)}
              placeholder="Write your review..."
              style={{
                marginTop: 8,
              }}
            />
          </div>
        </Space>
      </Modal>

      <Modal
        open={deleteId !== null}
        onCancel={() => setDeleteId(null)}
        onOk={handleDelete}
        confirmLoading={deleteMutation.isPending}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{
          danger: true,
        }}
        title="Delete Review"
      >
        <Text>Are you sure you want to delete this review?</Text>
      </Modal>
    </>
  );
};

export { Reviews };
