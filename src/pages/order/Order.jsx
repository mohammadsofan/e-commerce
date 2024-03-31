import { useState, useEffect, useContext } from "react";
import style from "./Order.module.css";
import Loader from "../../components/Loader/Loader";
import axios from "axios";
import { orderValidation } from "./OrderValidation";
import { Bounce, toast } from "react-toastify";
import { CartContext } from "../../context/Cart";

export default function Order() {
  const { setCartCount } = useContext(CartContext);
  const [cart, setCart] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const [orderInfo, setOrderInfo] = useState({
    couponName: "",
    phone: "",
    address: "",
  });
  const [validate, setValidate] = useState({
    name: "ok",
    message: "ok",
  });
  let totalPrice = 0;
  const getCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: { Authorization: `Tariq__${token}` },
      });
      if (response.status == "200") {
        setCart(response.data.products);
      }
      setError("");
    } catch (error) {
      //server will return an error with status 500 if there is no products in the cart, thats why i did not set the error,
      //it will show the user an empty cart message insted of the server error.
      if (error.response.status != 500) setError(error.response.data.message);
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderInfo((old) => ({ ...old, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length == 0) {
      toast.error("cart is empty, order failed!", {
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
      return;
    }

    try {
      setLoader(true);
      const validation = orderValidation(orderInfo);
      if (validation.name == "ok") {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/order`,
          orderInfo,
          { headers: { Authorization: `Tariq__${token}` } }
        );
        toast.success("Order sended, see it on your profile", {
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
        setCartCount(0);
        setCart([]);
      }
      setValidate(validation);
      setError("");
    } catch (error) {
      if (error.code == "ERR_NETWORK") setError(error.message);
      toast.error("Order failed!", {
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
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <span className="text-danger fs-5">{error}</span>
      </div>
    );
  }
  return (
    <section className="mt-5 pt-5 textSmall">
      <div className="container">
        <div className="row border rounded m-1 m-md-0">
          <div className="col-12">
            <h3 className="py-3 fs-4 fw-bold">PRODUCTS</h3>
            <div className="header pt-3">
              <div className="row">
                <div className="col-3 col-md-1 fw-bold">Product</div>
                <div className="col-3 col-md-4 fw-bold">Name</div>
                <div className="col-3 col-md-4 fw-bold text-center">
                  Quantity
                </div>
                <div className="col-3 col-md-3 fw-bold text-center">Price</div>
              </div>
            </div>
            <hr />
            <div className="products">
              {cart.map((product) => {
                totalPrice +=
                  Math.ceil(product.details.finalPrice) * product.quantity;
                return (
                  <div key={product.details.id}>
                    <div className="product">
                      <div className="row">
                        <div className="col-3 col-md-1">
                          <div className={style.imgContainer}>
                            <img
                              src={product.details.mainImage.secure_url}
                              alt={product.details.name}
                            />
                          </div>
                        </div>
                        <div className="col-3 col-md-4">
                          <span>{product.details.name}</span>
                        </div>
                        <div className="col-3 col-md-4 text-center">
                          {product.quantity}
                        </div>
                        <div className="col-3 col-md-3 text-center">
                          $
                          {Math.ceil(product.details.finalPrice) *
                            product.quantity}
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
            {!cart.length && (
              <span className="text-secondary">
                There is no items in the cart
              </span>
            )}
          </div>
          <div className="col-12">
            <div className="orderInfo py-3">
              <h3 className="fs-3 fw-bold">ORDER INFO</h3>

              <span className="fs-5 fw-bold">
                Total Price :
                <span className="text-danger">{` $${totalPrice}`}</span>
              </span>
              <span className="d-block mt-3 text-secondary">
                Enter your information to submit the order
              </span>
              <form
                className="my-1 d-flex flex-column gap-2 align-items-start"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  className="form-control d-inline p-2"
                  placeholder="Phone Number (10 digits)"
                  name="phone"
                  value={orderInfo.phone}
                  onChange={handleChange}
                />
                {validate.name == "phone" && (
                  <span className="text-danger">{validate.message}</span>
                )}
                <input
                  type="text"
                  className="form-control d-inline p-2"
                  placeholder="Address"
                  name="address"
                  value={orderInfo.address}
                  onChange={handleChange}
                />
                {validate.name == "address" && (
                  <span className="text-danger">{validate.message}</span>
                )}

                <input
                  type="text"
                  className="form-control d-inline p-2"
                  placeholder="Copon (Optional)"
                  name="couponName"
                  value={orderInfo.couponName}
                  onChange={handleChange}
                />

                <button className="btn btn-success mt-3" type="submit">
                  Order Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
