
import React from "react";
import Custominput from "../components/Custominput";

const Resetpassword = () => {
  return (
    <div style={{ background: "#ffd333", minHeight: "100vh" }} className="py-5">
      <br></br>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Reset Password</h3>
        <p className="text-center">Please Enter Your new password.</p>
        <form action="">
         
          <Custominput type="password" label="New Password" id="pass" />
          <Custominput type="password" label="Confirm Password" id="confirmpass" />
          <button
            style={{ background: "#ffd333" }}
            className="border-0 px-3 py-2 text-white fw-bold w-100"
          >
           Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Resetpassword;

