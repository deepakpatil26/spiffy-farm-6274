import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsBag, BsPerson } from "react-icons/bs";
import { AiOutlineHeart, AiOutlineMenu, AiOutlineDown } from "react-icons/ai";
import Logo from "../../Asssets/logo2.png";
import SearchBar from "./SearchBar";
import SideBar from "./Sidebar";
import { RootState } from "../../types";
import { signOut } from "../../redux/authReducer/action";
import { loadCart } from "../../redux/cartReducer/action";
import { loadWishlist } from "../../redux/wishlistReducer/action";
import { useAppDispatch } from "../../redux/hooks";
import { toast } from 'react-toastify';
import { newProductService } from "../../services/newProductService";

const NewNavbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  
  const { isAuth, afterLoginUser, isAdmin, user } = useSelector((state: RootState) => state.AuthReducer);
  const { cartItems = [] } = useSelector((state: RootState) => state.cartReducer);
  const { items: wishlistItems = [] } = useSelector((state: RootState) => state.wishlistReducer);

  useEffect(() => {
    if (isAuth && user) {
      dispatch(loadCart(user.id) as any);
      dispatch(loadWishlist(user.id) as any);
    }
    loadCategories();
  }, [dispatch, isAuth, user]);

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
    setShowUserMenu(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleMouseEnter = (menu: string) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const getCategoryProducts = (categoryName: string) => {
    // Define some sample subcategories for each main category
    const subcategories: { [key: string]: string[] } = {
      'Clothes': ['T-Shirts', 'Hoodies', 'Jeans', 'Shorts', 'Jackets', 'Sweaters'],
      'Electronics': ['Laptops', 'Headphones', 'Smartphones', 'Gaming', 'Accessories'],
      'Furniture': ['Chairs', 'Tables', 'Sofas', 'Desks', 'Storage', 'Lighting'],
      'Shoes': ['Sneakers', 'Boots', 'Sandals', 'Formal', 'Athletic', 'Casual'],
      'Miscellaneous': ['Bags', 'Accessories', 'Home & Garden', 'Sports', 'Beauty']
    };
    
    return subcategories[categoryName] || [];
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm">
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
        <div className="hidden lg:flex items-center space-x-8">
          {categories.slice(0, 5).map((category) => (
            <div 
              key={category.id}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(category.slug)}
              onMouseLeave={handleMouseLeave}
            >
              <Link 
                to={`/category/${category.slug}`} 
                className="flex items-center text-gray-700 hover:text-primary-500 font-medium py-4 transition-colors duration-200"
              >
                {category.name}
                <AiOutlineDown className="ml-1 w-3 h-3" />
              </Link>
              
              {activeDropdown === category.slug && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-lg border-t-2 border-primary-500 z-50 p-4">
                  <div className="grid grid-cols-1 gap-2">
                    {getCategoryProducts(category.name).map((subcategory, index) => (
                      <Link
                        key={index}
                        to={`/category/${category.slug}?subcategory=${subcategory.toLowerCase()}`}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-primary-500 hover:bg-gray-50 rounded transition-colors"
                      >
                        {subcategory}
                      </Link>
                    ))}
                    <Link
                      to={`/category/${category.slug}`}
                      className="block px-3 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 border-t mt-2 pt-3"
                    >
                      View All {category.name}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
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
                  {isAuth && (
                    <Link 
                      to="/wishlist" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      My Wishlist
                    </Link>
                  )}
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
          <Link to="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <AiOutlineHeart className="w-5 h-5" />
            {isAuth && wishlistItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
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

export default NewNavbar;