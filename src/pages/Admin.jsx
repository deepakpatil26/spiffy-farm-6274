/* eslint-disable no-unused-vars */
import React from "react";
import { Box } from "@chakra-ui/react";
import AdminNavbar from "../Components/Admin/AdminNavbar";
import AdminSidebar from "../Components/Admin/AdminSidebar";

function Admin() {
  return (
    <div>
      <AdminNavbar />
      <AdminSidebar />
    </div>
  );
}

export default Admin;
