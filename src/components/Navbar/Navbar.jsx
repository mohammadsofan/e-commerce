import React, { useEffect, useState } from "react";
import style from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export default function Navbar({ setIsLogged, isLogged }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("You are now logged out!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    setIsLogged(false);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container">
          <a className="navbar-brand">
            <img src="logo.jpg" className={style.logo} alt="logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse ms-lg-4" id="navbarNav">
            <ul className="navbar-nav gap-lg-3">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/catergories">
                  Catergories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/products/categories/products/0"
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
            </ul>

            <div
              className={`${style.buttons} d-flex gap-2 ms-lg-auto mt-3 mt-lg-0`}
            >
              {!isLogged ? (
                <>
                  <NavLink className="btn btn-success" to="/signup">
                    Sign up
                  </NavLink>
                  <NavLink className="btn btn-outline-success" to="/login">
                    Log in
                  </NavLink>
                </>
              ) : (
                <NavLink
                  className="btn btn-outline-success"
                  to="/"
                  onClick={handleLogout}
                >
                  Log out
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
