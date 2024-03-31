import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./Products.module.css";
import Loader from "../../components/Loader/Loader";
import Pagination from "./components/Pagination/Pagination";
import Product from "./components/product/Product";

const LIMIT_PER_PAGE = 6;

export default function Products() {
  const { categoryName, categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const [numPages, setNumPages] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const getProducts = async (page = 1) => {
    try {
      setLoader(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}${
          categoryId
            ? `/products/category/${categoryId}`
            : `/products?page=${page}&limit=${LIMIT_PER_PAGE}`
        }`
      );
      setProducts(response.data.products);
      if (!categoryId)
        setNumPages(Math.ceil(response.data.total / LIMIT_PER_PAGE));
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
      <div className="container d-flex flex-column gap-3 align-items-center">
        {categoryName ? (
          <h1 className="mb-3 text-capitalize align-self-start">
            {categoryName}
          </h1>
        ) : (
          ""
        )}
        <div className="row gy-4 w-100">
          {products.map((product) => (
            <Product product={product} />
          ))}
        </div>
        {!categoryId && (
          <Pagination
            num={numPages}
            getProducts={getProducts}
            setCurPage={setCurPage}
            curPage={curPage}
          />
        )}
      </div>
    </div>
  );
}
