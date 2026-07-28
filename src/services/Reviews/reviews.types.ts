export interface Reviews {
  reviews: Review[];
}

export interface Review {
  id: string;
  productId: string;
  variantId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  verified: boolean;
}

export interface UpdateReviewPayload {
  id: string;

  rating: number;
  comment: string;
}
