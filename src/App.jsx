import React, { useState } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Root from "./router/Root";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import NotFound from "./pages/notfound/NotFound";
import Products from "./pages/products/Products";
import { ToastContainer } from "react-toastify";
import Home from "./pages/home/Home";
import UserContextProvider from "./context/User";
import SendCode from "./pages/sendcode/SendCode";
import ResetPassword from "./pages/resetpassword/ResetPassword";
import Cart from "./pages/cart/Cart";
import Order from "./pages/order/Order";
import Profile from "./pages/profile/Profile";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import CartContextProvider from "./context/Cart";
import ProductDetails from "./pages/productDetails/ProductDetails";
export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/products/categories/:categoryName/:categoryId",
          element: <Products />,
        },
        {
          path: "/product/:id",
          element: <ProductDetails />,
        },
        {
          path: "/sendCode",
          element: <SendCode />,
        },
        {
          path: "/resetPassword",
          element: <ResetPassword />,
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/order",
          element: (
            <ProtectedRoutes>
              <Order />
            </ProtectedRoutes>
          ),
        },
        ,
        {
          path: "/profile",
          element: (
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          ),
        },
        {
          path: "*",
          element: <Navigate to={"/"} />,
        },
      ],
    },
  ]);
  return (
    <>
      <UserContextProvider>
        <CartContextProvider>
          <RouterProvider router={router} />
        </CartContextProvider>
      </UserContextProvider>

      <ToastContainer />
    </>
  );
}
