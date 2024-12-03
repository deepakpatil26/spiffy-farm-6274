import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { Men } from "../pages/Men";
import { Women } from "../pages/Women";
import Singlecardwomen from "./Singlecard";
import Singlecardmen from "./Singlecardmen";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import Checkout from "../pages/Checkout";
import Payment from "../pages/Payment";
import { Cart } from "../pages/Cart";
import AdminProduct from "./Admin/AdminProduct";
import AdminManageProduct from "./Admin/AdminManageProduct";
import AdminEdit from "./Admin/AdminEdit";
import ManageUsers from "./Admin/ManageUsers";
import AdminLogin from "./Admin/AdminLogin";
import Admin from "../pages/Admin";
import PrivateRoutes from "./PrivateRoutes";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/men" element={<Men />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/men" element={<Men />} />
      <Route path="/women" element={<Women />} />
      <Route path="/men/:id" element={<Singlecardmen />} />
      <Route path="/women/:id" element={<Singlecardwomen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/checkout"
        element={
          <PrivateRoutes>
            <Checkout />
          </PrivateRoutes>
        }
      />
      <Route path="/payment" element={<Payment />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/products" element={<AdminProduct />}></Route>
      <Route path="/manageProduct" element={<AdminManageProduct />}></Route>
      <Route path="/editProduct/:id" element={<AdminEdit />}></Route>
      <Route path="/users" element={<ManageUsers />}></Route>
      <Route path="/adminLogin" element={<AdminLogin />}></Route>
      <Route path="/admin" element={<Admin />}></Route>
    </Routes>
  );
}

export default MainRoutes;
