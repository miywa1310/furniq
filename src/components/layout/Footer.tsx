import {
  FacebookOutlined,
  HeartOutlined,
  HomeOutlined,
  LinkedinOutlined,
  ShoppingCartOutlined,
  TwitterOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useResponsive } from "@/hooks";
import { useCartPersistStore } from "@/store/useCartPersistStore";
import { useFavPersistStore } from "@/store/useFavPersistStore";
import { Badge, Flex } from "antd";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();
  const { isMobile } = useResponsive(768);

  const cartCount = useCartPersistStore((s) => s.items.length);
  const favCount = useFavPersistStore((s) => s.favorites.length);

  return (
    <footer>
      {isMobile && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: "#fff",
            borderTop: "1px solid #eee",
            padding: "10px 0",
            zIndex: 1000,
          }}
        >
          <Flex justify="space-around" align="center">
            <Link to="/">
              <Flex vertical align="center">
                <HomeOutlined
                  style={{
                    color: pathname === "/" ? "#1677ff" : "#555",
                    fontSize: 20,
                  }}
                />
                <span style={{ fontSize: 12 }}>Home</span>
              </Flex>
            </Link>

            <Link to="/favorites">
              <Flex vertical align="center" style={{ position: "relative" }}>
                <Badge count={favCount} size="small">
                  <HeartOutlined
                    style={{
                      color: pathname === "/favorites" ? "#1677ff" : "#555",
                      fontSize: 20,
                    }}
                  />
                </Badge>
                <span style={{ fontSize: 12 }}>Favorites</span>
              </Flex>
            </Link>

            <Link to="/cart">
              <Flex vertical align="center" style={{ position: "relative" }}>
                <Badge count={cartCount} size="small">
                  <ShoppingCartOutlined
                    style={{
                      color: pathname === "/cart" ? "#1677ff" : "#555",
                      fontSize: 20,
                    }}
                  />
                </Badge>
                <span style={{ fontSize: 12 }}>Cart</span>
              </Flex>
            </Link>

            <Link to="/profile/orders">
              <Flex vertical align="center">
                <UserOutlined
                  style={{
                    color: pathname === "/profile/" ? "#1677ff" : "#555",
                    fontSize: 20,
                  }}
                />
                <span style={{ fontSize: 12 }}>Profile</span>
              </Flex>
            </Link>
          </Flex>
        </div>
      )}
      {!isMobile && (
        <div
          style={{
            background: "#0b0b0b",
            color: "#fff",
            padding: "40px 120px",
            marginTop: 40,
          }}
        >
          <Flex justify="space-between" gap={40} wrap>
            <div style={{ maxWidth: 350 }}>
              <h2 style={{ fontSize: 28 }}>FurniQ</h2>
              <p style={{ fontSize: 16 }}>
                FurniQ is a modern furniture marketplace designed to make your
                shopping experience simple and enjoyable. Discover carefully
                selected furniture, compare styles and prices, and buy with
                confidence — all in one place. We help you turn your house into
                a home.
              </p>
              <Flex style={{ fontSize: 20 }} gap={10}>
                <a href="https://www.facebook.com">
                  <FacebookOutlined />
                </a>
                <a
                  className="text-white text-[26px]"
                  href="https://twitter.com"
                >
                  <TwitterOutlined />
                </a>
                <a
                  className="text-white text-[26px]"
                  href="https://linkedin.com"
                >
                  <LinkedinOutlined />
                </a>
              </Flex>
            </div>

            <div>
              <h2 style={{ fontSize: 24 }}>Pages</h2>
              <Flex vertical gap={8}>
                <Link to="/">Home</Link>
                <Link to="/about">About us</Link>
                <Link to="/">FAQ</Link>
                <Link to="/catalog">Catalog</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/orders">Favorites</Link>
                <Link to="/cart">Cart</Link>
              </Flex>
            </div>

            <div>
              <h2 style={{ fontSize: 24, marginBottom: 20 }}>Contact us</h2>
              <Flex style={{ flexDirection: "column" }} gap={8}>
                <a href="tel:+998555081188">+998 (55) 508-11-88</a>
                <a href="mailto:support@furniq.com">support@furniq.com</a>
              </Flex>
            </div>
          </Flex>

          <div
            style={{
              marginTop: 40,
              borderTop: "1px solid #222",
              paddingTop: 20,
              textAlign: "center",
              opacity: 0.6,
            }}
          >
            Copyright 2024 ©️ FurniQ.com - All rights Reserved
          </div>
        </div>
      )}
    </footer>
  );
};

export { Footer };
