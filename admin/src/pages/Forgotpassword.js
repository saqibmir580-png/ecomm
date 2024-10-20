import React from "react";
import Custominput from "../components/Custominput";

const Forgotpassword = () => {
  return (
    <div style={{ background: "#ffd333", minHeight: "100vh" }} className="py-5">
      <br></br>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Forgot Password</h3>
        <p className="text-center">Please Enter Your register email to get reset password mail</p>
        <form action="">
        <Custominput type="text"  label="Email Address" id="email" />
          <button
            style={{ background: "#ffd333" }}
            className="border-0 px-3 py-2 text-white fw-bold w-100"
          >
             Send Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgotpassword;
