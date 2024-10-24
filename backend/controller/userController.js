const { generateToken } = require("../config/jwt");
const userModel = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validationMongodb");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailController");
const crypto = require("crypto");
const productModel = require("../model/productModel");
const cartModel = require("../model/cartModel");
const couponModel = require("../model/couponModel");
const orderModel = require("../model/orderModel");
const uniqid = require("uniqid");

//register the user
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await userModel.findOne({ email: email });
  if (!findUser) {
    //create a new user
    const newUser = await userModel.create(req.body);
    res.json(newUser);
  } else {
    //user is already eexis
    throw new Error("user Already exits");
  }
});
//login the user and generate a token
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check user exits are not
  const findUser = await userModel.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateUser = await userModel.findByIdAndUpdate(
      findUser.id,
      { refreshToken: refreshToken },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invlaid credentials");
  }
});
//login the admin
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check user exits are not
  const findAdmin = await userModel.findOne({ email });
  if (findAdmin.role !== "admin") throw new Error("Not Authorized");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateUser = await userModel.findByIdAndUpdate(
      findAdmin.id,
      { refreshToken: refreshToken },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invlaid credentials");
  }
});

//handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    throw new Error("No Refresh Token in Cookies");
  }
  const refreshToken = cookie.refreshToken;
  console.log(refreshToken);

  const user = await userModel.findOne({ refreshToken });
  if (!user) {
    throw new Error("No Refresh Token present in db or not matched");
  }
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });

  res.json(user);
});
//logout
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    throw new Error("No Refresh Token in Cookies");
  }
  const refreshToken = cookie.refreshToken;

  const user = await userModel.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    res.sendStatus(204);
  }
  await userModel.findOneAndUpdate(refreshToken, { refreshToken: "" });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.sendStatus(204);
});
//get all users
const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await userModel.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});
//get a single user
const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getUser = await userModel.findById(id);
    res.json({ getUser });
  } catch (error) {
    throw new Error(error);
  }
});
//delete a user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteUser = await userModel.findByIdAndDelete(id);
    res.json({ deleteUser });
  } catch (error) {
    throw new Error(error);
  }
});
//update the user
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const updateUser = await userModel.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});
//save user adddress
const saveAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const updateUser = await userModel.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    res.json(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});

//block the user
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const block = await userModel.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );
    res.json({
      message: "User Blocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});
//unblock the user
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const block = await userModel.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );
    res.json({
      message: "User unBlocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});
//update the password
const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbId(_id);
  const user = await userModel.findById(_id);
  if (password) {
    user.password = password;
    const updatePassword = await user.save();
    res.json(updatePassword);
  } else {
    res.json(user);
  }
});
//forget password
const forgetPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi,Please follow this link to restart your password.this link is valid till 10 minutes from now. <a href=http://localhost:5000/api/user/reset-password/${token}>Click Here</a>`;
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forget Password Link",
      htm: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});
//reset the your password

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const token = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await userModel.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Token Expired,Please try again later");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});
//get a wishlist
const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  try {
    const findUser = await userModel.findById(_id).populate("wishList");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});
//user cart
const userCart = asyncHandler(async (req, res) => {
  const { productId, color, quantity, price } = req.body;

  try {
    let newCart = await new cartModel({
      productId,
      color,
      price,
      quantity,
    }).save();
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});
//user cart
const getUserCart = asyncHandler(async (req, res) => {
  try {
    const cart = await cartModel.find().populate("productId").populate("color");
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});
//remove
const removeProductFromCart = asyncHandler(async (req, res) => {
  const { cartItemId } = req.body;
  try {
    const delteProductFromCart = await cartModel.deleteOne({ id: cartItemId });
    res.json(delteProductFromCart);
  } catch (error) {
    throw new Error(error);
  }
});
//update cart
const updateProductQunatityFromCart = asyncHandler(async (req, res) => {
  const { cartItemId, newQuantity } = req.params;
  try {
    const CartItem = await cartModel.findOne({ id: cartItemId });
    CartItem.quantity = newQuantity;
    CartItem.save();
    res.json(CartItem);
  } catch (error) {
    throw new Error(error);
  }
});
const createOrder = asyncHandler(async (req, res) => {
 
  const {
    shippingInfo,
    orderItems,
    totalPrice,
    totalPriceDiscount,
    paymentInfo,
    user
  } = req.body;
  c
  try {
    const order = await orderModel.create({
      shippingInfo,
      orderItems,
      totalPrice,
      totalPriceDiscount,
      paymentInfo,
      user:user._id
      
    });
    res.json({
      order,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
// //empty cartt are delete the items in the cart
// const emptyCart = asyncHandler(async (req, res) => {
//   const { _id } = req.user;
//   validateMongoDbId(_id);
//   try {
//     const user = await userModel.findOne({ _id });
//     const cart = await cartModel.findOneAndDelete({ orderby: user._id });
//     res.json(cart);
//   } catch (error) {
//     throw new Error(error);
//   }
// });
// //order
// const applyCoupon = asyncHandler(async (req, res) => {
//   const { coupon } = req.body;
//   const { _id } = req.user;
//   validateMongoDbId(_id);
//   const validateCoupon = await couponModel.findOne({ name: coupon });
//   if (validateCoupon === null) {
//     throw new Error("Invalid Coupon");
//   }
//   const user = await userModel.findOne({ _id });
//   let { products, cartTotal } = await cartModel
//     .findOne({ orderby: user._id })
//     .populate("products.product");
//   let totalAfterDiscount = (
//     cartTotal -
//     (cartTotal * validateCoupon.discount) / 100
//   ).toFixed(2);
//   await cartModel.findOneAndUpdate(
//     { orderby: user._id },
//     { totalAfterDiscount },
//     { new: true }
//   );
//   res.json(totalAfterDiscount);
// });
// //oreder
// const createOrder = asyncHandler(async (req, res) => {
//   //COD=>cash on develivery
//   const { COD, couponApplied } = req.body;
//   const { _id } = req.user;
//   validateMongoDbId(_id);
//   try {
//     if (!COD) throw new Error("Create cash order failed");
//     const user = await userModel.findById(_id);
//     let userCart = await cartModel.findOne({ orderby: user._id });
//     let finalAmount = 0;
//     if (couponApplied && userCart.totalAfterDiscount) {
//       finalAmount = userCart.totalAfterDiscount;
//     } else {
//       finalAmount = userCart.cartTotal;
//     }
//     let newOrder = await new orderModel({
//       products: userCart.products,
//       paymentIntent: {
//         id: uniqid(),
//         method: "COD",
//         amount: finalAmount,
//         status: "Cash on Delivery",
//         created: Date.now(),
//         currency: "usd",
//       },
//       orderby: user._id,
//       orderStatus: "Cash on Delivery",
//     }).save();
//     let update = userCart.products.map((items) => {
//       return {
//         updateOne: {
//           filter: { _id: items.product._id },
//           update: { $inc: { quantity: -items.count, sold: +items.count } },
//         },
//       };
//     });
//     const updated = await productModel.bulkWrite(update, {});
//     res.json({
//       message: "success",
//     });
//   } catch (error) {
//     throw new Error(error);
//   }
// });
// //list the order
// const getOrders = asyncHandler(async (req, res) => {
//   const { _id } = req.user;
//   validateMongoDbId(_id);
//   try {
//     const userOrders = await orderModel
//       .findOne({ orderby: _id })
//       .populate("products.product")
//       .populate("orderby")
//       .exec();
//     res.json(userOrders);
//   } catch (error) {
//     throw new Error(error);
//   }
// });
// const getAllOrders = asyncHandler(async (req, res) => {
//   try {
//     const alluserOrders = await orderModel
//       .find()
//       .populate("products.product")
//       .populate("orderby")
//       .exec();
//     res.json(alluserOrders);
//   } catch (error) {
//     throw new Error(error);
//   }
// });
// //update the order status only admin can a upadate the admin status
// const updateOrderStatus = asyncHandler(async (req, res) => {
//   const { status } = req.body;
//   const { id } = req.params;
//   validateMongoDbId(id);
//   try {
//     const updateOrder = await orderModel.findByIdAndUpdate(
//       id,
//       {
//         orderStatus: status,
//         paymentIntent: {
//           status: status,
//         },
//       },
//       { new: true }
//     );
//     res.json(updateOrder);
//   } catch (error) {
//     throw new Error(error);
//   }
// });
module.exports = {
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
  createOrder,
  removeProductFromCart,
  updateProductQunatityFromCart,
};
