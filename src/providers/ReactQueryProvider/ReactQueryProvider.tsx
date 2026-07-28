import { queryClient } from "@/config";
import { QueryClientProvider } from "@tanstack/react-query";
import { type FC, type ReactNode } from "react";

const ReactQueryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export { ReactQueryProvider };
