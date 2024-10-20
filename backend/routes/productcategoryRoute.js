const express = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory,
} = require("../controller/productcategoryController");
const { authmiddleware, isAdmin } = require("../middleware/authmiddlware");
const router = express.Router();
router.post("/", authmiddleware, isAdmin, createCategory);
router.put("/:id", authmiddleware, isAdmin, updateCategory);
router.delete("/:id", authmiddleware, isAdmin, deleteCategory);
router.get("/:id", getCategory);
router.get("/", getallCategory);
module.exports = router;
