import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsBag, BsPerson } from "react-icons/bs";
import { AiOutlineHeart, AiOutlineMenu } from "react-icons/ai";
import Logo from "../../Asssets/logo2.png";
import HomeMenu from "./HomeMenu";
import SearchBar from "./SearchBar";
import SideBar from "./Sidebar";
import { RootState } from "../../types";
import { signOut } from "../../redux/authReducer/action";
import { addToCart } from "../../redux/cartReducer/action";
import { useAppDispatch } from "../../redux/hooks";
import axios from "axios";
import { toast } from 'react-toastify';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const { isAuth, afterLoginUser, isAdmin } = useSelector((state: RootState) => state.AuthReducer);
  const { cartItems = [] } = useSelector((state: RootState) => state.cartReducer);

  useEffect(() => {
    if (isAuth) {
      axios
        .get(`https://lifestyle-mock-server-api.onrender.com/cart`)
        .then((res) => {
          dispatch(addToCart(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dispatch, isAuth]);

  const handleLogout = () => {
    dispatch(signOut());
    setShowUserMenu(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="sticky top-0 z-50 bg-gray-50 shadow-sm">
      {/* Main Navbar */}
      <div className="flex items-center justify-between px-4 md:px-12 py-3 max-w-7xl mx-auto">
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={() => setShowMobileMenu(true)}
        >
          <AiOutlineMenu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src={Logo}
            alt="logo"
            className="h-8 md:h-12 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:block flex-1 max-w-md mx-8">
          <HomeMenu />
        </div>

        {/* Search Bar */}
        <div className="hidden lg:block flex-1 max-w-md mx-8">
          <SearchBar />
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {/* User Menu */}
          <div className="relative">
            <button 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <BsPerson className="w-5 h-5" />
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
                <div className="py-1">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    Hey, {isAuth ? afterLoginUser.name : "User"}
                    {isAdmin && (
                      <span className="block text-xs text-primary-600 font-medium">Admin</span>
                    )}
                  </div>
                  <Link 
                    to="/account" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    My Account
                  </Link>
                  <Link 
                    to="/order-history" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Order History
                  </Link>
                  {isAdmin && (
                    <Link 
                      to="/admin" 
                      className="block px-4 py-2 text-sm text-primary-600 hover:bg-primary-50 font-medium"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  {!isAuth && (
                    <Link 
                      to="/adminLogin" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Admin Login
                    </Link>
                  )}
                  {isAuth ? (
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  ) : (
                    <Link
                      to="/signup"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Sign Up
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Wishlist */}
          <Link to="#" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <AiOutlineHeart className="w-5 h-5" />
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <BsBag className="w-5 h-5" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="lg:hidden px-4 pb-3">
        <SearchBar />
      </div>

      {/* Mobile Sidebar */}
      {showMobileMenu && (
        <SideBar 
          isOpen={showMobileMenu} 
          onClose={() => setShowMobileMenu(false)} 
        />
      )}
    </div>
  );
};

export default Navbar;