import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NewNavbar from "../Components/Home/NewNavbar";
import Footer from "../Components/Home/Footer";
import { RootState } from "../types";
import { loadWishlist, removeFromWishlist } from "../redux/wishlistReducer/action";
import { addToCart } from "../redux/cartReducer/action";
import { useAppDispatch } from "../redux/hooks";
import { AiOutlineHeart, AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";

const Wishlist: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth, user } = useSelector((state: RootState) => state.AuthReducer);
  const { items: wishlistItems, isLoading } = useSelector((state: RootState) => state.wishlistReducer);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
      return;
    }
    if (user) {
      dispatch(loadWishlist(user.id) as any);
    }
  }, [isAuth, navigate, user, dispatch]);

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      await dispatch(removeFromWishlist(user.id, productId) as any);
      toast.success("Removed from wishlist");
    } catch (error: any) {
      toast.error("Failed to remove from wishlist");
    }
  };

  const handleAddToCart = async (item: any) => {
    try {
      const cartItem = {
        ...item.product,
        quantity: 1,
      };
      await dispatch(addToCart(cartItem, user.id) as any);
      toast.success("Added to cart successfully!");
    } catch (error: any) {
      toast.error("Failed to add to cart");
    }
  };

  const handleMoveToCart = async (item: any) => {
    try {
      await handleAddToCart(item);
      await handleRemoveFromWishlist(item.product_id);
      toast.success("Moved to cart successfully!");
    } catch (error: any) {
      toast.error("Failed to move to cart");
    }
  };

  if (isLoading) {
    return (
      <>
        <NewNavbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NewNavbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
            <p className="text-gray-600">Items you love</p>
          </div>

          {!isAuth ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <AiOutlineHeart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">Please Sign In</h2>
              <p className="text-gray-500 mb-6">
                Sign in to view your wishlist and save your favorite items.
              </p>
              <button
                onClick={() => navigate('/login')}
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Sign In
              </button>
            </div>
          ) : wishlistItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <AiOutlineHeart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your Wishlist is Empty</h2>
              <p className="text-gray-500 mb-6">
                Start adding items to your wishlist by clicking the heart icon on products you love.
              </p>
              <button
                onClick={() => navigate('/')}
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
                  <div className="relative">
                    <img
                      src={item.product?.image}
                      alt={item.product?.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={() => handleRemoveFromWishlist(item.product_id)}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                    >
                      <AiOutlineClose className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {item.product?.title}
                    </h3>
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-lg font-bold text-primary-600">
                        ₹{item.product?.price}
                      </span>
                      {item.product?.actualPrice && item.product.actualPrice > item.product.price && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{item.product.actualPrice}
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <button
                        onClick={() => handleMoveToCart(item)}
                        className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                      >
                        <AiOutlineShoppingCart className="w-4 h-4" />
                        <span>Move to Cart</span>
                      </button>
                      
                      <button
                        onClick={() => navigate(`/${item.product?.gender}/${item.product_id}`)}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;