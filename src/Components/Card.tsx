import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CardProps } from '../types';

const Card: React.FC<CardProps> = ({ 
  actualPrice, 
  type, 
  id, 
  image, 
  price, 
  title, 
  discount 
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const cartItem = {
    actualPrice,
    type,
    image,
    price,
    title,
    discount,
    quantity: 1,
    id,
    category: '',
    gender: type as 'men' | 'women'
  };

  const handleClick = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await axios.post(`https://lifestyle-mock-server-api.onrender.com/cart`, cartItem);
      // You can add toast notification here
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      <Link to={`/${type}/${id}`} className="block">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
          <img
            src={image}
            alt={title}
            className="h-64 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-semibold text-gray-900">₹{price}</span>
            {actualPrice && (
              <span className="text-sm text-gray-500 line-through">₹{actualPrice}</span>
            )}
          </div>
          <h3 className="text-sm text-gray-700 line-clamp-2">{title}</h3>
        </div>
      </Link>
      
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="absolute bottom-0 left-0 right-0 bg-primary-500 text-white py-3 px-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-primary-600 disabled:opacity-50"
      >
        {isLoading ? 'Adding...' : 'Add To Cart'}
      </button>
    </div>
  );
};

export default Card;