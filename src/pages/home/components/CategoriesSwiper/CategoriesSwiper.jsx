import React, { useState, useEffect } from "react";
import Swiper from "swiper/bundle";
import "swiper/css";
import "swiper/css/bundle";
import style from "./CategoriesSwiper.module.css";
import axios from "axios";
import Loader from "../../../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
export default function () {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 3,
      },

      640: {
        slidesPerView: 4,
        spaceBetween: 10,
      },

      880: {
        slidesPerView: 7,
        spaceBetween: 10,
      },
    },
  });

  async function getCategories() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=10`
      );

      setData(response.data.categories);
    } catch (error) {
      setError(true);
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  const handleOnClick = (category) => {
    console.log(category.name);
    navigate(`/products/categories/${category.name}/${category.id}`);
  };
  return (
    <>
      <section className="mt-4">
        <div className="container">
          <div className="swiper">
            <div className="swiper-wrapper">
              {!loader ? (
                data.map((ele) => (
                  <div
                    className={`swiper-slide text-center ${style.cursorpointer}`}
                    key={ele.id}
                    onClick={() => handleOnClick(ele)}
                  >
                    <img
                      src={ele.image.secure_url}
                      alt={ele.name}
                      className="w-75"
                    />
                  </div>
                ))
              ) : (
                <Loader />
              )}
              {error && (
                <div className="w-100 text-center text-danger fs-5">
                  an Error occurred while getting the Categories, try to refresh
                  the page!
                </div>
              )}

              {!data.length && !error && !loader && (
                <div className="w-100 text-center text-secondary fs-5">
                  there is no Categories!
                </div>
              )}
            </div>
            <div className={`swiper-button-prev ${style.swiperButtons}`} />
            <div className={`swiper-button-next ${style.swiperButtons}`} />
          </div>
        </div>
      </section>
    </>
  );
}
