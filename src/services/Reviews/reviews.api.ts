import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deleteReview,
  getReviews,
  updateReview,
} from "./reviews.service";

import type {
  Review,
  UpdateReviewPayload,
} from "./reviews.types";

export const useGetReviewsQuery = () => {
  return useQuery<Review[]>({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });
};

export const useUpdateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateReviewPayload) =>
      updateReview(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
    },
  });
};

export const useDeleteReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      deleteReview(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
    },
  });
};