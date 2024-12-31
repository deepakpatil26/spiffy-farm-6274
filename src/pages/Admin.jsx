/* eslint-disable no-unused-vars */
import React, { ErrorBoundary } from "react";
import { Box } from "@chakra-ui/react";
import AdminNavbar from "../Components/Admin/AdminNavbar";
import AdminSidebar from "../Components/Admin/AdminSidebar";

function Admin() {
  return (
    <ErrorBoundary>
      <Box>
        <AdminNavbar />
        <AdminSidebar />
      </Box>
    </ErrorBoundary>
  );
}

export default Admin;
