import React, { useContext, useEffect, useState } from "react";
import style from "./Login.module.css";
import { validateForm } from "./loginValidation";
import Loader from "../../components/Loader/Loader";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/User";
export default function Login() {
  const { setUserToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [validate, setValidate] = useState({ name: "ok", message: "ok" });
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [codeModal, setCodeModal] = useState(false);
  const handelSubmit = async (e) => {
    e.preventDefault();
    const validation = validateForm(user);
    setError("");
    if (validation.name === "ok") {
      setLoader(true);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/signin`,
          user
        );

        setError("");
        toast.success("Welcome!", {
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
        localStorage.setItem("token", response.data.token);
        setUserToken(response.data.token);
        navigate("/");
      } catch (error) {
        setError(error.response.data.message);
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
      } finally {
        setLoader(false);
      }
    }
    setValidate(validation);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUser((user) => ({ ...user, [name]: value }));
  };

  return (
    <div
      className={`d-flex justify-content-center align-items-center w-100  ${style.loginContainer}`}
    >
      <form
        className={`d-flex flex-column gap-5 ${style.loginForm}`}
        onSubmit={handelSubmit}
      >
        <div className="text-center">
          <span className="fs-1">Login</span>
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email..."
            value={user.email}
            onChange={handleChange}
            className={`p-2 w-100 ${style.loginInput}`}
          />
          <span className="text-danger">
            {validate.name == "email" ? validate.message : ""}
          </span>
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password..."
            value={user.password}
            onChange={handleChange}
            className={`p-2 w-100 ${style.loginInput}`}
          />
          <span className="text-danger">
            {validate.name == "password" ? validate.message : ""}
          </span>
        </div>

        {loader && <Loader size={30} />}
        {error && <span className="text-danger">{error}</span>}
        <Link className="text-primary text-decoration-none" to="/sendCode">
          Forgot Password ?
        </Link>
        <button
          type="submit"
          disabled={loader ? "disabled" : null}
          className="btn btn-success"
        >
          Login
        </button>
      </form>
    </div>
  );
}
