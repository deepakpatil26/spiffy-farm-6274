import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import NewNavbar from "../Components/Home/NewNavbar";
import Footer from "../Components/Home/Footer";
import NewCard from "../Components/NewCard";
import { newProductService } from "../services/newProductService";
import { Product, Category } from "../types";
import { toast } from "react-toastify";
import { AiOutlineFilter } from "react-icons/ai";
import { BsGrid, BsList } from "react-icons/bs";

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'default');
  const [priceRange, setPriceRange] = useState({
    min: searchParams.get('price_min') || '',
    max: searchParams.get('price_max') || ''
  });

  useEffect(() => {
    if (slug) {
      loadCategoryData();
    }
  }, [slug, searchParams]);

  const loadCategoryData = async () => {
    if (!slug) return;
    
    try {
      setIsLoading(true);
      
      // Get category info
      const categories = await newProductService.getCategories();
      const categoryData = categories.find(cat => cat.slug === slug);
      
      if (!categoryData) {
        toast.error('Category not found');
        navigate('/');
        return;
      }
      
      setCategory(categoryData);
      
      // Get products for this category
      const { data } = await newProductService.getProductsByCategorySlug(slug, 50);
      
      // Apply sorting
      let sortedProducts = [...data];
      if (sortBy === 'price_asc') {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price_desc') {
        sortedProducts.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'name') {
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
      }
      
      // Apply price filter
      if (priceRange.min || priceRange.max) {
        sortedProducts = sortedProducts.filter(product => {
          const price = product.price;
          const min = priceRange.min ? parseInt(priceRange.min) : 0;
          const max = priceRange.max ? parseInt(priceRange.max) : Infinity;
          return price >= min && price <= max;
        });
      }
      
      setProducts(sortedProducts);
    } catch (error) {
      console.error('Error loading category data:', error);
      toast.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    const params = new URLSearchParams(searchParams);
    if (newSort === 'default') {
      params.delete('sort');
    } else {
      params.set('sort', newSort);
    }
    setSearchParams(params);
  };

  const handlePriceFilter = () => {
    const params = new URLSearchParams(searchParams);
    if (priceRange.min) {
      params.set('price_min', priceRange.min);
    } else {
      params.delete('price_min');
    }
    if (priceRange.max) {
      params.set('price_max', priceRange.max);
    } else {
      params.delete('price_max');
    }
    setSearchParams(params);
  };

  const clearFilters = () => {
    setPriceRange({ min: '', max: '' });
    setSortBy('default');
    setSearchParams({});
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
      <div className="min-h-screen bg-gray-50">
        {/* Category Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 capitalize">
                  {category?.name}
                </h1>
                <p className="text-gray-600 mt-2">
                  {products.length} products found
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                  >
                    <BsGrid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                  >
                    <BsList className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <AiOutlineFilter className="w-5 h-5 mr-2" />
                    Filters
                  </h3>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    Clear All
                  </button>
                </div>

                {/* Sort By */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="default">Default</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="w-full">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="w-full">
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handlePriceFilter}
                    className="w-full mt-2 bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {products.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-gray-600 mb-4">
                    No products found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your filters or browse other categories
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1'
                }`}>
                  {products.map((product) => (
                    <NewCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;