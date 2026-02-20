import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import Logo from "../../Asssets/logo2.png";
import { useAppDispatch } from "../../redux/hooks";
import { signOut } from "../../redux/authReducer/action";
import { useSelector } from "react-redux";
import { RootState } from "../../types";
import { toast } from "react-toastify";

const AdminNavbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { afterLoginUser } = useSelector((state: RootState) => state.AuthReducer);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    dispatch(signOut());
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50 shadow-sm">
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
        <h1 className="text-xl font-bold text-gray-800 tracking-wide uppercase">Admin Panel</h1>
      </div>

      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer focus:outline-none"
        >
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-semibold text-gray-800">{afterLoginUser?.name || "Admin"}</span>
            <span className="text-xs text-gray-500">{afterLoginUser?.email || "admin@spiffy.com"}</span>
          </div>
          <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
            <BsPerson className="w-6 h-6" />
          </div>
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100 animate-in fade-in slide-in-from-top-2">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors"
            >
              <AiOutlineLogout className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNavbar;