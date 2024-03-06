import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./Products.module.css";
import Loader from "../../components/Loader/Loader";
export default function Products() {
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
            : `/products?page=1&limit=10`
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
  return (
    <div className={style.products}>
      <div className="container">
        <h1 className="mb-3 text-capitalize">{categoryName}</h1>
        <div className="row gy-4">
          {loader ? (
            <Loader />
          ) : (
            products.map((product) => (
              <div className="col-sm-6 col-lg-4 col-xl-3" key={product.id}>
                <div className="d-flex justify-content-center align-items-center h-100">
                  <div className="card h-100" style={{ width: "18rem" }}>
                    <img
                      src={product.mainImage.secure_url}
                      className={`card-img-top ${style.productImage}`}
                      alt={product.name}
                    />
                    <div className="card-body d-flex flex-column justify-content-between align-items-start">
                      <h5 className="card-title">
                        {product.name.length > 46
                          ? product.name.slice(0, 46) + "..."
                          : product.name}
                      </h5>
                      <p className="card-text">
                        {product.description.length > 60
                          ? product.description.slice(0, 60) + "..."
                          : product.description}
                      </p>
                      <button className="btn btn-success">Detailes...</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          {error && (
            <div className="text-center">
              <span className="text-danger fs-5">{error}</span>
            </div>
          )}
          {!products.length && !loader && !error && (
            <div className="text-center">
              <span className="text-secondary fs-5">There is no products!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
