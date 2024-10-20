const express = require("express");
const {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getallBrand,
} = require("../controller/brandController");
const { authmiddleware, isAdmin } = require("../middleware/authmiddlware");
const router = express.Router();

router.post("/", authmiddleware, isAdmin, createBrand);
router.put("/:id", authmiddleware, isAdmin, updateBrand);
router.delete("/:id", authmiddleware, isAdmin, deleteBrand);
router.get("/:id", getBrand);
router.get("/", getallBrand)
module.exports = router;
