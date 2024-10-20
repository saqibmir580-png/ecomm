const express = require("express");
const { authmiddleware, isAdmin } = require("../middleware/authmiddlware");
const {
  uploadImages,
  deleteImages,
} = require("../controller/uploadController");
const {
  uploadPhoto,
  productImagResize,
} = require("../middleware/uploadimages");
const router = express.Router();

router.post(
  "/",
  authmiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImagResize,
  uploadImages
);

router.delete("/delete-img/:_id", authmiddleware, isAdmin, deleteImages);

module.exports = router;
