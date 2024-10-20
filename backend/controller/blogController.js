const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validationMongodb");
const blogModel = require("../model/blogModel");
const { get } = require("mongoose");
const fs = require("fs");
const { cloudinaryUploadingImg } = require("../utils/cloudinary");
//create a blog blog can only create by the admin
const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await blogModel.create(req.body);
    res.json(newBlog);
  } catch (error) {
    throw new Error(Error);
  }
});
// update the blog
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateBlog = await blogModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateBlog);
  } catch (error) {
    throw new Error(Error);
  }
});
//getting the blog and view the blog
const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getBlog = await blogModel
      .findById(id)
      .populate("likes")
      .populate("dislikes");
    const updateViews = await blogModel.findByIdAndUpdate(
      id,
      { $inc: { numViews: 1 } },
      { new: true }
    );
    res.json(getBlog);
  } catch (error) {
    throw new Error(Error);
  }
});
//get all blogs
const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const getAllBlogs = await blogModel.find();
    res.json(getAllBlogs);
  } catch (error) {
    throw new Error(Error);
  }
});
//delete the blog
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedBlog = await blogModel.findByIdAndUpdate(id);
    res.json(deletedBlog);
  } catch (error) {
    throw new Error(Error);
  }
});
//likes the blog
const likeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);
  //find the blog which u want to like
  const blog = await blogModel.findById(blogId);
  // find the login user
  const loginUserId = req?.user._id;
  //find the user has liked the post
  const isLiked = blog?.isLiked;
  //find if the user  disliked thwe post
  const alreadyDisliked = blog?.dislikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (alreadyDisliked) {
    const blog = await blogModel.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  }
  if (isLiked) {
    const blog = await blogModel.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await blogModel.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});
//dislikes the blog
const disliketheBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);
  //find the blog which u want to like
  const blog = await blogModel.findById(blogId);
  // find the login user
  const loginUserId = req?.user._id;
  //find the user has liked the post
  const isDisLiked = blog?.isDisLiked;
  //find if the user  disliked thwe post
  const alreadyliked = blog?.likes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (alreadyliked) {
    const blog = await blogModel.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  }
  if (isDisLiked) {
    const blog = await blogModel.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await blogModel.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisLiked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});
//upload the blog
const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const uploader = (path) => cloudinaryUploadingImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const findBlog = await blogModel.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      { new: true }
    );
    res.json(findBlog);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  likeBlog,
  disliketheBlog,
  uploadImages,
};
