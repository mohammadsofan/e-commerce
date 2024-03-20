import React, { useState } from "react";
import style from "../login/Login.module.css";
import { validateForm } from "./sendCodeValidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { Bounce, toast } from "react-toastify";
export default function SendCode() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [validate, setValidate] = useState({ name: "ok", message: "ok" });
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const getResponse = async () => {
    try {
      setLoader(true);
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/auth/sendcode`,
        { email: email }
      );
      if (response.data.message == "success") {
        toast.success("code sended successfully!", {
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
      navigate("/resetPassword", { state: { userEmail: email } });
      setError("");
    } catch (error) {
      toast.error("error occured! try again", {
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
      setError("error occured! try again");
    } finally {
      setLoader(false);
    }
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    const validation = validateForm(email);
    if (validation.name == "ok") {
      getResponse();
    } else {
      setValidate(validation);
    }
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
          <span className="fs-1">Send Code</span>
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`p-2 w-100 ${style.loginInput}`}
          />
          <span className="text-danger">
            {validate.name == "email" ? validate.message : ""}
          </span>
        </div>
        <span className="text-secondary">
          we will send 4 digits code to your email, use it to reset your
          password
        </span>
        {loader && <Loader size={30} />}
        {error && <span className="text-danger">{error}</span>}

        <button
          type="submit"
          disabled={loader ? "disabled" : null}
          className="btn btn-success"
        >
          Send
        </button>
      </form>
    </div>
  );
}
