const express = require("express");
const {
  createColor,
  updateColor,
  deleteColor,
  getColor,
  getallColor,
} = require("../controller/colorController");
const { authmiddleware, isAdmin } = require("../middleware/authmiddlware");
const router = express.Router();

router.post("/", authmiddleware, isAdmin, createColor);
router.put("/:id", authmiddleware, isAdmin, updateColor);
router.delete("/:id", authmiddleware, isAdmin, deleteColor);
router.get("/:id", getColor);
router.get("/", getallColor);
module.exports = router;
