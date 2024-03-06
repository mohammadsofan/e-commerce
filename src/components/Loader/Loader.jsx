import React from "react";
import style from "./Loader.module.css";
export default function Loader({ size }) {
  return (
    <div className="text-center w-100 d-flex justify-content-center">
      <div
        className={style.loader}
        style={size ? { width: size, height: size } : {}}
      ></div>
    </div>
  );
}
