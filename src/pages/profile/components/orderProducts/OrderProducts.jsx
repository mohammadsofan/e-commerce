import React from "react";
import style from "./OrderProducts.module.css";
export default function OrderProducts({ products }) {
  return (
    <>
      <div className="row gy-3 textSmall mb-3">
        <div className="col-6 ">Product</div>
        <div className="col-3 text-center ">Quantity</div>
        <div className="col-3 text-center">Price</div>
      </div>
      {products.map((product, i) => {
        return (
          <div
            className={`row py-2 textSmall align-items-center ${
              i % 2 == 0 ? "bg-light-gray" : ""
            } rounded`}
          >
            <div className="col-6">
              <div className="d-flex gap-2 align-items-center">
                <img
                  src={product.productId.mainImage.secure_url}
                  alt="product.productId.name"
                  className={style.productImg}
                />
                <span className="text-capitalize">
                  {product.productId.name}
                </span>
              </div>
            </div>
            <div className="col-3 text-center">{product.quantity}</div>
            <div className="col-3 text-center overflow-auto">
              ${product.finalPrice}
            </div>
          </div>
        );
      })}
    </>
  );
}
