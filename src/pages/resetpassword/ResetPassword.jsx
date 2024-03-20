import React, { useState } from "react";
import style from "../login/Login.module.css";
import { validateForm } from "./resetPasswordValidation";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { Bounce, toast } from "react-toastify";
export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: location.state.userEmail,
    password: "",
    code: "",
  });

  const [validate, setValidate] = useState({ name: "ok", message: "ok" });
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const getResponse = async () => {
    try {
      setLoader(true);
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/auth/forgotPassword`,
        { email: user.email, password: user.password, code: user.code }
      );
      if (response.data.message == "success") {
        navigate("/login");
        toast.success("password has been reset successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
      setError("");
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setError(error.response.data.message);
    } finally {
      setLoader(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => {
      return { ...user, [name]: value };
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const validation = validateForm(user);
    if (validation.name == "ok") {
      getResponse();
    }
    setValidate(validation);
  };
  return (
    <div
      className={`d-flex justify-content-center align-items-center w-100  ${style.loginContainer}`}
    >
      <form
        className={`d-flex flex-column gap-4 ${style.loginForm}`}
        onSubmit={handelSubmit}
      >
        <div className="text-center">
          <span className="fs-2">Reset Password</span>
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="New Password..."
            value={user.password}
            onChange={handleChange}
            className={`p-2 w-100 ${style.loginInput}`}
          />
          <span className="text-danger">
            {validate.name == "password" ? validate.message : ""}
          </span>
        </div>
        <div>
          <input
            type="text"
            name="code"
            placeholder="Code..."
            value={user.code}
            onChange={handleChange}
            className={`p-2 w-100 ${style.loginInput}`}
          />
          <span className="text-danger">
            {validate.name == "code" ? validate.message : ""}
          </span>
        </div>

        {loader && <Loader size={30} />}
        {error && <span className="text-danger">{error}</span>}

        <button
          type="submit"
          disabled={loader ? "disabled" : null}
          className="btn btn-success"
        >
          Reset
        </button>
      </form>
    </div>
  );
}
