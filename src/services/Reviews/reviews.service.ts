import { api } from "@/api";

import type { Review, UpdateReviewPayload } from "./reviews.types";

export const getReviews = async (): Promise<Review[]> => {
  const response = await api.get("/reviews");

  return response.data;
};

export const updateReview = async ({
  id,
  ...body
}: UpdateReviewPayload): Promise<Review> => {
  const response = await api.patch(`/reviews/${id}`, body);

  return response.data;
};

export const deleteReview = async (id: string): Promise<void> => {
  await api.delete(`/reviews/${id}`);
};
