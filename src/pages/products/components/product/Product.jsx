import React from "react";
import style from "./Product.module.css";
import Stars from "../Stars/Stars";
import { useNavigate } from "react-router-dom";
export default function Product({ product }) {
  const navigate = useNavigate();
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <div className="col-sm-6 col-lg-4 col-xl-3">
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
            <Stars num={parseInt(product.avgRating)} />
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
                  <span className="fs-6 text-decoration-line-through text-danger">
                    ${product.price}
                  </span>
                  <span className="fs-6">${product.finalPrice}</span>
                </div>
              ) : (
                <span className="fs-6">${product.price}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
