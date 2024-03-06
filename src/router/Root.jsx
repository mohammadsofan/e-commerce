import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function Root({ setIsLogged, isLogged }) {
  return (
    <>
      <Navbar setIsLogged={setIsLogged} isLogged={isLogged} />
      <Outlet />
    </>
  );
}
