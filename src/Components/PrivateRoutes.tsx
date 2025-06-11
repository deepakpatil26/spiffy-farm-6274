import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../types";

interface PrivateRoutesProps {
  children: React.ReactNode;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children }) => {
  const { isAuth, isLoading, isAdmin } = useSelector((state: RootState) => state.AuthReducer);
  const location = useLocation();

  // Check if it's an admin route
  const isAdminRoute = location.pathname.startsWith("/admin") ||
    location.pathname === "/products" ||
    location.pathname === "/manageProduct" ||
    location.pathname === "/users" ||
    location.pathname.startsWith("/editProduct");

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // Check for authentication
  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Additional check for admin routes
  if (isAdminRoute && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoutes;