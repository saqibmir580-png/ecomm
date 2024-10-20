const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validationMongodb");
const EnquiryModel = require("../model/enqModel");

const createEnquiry = asyncHandler(async (req, res) => {
  try {
    const newEnquiry = await EnquiryModel.create(req.body);
    res.json(newEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});
//update the Enquiry
const updateEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateEnquiry = await EnquiryModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});
//delete the product
const deleteEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedEnquiry = await EnquiryModel.findByIdAndDelete(id, req.body, {
      new: true,
    });
    res.json(deletedEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});
//get a product
const getEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaEnquiry = await EnquiryModel.findById(id);
    res.json(getaEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});
//get all categories
const getallEnquiry = asyncHandler(async (req, res) => {
  try {
    const getallEnquiry = await EnquiryModel.find();
    res.json(getallEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiry,
  getallEnquiry,
};
