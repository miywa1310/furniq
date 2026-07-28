import type { FC, ReactNode } from "react";
import { ReactQueryProvider } from "./ReactQueryProvider/ReactQueryProvider";
import { AntdProvider } from "./AntdProvider/AntdProvider";


const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ReactQueryProvider>
        <AntdProvider>{children}</AntdProvider>
    </ReactQueryProvider>
  );
};

export { GlobalProvider };