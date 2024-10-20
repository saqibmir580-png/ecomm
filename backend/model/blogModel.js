const mongoose = require("mongoose"); // Erase if already required
const { defaultMaxListeners } = require("nodemailer/lib/xoauth2");

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    numViews: {
      type: Number,
      default: 0,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    isDisLiked: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    image: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fblog&psig=AOvVaw3PDlggk2tfYXigkCfqA2I0&ust=1724999555970000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMjVwq7KmYgDFQAAAAAdAAAAABAE",
    },
    author: {
      type: String,
      default: "Admin",
    },
    images:[],
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("blog", blogSchema);
