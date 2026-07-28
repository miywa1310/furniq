import { ConfigProvider } from "antd";
import { type FC, type ReactNode } from "react";

const AntdProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#E57351",
          colorBgBase: "#FFFFFF",
          colorBgContainer: "#EDF1F4",
          colorText: "#425463",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export { AntdProvider };
