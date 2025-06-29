import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { getwomens } from "../redux/MenReducer/action";
import Card from "../Components/Card";
import Pagination1 from "../Components/Filter/Pagination1";
import Navbar from "../Components/Home/Navbar";
import Footer from "../Components/Home/Footer";
import Menfilter from "../Components/Filter/Menfilter";
import { RootState } from "../types";
import { useAppDispatch } from "../redux/hooks";

export const Women: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { women, isLoading, isError, total } = useSelector((store: RootState) => store.MenReducer);

  const queryParams = {
    params: {
      category: searchParams.getAll("category"),
      _page: searchParams.get("page"),
      _sort: searchParams.get("order") ? "price" : null,
      _order: searchParams.get("order"),
    },
  };

  useEffect(() => {
    dispatch(getwomens(queryParams));
  }, [location.search, dispatch]);

  if (isLoading) {
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

  if (isError) {
    return (
      <>
        <Navbar />
        <div className="p-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="text-red-400 mr-3">⚠️</div>
              <div>
                <h3 className="text-red-800 font-medium">Error!</h3>
                <p className="text-red-700">
                  Something went wrong while loading the products.
                  <button 
                    className="ml-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                    onClick={() => dispatch(getwomens(queryParams))}
                  >
                    Try Again
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Promotional Banner */}
      <div className="relative bg-gradient-to-r from-pink-500 to-purple-600 h-12 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 animate-pulse"></div>
        <p className="relative text-white text-sm md:text-base font-medium text-center px-4">
          New arrivals in womenswear upto 30% off ❤️
        </p>
      </div>

      <Menfilter type="women" />

      {!women || women.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">No products found</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {women.map((product) => (
              <Card key={product.id} {...product} id={product.id} type="women" />
            ))}
          </div>
        </div>
      )}

      <Pagination1 />
      <Footer />
    </div>
  );
};