import React from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "../Components/Admin/AdminNavbar";
import AdminSidebar from "../Components/Admin/AdminSidebar";
import { RootState } from "../types";

const Admin: React.FC = () => {
  const { afterLoginUser } = useSelector((state: RootState) => state.AuthReducer);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <AdminSidebar />
      <div className="ml-64 pt-16 p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">
              Welcome back, {afterLoginUser.name}! You have admin access to manage the store.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Products</h3>
              <p className="text-blue-100">Manage your product catalog</p>
              <div className="mt-4">
                <span className="text-2xl font-bold">∞</span>
                <span className="text-blue-100 ml-2">Items</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Users</h3>
              <p className="text-green-100">View and manage users</p>
              <div className="mt-4">
                <span className="text-2xl font-bold">∞</span>
                <span className="text-green-100 ml-2">Users</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Orders</h3>
              <p className="text-purple-100">Track customer orders</p>
              <div className="mt-4">
                <span className="text-2xl font-bold">∞</span>
                <span className="text-purple-100 ml-2">Orders</span>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <div className="text-green-400 mr-3">✅</div>
              <div>
                <h3 className="text-green-800 font-medium">Admin Access Confirmed</h3>
                <p className="text-green-700">
                  You are logged in as an administrator with full access to all admin features.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="/manageProduct"
                className="block p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-medium text-gray-900">Add New Product</h3>
                <p className="text-gray-600 text-sm">Add products to your catalog</p>
              </a>
              <a
                href="/products"
                className="block p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-medium text-gray-900">Manage Products</h3>
                <p className="text-gray-600 text-sm">Edit or remove existing products</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;