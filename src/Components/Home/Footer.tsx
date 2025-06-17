import React from "react";
import { 
  AiFillFacebook, 
  AiOutlineTwitter, 
  AiOutlineInstagram, 
  AiOutlineYoutube,
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineQuestionCircle
} from "react-icons/ai";
import Logo from "../../Asssets/logo2.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 text-gray-600 mt-8 font-sans">
      {/* Newsletter and App Download Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="text-center lg:text-left">
            <h3 className="text-xl lg:text-2xl font-bold text-black mb-2">
              Subscribe to our awesome emails.
            </h3>
            <p className="text-sm mb-6">
              Get our latest offers and news straight in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <input 
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-64"
              />
              <button className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl lg:text-2xl font-bold text-black mb-2">
              Download our apps
            </h3>
            <p className="text-sm mb-6">
              Shop our products and offers on-the-go.
            </p>
            <div className="flex gap-4 justify-center">
              <img
                className="w-32 h-10 object-contain"
                src="https://constant.myntassets.com/web/assets/img/80cc455a-92d2-4b5c-a038-7da0d92af33f1539674178924-google_play.png"
                alt="Google Play"
              />
              <img
                className="w-32 h-10 object-contain"
                src="https://constant.myntassets.com/web/assets/img/bc5e11ad-0250-420a-ac71-115a57ca35d51539674178941-apple_store.png"
                alt="App Store"
              />
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Links Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div>
            <h4 className="font-bold text-black mb-4">Women</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/women/tops" className="hover:text-primary-500">Tops</a></li>
              <li><a href="/women/ethnicwear" className="hover:text-primary-500">Ethnicwear</a></li>
              <li><a href="/women/bottoms" className="hover:text-primary-500">Bottoms</a></li>
              <li><a href="/women/dresses" className="hover:text-primary-500">Dresses</a></li>
              <li><a href="/women/jumpsuits" className="hover:text-primary-500">Jumpsuits</a></li>
              <li><a href="/women/winterwear" className="hover:text-primary-500">Winterwear</a></li>
              <li><a href="/women/lingerie" className="hover:text-primary-500">Lingerie</a></li>
              <li><a href="/women/sportswear" className="hover:text-primary-500">Sportswear</a></li>
              <li><a href="/women/beauty" className="hover:text-primary-500">Beauty</a></li>
              <li><a href="/women/watches" className="hover:text-primary-500">Watches</a></li>
              <li><a href="/women/sunglasses" className="hover:text-primary-500">Sunglasses</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-black mb-4">Men</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/men/tops" className="hover:text-primary-500">Tops</a></li>
              <li><a href="/men/bottoms" className="hover:text-primary-500">Bottoms</a></li>
              <li><a href="/men/ethnicwear" className="hover:text-primary-500">Ethnicwear</a></li>
              <li><a href="/men/winterwear" className="hover:text-primary-500">Winterwear</a></li>
              <li><a href="/men/sportswear" className="hover:text-primary-500">Sportswear</a></li>
              <li><a href="/men/innerwear" className="hover:text-primary-500">Innerwear</a></li>
              <li><a href="/men/grooming" className="hover:text-primary-500">Grooming</a></li>
              <li><a href="/men/watches" className="hover:text-primary-500">Watches</a></li>
              <li><a href="/men/sunglasses" className="hover:text-primary-500">Sunglasses</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-black mb-4">Kids</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/kids/girls-clothing" className="hover:text-primary-500">Girls Clothing</a></li>
              <li><a href="/kids/boys-clothing" className="hover:text-primary-500">Boys Clothing</a></li>
              <li><a href="/kids/infants-girls" className="hover:text-primary-500">Infants Girls</a></li>
              <li><a href="/kids/infants-boys" className="hover:text-primary-500">Infants Boys</a></li>
              <li><a href="/kids/winterwear" className="hover:text-primary-500">Winterwear</a></li>
              <li><a href="/kids/add-ons" className="hover:text-primary-500">Add ons</a></li>
              <li><a href="/kids/teen-shop" className="hover:text-primary-500">The Teen Shop</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-black mb-4">Shoes & Bags</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/shoes-bags/women" className="hover:text-primary-500">Women</a></li>
              <li><a href="/shoes-bags/men" className="hover:text-primary-500">Men</a></li>
              <li><a href="/shoes-bags/boys" className="hover:text-primary-500">Boys</a></li>
              <li><a href="/shoes-bags/girls" className="hover:text-primary-500">Girls</a></li>
              <li><a href="/shoes-bags/accessories" className="hover:text-primary-500">Accessories</a></li>
              <li><a href="/shoes-bags/essentials" className="hover:text-primary-500">Essentials</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-black mb-4">Beauty</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/beauty/makeup-eyes" className="hover:text-primary-500">Makeup Eyes</a></li>
              <li><a href="/beauty/makeup-face" className="hover:text-primary-500">Makeup Face</a></li>
              <li><a href="/beauty/makeup-lips" className="hover:text-primary-500">Makeup Lips</a></li>
              <li><a href="/beauty/makeup-nails" className="hover:text-primary-500">Makeup Nails</a></li>
              <li><a href="/beauty/perfumes" className="hover:text-primary-500">Perfumes</a></li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Contact and Social Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 lg:mb-0">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center">
                <AiOutlinePhone className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Talk to us</p>
                <p className="font-medium">1800-123-1555</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center">
                <AiOutlineQuestionCircle className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Helpcentre</p>
                <p className="font-medium">help@outfitstore.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center">
                <AiOutlineMail className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Write to us</p>
                <p className="font-medium">help@outfitstore.com</p>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            <AiFillFacebook className="text-2xl hover:text-primary-500 cursor-pointer transition-colors duration-200" />
            <AiOutlineTwitter className="text-2xl hover:text-primary-500 cursor-pointer transition-colors duration-200" />
            <AiOutlineInstagram className="text-2xl hover:text-primary-500 cursor-pointer transition-colors duration-200" />
            <AiOutlineYoutube className="text-2xl hover:text-primary-500 cursor-pointer transition-colors duration-200" />
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <img
            src={Logo}
            alt="logo"
            className="h-8 sm:h-12 w-auto"
          />
          <div className="text-center sm:text-left">
            <p className="text-xs sm:text-sm text-gray-500">
              © 2023 RNA Intellectual Property Limited.
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Terms & Conditions - Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;