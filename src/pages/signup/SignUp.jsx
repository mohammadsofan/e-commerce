import React, { useEffect, useState } from "react";
import style from "./SignUp.module.css";
import { validateForm } from "./signupValidation";
import Loader from "../../components/Loader/Loader";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    gender: "Male",
    image: "",
  });

  const [validate, setValidate] = useState({ name: "ok", message: "ok" });
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const handelSubmit = async (e) => {
    e.preventDefault();
    const validation = validateForm(user);
    setError("");
    if (validation.name === "ok") {
      setLoader(true);
      const formData = new FormData();
      formData.append("userName", user.userName);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("gender", user.gender);
      formData.append("image", user.image);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/signup`,
          formData
        );
        setError("");
        toast.success("account created successfully!", {
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
        navigate("/login");
      } catch (error) {
        console.log(error);
        if (error.response.status == 409) setError(error.response.data.message);
        toast.error("email already exists!", {
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
    if (name == "image") {
      setUser((user) => ({ ...user, [name]: e.target.files[0] }));
    } else {
      setUser((user) => ({ ...user, [name]: value }));
    }
  };

  return (
    <div
      className={`d-flex justify-content-center align-items-center w-100  ${style.signUpContainer}`}
    >
      <form
        className={`d-flex flex-column gap-3 ${style.signUpForm}`}
        onSubmit={handelSubmit}
      >
        <div className="text-center">
          <h1 className="mb-4">Sign Up</h1>
        </div>
        <div>
          <input
            type="text"
            name="userName"
            placeholder="UserName..."
            value={user.userName}
            onChange={handleChange}
            className={`p-2 w-100 ${style.signUpInput}`}
          />
          <span className="text-danger">
            {validate.name == "userName" ? validate.message : ""}
          </span>
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email..."
            value={user.email}
            onChange={handleChange}
            className={`p-2 w-100 ${style.signUpInput}`}
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
            className={`p-2 w-100 ${style.signUpInput}`}
          />
          <span className="text-danger">
            {validate.name == "password" ? validate.message : ""}
          </span>
        </div>

        <div className="gender">
          <div>Gender</div>
          <div className="d-flex gap-4">
            <div className="d-flex gap-1">
              <input
                type="radio"
                name="gender"
                value="Male"
                id="male"
                checked={user.gender == "Male"}
                onChange={handleChange}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div className="d-flex gap-1">
              <input
                type="radio"
                name="gender"
                value="Female"
                id="female"
                checked={user.gender == "Female"}
                onChange={handleChange}
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
        </div>
        <div>
          <span className="fw-bold">Profile Image</span>
          <input type="file" name="image" onChange={handleChange} />
          <span className="text-danger">
            {validate.name == "image" ? validate.message : ""}
          </span>
        </div>
        {loader && <Loader size={30} />}
        {error && <span className="text-danger">{error}</span>}
        <button
          type="submit"
          disabled={loader ? "disabled" : null}
          className={`${style.submitButton} btn btn-success`}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
