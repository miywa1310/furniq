import { banner1, banner2, banner3 } from "@/assets";
import { useResponsive } from "@/hooks/useResponsive";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Carousel } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import React from "react";

const Banner = () => {
  const carouselRef = React.useRef<CarouselRef>(null);

  const { isMobile } = useResponsive(768);

  const bannerItems = [
    {
      id: 1,
      title: "New Collection 2026",
      subtitle: "Modern furniture brings life to your home",
      img: banner1,
    },
    {
      id: 2,
      title: "Summer promotion",
      subtitle: "30% off selected products",
      img: banner2,
    },
    {
      id: 3,
      title: "Premium Series",
      subtitle: "Italian design — at an affordable price",
      img: banner3,
    },
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <Carousel ref={carouselRef} autoplay effect="fade" dots draggable>
        {bannerItems.map((item) => (
          <div key={item.id}>
            <div
              style={{
                width: "100%",
                height: isMobile ? 180 : 340,
                background: "#E8693A",
                borderRadius: 20,
                overflow: "hidden",
                position: "relative",
                padding: isMobile ? 18 : "48px 60px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Background Shape */}
              <div
                style={{
                  position: "absolute",
                  right: isMobile ? -35 : 70,
                  bottom: isMobile ? -55 : -40,
                  width: isMobile ? 170 : 340,
                  height: isMobile ? 170 : 260,
                  borderRadius: 75,
                  background: "#425463",
                  rotate: "-15deg",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    rotate: "15deg",
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{
                      width: isMobile ? 115 : 240,
                      height: isMobile ? 115 : 240,
                      objectFit: "contain",
                      borderRadius: 20,
                    }}
                  />
                </div>
              </div>

              {/* Content */}
              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  maxWidth: isMobile ? "65%" : "55%",
                }}
              >
                <Title
                  level={1}
                  style={{
                    color: "#fff",
                    margin: 0,
                    fontSize: isMobile ? 22 : 48,
                    fontWeight: 700,
                    lineHeight: 1.15,
                  }}
                >
                  {item.title}
                </Title>

                <Text
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: isMobile ? 12 : 18,
                    display: "block",
                    marginTop: isMobile ? 6 : 14,
                    lineHeight: 1.5,
                  }}
                >
                  {item.subtitle}
                </Text>

                <Button
                  type="primary"
                  size={isMobile ? "small" : "large"}
                  style={{
                    marginTop: isMobile ? 12 : 24,
                    borderRadius: 999,
                    background: "#fff",
                    color: "#E8693A",
                    border: "none",
                    fontWeight: 600,
                  }}
                >
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Desktop arrows */}
      {!isMobile && (
        <>
          <Button
            shape="circle"
            icon={<LeftOutlined />}
            onClick={() => carouselRef.current?.prev()}
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              background: "#FFFFFF40",
              border: "none",
              color: "#fff",
              backdropFilter: "blur(6px)",
            }}
          />

          <Button
            shape="circle"
            icon={<RightOutlined />}
            onClick={() => carouselRef.current?.next()}
            style={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              background: "#FFFFFF40",
              border: "none",
              color: "#fff",
              backdropFilter: "blur(6px)",
            }}
          />
        </>
      )}
    </div>
  );
};

export { Banner };
