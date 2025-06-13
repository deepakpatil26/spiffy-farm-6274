import React, { useState } from "react";
import { Link } from "react-router-dom";

const HomeMenu: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleMouseEnter = (menu: string) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <div className="hidden lg:flex items-center justify-center space-x-8 relative">
      {/* Women Menu */}
      <div 
        className="relative group"
        onMouseEnter={() => handleMouseEnter('women')}
        onMouseLeave={handleMouseLeave}
      >
        <Link 
          to="/women" 
          className="text-gray-700 hover:text-primary-500 font-medium py-4 transition-colors duration-200"
        >
          Women
        </Link>
        
        {activeDropdown === 'women' && (
          <div className="absolute top-full left-0 w-screen max-w-4xl bg-white shadow-lg border-t-2 border-primary-500 z-50 p-6">
            <div className="grid grid-cols-6 gap-6">
              <div>
                <h3 className="font-bold text-red-500 mb-3">Ethnic Wear</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="#" className="hover:text-primary-500">Kurta / Kurtis</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Kurta Sets</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Ethnic Dresses</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Tops/Tunics</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Leggings/Churidars</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Pants/Palazzos</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Skirts</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Dupattas/Stoles</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-red-500 mb-3">Western Wear</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="#" className="hover:text-primary-500">Top/Tees</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Dresses</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Jumpsuits</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Jeggings</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Jeans</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Shorts/Skirts</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Trousers</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Plus Size</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-red-500 mb-3">Sleepwear</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="#" className="hover:text-primary-500">Bras</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Briefs/Panties</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Cami/Slips</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Shapewear</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Nightwear</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-red-500 mb-3">Sports Wear</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="#" className="hover:text-primary-500">Tops / Tees</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Sports Bra</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Leggings</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Joggers / Tracks</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Sweatshirts</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Jackets</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-red-500 mb-3">Top Brands</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="#" className="hover:text-primary-500">Melange</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Ginger</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Code</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Fame Forever</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Kappa</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Biba</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Aurelia</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">AND</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Allen Solly</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-red-500 mb-3">Categories</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="#" className="hover:text-primary-500">Summer Essentials</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Beauty</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Footwear/Bags</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Watches</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Jewellery</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Fragrances</Link></li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Men Menu */}
      <div 
        className="relative group"
        onMouseEnter={() => handleMouseEnter('men')}
        onMouseLeave={handleMouseLeave}
      >
        <Link 
          to="/men" 
          className="text-gray-700 hover:text-primary-500 font-medium py-4 transition-colors duration-200"
        >
          Men
        </Link>
        
        {activeDropdown === 'men' && (
          <div className="absolute top-full left-0 w-screen max-w-4xl bg-white shadow-lg border-t-2 border-primary-500 z-50 p-6">
            <div className="grid grid-cols-6 gap-6">
              <div>
                <h3 className="font-bold text-red-500 mb-3">Topwear</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="#" className="hover:text-primary-500">Casual Shirts</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Formal Shirts</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Polos</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">T-Shirts</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Jackets</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Hoodies</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Sweatshirts</Link></li>
                </ul>
                <h3 className="font-bold text-red-500 mb-3 mt-4">Bottomwear</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="#" className="hover:text-primary-500">Casual Trousers</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Formal Trousers</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Jeans</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Track Pants</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Shorts</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-red-500 mb-3">Activewear</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="#" className="hover:text-primary-500">Polos</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Sport T-shirts</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Track Pants</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Sport shoes</Link></li>
                </ul>
                <h3 className="font-bold text-red-500 mb-3 mt-4">Ethnic</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="#" className="hover:text-primary-500">Kurta</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Waistcoats</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Pyjamas</Link></li>
                </ul>
                <h3 className="font-bold text-red-500 mb-3 mt-4">Winterwear</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="#" className="hover:text-primary-500">Hoodies</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Sweaters</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Jackets</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-red-500 mb-3">Innerwear</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="#" className="hover:text-primary-500">Boxers</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Briefs</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Vests</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Loungewear</Link></li>
                </ul>
                <h3 className="font-bold text-red-500 mb-3 mt-4">Top Brands</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="#" className="hover:text-primary-500">Us Polo</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Fahrenheit</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Kappa</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Levis</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Cellio</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">CODE</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Bossini</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-red-500 mb-3">Watches</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="#" className="hover:text-primary-500">Digital</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Analog</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Fitness</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Smart</Link></li>
                </ul>
                <h3 className="font-bold text-red-500 mb-3 mt-4">Sunglasses</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="#" className="hover:text-primary-500">Aviator</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Wayfarer</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Square</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Sporty</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Rectangle</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Round</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-red-500 mb-3">Shoes</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="#" className="hover:text-primary-500">Loafers</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Slip-Ons</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Sports</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Lace up</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Floaters</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Sandals</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Sneakers</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Boots</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Slippers</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-red-500 mb-3">Grooming</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="#" className="hover:text-primary-500">Fragrances</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Face-wash</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Skin care</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Hair care</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Beard care</Link></li>
                </ul>
                <h3 className="font-bold text-red-500 mb-3 mt-4">Add-ons</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="#" className="hover:text-primary-500">Wallets</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Ties</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Belts</Link></li>
                  <li><Link to="#" className="hover:text-primary-500">Socks</Link></li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Other Menu Items */}
      <Link to="#" className="text-gray-700 hover:text-primary-500 font-medium py-4 transition-colors duration-200">
        Kids
      </Link>
      <Link to="#" className="text-gray-700 hover:text-primary-500 font-medium py-4 transition-colors duration-200">
        Shoes
      </Link>
      <Link to="#" className="text-gray-700 hover:text-primary-500 font-medium py-4 transition-colors duration-200">
        Beauty
      </Link>
    </div>
  );
};

export default HomeMenu;