import React, { useEffect, useState } from "react";
import OrderProducts from "../orderProducts/OrderProducts";
import style from "./UserOrders.module.css";
import axios from "axios";
import Loader from "../../../../components/Loader/Loader";
import { Bounce, toast } from "react-toastify";
export default function UserOrders() {
  const [userOrders, setUserOrders] = useState("");
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const [rerender, setRerender] = useState(false);
  const getOrders = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/order`,
        { headers: { Authorization: `Tariq__${token}` } }
      );
      setUserOrders(response.data.orders);
      setError("");
    } catch (error) {
      setError("Error occured!");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, [rerender]);

  const handleCancle = async (id) => {
    try {
      setLoader(true);
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/order/cancel/${id}`,
        null,
        { headers: { Authorization: `Tariq__${token}` } }
      );
      toast.success("Order canceld successfully!", {
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
      setRerender((old) => !old);
    } catch (error) {
      toast.error("fail to cancel!", {
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
  };

  if (loader) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Loader />
      </div>
    );
  }
  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <span className="text-danger">{error}</span>
      </div>
    );
  }
  if (!userOrders.length) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <span className="text-secondary">You Have No Orders</span>
      </div>
    );
  }
  return (
    <div className={style.orders}>
      <div className="row gy-3">
        {userOrders.map((order) => {
          if (order.products.length)
            return (
              <div className="col-12" key={order._id}>
                <div className={`p-3 ${style.order}`}>
                  <div className="row">
                    <div className="col-6 ">
                      <h5 className="textSmall">
                        Order Status :{" "}
                        <span
                          className={`${
                            order.status == "pending"
                              ? "text-primary"
                              : order.status == "deliverd"
                              ? "text-success"
                              : "text-danger"
                          }
                            text-capitalize
                            `}
                        >
                          {order.status}
                        </span>
                      </h5>
                      <span className="textSmall">
                        <span className="text-secondary">Placed on </span>:
                        {` ${order.createdAt.slice(0, 10)}`}
                      </span>
                    </div>
                    <div className="col-6 text-end ">
                      <h5 className="textSmall">${order.finalPrice}</h5>
                      <span className="text-secondary textSmall">
                        {`Total Items ${order.products.length}`}
                      </span>
                    </div>
                    <div className="col-12">
                      <span className="textSmall text-secondary d-block">
                        Phone :
                        <span className="text-black">{` ${order.phoneNumber}`}</span>
                      </span>
                      <span className="text-secondary textSmall">
                        Address :
                        <span className="text-black">{` ${order.address}`}</span>
                      </span>
                    </div>
                  </div>
                  <hr />
                  <div className="products ">
                    <OrderProducts products={order.products} />
                  </div>
                  {order.status == "pending" && (
                    <button
                      className="btn btn-danger mt-3"
                      onClick={() => handleCancle(order._id)}
                    >
                      Cancle
                    </button>
                  )}
                </div>
              </div>
            );
        })}
      </div>
    </div>
  );
}
