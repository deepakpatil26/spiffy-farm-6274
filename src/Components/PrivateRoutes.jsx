import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useToast, Spinner, Center } from "@chakra-ui/react";

const PrivateRoutes = ({ children }) => {
  const { isAuth, isLoading, isAdmin } = useSelector((state) => state.AuthReducer);
  const toast = useToast();
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
      <Center h="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  // Check for authentication
  if (!isAuth) {
    toast({
      title: "Authentication Required",
      description: "Please login to access this page",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Additional check for admin routes
  if (isAdminRoute && !isAdmin) {
    toast({
      title: "Access Denied",
      description: "You need admin privileges to access this page",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoutes;
