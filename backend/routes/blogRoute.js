const express = require("express");
const { authmiddleware, isAdmin } = require("../middleware/authmiddlware");
const {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  likeBlog,
  disliketheBlog,
  uploadImages
} = require("../controller/blogController");
const { uploadPhoto, blogImagResize } = require("../middleware/uploadimages");
const router = express.Router();
router.post("/", authmiddleware, isAdmin, createBlog);
router.put('/upload/:id',authmiddleware,isAdmin,uploadPhoto.array("images",2),blogImagResize,uploadImages)
router.put("/likes", authmiddleware, likeBlog);
router.put("/dislikes", authmiddleware,disliketheBlog);
router.put("/:id", authmiddleware, isAdmin, updateBlog);
router.get("/:id", getBlog);
router.get("/", getAllBlogs);
router.delete("/:id", authmiddleware, isAdmin, deleteBlog);
router.put("/likes", authmiddleware, likeBlog);

module.exports = router;
