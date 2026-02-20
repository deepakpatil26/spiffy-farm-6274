import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsBag, BsPerson } from "react-icons/bs";
import { AiOutlineHeart, AiOutlineMenu, AiOutlineDown, AiOutlineUser, AiOutlineShopping, AiOutlineSetting, AiOutlineLogout } from "react-icons/ai";
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

  const getSubcategories = (categoryName: string) => {
    const sub: { [key: string]: string[] } = {
      'Clothes': ['T-Shirts', 'Jeans', 'Jackets', 'New Collection'],
      'Electronics': ['Gadgets', 'Laptops', 'Headphones', 'Smart Home'],
      'Furniture': ['Living Room', 'Office', 'Decor', 'Kitchen'],
      'Shoes': ['Sneakers', 'Formal', 'Casual', 'Sport'],
      'Miscellaneous': ['Accessories', 'Gifts', 'Lifestyle']
    };
    return sub[categoryName] || ['New Arrivals', 'Trending'];
  };

  return (
    <div className="sticky top-0 z-[100] w-full">
      {/* Top Professional Banner - Single One */}
      <div className="bg-primary-600 text-white text-[10px] md:text-xs py-2 text-center font-bold tracking-[0.15em] uppercase shadow-sm">
        FREE EXPRESS DELIVERY ON ALL ORDERS ABOVE ₹999 | SHOP NOW 🛍️
      </div>

      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20 gap-4">

            {/* Left: Mobile Menu & Logo */}
            <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
              <button
                className="lg:hidden p-2 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setShowMobileMenu(true)}
              >
                <AiOutlineMenu className="w-6 h-6 text-gray-700" />
              </button>
              <Link to="/" className="flex-shrink-0">
                <img src={Logo} alt="logo" className="h-8 md:h-10 lg:h-12 w-auto object-contain" />
              </Link>
            </div>

            {/* Middle: Desktop Categories */}
            <div className="hidden lg:flex items-center space-x-1 h-full">
              {categories.slice(0, 5).map((category) => (
                <div
                  key={category.id}
                  className="relative h-20 flex items-center group"
                  onMouseEnter={() => setActiveDropdown(category.slug)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={`/category/${category.slug}`}
                    className="px-3 xl:px-4 text-xs xl:text-sm font-bold text-gray-700 hover:text-primary-600 uppercase tracking-widest transition-colors h-full flex items-center"
                  >
                    <span>{category.name}</span>
                    <AiOutlineDown className="ml-1.5 w-3 h-3 group-hover:rotate-180 transition-transform duration-300" />
                  </Link>

                  {activeDropdown === category.slug && (
                    <div className="absolute top-full left-0 w-56 bg-white shadow-2xl border border-gray-100 rounded-b-xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
                      <div className="p-3 space-y-1">
                        {getSubcategories(category.name).map((sub, idx) => (
                          <Link
                            key={idx}
                            to={`/category/${category.slug}`}
                            className="block px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Middle: Search Bar (Desktop) */}
            <div className="hidden lg:block flex-1 max-w-md">
              <SearchBar />
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1 md:gap-4">
              {/* User Menu */}
              <div className="relative">
                <button
                  className="p-2 hover:bg-gray-50 rounded-full transition-colors group"
                  onMouseEnter={() => setShowUserMenu(true)}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <BsPerson className="w-5 h-5 text-gray-700 group-hover:text-primary-600" />
                </button>

                {showUserMenu && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 z-[110] animate-in fade-in slide-in-from-top-1"
                    onMouseLeave={() => setShowUserMenu(false)}
                  >
                    <div className="p-4 border-b border-gray-50">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Account</p>
                      <p className="text-sm font-bold text-gray-900 truncate">{isAuth ? afterLoginUser.name : "Guest"}</p>
                    </div>
                    <div className="p-2">
                      {isAdmin && (
                        <Link to="/admin" className="flex items-center space-x-3 px-3 py-2 text-sm font-bold text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors mb-1">
                          <AiOutlineSetting className="w-4 h-4" />
                          <span>Admin Panel</span>
                        </Link>
                      )}
                      <Link to="/account" className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <AiOutlineUser className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                      <Link to="/order-history" className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <AiOutlineShopping className="w-4 h-4" />
                        <span>Orders</span>
                      </Link>
                      <Link to="/wishlist" className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <AiOutlineHeart className="w-4 h-4" />
                        <span>Wishlist</span>
                      </Link>
                      {isAuth ? (
                        <button onClick={handleLogout} className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-bold mt-2">
                          <AiOutlineLogout className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      ) : (
                        <Link to="/login" className="block w-full mt-2 px-3 py-2 bg-primary-600 text-white text-center text-sm font-bold rounded-lg hover:bg-primary-700 transition-colors">
                          Login
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <Link to="/wishlist" className="p-2 hover:bg-gray-50 rounded-full transition-colors group hidden sm:flex items-center justify-center relative">
                <AiOutlineHeart className="w-5 h-5 text-gray-700 group-hover:text-red-500" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[8px] font-bold rounded-full h-3.5 w-3.5 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="p-2 hover:bg-gray-50 rounded-full transition-colors group flex items-center justify-center relative">
                <BsBag className="w-5 h-5 text-gray-700 group-hover:text-primary-600" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-primary-600 text-white text-[8px] font-bold rounded-full h-3.5 w-3.5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Search - Only on screens smaller than LG */}
          <div className="lg:hidden pb-4">
            <SearchBar />
          </div>
        </div>
      </nav>

      {/* Sidebar (Mobile Menu) */}
      <SideBar isOpen={showMobileMenu} onClose={() => setShowMobileMenu(false)} />
    </div>
  );
};

export default NewNavbar;