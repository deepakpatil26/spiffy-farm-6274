import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeSlider from "../Components/Home/HomeSlider";
import Footer from "../Components/Home/Footer";
import NewNavbar from "../Components/Home/NewNavbar";
import NewCard from "../Components/NewCard";
import { newProductService } from "../services/newProductService";
import { Product, Category } from "../types";
import { AiOutlineArrowRight } from "react-icons/ai";
import { toast } from "react-toastify";
import ScrollToTop from "../Components/Common/ScrollToTop";

const NewHomePage: React.FC = () => {
  const [products, setProducts] = useState<{
    featured: Product[];
    clothes: Product[];
    electronics: Product[];
    furniture: Product[];
    shoes: Product[];
    miscellaneous: Product[];
  }>({
    featured: [],
    clothes: [],
    electronics: [],
    furniture: [],
    shoes: [],
    miscellaneous: [],
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);

      const [productsData, categoriesData] = await Promise.all([
        newProductService.getProductsForHomepage(),
        newProductService.getCategories()
      ]);

      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading homepage data:', error);
      toast.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const CategoryCard: React.FC<{
    category: Category;
    description: string;
  }> = ({ category, description }) => (
    <Link to={`/category/${category.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://placehold.co/600x400?text=' + encodeURIComponent(category.name);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold mb-1">{category.name}</h3>
          <p className="text-sm opacity-90">{description}</p>
        </div>
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <AiOutlineArrowRight className="w-5 h-5 text-white" />
        </div>
      </div>
    </Link>
  );

  const ProductSection: React.FC<{
    title: string;
    subtitle: string;
    products: Product[];
    viewAllLink: string;
    bgColor?: string;
  }> = ({ title, subtitle, products, viewAllLink, bgColor = "bg-white" }) => (
    <section className={`${bgColor} py-12`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600">{subtitle}</p>
          </div>
          <Link
            to={viewAllLink}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            View All <AiOutlineArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <NewCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );

  const categoryDescriptions: { [key: string]: string } = {
    'clothes': 'Fashion for every style and occasion',
    'electronics': 'Latest tech and gadgets',
    'furniture': 'Beautiful pieces for your home',
    'shoes': 'Step out in style',
    'miscellaneous': 'Unique finds and essentials'
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <NewNavbar />

      {/* Main Content Area with appropriate top padding for sticky navbar */}
      <main className="relative">
        {/* Hero Slider Section */}
        <section className="bg-white py-4 md:py-8 overflow-hidden">
          <HomeSlider />
        </section>

        {/* Categories Section */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our diverse collection of products across multiple categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(0, 6).map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                description={categoryDescriptions[category.slug] || 'Discover amazing products'}
              />
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <ProductSection
          title="Featured Products"
          subtitle="Handpicked favorites just for you"
          products={products.featured}
          viewAllLink="/products"
        />

        {/* Clothes Section */}
        <ProductSection
          title="Fashion & Clothing"
          subtitle="Latest trends and timeless classics"
          products={products.clothes}
          viewAllLink="/category/clothes"
          bgColor="bg-gray-50"
        />

        {/* Electronics Section */}
        <ProductSection
          title="Electronics & Gadgets"
          subtitle="Cutting-edge technology at your fingertips"
          products={products.electronics}
          viewAllLink="/category/electronics"
        />

        {/* Furniture Section */}
        <ProductSection
          title="Furniture & Home"
          subtitle="Transform your living space"
          products={products.furniture}
          viewAllLink="/category/furniture"
          bgColor="bg-gray-50"
        />

        {/* Shoes Section */}
        <ProductSection
          title="Footwear Collection"
          subtitle="Step out in style and comfort"
          products={products.shoes}
          viewAllLink="/category/shoes"
        />

        {/* Miscellaneous Section */}
        <ProductSection
          title="Unique Finds"
          subtitle="Special items just for you"
          products={products.miscellaneous}
          viewAllLink="/category/miscellaneous"
          bgColor="bg-gray-50"
        />

        {/* Benefits Section */}
        <section className="bg-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Shop With Us?</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Free Shipping</h3>
                <p className="text-gray-600">Free shipping on all orders above ₹999. Fast and reliable delivery.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
                <p className="text-gray-600">Premium quality products with 100% satisfaction guarantee.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Returns</h3>
                <p className="text-gray-600">30-day hassle-free returns and exchanges for your peace of mind.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-primary-600 py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-primary-100 mb-8 text-lg">
              Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, and special deals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default NewHomePage;
