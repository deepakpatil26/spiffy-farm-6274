import React from "react";
import HomeSlider from "../Components/Home/HomeSlider";
import Footer from "../Components/Home/Footer";
import Navbar from "../Components/Home/Navbar";

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      {/* Promotional Banner */}
      <div className="relative bg-gradient-to-r from-pink-500 to-purple-600 h-12 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 animate-pulse"></div>
        <p className="relative text-white text-sm md:text-base font-medium text-center px-4">
          New arrivals in mens and womens wear upto 30% off ❤️
        </p>
      </div>

      {/* Hero Slider */}
      <HomeSlider />

      {/* Promotional Strip */}
      <div className="max-w-6xl mx-auto mt-8 px-4">
        <img
          className="w-full rounded-lg shadow-md"
          src="https://lmsin.net/cdn-cgi/image/w=1232,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/Uber-HP-Desktop-PromoStrip2-14Mar23.jpg"
          alt="Promotional Banner"
        />
      </div>

      {/* Our Benefits Section */}
      <section className="max-w-6xl mx-auto mt-12 px-4">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-b-4 border-primary-500 inline-block pb-2">
            Our Benefits
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <img
            className="w-full rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            src="https://lmsin.net/cdn-cgi/image/w=410,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-DesktopUberHP-OurBenefit1-22Feb2023.jpg"
            alt="Benefit 1"
          />
          <img
            className="w-full rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            src="https://lmsin.net/cdn-cgi/image/w=410,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-DesktopUberHP-OurBenefit2-13Oct2022.jpg"
            alt="Benefit 2"
          />
          <img
            className="w-full rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hidden md:block"
            src="https://lmsin.net/cdn-cgi/image/w=410,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-DesktopUberHP-OurBenefit3-13Oct2022.jpg"
            alt="Benefit 3"
          />
        </div>
      </section>

      {/* Promotional Strip 2 */}
      <div className="max-w-6xl mx-auto mt-12 px-4">
        <img
          className="w-full rounded-lg shadow-md"
          src="https://lmsin.net/cdn-cgi/image/w=1232,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/Uber-HP-Desktop-PromoStrip3-25Mar2023.jpg"
          alt="Promotional Banner 2"
        />
      </div>

      {/* Unmissable Offers Section */}
      <section className="max-w-6xl mx-auto mt-12 px-4">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-b-4 border-primary-500 inline-block pb-2">
            Unmissable Offers
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            "https://lmsin.net/cdn-cgi/image/w=300,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-UberHP-LimitedSale-Desk-Banner1-24March23.jpg",
            "https://lmsin.net/cdn-cgi/image/w=300,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-UberHP-LimitedSale-Desk-Banner2-24March23.jpg",
            "https://lmsin.net/cdn-cgi/image/w=300,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-UberHP-LimitedSale-Desk-Banner3-01March23.jpg",
            "https://lmsin.net/cdn-cgi/image/w=300,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-UberHP-LimitedSale-Desk-Banner4-24March23.jpg",
          ].map((image, index) => (
            <div key={index} className="relative group">
              <img
                className="w-full rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                src={image}
                alt={`Offer ${index + 1}`}
              />
              <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                <span className="text-sm font-bold text-gray-900">Up To 50% Off</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Women's Store Section */}
      <section className="max-w-6xl mx-auto mt-12 px-4">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-b-4 border-primary-500 inline-block pb-2">
            Women's Store
          </h2>
        </div>
        
        <div className="mb-8">
          <img
            className="w-full rounded-lg shadow-md"
            src="https://lmsin.net/cdn-cgi/image/w=1232,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-UberHP-PromoWidget24-Desk-Banner1-07Mar23.jpg"
            alt="Women's Store Banner"
          />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            "https://lmsin.net/cdn-cgi/image/w=300,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-UberHP-Promowidget25-Common-Banner1-07March23A.jpg",
            "https://lmsin.net/cdn-cgi/image/w=300,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-UberHP-Promowidget25-Common-Banner2-07March23A.jpg",
            "https://lmsin.net/cdn-cgi/image/w=300,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-UberHP-Promowidget25-Common-Banner3-07March23A.jpg",
            "https://lmsin.net/cdn-cgi/image/w=300,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-UberHP-Promowidget25-Common-Banner4-07March23A.jpg",
          ].map((image, index) => (
            <div key={index} className="relative group">
              <img
                className="w-full rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                src={image}
                alt={`Women's ${index + 1}`}
              />
              <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                <span className="text-sm font-bold text-gray-900">Up To 50% Off</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Men's Store Section */}
      <section className="max-w-6xl mx-auto mt-12 px-4">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-b-4 border-primary-500 inline-block pb-2">
            Men's Store
          </h2>
        </div>
        
        <div className="mb-8">
          <img
            className="w-full rounded-lg shadow-md"
            src="https://lmsin.net/cdn-cgi/image/w=1232,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/desktop-LS-UBERHP-GiftCard-13modblock-oneBythree-A-07Mar2023.jpg"
            alt="Men's Store Banner"
          />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            "https://lmsin.net/cdn-cgi/image/w=300,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-UberHP-Promowidge2-Common-Banner4-24March23.jpg",
            "https://lmsin.net/cdn-cgi/image/w=300,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-UberHP-Promowidge2-Common-Banner1-07March23.jpg",
            "https://lmsin.net/cdn-cgi/image/w=300,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-UberHP-Promowidge2-Common-Banner2-07March23.jpg",
            "https://lmsin.net/cdn-cgi/image/w=300,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-UberHP-Promowidge2-Common-Banner3-07March23.jpg",
          ].map((image, index) => (
            <div key={index} className="relative group">
              <img
                className="w-full rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                src={image}
                alt={`Men's ${index + 1}`}
              />
              <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                <span className="text-sm font-bold text-gray-900">Up To 50% Off</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Kids Store Section */}
      <section className="max-w-6xl mx-auto mt-12 px-4">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-b-4 border-primary-500 inline-block pb-2">
            Kids Store
          </h2>
        </div>
        
        <div className="mb-8">
          <img
            className="w-full rounded-lg shadow-md"
            src="https://lmsin.net/cdn-cgi/image/w=1232,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-UberHP-Promowidget26-Desk-Banner1-08Mar23.jpg"
            alt="Kids Store Banner"
          />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            "https://lmsin.net/cdn-cgi/image/w=300,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-UberHP-Promowidget27-Desktop-Banner1-10March23.jpg",
            "https://lmsin.net/cdn-cgi/image/w=300,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-UberHP-Promowidget27-Desktop-Banner2-10March23.jpg",
            "https://lmsin.net/cdn-cgi/image/w=300,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-UberHP-Promowidget27-Desktop-Banner3-10March23.jpg",
            "https://lmsin.net/cdn-cgi/image/w=300,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-UberHP-Promowidget27-Desktop-Banner4-10March23.jpg",
          ].map((image, index) => (
            <div key={index} className="relative group">
              <img
                className="w-full rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                src={image}
                alt={`Kids ${index + 1}`}
              />
              <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                <span className="text-sm font-bold text-gray-900">Up To 50% Off</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Big Brands Section */}
      <section className="max-w-6xl mx-auto mt-12 px-4 mb-12">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-b-4 border-primary-500 inline-block pb-2">
            Big Brands Big Discounts
          </h2>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            "https://lmsin.net/cdn-cgi/image/w=616,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-UberHP-Top-Brands-Desk-Banner1-09Feb2023.jpg",
            "https://lmsin.net/cdn-cgi/image/w=616,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-UberHP-Top-Brands-Desk-Banner5-09Feb2023.jpg",
            "https://lmsin.net/cdn-cgi/image/w=616,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-UberHP-Top-Brands-Desk-Banner9-09Feb2023.jpg",
            "https://lmsin.net/cdn-cgi/image/w=616,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-UberHP-Top-Brands-Desk-Banner2-16Mar2023.jpg",
            "https://lmsin.net/cdn-cgi/image/w=616,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-UberHP-Top-Brands-Desk-Banner6-16Mar2023.jpg",
            "https://lmsin.net/cdn-cgi/image/w=616,q=70,fit=cover/https://70415bb9924dca896de0-34a37044c62e41b40b39fcedad8af927.lmsin.net/LS-Fest/LS-new/LS-UberHP-Top-Brands-Desk-Banner10-14Dec2022.jpg",
          ].map((image, index) => (
            <img
              key={index}
              className="w-full rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              src={image}
              alt={`Brand ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;