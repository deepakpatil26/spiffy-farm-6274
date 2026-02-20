import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineClose, AiOutlineHome, AiOutlineShoppingCart, AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import Logo from "../../Asssets/logo2.png";
import LogoImage from "../../Asssets/LogoI.png";
import { signOut } from "../../redux/authReducer/action";
import { RootState } from "../../types";
import { toast } from 'react-toastify';
import { useAppDispatch } from "../../redux/hooks";
import { newProductService } from "../../services/newProductService";

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, onClose }) => {
  const { isAuth, user } = useSelector((state: RootState) => state.AuthReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const categoriesData = await newProductService.getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleLogout = () => {
    dispatch(signOut());
    onClose();
    toast.success('Logged out successfully');
    navigate('/');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] lg:hidden">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-[280px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <img src={LogoImage} alt="logo" className="h-6" />
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <AiOutlineClose className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Logo Section */}
          <div className="p-6 text-center border-b bg-gray-50/50">
            <img src={Logo} alt="logo" className="h-10 mx-auto mb-2" />
            <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">Premium Store</p>
          </div>

          <nav className="p-4 space-y-1">
            <Link
              to="/"
              onClick={onClose}
              className="flex items-center space-x-3 text-gray-700 font-semibold p-3 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-all"
            >
              <AiOutlineHome className="w-5 h-5" />
              <span>HOME</span>
            </Link>

            <div className="pt-4 pb-2 px-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
              Categories
            </div>

            <div className="space-y-1">
              {categories.slice(0, 5).map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  onClick={onClose}
                  className="flex items-center space-x-3 text-gray-700 font-medium p-3 hover:bg-gray-50 hover:text-primary-600 rounded-xl transition-all"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-primary-500" />
                  <span className="capitalize">{category.name}</span>
                </Link>
              ))}
            </div>

            <div className="pt-4 pb-2 px-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
              Account
            </div>

            <Link
              to="/cart"
              onClick={onClose}
              className="flex items-center space-x-3 text-gray-700 font-medium p-3 hover:bg-gray-50 rounded-xl transition-all"
            >
              <AiOutlineShoppingCart className="w-5 h-5" />
              <span>My Cart</span>
            </Link>

            {isAuth ? (
              <>
                <Link
                  to="/wishlist"
                  onClick={onClose}
                  className="flex items-center space-x-3 text-gray-700 font-medium p-3 hover:bg-gray-50 rounded-xl transition-all"
                >
                  <AiOutlineHeart className="w-5 h-5" />
                  <span>My Wishlist</span>
                </Link>
                <Link
                  to="/account"
                  onClick={onClose}
                  className="flex items-center space-x-3 text-gray-700 font-medium p-3 hover:bg-gray-50 rounded-xl transition-all"
                >
                  <AiOutlineUser className="w-5 h-5" />
                  <span>My Profile</span>
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                onClick={onClose}
                className="flex items-center space-x-3 text-gray-700 font-medium p-3 hover:bg-gray-50 rounded-xl transition-all"
              >
                <AiOutlineUser className="w-5 h-5" />
                <span>Login / Sign Up</span>
              </Link>
            )}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          {isAuth ? (
            <button
              onClick={handleLogout}
              className="w-full py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/login"
              onClick={onClose}
              className="block w-full py-3 bg-primary-500 text-white text-center font-bold rounded-xl hover:bg-primary-600 transition-colors shadow-lg shadow-primary-200"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;