import { useResponsive } from "@/hooks";
import { useAuthStore } from "@/store/useAuthPersistStore";
import { Menu } from "antd";
import Title from "antd/es/typography/Title";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const ProfileLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((s) => s.user);
  const { isMobile } = useResponsive(768);

  const menuItems = [
    { key: "/profile/orders", label: "Orders" },
    { key: "/profile/reviews", label: "Reviews" },
    { key: "/profile/settings", label: "Profile" },
    { key: "/profile/favorites", label: "Favorites" },
  ];

  const selectedKey = location.pathname;

  return (
    <div
      style={{
        width: "100%",
        overflowX: "hidden",
        minHeight: "80vh",
      }}
    >
      <Title
        level={2}
        style={{
          marginBottom: 20,
        }}
      >
        {user?.firstName} {user?.lastName}
      </Title>

      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 20,
          alignItems: "flex-start",
        }}
      >
        <Menu
          mode={isMobile ? "horizontal" : "vertical"}
          selectedKeys={[selectedKey]}
          onClick={({ key }) => navigate(key)}
          items={menuItems}
          style={{
            width: isMobile ? "100%" : 260,
            flexShrink: 0,
            backgroundColor: "transparent",
            fontSize: 16,
          }}
        />

        <div
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export { ProfileLayout };
