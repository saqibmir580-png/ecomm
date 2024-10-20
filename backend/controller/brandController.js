const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validationMongodb");
const BrandModel = require("../model/brandModel");

const createBrand = asyncHandler(async (req, res) => {
  try {
    const newBrand = await BrandModel.create(req.body);
    res.json(newBrand);
  } catch (error) {
    throw new Error(error);
  }
});
//update the Brand
const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateBrand = await BrandModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateBrand);
  } catch (error) {
    throw new Error(error);
  }
});
//delete the product
const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedBrand = await BrandModel.findByIdAndDelete(
      id,
      req.body,
      {
        new: true,
      }
    );
    res.json(deletedBrand);
  } catch (error) {
    throw new Error(error);
  }
});
//get a product
const getBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaBrand = await BrandModel.findById(id);
    res.json(getaBrand);
  } catch (error) {
    throw new Error(error);
  }
});
//get all categories
const getallBrand = asyncHandler(async (req, res) => {
    try {
      const getallBrand = await BrandModel.find();
      res.json(getallBrand);
    } catch (error) {
      throw new Error(error);
    }
  });
module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getallBrand
};
