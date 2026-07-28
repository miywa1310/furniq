import { useResponsive } from "@/hooks";
import { Layout } from "antd";
import type { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";

const { Content } = Layout;

const MainLayout: FC = () => {
  const { pathname } = useLocation();
  const { isMobile } = useResponsive(768);

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      <div className="container">
        <Header />
      </div>
      <div
        className={pathname !== "/login" ? "container" : ""}
        style={isMobile ? { paddingTop: 130, paddingBottom: 60 } : undefined}
      >
        <Content
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}
        >
          <Outlet />
        </Content>
      </div>

      <Footer />
    </Layout>
  );
};

export { MainLayout };
