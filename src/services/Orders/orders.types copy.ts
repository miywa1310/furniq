export interface Order {
  userId: string;
  items: {
    productId: string;
    variantId: string;
    title: string;
    price: number;
    color: string;
    image: string;
    qty: number;
  }[];
  totalPrice: number;
  deliveryType: "delivery" | "pickup";
  address?: string;
  pickupPointId?: string;
  payment: "cash" | "card";
  createdAt: string;
  status: string|"pending" | "processing" | "paid" | "delivered" | "cancelled";
}
