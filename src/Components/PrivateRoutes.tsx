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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-red-500 text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this admin area. Please contact an administrator if you believe this is an error.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateRoutes;