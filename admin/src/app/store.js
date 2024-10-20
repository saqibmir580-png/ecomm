import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import productCategoryReducer from "../features/productcategory/productcategorySlice";
import blogReducer from '../features/blogs/blogSlice'
import blogcategoryReducer from '../features/blogcategory/bcategorySlice'
import colorReducer from '../features/color/colorSlice'
import enquiryReducer from '../features/enquiry/enquirySlice'
import uploadReducer from '../features/upload/uploadSlice'
import couponReducer from "../features/coupon/couponSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand:brandReducer,
    productCategory:productCategoryReducer,
    blogcategory:blogcategoryReducer,
    blogs:blogReducer,
    color:colorReducer,
    enquiry:enquiryReducer,
    upload:uploadReducer,
    coupon: couponReducer,
  },
});
