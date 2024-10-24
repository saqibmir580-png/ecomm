const express = require("express");
const {
  createUser,
  loginUser,
  getallUser,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgetPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
  removeProductFromCart,
  updateProductQunatityFromCart,
} = require("../controller/userController");
const { authmiddleware, isAdmin } = require("../middleware/authmiddlware");
const { checkout, paymentVerification } = require("../controller/paymentController");
const router = express.Router();
router.post("/register", createUser);
router.put("/password", authmiddleware, updatePassword);
router.post("/forget-password-token", forgetPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.post("/login", loginUser);
router.post("/admin-login", loginAdmin);
router.post("/cart", userCart);
router.post("/order/checkout",checkout);
router.post("/order/paymentVerification",paymentVerification);
// router.post("/cart/applycoupon", authmiddleware, applyCoupon);
router.post("/cart/create-order", createOrder);
router.get("/all-users", getallUser);
// router.get("/get-orders",authmiddleware,getOrders);
// router.get("/getallorders",authmiddleware,isAdmin,getAllOrders);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authmiddleware, getWishlist);
router.get("/cart", getUserCart);
// router.put("/order/update-order/:id",authmiddleware,isAdmin,updateOrderStatus);
router.get("/:id", authmiddleware, isAdmin, getUser);
// router.delete("/empty-cart", authmiddleware, emptyCart);
router.delete("/delete-product-cart", removeProductFromCart);
router.post("/update-product-cart/:newQuantity",updateProductQunatityFromCart);
router.delete("/:id", deleteUser);
router.put("/edit-user", authmiddleware, updateUser);
router.put("/save-address", authmiddleware, saveAddress);
router.put("/block-user/:id", authmiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authmiddleware, isAdmin, unblockUser);

module.exports = router;
