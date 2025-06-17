import React from "react";
import { Link } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import Logo from "../../Asssets/logo2.png";

const AdminNavbar: React.FC = () => {
  return (
    <div className="bg-gray-100 border-b border-gray-200 h-16 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img
            src={Logo}
            alt="Logo"
            className="h-8 cursor-pointer hover:scale-105 transition-transform duration-200"
          />
        </Link>
      </div>

      <div className="flex items-center">
        <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <BsPerson className="w-8 h-8 text-gray-600 bg-gray-200 rounded-full p-1" />
          <span className="text-sm text-gray-700">Admin User</span>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;