const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validationMongodb");
const couponModel = require("../model/couponModel");
//create a coupon
const createCoupon = asyncHandler(async (req, res) => {
  try {
    const newCoupon = await couponModel.create(req.body);
    res.json(newCoupon);
  } catch (error) {
    throw new Error(error);
  }
});
// get all the coupon
const getAllCoupon = asyncHandler(async (req, res) => {
  try {
    const coupons = await couponModel.find();
    res.json(coupons);
  } catch (error) {
    throw new Error(error);
  }
});
//update the coupon
const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatecoupon= await couponModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatecoupon);
  } catch (error) {
    throw new Error(error);
  }
});
//delete the coupon
const deleteCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const deletecoupon= await couponModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(deletecoupon);
    } catch (error) {
      throw new Error(error);
    }
  });
module.exports = { createCoupon, getAllCoupon,updateCoupon,deleteCoupon };
