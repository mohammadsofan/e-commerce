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
  const [sortBy, setSortBy] = useState("none");
  const [price, setPrice] = useState({ min: "", max: "" });
  let filteredProducts = [];

  //filtering products array
  const filtering = () => {
    if (sortBy == "none") filteredProducts = products.slice();
    else if (sortBy == "name") {
      filteredProducts = products
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy == "price") {
      filteredProducts = products
        .slice()
        .sort((a, b) => a.finalPrice - b.finalPrice);
    }
    if (price.min || price.max) {
      if (!price.min && price.max) {
        filteredProducts = filteredProducts.filter(
          (product) => product.finalPrice <= price.max
        );
      } else if (!price.max && price.min) {
        filteredProducts = filteredProducts.filter(
          (product) => product.finalPrice >= price.min
        );
      } else if (price.max && price.min) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.finalPrice >= price.min && product.finalPrice <= price.max
        );
      }
    }
  };
  filtering();

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
      setPrice({ min: "", max: "" });
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [categoryId]);

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPrice((old) => ({ ...old, [name]: value }));
  };
  const handleReset = () => {
    setSortBy("none");
    setPrice({ min: "", max: "" });
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
    <div className={`d-flex ${style.mobileView}`}>
      <aside className={`${style.productFilter} mt-5 `}>
        <div className="mt-4 p-3">
          <hr />
          <span className="fw-bold">Sort by : </span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="none">none</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>
        <div className="p-3">
          <div className="fw-bold">Price</div>
          <div className="d-flex gap-2">
            <input
              type="number"
              min={0}
              value={price.min}
              name="min"
              onChange={handlePriceChange}
            />
            <span> To </span>
            <input
              type="number"
              min={0}
              value={price.max}
              name="max"
              onChange={handlePriceChange}
            />
          </div>
        </div>
        <div>
          <button className="btn btn-success m-3" onClick={handleReset}>
            Reset
          </button>
        </div>
      </aside>

      <div className={`w-100 ${style.products} mb-3`}>
        <div className="container d-flex flex-column gap-3 align-items-center">
          {categoryName ? (
            <h1 className="text-capitalize align-self-start">{categoryName}</h1>
          ) : (
            ""
          )}
          <div className="row gy-4 w-100">
            {filteredProducts.map((product) => (
              <Product product={product} key={product._id} />
            ))}
          </div>
          {!filteredProducts.length && !loader && !error && (
            <div className=" d-flex justify-content-center align-items-center">
              <span className="text-secondary fs-5">There is no products!</span>
            </div>
          )}
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
    </div>
  );
}
