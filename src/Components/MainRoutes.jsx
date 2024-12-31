/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense } from "react";
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
import { Box, Spinner } from "@chakra-ui/react";

const LoadingSpinner = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
    <Spinner size="xl" color="blue.500" />
  </Box>
);

function MainRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/men/:id" element={<Singlecardmen />} />
        <Route path="/women/:id" element={<Singlecardwomen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkout" element={<PrivateRoutes><Checkout /></PrivateRoutes>} />
        <Route path="/payment" element={<PrivateRoutes><Payment /></PrivateRoutes>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        
        {/* Protected Admin Routes */}
        <Route path="/admin" element={<PrivateRoutes><Admin /></PrivateRoutes>} />
        <Route path="/products" element={<PrivateRoutes><AdminProduct /></PrivateRoutes>} />
        <Route path="/manageProduct" element={<PrivateRoutes><AdminManageProduct /></PrivateRoutes>} />
        <Route path="/editProduct/:id" element={<PrivateRoutes><AdminEdit /></PrivateRoutes>} />
        <Route path="/users" element={<PrivateRoutes><ManageUsers /></PrivateRoutes>} />
      </Routes>
    </Suspense>
  );
}

export default MainRoutes;
