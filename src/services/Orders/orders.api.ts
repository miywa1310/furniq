import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { createOrder, getOrders } from "./orders.service";
import type { Order } from "./orders.types copy";

export const useGetOrdersQuery = () => {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
};
export const useCreateOrdersMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["orders", "create"],
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => {
      message.error("Error");
    },
  });
};
