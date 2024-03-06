import React, { useState } from "react";
import style from "./Hero.module.css";

export default function Hero() {
  return (
    <section>
      <div
        id="carousel"
        className={`carousel slide ${style.carousel}`}
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="hero3.jpg"
              className={`d-block w-100 ${style.carouselImg}`}
              alt="..."
            />
            <div className={style.carouselText}>
              <h1>fashion style meet perfection</h1>
              <p>
                here you can find your true <span>style</span>
              </p>
            </div>
          </div>
          pick a campaign that reflects your summer look
          <div className="carousel-item">
            <img
              src="hero2.jpg"
              className={`d-block w-100 ${style.carouselImg}`}
              alt="..."
            />
            <div className={style.carouselText}>
              <h1>pick a campaign that reflects your summer look</h1>
              <p>
                here you can find your true <span>style</span>
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="hero1.jpg"
              className={`d-block w-100 ${style.carouselImg}`}
              alt="..."
            />
            <div className={style.carouselText}>
              <h1>Transform your skin with the most popular products</h1>
              <p>
                elevate your<span> skincare</span> journey
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
