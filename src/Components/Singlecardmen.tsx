import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdLocalShipping } from 'react-icons/md';
import Footer from './Home/Footer';
import Navbar from './Home/Navbar';
import { productService } from '../services/productService';
import { addToCart } from '../redux/cartReducer/action';
import { Product, RootState } from '../types';
import { useAppDispatch } from '../redux/hooks';

const Singlecardmen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useSelector((state: RootState) => state.AuthReducer);

  useEffect(() => {
    if (id) {
      loadProduct(id);
    }
  }, [id]);

  const loadProduct = async (productId: string) => {
    try {
      const productData = await productService.getProduct(productId);
      setProduct(productData);
    } catch (error: any) {
      setError('Product not found');
      toast.error('Product not found');
    } finally {
      setIsLoadingProduct(false);
    }
  };

  const handleAdd = async () => {
    if (!product) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const cartItem = {
        ...product,
        quantity: 1,
      };

      await dispatch(addToCart(cartItem, user?.id) as any);
      toast.success('Added to cart successfully!');
    } catch (error: any) {
      setError(error.message);
      toast.error('Failed to add to cart');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingProduct) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-96 flex-col">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/men')}
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Return to Men's Collection
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg group">
              <img
                src={product.img1 || product.image}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg group">
              <img
                src={product.img2 || product.image}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg group">
              <img
                src={product.img3 || product.image}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg group">
              <img
                src={product.img4 || product.image}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
              <div className="flex items-center space-x-4 mt-4">
                <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                {product.actualPrice && product.actualPrice > product.price && (
                  <>
                    <span className="text-lg text-gray-500 line-through">₹{product.actualPrice}</span>
                    <span className="text-green-600 font-medium">
                      Save ₹{product.actualPrice - product.price} ({Math.round(((product.actualPrice - product.price) / product.actualPrice) * 100)}%)
                    </span>
                  </>
                )}
              </div>
              <div className="flex items-center mt-2">
                <span className="text-yellow-400">★★★★☆</span>
                <span className="text-gray-600 ml-2">(4.0)</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <p className="text-gray-600 mb-4">
                Keep your look simple yet stylish by wearing this graceful piece designed with attention to detail. 
                The outfit boasts excellent craftsmanship and premium materials for lasting comfort and style.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Features</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <ul className="space-y-1">
                      <li>• Premium Quality</li>
                      <li>• Machine Washable</li>
                      <li>• Comfortable Fit</li>
                    </ul>
                    <ul className="space-y-1">
                      <li>• Durable Material</li>
                      <li>• Stylish Design</li>
                      <li>• Casual Wear</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Details</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">Category:</span> {product.category}</p>
                    <p><span className="font-medium">Type:</span> {product.type}</p>
                    <p><span className="font-medium">Gender:</span> {product.gender}</p>
                    <p><span className="font-medium">Country of Origin:</span> India</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleAdd}
              disabled={isLoading}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              {isLoading ? 'Adding to Cart...' : 'Add to Cart'}
            </button>

            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <MdLocalShipping className="w-5 h-5" />
              <span>2-3 business days delivery</span>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Singlecardmen;