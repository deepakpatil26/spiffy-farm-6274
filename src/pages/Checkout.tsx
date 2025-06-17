import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Navbar from "../Components/Home/Navbar";
import Footer from "../Components/Home/Footer";
import { RootState, Address } from "../types";

const initialState: Address = {
  name: "",
  mobile: "",
  pin: "",
  city: "",
  state: "",
  building: "",
};

const validateForm = (values: Address) => {
  const errors: Partial<Address> = {};

  if (!values.name.trim()) {
    errors.name = "Name is required";
  }

  if (!values.mobile) {
    errors.mobile = "Mobile number is required";
  } else if (!/^[6-9]\d{9}$/.test(values.mobile)) {
    errors.mobile = "Please enter a valid 10-digit mobile number";
  }

  if (!values.pin) {
    errors.pin = "PIN code is required";
  } else if (!/^\d{6}$/.test(values.pin)) {
    errors.pin = "Please enter a valid 6-digit PIN code";
  }

  if (!values.city.trim()) {
    errors.city = "City is required";
  }

  if (!values.state.trim()) {
    errors.state = "State is required";
  }

  if (!values.building.trim()) {
    errors.building = "Building/Street details are required";
  }

  return errors;
};

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Address>>({});
  const [address, setAddress] = useState(initialState);
  const [shippingAddress, setShippingAddress] = useState<Address | null>(null);

  const { cartItems } = useSelector((store: RootState) => store.cartReducer);

  const calculateSavings = () => {
    return cartItems.reduce((total, item) => {
      const originalPrice = item.actualPrice || item.price;
      const discountedPrice = item.price;
      return total + ((originalPrice - discountedPrice) * item.quantity);
    }, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof Address]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const formErrors = validateForm(address);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setShippingAddress(address);
      setAddress(initialState);

      toast.success("Address added successfully!");
    } catch (error) {
      toast.error("Failed to save address. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceedToPayment = () => {
    if (!cartItems.length) {
      toast.warning("Please add items to your cart before proceeding to payment");
      navigate("/");
      return;
    }

    navigate("/payment");
  };

  if (!cartItems.length) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Cart is Empty!</h2>
            <p className="text-gray-500 mb-6">Please add items to your cart before proceeding to checkout.</p>
            <button
              onClick={() => navigate("/")}
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout & Shipping</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Address Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Home Delivery</h2>
                <p className="text-gray-600">Get your product delivered to your home</p>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add your Address</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={address.name}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your name"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile No. *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={address.mobile}
                      onChange={handleChange}
                      maxLength={10}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.mobile ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+91 Enter mobile no"
                    />
                    {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode *
                    </label>
                    <input
                      type="tel"
                      name="pin"
                      value={address.pin}
                      onChange={handleChange}
                      maxLength={6}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.pin ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your pincode"
                    />
                    {errors.pin && <p className="text-red-500 text-xs mt-1">{errors.pin}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={address.city}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your city"
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={address.state}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.state ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your state"
                    />
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Building Details *
                    </label>
                    <input
                      type="text"
                      name="building"
                      value={address.building}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.building ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter building details"
                    />
                    {errors.building && <p className="text-red-500 text-xs mt-1">{errors.building}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Adding Address..." : "Add Address"}
                </button>
              </form>

              {shippingAddress && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Your Shipping Address</h4>
                  <div className="text-gray-700 space-y-1">
                    <p className="font-medium">{shippingAddress.name}</p>
                    <p>{shippingAddress.building}, {shippingAddress.city}</p>
                    <p>{shippingAddress.state} - {shippingAddress.pin}</p>
                    <p>Mobile: +91 {shippingAddress.mobile}</p>
                  </div>
                  <button
                    onClick={handleProceedToPayment}
                    disabled={isLoading}
                    className="mt-4 w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                  >
                    Proceed to Payment
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>Total MRP</span>
                  <span className="font-semibold">₹{getTotalPrice()}</span>
                </div>
                
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span className="font-semibold">- ₹{calculateSavings()}</span>
                </div>
                
                <div className="flex justify-between text-green-600">
                  <span>Shipping</span>
                  <span className="font-semibold">FREE</span>
                </div>
                
                <hr />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Grand Total</span>
                  <span>₹{getTotalPrice() - calculateSavings()}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-primary-600">Items in Cart</h3>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-2">{item.title}</h4>
                      <p className="font-semibold">₹{item.price}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-xs text-gray-500">📦 Delivery by 3-4 days</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;