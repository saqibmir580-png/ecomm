import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/Enquiries";
import Bloglist from "./pages/Bloglist";
import Blogcategorylist from "./pages/Blogcategorylist";
import Order from "./pages/Order";
import Customers from "./pages/Customers";
import Colorlist from "./pages/Colorlist";
import Categorylist from "./pages/Categorylist";
import Brandlist from "./pages/Brandlist";
import Productlist from "./pages/Productlist";
import Addblog from "./pages/Addblog";
import Addblogcategory from "./pages/Addblogcategory";
import Addcolor from "./pages/Addcolor";
import Addcategory from "./pages/Addcategory";
import Addbrand from "./pages/Addbrand";
import Addproduct from "./pages/Addproduct";
import Couponlist from "./pages/Couponlist";
import AddCoupon from "./pages/AddCoupon";
import ViewOrder from "./pages/ViewOrder";
import ViewEnq from "./pages/ViewEnq";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/admin" element={<MainLayout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path="customers" element={<Customers/>}/>
        <Route path="enquiries" element={<Enquiries/>}/>
        <Route path="enquiries/:id" element={<ViewEnq/>}/>
        <Route path="blog-list" element={<Bloglist/>}/>
        <Route path="blog" element={<Addblog/>}/>
        <Route path="blog/:id" element={<Addblog/>}/>
        <Route path="coupon-list" element={<Couponlist/>}/>
        <Route path="coupon" element={<AddCoupon/>}/>
        <Route path="coupon/:id" element={<AddCoupon/>}/>
        <Route path="blog-category-list" element={<Blogcategorylist/>}/>
        <Route path="blog-category" element={<Addblogcategory/>}/>
        <Route path="blog-category/:id" element={<Addblogcategory/>}/>
        <Route path="orders" element={<Order/>}/>
        <Route path="order/:id" element={<ViewOrder/>} />
        <Route path="list-color" element={<Colorlist/>}/>
        <Route path="color" element={<Addcolor/>}/>
        <Route path="color/:id" element={<Addcolor/>}/>
        <Route path="list-category" element={<Categorylist/>}/>
        <Route path="category" element={<Addcategory/>}/>
        <Route path="category/:id" element={<Addcategory/>}/>
        <Route path="list-brand" element={<Brandlist/>}/>
        <Route path="brand" element={<Addbrand/>}/>
        <Route path="brand/:id" element={<Addbrand/>}/>
        <Route path="Product-list" element={<Productlist/>}/>
        <Route path="product" element={<Addproduct/>}/>
      
        
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
