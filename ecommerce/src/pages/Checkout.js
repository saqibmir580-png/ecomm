import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { config } from "../utils/axiosConfig";
import { createAnOrder } from "../features/user/userSlice";

const shippingSchema = yup.object({
  firstName: yup.string().required("First Name is Required"),
  lastName: yup.string().required("Last Name is Required"),
  address: yup.string().required("Address Detail are Required"),
  state: yup.string().required("State is Required"),
  city: yup.string().required("City is Required"),
  other: yup.string().required("Apartment,Suite is Required"),
  country: yup.string().required("Country is Required"),
  pincode: yup.string().required("Pincode is Required"),
});
const Checkout = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.auth.cartProducts);
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    razorpayPaymentId: "",
    razorpayOrderId: "",
  });
  console.log(shippingInfo, paymentInfo,cartState);

  const [cartProductState, setCartProductState] = useState([]);
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity) * cartState[index].price;
      setTotalAmount(sum);
    }
  }, [cartState]);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      state: "",
      city: "",
      other: "",
      country: "",
      pincode: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      alert("hii")
      setShippingInfo(values)
     checkoutHandler()
     
    },
  });
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("root");
      script.src = src;
      script.onload = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  useEffect(() => {
    let items = [];
    for (let index = 0; index < cartState?.length; index++) {
      items.push({
        product: cartState[index].productId._id,
        quantity: cartState[index].quantity,
        color: cartState[index].color,
        price: cartState[index].price,
      });
    }
    setCartProductState(items);
  }, []);

  const checkoutHandler = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (res) {
      alert("Razorpay SDK failed to Load");
    }
    const result = await axios.post(
      "http://localhost:5000/api/user/order/checkout",
      totalAmount,
      config
    );
    if (result) {
      alert("Something Went Wrong!");
    }

    const { amount, id: order_id, currency } = result.data.order;
    const options = {
      key: "rzp_test_ZirNx352chq7oN",
      amount: amount,
      currency: currency,
      name: "saqib ali mir.",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
        };

        const result = await axios.post(
          "http://localhost:5000/api/user/order/paymentVerification",config,
          data
        );

        setPaymentInfo({
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
        });
        dispatch(
          createAnOrder({
            user:cartProductState?._id,
            totalPrice: totalAmount,
            totalPriceAfterDiscount: totalAmount,
            orderItem: cartProductState,
            shippingInfo,
            paymentInfo
          })
        );
      },
      prefill: {
        name: "SAQIB ALI MIR",
        email: "saqibmir580@gmail.com",
        contact: "6005774525",
      },
      notes: {
        address: "north campus baramulla",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Electrify</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; / &nbsp;
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">
                Zeerat Rafiq (zeeratrafiq@gmail.com)
              </p>
              <h4 className="mb-3">Shipping Address</h4>
              <form
                action=""
               onSubmit={formik.handleSubmit}
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                  <select
                    name="country"
                    value={formik.values.country}
                    onChange={formik.handleChange("country")}
                    onBlur={formik.handleBlur("country")}
                    className="form-control form-select"
                    id=""
                  >
                    <option value="">
                      Select Country
                    </option>
                    <option value="India">India</option>
                    <option value="pakistan">Pakistan</option>
                    <option value="iran">Iran</option>
                  </select>
                  <div className="errors ms-2 my-1">
                    {formik.touched.country && formik.errors.country}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="form-control"
                    value={formik.values.firstName}
                    onChange={formik.handleChange("firstName")}
                    onBlur={formik.handleBlur("firstName")}
                  />
                  <div className="errors ms-2 my-1">
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange("lastName")}
                    onBlur={formik.handleBlur("lastName")}
                  />
                  <div className="errors ms-2 my-1">
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")}
                  />
                  <div className="errors ms-2 my-1">
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Apartment,Suite,etc..."
                    className="form-control"
                    name="other"
                    value={formik.values.other}
                    onChange={formik.handleChange("other")}
                    onBlur={formik.handleBlur("other")}
                  />
                  <div className="errors ms-2 my-1">
                    {formik.touched.other && formik.errors.other}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="City"
                    className="form-control"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange("city")}
                    onBlur={formik.handleBlur("city")}
                  />
                  <div className="errors ms-2 my-1">
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <select
                    className="form-control form-select"
                    id=""
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange("state")}
                    onBlur={formik.handleBlur("state")}
                  >
                    <option value="" selected disabled>
                      Select State
                    </option>
                    <option value="J&K">J&K</option>
                    <option value="Haryana">Haryana</option>
                  </select>
                  <div className="errors ms-2 my-1">
                    {formik.touched.state && formik.errors.state}
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Zip Code"
                    className="form-control"
                    name="zip"
                    value={formik.values.city}
                    onChange={formik.handleChange("zip")}
                    onBlur={formik.handleBlur("zip")}
                  />
                  <div className="errors ms-2 my-1">
                    {formik.touched.zip && formik.errors.zip}
                  </div>
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <IoMdArrowBack className="me-2" />
                      Return To Cart
                    </Link>
                    <Link to="/cart" className="button">
                      Continue to shipping
                    </Link>
                    <button
                      className="button"
                      type="Submit" 
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              {cartState &&
                cartState?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="d-flex gap-10 mb-2 align-items-center"
                    >
                      <div className="w-75 d-flex gap-10">
                        <div className="w-25 position-relative">
                          <span
                            style={{ top: "-10px", right: "2px" }}
                            className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                          >
                            {item?.quantity}
                          </span>
                          <img
                            className="img-fluid"
                            src={item?.productId?.images[0]?.url}
                            alt="product"
                          />
                        </div>
                        <div>
                          <h5 className="total-price">
                            {item?.productId?.title}
                          </h5>
                          <p className="total-price">
                            s / {item?.color?.title}
                          </p>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="total">
                          Rs.{item?.price * item?.quantity}
                        </h5>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">
                  Rs.{totalAmount ? totalAmount : "0"}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">Rs. 100</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">
                Rs.{totalAmount ? totalAmount + 100 : "0"}
              </h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
export default Checkout;
