import React from "react";
import AdminNavbar from "../Components/Admin/AdminNavbar";
import AdminSidebar from "../Components/Admin/AdminSidebar";

const Admin: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <AdminSidebar />
      <div className="ml-64 p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome to the admin panel. Use the sidebar to navigate.</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;