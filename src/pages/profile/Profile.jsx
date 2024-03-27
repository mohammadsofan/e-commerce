import React, { useEffect, useState } from "react";
import style from "./Profile.module.css";
import UserOrders from "./components/userOrders/UserOrders";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
export default function Profile() {
  const [userProfile, setUserProfile] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/profile`,
        { headers: { Authorization: `Tariq__${token}` } }
      );
      setUserProfile(response.data.user);
      setError("");
    } catch (error) {
      setError("error occured!");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

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
        <span className="text-danger">{error}</span>
      </div>
    );
  }
  return (
    <section className="mt-5 pt-5">
      <div className="container">
        <h2>PROFILE</h2>
        <div className={`d-flex flex-column gap-3 p-3 ${style.profile}`}>
          <div className={style.imageContainer}>
            <img
              src={userProfile.image.secure_url}
              alt="profile img"
              className="w-100"
            />
          </div>
          <div>
            <span className="text-success">UserName</span>
            <h5>{userProfile.userName}</h5>
          </div>
          <div>
            <span className="text-success">Email</span>
            <p>{userProfile.email}</p>
          </div>
          <hr />
          <h4>MY ORDERS</h4>
          <UserOrders />
        </div>
      </div>
    </section>
  );
}
