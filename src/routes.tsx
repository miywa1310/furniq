import type { RouteObject } from "react-router-dom";

import { MainLayout, ProfileLayout } from "./components/layout";

import {
  About,
  Cart,
  Catalog,
  Checkout,
  FAQ,
  Favourites,
  Home,
  Login,
  Orders,
  Product,
  Profile,
  Reviews,
} from "./components/pages";
import { ProtectedRoute } from "./components/shared/ProtectedRoute";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,

    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "about",
        element: <About />,
      },

      {
        path: "faq",
        element: <FAQ />,
      },

      {
        path: "login",
        element: <Login />,
      },

      {
        path: "cart",
        element: <Cart />,
      },

      {
        path: "product/:id",
        element: <Product />,
      },

      {
        path: "catalog",
        element: <Catalog />,
      },
      {
        path: "favorites",
        element: <Favourites />,
      },

      {
        element: <ProtectedRoute />,

        children: [
          {
            path: "orders",
            element: <Orders />,
          },

          {
            path: "checkout",
            element: <Checkout />,
          },

          {
            path: "profile",
            element: <ProfileLayout />,

            children: [
              {
                path: "settings",
                element: <Profile />,
              },

              {
                path: "orders",
                element: <Orders />,
              },

              {
                path: "favorites",
                element: <Favourites />,
              },

              {
                path: "reviews",
                element: <Reviews />,
              },
            ],
          },
        ],
      },
    ],
  },
];
