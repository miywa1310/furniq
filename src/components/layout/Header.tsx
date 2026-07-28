import { logo } from "@/assets";
import { useResponsive } from "@/hooks";
import { useCartPersistStore } from "@/store/useCartPersistStore";
import { useFavPersistStore } from "@/store/useFavPersistStore";
import {
  EnvironmentOutlined,
  HeartOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Button, Flex, Input, Space, theme } from "antd";
import Text from "antd/es/typography/Text";
import type { FC } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header: FC = () => {
  const navigate = useNavigate();
  const { isMobile } = useResponsive(768);
  const { token } = theme.useToken();

  const [search, setSearch] = useState("");

  const countFav = useFavPersistStore((s) => s.favorites.length);
  const countCart = useCartPersistStore((s) => s.items.length);

  const handleSearch = () => {
    const trimmed = search.trim();

    if (!trimmed) {
      navigate("/catalog");
      return;
    }

    navigate(`/catalog?search=${encodeURIComponent(trimmed)}`);
    setSearch("");
  };

  return (
    <header
      style={{
        position: isMobile ? "fixed" : "sticky",
        top: 0,
        left: 16,
        right: 16,
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        gap: 8,
        fontSize: 15,
        color: token.colorText,
        marginBottom: isMobile ? 20 : 40,
        marginTop: isMobile ? 0 : 20,
      }}
    >
      {!isMobile && (
        <Flex justify="space-between" align="center">
          <Flex gap={8} align="center">
            <a
              href="https://maps.app.goo.gl/uzhYBAWqzXXxxdL87"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <EnvironmentOutlined />
              <span
                style={{
                  textDecoration: "underline",
                }}
              >
                Nukus
              </span>
              <span>- Pick-up point</span>
            </a>
          </Flex>

          <Flex gap={50} align="center">
            <Link to="/about">
              <Text>About Company</Text>
            </Link>

            <Link to="/faq">
              <Text>FAQ</Text>
            </Link>

            <Link to="/sell">
              <Text>Sell on FurniQ</Text>
            </Link>
          </Flex>
        </Flex>
      )}

      <Flex
        justify="space-between"
        align="center"
        gap={20}
        style={{
          marginTop: 15,
        }}
      >
        <Link to="/">
          <img src={logo} />
        </Link>

        <Button
          shape="round"
          size="large"
          style={{
            width: 160,
            backgroundColor: "transparent",
            flexShrink: 0,
          }}
          onClick={() => navigate("/catalog")}
        >
          Catalog
        </Button>

        {!isMobile && (
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onPressEnter={handleSearch}
              placeholder="Search furniture..."
              style={{
                borderRadius: "30px 0 0 30px",
                paddingInline: 20,
                height: 42,
                backgroundColor: "transparent",
                fontSize: 15,
              }}
            />

            <Button
              onClick={handleSearch}
              icon={<SearchOutlined />}
              style={{
                borderRadius: "0 30px 30px 0",
                width: 56,
                height: 42,
              }}
            />
          </Space.Compact>
        )}

        {!isMobile && (
          <Flex gap={20}>
            <Link to="/favorites">
              <Button
                type="text"
                icon={
                  <Badge count={countFav} size="small">
                    <HeartOutlined style={{ fontSize: 20 }} />
                  </Badge>
                }
              />
            </Link>

            <Link to="/cart">
              <Button
                type="text"
                icon={
                  <Badge count={countCart} size="small">
                    <ShoppingCartOutlined style={{ fontSize: 20 }} />
                  </Badge>
                }
              />
            </Link>

            <Link to="/profile/orders">
              <Button
                type="text"
                icon={<UserOutlined style={{ fontSize: 20 }} />}
              />
            </Link>
          </Flex>
        )}
      </Flex>

      {isMobile && (
        <Space.Compact
          style={{
            width: "100%",
            marginBlock: 8,
          }}
        >
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onPressEnter={handleSearch}
            placeholder="Search furniture..."
            style={{
              borderRadius: "30px 0 0 30px",
              paddingInline: 20,
              height: 46,
            }}
          />

          <Button
            onClick={handleSearch}
            icon={<SearchOutlined />}
            style={{
              borderRadius: "0 30px 30px 0",
              width: 56,
              height: 46,
            }}
          />
        </Space.Compact>
      )}
    </header>
  );
};

export { Header };
