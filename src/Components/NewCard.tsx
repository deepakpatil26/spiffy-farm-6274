import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Product, RootState } from '../types';
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { addToCart } from '../redux/cartReducer/action';
import { addToWishlist } from '../redux/wishlistReducer/action';
import { useAppDispatch } from '../redux/hooks';

interface NewCardProps {
  product: Product;
  showAddToCart?: boolean;
}

const NewCard: React.FC<NewCardProps> = ({ product, showAddToCart = true }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { user, isAuth } = useSelector((state: RootState) => state.AuthReducer);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsLoading(true);
    try {
      const cartItem = {
        ...product,
        quantity: 1,
      };

      await dispatch(addToCart(cartItem, user?.id) as any);
      toast.success('Added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuth) {
      toast.error('Please sign in to add items to wishlist');
      return;
    }

    if (!user?.id) {
      toast.error('User not found. Please sign in again.');
      return;
    }
    
    setIsAddingToWishlist(true);
    try {
      await dispatch(addToWishlist(user.id, product.id) as any);
      toast.success('Added to wishlist successfully!');
    } catch (error: any) {
      console.error('Error adding to wishlist:', error);
      if (error.message?.includes('already in wishlist')) {
        toast.info('Item is already in your wishlist');
      } else {
        toast.error('Failed to add to wishlist');
      }
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
          <img
            src={product.image}
            alt={product.title}
            className="h-64 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://placehold.co/600x400?text=No+Image';
            }}
          />
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-semibold text-gray-900">₹{product.price}</span>
            {product.actualPrice && product.actualPrice > product.price && (
              <>
                <span className="text-sm text-gray-500 line-through">₹{product.actualPrice}</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {Math.round(((product.actualPrice - product.price) / product.actualPrice) * 100)}% OFF
                </span>
              </>
            )}
          </div>
          <h3 className="text-sm text-gray-700 line-clamp-2 mb-2">{product.title}</h3>
          <p className="text-xs text-gray-500 capitalize">{product.category}</p>
        </div>
      </Link>
      
      {showAddToCart && (
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={handleAddToWishlist}
            disabled={isAddingToWishlist}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <AiOutlineHeart className="w-4 h-4 text-gray-600" />
          </button>
          <button 
            onClick={handleAddToCart}
            disabled={isLoading}
            className="p-2 bg-primary-500 text-white rounded-full shadow-md hover:bg-primary-600 transition-colors disabled:opacity-50"
          >
            <AiOutlineShoppingCart className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default NewCard;