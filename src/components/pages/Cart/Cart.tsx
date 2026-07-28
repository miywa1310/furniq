import { CartProducts } from "@/components/shared/CartComp/CartProducts";
import { EmptyCart } from "@/components/shared/CartComp/EmptyCart";
import { useCartPersistStore } from "@/store/useCartPersistStore";
import { Flex } from "antd";
import React from "react";

const Cart: React.FC = () => {
  const cartItems = useCartPersistStore((s) => s.items);
  return (
    <Flex style={{ flexDirection: "column" }} gap={30}>
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <CartProducts />
        </>
      )}
    </Flex>
  );
};

export { Cart };
