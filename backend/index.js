const express = require("express");
const app = express();
const dotenv = require("dotenv");
const DBconn = require("./config/conn");
const authRouter = require("./routes/authRoute");
const productRouter=require('./routes/productRoute')
const blogRouter=require('./routes/blogRoute')
const categoryRouter=require('./routes/productcategoryRoute')
const blogcategoryRouter=require('./routes/blogcategoryRoute')
const brandRouter=require('./routes/brandRoute')
const coloRouter=require('./routes/colorRoute')
const enquiryRouter=require('./routes/enqRoute')
const uploadRouter=require('./routes/uploadRoute')
const couponRouter=require('./routes/couponRoute')
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const cookieParser=require('cookie-parser')
const morgan=require('morgan')
const cors=require('cors')

dotenv.config();
const PORT = process.env.PORT || 4000;
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())
app.use(morgan())
//routes
app.use("/api/user", authRouter);
app.use("/api/product",productRouter)
app.use("/api/blog",blogRouter)
app.use("/api/category",categoryRouter)
app.use("/api/blogcategory",blogcategoryRouter)
app.use("/api/brand",brandRouter)
app.use("/api/coupon",couponRouter)
app.use("/api/color",coloRouter)
app.use("/api/enquiry",enquiryRouter)
app.use("/api/upload",uploadRouter)
//middleware
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running at Port ${PORT}`);
  DBconn();
});
