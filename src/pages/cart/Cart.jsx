import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { Bounce, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/Cart";

export default function Cart() {
  const { setCartCount } = useContext(CartContext);
  const [cart, setCart] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const [rerender, setRerender] = useState(0);
  let totalPrice = 0;
  const getCart = async () => {
    try {
      setLoader(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: { Authorization: `Tariq__${token}` },
      });
      if (response.status == "200") {
        setCart(response.data.products);
        setCartCount(response.data.products.length);
      }
      setError("");
    } catch (error) {
      //server will return an error with status 500 if there is no products in the cart, thats why i did not set the error,
      //it will show the user an empty cart message insted of the server error.
      if (error.response.status != 500) setError(error.response.data.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getCart();
  }, [rerender]);

  const handleItemOperation = async (id, url, successMessage, failMessage) => {
    try {
      setLoader(true);
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}${url}`,
        { productId: id },
        { headers: { Authorization: `Tariq__${token}` } }
      );
      console.log(response);
      setRerender((old) => old + 1);
      setError("");
      toast.success(successMessage, {
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
    } catch (error) {
      if (error.code == "ERR_NETWORK") setError(error.message);
      toast.error(failMessage, {
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
      setLoader(false);
    }
  };

  const handleClearCart = async () => {
    try {
      setLoader(true);
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/clear`,
        null,
        { headers: { Authorization: `Tariq__${token}` } }
      );
      console.log(response);
      setRerender((old) => old + 1);
      setError("");
      toast.success("cart cleared successfully!", {
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
    } catch (error) {
      if (error.code == "ERR_NETWORK") setError(error.message);
      toast.error("clear cart failed!", {
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
      setLoader(false);
    }
  };

  if (loader) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <span className="text-danger fs-5">{error}</span>
      </div>
    );
  }
  return (
    <section className="h-100 h-custom mt-5">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div
              className="card card-registration card-registration-2"
              style={{ borderRadius: 15 }}
            >
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="col-lg-8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <h1 className="fw-bold mb-0 text-black">
                          Shopping Cart
                        </h1>
                        <h6 className="mb-0 text-muted">{`${cart.length} items`}</h6>
                      </div>

                      {cart.map((product) => {
                        totalPrice +=
                          product.quantity *
                          Math.ceil(product.details.finalPrice);
                        return (
                          <div key={product.details.id}>
                            <hr className="my-4" />
                            <div className="row mb-4 d-flex justify-content-between align-items-center gap-3">
                              <div className="col-md-2 col-lg-2 col-xl-2 text-center">
                                <img
                                  src={product.details.mainImage.secure_url}
                                  className="img-fluid rounded-3"
                                  alt={product.details.name}
                                />
                              </div>
                              <div className="col-md-3 col-lg-3 col-xl-3">
                                <h6 className="text-black mb-0">
                                  {product.details.name}
                                </h6>
                              </div>
                              <div className="col-md-3 col-lg-3 col-xl-2 d-flex align-items-center gap-1">
                                <button
                                  className="btn p-1 border"
                                  onClick={() =>
                                    handleItemOperation(
                                      product.details.id,
                                      "/cart/decraseQuantity",
                                      "quantity decreased successfully!",
                                      "decrease quantity failed!"
                                    )
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                    width={15}
                                  >
                                    {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                                    <path
                                      fill="#63E6BE"
                                      d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"
                                    />
                                  </svg>
                                </button>
                                <span className="border px-2 py-1 rounded">
                                  {product.quantity}
                                </span>
                                <button
                                  className="btn  p-1 border"
                                  onClick={() =>
                                    handleItemOperation(
                                      product.details.id,
                                      "/cart/incraseQuantity",
                                      "quantity increased successfully!",
                                      "increase quantity failed!"
                                    )
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                    width={15}
                                  >
                                    {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                                    <path
                                      fill="#63E6BE"
                                      d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                                    />
                                  </svg>
                                </button>
                              </div>
                              <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <h6 className="mb-0">{`$${
                                  product.quantity *
                                  Math.ceil(product.details.finalPrice)
                                }`}</h6>
                              </div>
                              <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                <button
                                  href="#!"
                                  className="btn text-muted"
                                  onClick={() =>
                                    handleItemOperation(
                                      product.details.id,
                                      "/cart/removeItem",
                                      "Item deleted successfully!",
                                      "delete failed!"
                                    )
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                    width={15}
                                  >
                                    {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                                    <path
                                      fill="#e6656c"
                                      d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      <hr className="my-4" />
                      {!cart.length && (
                        <div className=" d-flex justify-content-center align-items-center">
                          <span className="text-secondary fs-5">
                            There is no items in the cart
                          </span>
                        </div>
                      )}
                      {cart.length ? (
                        <button
                          className="btn btn-success"
                          onClick={handleClearCart}
                        >
                          Clear Cart
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-lg-4 bg-grey">
                    <div className="p-5">
                      <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                      <hr className="my-4" />
                      <div className="d-flex justify-content-between mb-4">
                        <h5 className="text-uppercase">items {cart.length}</h5>
                      </div>
                      <div className="mb-5">
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between mb-5">
                          <h5 className="text-uppercase">Total price</h5>
                          <h5>{`$${totalPrice}`}</h5>
                        </div>
                        <Link className="btn btn-success" to={"/order"}>
                          GO TO ORDER
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
