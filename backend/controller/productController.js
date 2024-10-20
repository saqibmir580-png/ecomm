const asyncHandler = require("express-async-handler");
const productModel = require("../model/productModel");
const slugify = require("slugify");
const { json } = require("body-parser");
const userModel = require("../model/userModel");
const validateMongoDbId = require("../utils/validationMongodb");


const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await productModel.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});
//update a product
const updateProduct = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateProduct = await productModel.findOneAndUpdate(
      { _id },
      req.body,
      { new: true }
    );
    res.json(updateProduct);
  } catch (error) {
    throw new Error(error);
  }
});
//delete the products
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const deleteProduct = await productModel.findOneAndDelete(
      { id },
      req.body,
      { new: true }
    );
    res.json(deleteProduct);
  } catch (error) {
    throw new Error(error);
  }
});
//get a product
const getaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const findProduct = await productModel.findById(id).populate("color")
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});
//get all products
const getAllProduct = asyncHandler(async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludesFields = ["page", "sort", "limit", "fields"];
    excludesFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    let query = productModel.find(JSON.parse(queryStr));
    //sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }
    //limiting the fields
    if (req.query.fields) {
      const sortBy = req.query.fields.split(",").join(" ");
      query = query.select(sortBy);
    } else {
      query = query.select("-__v");
    }
    //pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    console.log(page, limit, skip);
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await productModel.countDocuments();
      if (skip >= productCount) throw new Error("This page does not exits");
    }

    const product = await query;
    res.json(product);

    const getAllProduct = await productModel
      .where("category")
      .equals(req.query.category);
    res.json(getAllProduct);
  } catch (error) {
    throw new Error(error);
  }
});
const addTowishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { proId } = req.body;
  try {
    const user = await userModel.findById(_id);
    const alreadyadded = user.wishList.find((id) => id.toString() === proId);
    if (alreadyadded) {
      let user = await userModel.findByIdAndUpdate(
        _id,
        {
          $pull: { wishList: proId },
        },
        { new: true }
      );
      res.json(user);
    } else {
      let user = await userModel.findByIdAndUpdate(
        _id,
        {
          $push: { wishList: proId },
        },
        { new: true }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});
const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, proId, comment } = req.body;
  try {
    const product = await productModel.findById(proId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRating = await productModel.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        { new: true }
      );
      // res.json(updateRating);
    } else {
      const rateProduct = await productModel.findByIdAndUpdate(
        proId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: _id,
            },
          },
        },
        { new: true }
      );
      //res.json(rateProduct);
    }
    //get total ratings
    const getallratings = await productModel.findById(proId);
    let totlaRating = getallratings.ratings.length;
    let ratingsum = getallratings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingsum / totlaRating);
    let finalproduct = await productModel.findByIdAndUpdate(
      proId,
      { totalrating: actualRating },
      { new: true }
    );
    res.json(finalproduct);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addTowishlist,
  rating,
 
};
