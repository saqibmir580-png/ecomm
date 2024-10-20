import React from "react";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
const Checkout = () => {
  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
       
            <div className="row">
                <div className="col-7">
                    <div className="checkout-left-data">
                        <h3 className="website-name">Electrify</h3>
                        <nav
                        style={{"--bs-breadcrumb-divider": ">"}}
                        aria-label="breadcrumb"
                        >
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link className="text-dark total-price" to="/cart">Cart</Link>
                                </li>
                                &nbsp; / &nbsp;
                                <li className="breadcrumb-item total-price active" aria-current="page">
                                    Information
                                </li>
                                &nbsp; /
                                <li className="breadcrumb-item total-price active">
                                    Shipping
                                </li>
                                &nbsp; /
                                <li className="breadcrumb-item total-price active" aria-current="page">
                                    Payment
                                </li>
                            </ol>
                        </nav>
                        <h4 className="title total">
                            Contact Information
                        </h4>
                        <p className="user-details total">
                            Zeerat Rafiq (zeeratrafiq@gmail.com)
                        </p>
                        <h4 className="mb-3">Shipping Address</h4>
                        <form action="" className="d-flex gap-15 flex-wrap justify-content-between">
                            <div className="w-100">
                                <select name=" " className="form-control form-select" id="">
                                    <option value="" selected disabled>
                                        Select Country
                                    </option>
                                </select>
                            </div>
                            <div className="flex-grow-1">
                                <input type="text" placeholder="first-name" className="form-control" />
                            </div>
                            <div className="flex-grow-1">
                            <input type="text" placeholder="last-name" className="form-control" />
                            </div>
                            <div className="w-100">
                            <input type="text" placeholder="address" className="form-control" />
                            </div>
                            <div className="flex-grow-1">
                            <input type="text" placeholder="apratment,suite,etc" className="form-control" />
                            </div>
                            <div className="flex-grow-1">
                            <input type="text" placeholder="city" className="form-control" />
                            </div>
                            <div className="flex-grow-1">
                            <select name=" " className="form-control form-select" id="">
                                <option value="" selected disabled>
                                    Select State
                                </option>
                            </select>
                            </div>
                            <div>
                            <input type="text" placeholder="Zip Code" className="form-control" />
                            </div>
                            <div className="w-100">
                                <div className="d-flex justify-content-between align-items-center">
                                    <Link to="/cart" className="text-dark">
                                    <IoMdArrowBack className="me-2"/>
                                    Return To Cart</Link>
                                    <Link to="/cart" className="button">Continue to shipping</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-5">
                    <div className="border-bottom py-4">
                       <div className="d-flex gap-10 mb-2 align-items-center">
                       <div className="w-75 d-flex gap-10">
                            <div className="w-25 position-relative">
                                <span style={{top:"-10px",right:"2px"}} className="badge bg-secondary text-white rounded-circle p-2 position-absolute">
                                    1
                                    </span>
                                <img className="img-fluid" src={watch} alt="product" />
                            </div>
                            <div>
                          <h5 className="total-price">abcdef</h5>
                          <p className="total-price">s / #abcdef</p>
                        </div>
                        </div>
                        <div className="flex-grow-1">
                            <h5 className="total">Rs. 100</h5>     
                        </div>
                       </div>
                    </div>
                   <div className="border-bottom py-4">
                   <div className="d-flex justify-content-between align-items-center">
                        <p className="total">Subtotal</p>
                        <p className="total-price">Rs. 1000</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0 total">Shipping</p>
                        <p className="mb-0 total-price">Rs. 1000</p>
                    </div>
                     </div>
                    <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                        <h4 className="total">Total</h4>
                        <h5 className="total-price">Rs. 1000</h5>
                    </div>
                </div>
            </div>
        </Container>
    
    </>
  );
};
export default Checkout;
