import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import Logo from "../../Asssets/logo2.png";
import LogoImage from "../../Asssets/LogoI.png";
import { logout } from "../../redux/authReducer/action";
import { RootState } from "../../types";
import { toast } from 'react-toastify';

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, onClose }) => {
  const { isAuth } = useSelector((state: RootState) => state.AuthReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    onClose();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleLinkClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <img src={LogoImage} alt="logo" className="h-8" />
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <AiOutlineClose className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Logo */}
        <div className="p-4 text-center">
          <img
            src={Logo}
            alt="logo"
            className="h-12 mx-auto"
          />
        </div>

        {/* Navigation Links */}
        <div className="px-4 py-2 space-y-4">
          <Link 
            to="/" 
            onClick={handleLinkClick}
            className="block text-center text-lg font-medium py-3 hover:text-primary-500 hover:bg-gray-50 rounded-lg transition-all duration-200"
          >
            Home
          </Link>
          <Link 
            to="/women" 
            onClick={handleLinkClick}
            className="block text-center text-lg font-medium py-3 hover:text-primary-500 hover:bg-gray-50 rounded-lg transition-all duration-200"
          >
            Women
          </Link>
          <Link 
            to="/men" 
            onClick={handleLinkClick}
            className="block text-center text-lg font-medium py-3 hover:text-primary-500 hover:bg-gray-50 rounded-lg transition-all duration-200"
          >
            Men
          </Link>
          <Link 
            to="#" 
            onClick={handleLinkClick}
            className="block text-center text-lg font-medium py-3 hover:text-primary-500 hover:bg-gray-50 rounded-lg transition-all duration-200"
          >
            Kids
          </Link>
          <Link 
            to="/cart" 
            onClick={handleLinkClick}
            className="block text-center text-lg font-medium py-3 hover:text-primary-500 hover:bg-gray-50 rounded-lg transition-all duration-200"
          >
            Your Cart
          </Link>
          <Link 
            to="#" 
            onClick={handleLinkClick}
            className="block text-center text-lg font-medium py-3 hover:text-primary-500 hover:bg-gray-50 rounded-lg transition-all duration-200"
          >
            Profile
          </Link>
        </div>

        {/* Auth Button */}
        <div className="px-4 py-6">
          <div className="flex justify-center">
            {isAuth ? (
              <button
                onClick={handleLogout}
                className="px-8 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-200"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={handleLinkClick}
                className="px-8 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;