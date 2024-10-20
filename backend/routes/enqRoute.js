const express = require("express");
const {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiry,
  getallEnquiry,
} = require("../controller/enqController");
const { authmiddleware, isAdmin } = require("../middleware/authmiddlware");
const router = express.Router();

router.post("/", authmiddleware, isAdmin, createEnquiry);
router.put("/:id", authmiddleware, isAdmin, updateEnquiry);
router.delete("/:id", authmiddleware, isAdmin, deleteEnquiry);
router.get("/:id", getEnquiry);
router.get("/", getallEnquiry);
module.exports = router;
