import React, { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./router/Root";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import NotFound from "./pages/notfound/NotFound";
import Products from "./pages/products/Products";
import { ToastContainer } from "react-toastify";
import Home from "./pages/home/Home";

export default function App() {
  const [isLogged, setIsLogged] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root setIsLogged={setIsLogged} isLogged={isLogged} />,
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
          element: <Login setIsLogged={setIsLogged} />,
        },
        {
          path: "/products/categories/:categoryName/:categoryId",
          element: <Products />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}
