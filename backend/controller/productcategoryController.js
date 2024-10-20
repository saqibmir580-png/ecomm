const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validationMongodb");
const categoryModel = require("../model/productcategoryModel");

const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await categoryModel.create(req.body);
    res.json(newCategory);
  } catch (error) {
    throw new Error(error);
  }
});
//update the category
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateCategory = await categoryModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateCategory);
  } catch (error) {
    throw new Error(error);
  }
});
//delete the product
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedCategory = await categoryModel.findByIdAndDelete(
      id,
      req.body,
      {
        new: true,
      }
    );
    res.json(deletedCategory);
  } catch (error) {
    throw new Error(error);
  }
});
//get a product
const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaCategory = await categoryModel.findById(id);
    res.json(getaCategory);
  } catch (error) {
    throw new Error(error);
  }
});
//get all categories
const getallCategory = asyncHandler(async (req, res) => {
    try {
      const getallCategory = await categoryModel.find();
      res.json(getallCategory);
    } catch (error) {
      throw new Error(error);
    }
  });
module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory
};
