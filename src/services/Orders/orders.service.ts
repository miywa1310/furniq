import { api } from "@/api";
import type { Order } from "./orders.types copy";

export const getOrders = async (): Promise<Order[]> => {
  const response = await api.get("/orders");
  return response.data;
};

export const createOrder = async (data: Order) => {
  const res = await api.post("/orders", data);
  return res.data;
};
