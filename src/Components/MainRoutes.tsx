import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import NewHomePage from "../pages/NewHomePage";
import CategoryPage from "../pages/CategoryPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import { Men } from "../pages/Men";
import { Women } from "../pages/Women";
import Singlecardwomen from "./Singlecard";
import Singlecardmen from "./Singlecardmen";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import Checkout from "../pages/Checkout";
import Payment from "../pages/Payment";
import { Cart } from "../pages/Cart";
import Account from "../pages/Account";
import OrderHistory from "../pages/OrderHistory";
import Wishlist from "../pages/Wishlist";
import AdminProduct from "./Admin/AdminProduct";
import AdminManageProduct from "./Admin/AdminManageProduct";
import AdminEdit from "./Admin/AdminEdit";
import ManageUsers from "./Admin/ManageUsers";
import AdminLogin from "./Admin/AdminLogin";
import Admin from "../pages/Admin";
import PrivateRoutes from "./PrivateRoutes";

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
  </div>
);

const MainRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* New Routes with API Integration */}
        <Route path="/" element={<NewHomePage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        
        {/* Legacy Routes (keeping for backward compatibility) */}
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/men/:id" element={<Singlecardmen />} />
        <Route path="/women/:id" element={<Singlecardwomen />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Routes */}
        <Route path="/checkout" element={<PrivateRoutes><Checkout /></PrivateRoutes>} />
        <Route path="/payment" element={<PrivateRoutes><Payment /></PrivateRoutes>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/account" element={<PrivateRoutes><Account /></PrivateRoutes>} />
        <Route path="/order-history" element={<PrivateRoutes><OrderHistory /></PrivateRoutes>} />
        
        {/* Admin Routes */}
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/admin" element={<PrivateRoutes><Admin /></PrivateRoutes>} />
        <Route path="/products" element={<PrivateRoutes><AdminProduct /></PrivateRoutes>} />
        <Route path="/manageProduct" element={<PrivateRoutes><AdminManageProduct /></PrivateRoutes>} />
        <Route path="/editProduct/:id" element={<PrivateRoutes><AdminEdit /></PrivateRoutes>} />
        <Route path="/users" element={<PrivateRoutes><ManageUsers /></PrivateRoutes>} />
      </Routes>
    </Suspense>
  );
};

export default MainRoutes;