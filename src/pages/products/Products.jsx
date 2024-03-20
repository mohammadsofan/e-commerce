import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./Products.module.css";
import Loader from "../../components/Loader/Loader";
export default function Products() {
  const navigate = useNavigate();
  const { categoryName, categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}${
          categoryId != 0
            ? `/products/category/${categoryId}`
            : `/products?page=1&limit=1000`
        }`
      );
      setProducts(response.data.products);
      setError("");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [categoryId]);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
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
  if (!products.length && !loader && !error) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <span className="text-secondary fs-5">There is no products!</span>
      </div>
    );
  }
  return (
    <div className={style.products}>
      <div className="container">
        <h1 className="mb-3 text-capitalize">{categoryName}</h1>
        <div className="row gy-4">
          {products.map((product) => (
            <div className="col-sm-6 col-lg-4 col-xl-3" key={product.id}>
              <div className="d-flex justify-content-center align-items-center h-100">
                <div className="card h-100" style={{ width: "18rem" }}>
                  <img
                    src={product.mainImage.secure_url}
                    className={`card-img-top ${style.productImage}`}
                    alt={product.name}
                  />
                  <div className="card-body d-flex flex-column gap-3 justify-content-between align-items-start">
                    <h5 className="card-title text-capitalize">
                      {product.name.length > 46
                        ? product.name.slice(0, 46) + "..."
                        : product.name}
                    </h5>
                    {/* <p className="card-text">
                        {product.description.length > 60
                          ? product.description.slice(0, 60) + "..."
                          : product.description}
                      </p> */}
                    <div className="d-flex w-100 justify-content-between align-items-end">
                      <button
                        className="btn btn-success rounded"
                        onClick={() => handleProductClick(product.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                          width={18}
                        >
                          {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                          <path
                            fill="#ffffff"
                            d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                          />
                        </svg>
                      </button>
                      {product.discount ? (
                        <div className="d-flex gap-2">
                          <span className="fs-5 text-decoration-line-through text-danger">
                            ${product.price}
                          </span>
                          <span className="fs-5">${product.finalPrice}</span>
                        </div>
                      ) : (
                        <span className="fs-5">${product.price}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
