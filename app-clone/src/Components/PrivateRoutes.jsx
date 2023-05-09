import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const PrivateRoutes = ({ children }) => {
  const { isAuth } = useSelector((state) => state.AuthReducer);
  const toast = useToast();

  if (!isAuth) {
    toast({
      title: "PLEASE LOGIN !!!!! ",
      description: "",
      status: "error",
      duration: 1000,
      isClosable: true,
      position: "top",
    });
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default PrivateRoutes;
