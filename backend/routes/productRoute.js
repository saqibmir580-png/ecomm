const express = require("express");
const { authmiddleware, isAdmin } = require("../middleware/authmiddlware");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addTowishlist,
  rating,
} = require("../controller/productController");

const router = express.Router();
//products routes
router.post("/", authmiddleware, isAdmin, createProduct);
router.get("/:id", getaProduct);
router.put("/wishlist", addTowishlist);
router.put("/rating", authmiddleware, rating);
router.put("/:_id", authmiddleware, isAdmin, updateProduct);
router.delete("/:_id", authmiddleware, isAdmin, deleteProduct);
router.get("/", getAllProduct);

module.exports = router;
