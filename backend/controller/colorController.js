const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validationMongodb");
const ColorModel = require("../model/colorModel");

const createColor = asyncHandler(async (req, res) => {
  try {
    const newColor = await ColorModel.create(req.body);
    res.json(newColor);
  } catch (error) {
    throw new Error(error);
  }
});
//update the Color
const updateColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateColor = await ColorModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateColor);
  } catch (error) {
    throw new Error(error);
  }
});
//delete the product
const deleteColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedColor = await ColorModel.findByIdAndDelete(
      id,
      req.body,
      {
        new: true,
      }
    );
    res.json(deletedColor);
  } catch (error) {
    throw new Error(error);
  }
});
//get a product
const getColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaColor = await ColorModel.findById(id);
    res.json(getaColor);
  } catch (error) {
    throw new Error(error);
  }
});
//get all categories
const getallColor = asyncHandler(async (req, res) => {
    try {
      const getallColor = await ColorModel.find();
      res.json(getallColor);
    } catch (error) {
      throw new Error(error);
    }
  });
module.exports = {
  createColor,
  updateColor,
  deleteColor,
  getColor,
  getallColor
};
