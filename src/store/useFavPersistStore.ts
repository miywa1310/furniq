import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FavoriteItem = {
  productId: string;
  variantId: string;
};

type FavoriteStore = {
  favorites: FavoriteItem[];

  toggleFavorite: (productId: string, variantId: string) => void;
  isFavorite: (productId: string, variantId: string) => boolean;
};

export const useFavPersistStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (productId, variantId) => {
        const exists = get().favorites.find(
          (i) =>
            i.productId === productId &&
            i.variantId === variantId,
        );

        if (exists) {
          set({
            favorites: get().favorites.filter(
              (i) =>
                !(
                  i.productId === productId &&
                  i.variantId === variantId
                ),
            ),
          });
        } else {
          set({
            favorites: [
              ...get().favorites,
              { productId, variantId },
            ],
          });
        }
      },

      isFavorite: (productId, variantId) => {
        return get().favorites.some(
          (i) =>
            i.productId === productId &&
            i.variantId === variantId,
        );
      },
    }),
    {
      name: "favorite-storage",
    },
  ),
);