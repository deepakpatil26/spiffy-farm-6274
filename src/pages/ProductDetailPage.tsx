import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AiOutlineHeart, AiOutlineShoppingCart, AiOutlineArrowLeft } from 'react-icons/ai';
import NewNavbar from '../Components/Home/NewNavbar';
import Footer from '../Components/Home/Footer';
import { newProductService } from '../services/newProductService';
import { Product, RootState, CartItem } from '../types';
import { useAppDispatch } from '../redux/hooks';
import { addToCart } from '../redux/cartReducer/action';
import { addToWishlist } from '../redux/wishlistReducer/action';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { user, isAuth } = useSelector((state: RootState) => state.AuthReducer);

  // Load product when component mounts or id changes
  useEffect(() => {
    const loadProduct = async (productId: string) => {
      try {
        setIsLoading(true);
        const productData = await newProductService.getProduct(productId);
        setProduct(productData);
      } catch (error: any) {
        toast.error('Product not found');
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    const loadProductData = async () => {
      if (id) {
        await loadProduct(id);
      }
    };
    
    loadProductData();
  }, [id, navigate]);

  const handleAddToCart = async () => {
    if (!product) return;

    setIsAddingToCart(true);
    try {
      // Create a cart item with required fields
      const cartItem: Omit<CartItem, 'cart_item_id'> = {
        id: product.id,
        title: product.title,
        price: product.price,
        actualPrice: product.actualPrice || product.price,
        image: Array.isArray(product.images) && product.images.length > 0 
          ? product.images[0] 
          : product.image || '',
        images: product.images || [product.image],
        quantity: quantity,
        category: product.category,
        type: product.type || 'default',
        gender: product.gender || 'unisex'
      };
      
      // Dispatch the addToCart action with the cart item and user ID
      await dispatch(addToCart(cartItem, user?.id));
      toast.success('Added to cart successfully!');
    } catch (error: any) {
      console.error('Add to cart error:', error);
      toast.error(error.message || 'Failed to add to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (!product) return;

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

  if (!product) {
    return (
      <>
        <NewNavbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Product not found</h2>
            <button
              onClick={() => navigate('/')}
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <>
      <NewNavbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-1 hover:text-primary-600 transition-colors"
            >
              <AiOutlineArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <span>/</span>
            <span className="capitalize">{product.category}</span>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate">{product.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={productImages[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://placehold.co/600x600?text=No+Image';
                  }}
                />
              </div>

              {/* Thumbnail Images */}
              {productImages.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-primary-500' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://placehold.co/80x80?text=No+Image';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-primary-600 font-medium uppercase tracking-wide">
                  {product.category}
                </p>
                <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.title}</h1>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                {product.actualPrice && product.actualPrice > product.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">₹{product.actualPrice}</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {Math.round(((product.actualPrice - product.price) / product.actualPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              {product.description && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <AiOutlineShoppingCart className="w-5 h-5" />
                  <span>{isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}</span>
                </button>

                <button
                  onClick={handleAddToWishlist}
                  disabled={isAddingToWishlist}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <AiOutlineHeart className="w-5 h-5" />
                  <span>{isAddingToWishlist ? 'Adding to Wishlist...' : 'Add to Wishlist'}</span>
                </button>
              </div>

              {/* Product Features */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Free shipping on orders above ₹999</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">30-day return policy</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Secure payment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">24/7 customer support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailPage;