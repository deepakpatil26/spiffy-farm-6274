import React, { useState, useEffect, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { newProductService } from "../../services/newProductService";
import { Product } from "../../types";

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim().length > 1) {
        performSearch();
      } else {
        setSearchResults([]);
        setIsDropdownOpen(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const performSearch = async () => {
    setIsLoading(true);
    try {
      const { data } = await newProductService.searchProducts(searchTerm, 5);
      setSearchResults(data);
      setIsDropdownOpen(true);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsDropdownOpen(false);
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleResultClick = (productId: string) => {
    setIsDropdownOpen(false);
    setSearchTerm("");
    navigate(`/product/${productId}`);
  };

  return (
    <div className="relative w-full max-w-sm xl:max-w-md mx-auto" ref={dropdownRef}>
      <form onSubmit={handleSearchSubmit} className="relative w-full">
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <BsSearch className="h-4 w-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for products, brands and more"
            className="block w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl leading-5 bg-gray-50/50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white shadow-sm transition-all duration-300 text-sm"
          />
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isDropdownOpen && (searchTerm.length > 1) && (
        <div className="absolute mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 z-[120] overflow-hidden">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500 text-sm">Searching...</div>
          ) : searchResults.length > 0 ? (
            <div className="max-h-80 overflow-y-auto">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleResultClick(product.id)}
                  className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-12 h-12 object-cover rounded-md"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/100x100?text=Product';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">{product.title}</h4>
                    <p className="text-xs text-gray-500">{product.category}</p>
                    <p className="text-sm font-bold text-primary-600">₹{product.price}</p>
                  </div>
                </div>
              ))}
              <div
                onClick={handleSearchSubmit}
                className="p-3 bg-gray-50 text-center text-sm font-medium text-primary-600 hover:text-primary-700 cursor-pointer"
              >
                View all results
              </div>
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-500 text-sm mb-1">No products found</p>
              <p className="text-xs text-gray-400">Try searching for something else</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;