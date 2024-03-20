import React, { useEffect, useState } from "react";
import style from "./Product.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { Bounce, toast } from "react-toastify";
export default function Product() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const [cartError, setCartError] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const getData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/${id}`
      );
      if (response.data.message == "success") {
        setProduct(response.data.product);
        setMainImage(response.data.product.mainImage.secure_url);
      }
      setError("");
    } catch (error) {
      console.log(error);
      setError("Page Not Found");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleImageClick = (e) => {
    setMainImage(e.target.src);
  };

  const addToCart = async (id) => {
    try {
      setLoader(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/cart`,
        { productId: id },
        { headers: { Authorization: `Tariq__${token}` } }
      );
      toast.success("product added successfully!", {
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
      setCartError("");
    } catch (error) {
      console.log(error);
      let message =
        error.code == "ERR_NETWORK"
          ? error.message
          : error.response.data.message;
      setCartError(message);
      toast.error(message, {
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
    } finally {
      setLoader(false);
    }
  };

  const handleAddToCart = (id) => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      toast.info("you must login first!", {
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
    } else {
      addToCart(id);
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
    <div className="container">
      <div className={style.spaceTop}>
        <div className="row gy-4">
          <div className="col-lg-5">
            <div className={style.images}>
              <div className={style.mainImage}>
                <img src={mainImage} alt={product.name} />
              </div>
              <div className={style.subImages}>
                <div className={style.subImageContainer}>
                  <img
                    src={product.mainImage.secure_url}
                    alt={product.name}
                    onClick={handleImageClick}
                  />
                </div>
                {product.subImages.map((e) => (
                  <div className={style.subImageContainer} key={e.public_id}>
                    <img
                      src={e.secure_url}
                      alt={product.name}
                      onClick={handleImageClick}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="info d-flex flex-column gap-3">
              <h2 className="text-capitalize">{product.name}</h2>
              <div className="d-flex gap-2">
                <span className="text-danger text-decoration-line-through fs-4">
                  500$
                </span>
                <span className="fs-4">449$</span>
              </div>
              <p className="text-secondary">{product.description}</p>

              <span>
                Availability : <span className="text-success">In Stock</span>
              </span>
              <div className="">
                <button
                  className="btn btn-success mt-2"
                  onClick={() => handleAddToCart(product.id)}
                >
                  Add To Cart
                </button>
              </div>
              {cartError && <span className="text-danger">{cartError}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
