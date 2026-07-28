import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: string;
  variantId: string;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  color: string;
  image: string;
  qty: number;
};

type CartStore = {
  items: CartItem[];

  total: number;
  totalQty: number;
  totalPrice: number;

  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, variantId: string) => void;

  increaseQty: (productId: string, variantId: string) => void;
  decreaseQty: (productId: string, variantId: string) => void;

  clearCart: () => void;

  isCart: (productId: string, variantId?: string) => boolean;
};

const calcTotals = (items: CartItem[]) => {
  const total = items.length;

  const totalQty = items.reduce((sum, item) => sum + item.qty, 0);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  return { total, totalQty, totalPrice };
};

export const useCartPersistStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      totalQty: 0,
      totalPrice: 0,

      addToCart: (item) => {
        const key = `${item.productId}-${item.variantId}`;

        const exists = get().items.find(
          (i) => `${i.productId}-${i.variantId}` === key,
        );

        let updatedItems;

        if (exists) {
          updatedItems = get().items.map((i) =>
            `${i.productId}-${i.variantId}` === key
              ? { ...i, qty: i.qty + item.qty }
              : i,
          );
        } else {
          updatedItems = [...get().items, item];
        }

        const { total, totalQty, totalPrice } = calcTotals(updatedItems);

        set({
          items: updatedItems,
          total,
          totalQty,
          totalPrice,
        });
      },

      removeFromCart: (productId, variantId) => {
        const updatedItems = get().items.filter(
          (i) => !(i.productId === productId && i.variantId === variantId),
        );

        const { total, totalQty, totalPrice } = calcTotals(updatedItems);

        set({
          items: updatedItems,
          total,
          totalQty,
          totalPrice,
        });
      },

      increaseQty: (productId, variantId) => {
        const updatedItems = get().items.map((i) =>
          i.productId === productId && i.variantId === variantId
            ? { ...i, qty: i.qty + 1 }
            : i,
        );

        const { total, totalQty, totalPrice } = calcTotals(updatedItems);

        set({
          items: updatedItems,
          total,
          totalQty,
          totalPrice,
        });
      },

      decreaseQty: (productId, variantId) => {
        const updatedItems = get()
          .items.map((i) =>
            i.productId === productId && i.variantId === variantId
              ? { ...i, qty: i.qty - 1 }
              : i,
          )
          .filter((i) => i.qty > 0);

        const { total, totalQty, totalPrice } = calcTotals(updatedItems);

        set({
          items: updatedItems,
          total,
          totalQty,
          totalPrice,
        });
      },

      clearCart: () => set({ items: [], total: 0, totalQty: 0, totalPrice: 0 }),

      isCart: (productId, variantId) => {
        return get().items.some(
          (i) =>
            i.productId === productId &&
            (variantId ? i.variantId === variantId : true),
        );
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);
