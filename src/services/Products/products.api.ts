import { useQuery } from "@tanstack/react-query";
import type { Product } from "./products.types";
import { getProducts } from "./products.service";

export const useGetProductsQuery = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};
