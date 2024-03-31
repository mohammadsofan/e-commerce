import React from "react";
import { Navigate, useRouteError } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center text-danger fs-3">
      Not Found
    </div>
  );
}
