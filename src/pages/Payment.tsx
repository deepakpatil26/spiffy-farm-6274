import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Navbar from "../Components/Home/Navbar";
import Footer from "../Components/Home/Footer";
import { clearCart } from "../redux/cartReducer/action";
import { RootState, PaymentForm } from "../types";

const initialState: PaymentForm = {
  cardno: "",
  ExpiringDate: "",
  cvv: "",
};

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState(initialState);
  const [carddetails, setCarddetails] = useState<PaymentForm | null>(null);
  const [OTP, setOTP] = useState("");
  const [enteredotp, setEnteredOtp] = useState("");
  const [paymentOption, setPaymentOption] = useState("debit-card");
  const [isLoading, setIsLoading] = useState(false);

  const { cartItems } = useSelector((store: RootState) => store.cartReducer);
  const { user } = useSelector((store: RootState) => store.AuthReducer);

  const calculateSavings = () => {
    return cartItems.reduce((total, item) => {
      const originalPrice = item.actualPrice || item.price;
      const discountedPrice = item.price;
      return total + ((originalPrice - discountedPrice) * item.quantity);
    }, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, e) => total + e.price * e.quantity, 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handlePaymentSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (paymentOption === "cash") {
      handlePay();
      return;
    }

    if (data.cardno === "" || data.ExpiringDate === "" || data.cvv === "") {
      toast.error("Please fill all fields");
    } else if (data.cardno.length !== 16) {
      toast.error("Please enter a valid card number");
    } else if (data.cvv.length !== 3) {
      toast.error("Please enter a valid CVV");
    } else {
      setCarddetails(data);
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      setOTP(otp);

      toast.success(`Your OTP is ${otp}`);
    }
  };

  const handlePay = async () => {
    if (paymentOption !== "cash" && enteredotp !== OTP) {
      toast.error("Incorrect OTP");
      return;
    }

    setIsLoading(true);
    
    try {
      // Clear cart
      await dispatch(clearCart(user?.id) as any);

      toast.success("Congratulations! Payment successful. Your order has been placed!");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!cartItems.length) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">No items in cart</h2>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Payment & Place Order</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Payment Options */}
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentOption"
                        value="debit-card"
                        checked={paymentOption === "debit-card"}
                        onChange={(e) => setPaymentOption(e.target.value)}
                        className="text-primary-500 focus:ring-primary-500"
                      />
                      <div>
                        <span className="font-medium">Debit Card</span>
                        <p className="text-xs text-gray-500">Use your Debit card</p>
                      </div>
                    </label>
                  </div>
                  
                  <div>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentOption"
                        value="upi"
                        checked={paymentOption === "upi"}
                        onChange={(e) => setPaymentOption(e.target.value)}
                        className="text-primary-500 focus:ring-primary-500"
                      />
                      <div>
                        <span className="font-medium">UPI Payment</span>
                        <p className="text-xs text-gray-500">Pay with UPI app</p>
                      </div>
                    </label>
                  </div>
                  
                  <div>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentOption"
                        value="netbanking"
                        checked={paymentOption === "netbanking"}
                        onChange={(e) => setPaymentOption(e.target.value)}
                        className="text-primary-500 focus:ring-primary-500"
                      />
                      <div>
                        <span className="font-medium">Net Banking</span>
                        <p className="text-xs text-gray-500">Pay by your preferred bank</p>
                      </div>
                    </label>
                  </div>
                  
                  <div>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentOption"
                        value="cash"
                        checked={paymentOption === "cash"}
                        onChange={(e) => setPaymentOption(e.target.value)}
                        className="text-primary-500 focus:ring-primary-500"
                      />
                      <div>
                        <span className="font-medium">Cash on Delivery</span>
                        <p className="text-xs text-gray-500">Pay as cash</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Payment Details */}
                <div>
                  {paymentOption === "debit-card" && (
                    <form onSubmit={handlePaymentSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          name="cardno"
                          value={data.cardno}
                          onChange={handleChange}
                          maxLength={16}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Enter card number"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiration Date
                        </label>
                        <input
                          type="month"
                          name="ExpiringDate"
                          value={data.ExpiringDate}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          name="cvv"
                          value={data.cvv}
                          onChange={handleChange}
                          maxLength={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Enter CVV"
                        />
                      </div>
                      
                      <button
                        type="submit"
                        className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                      >
                        Get OTP
                      </button>

                      {carddetails && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Enter OTP
                            </label>
                            <input
                              type="text"
                              value={enteredotp}
                              onChange={(e) => setEnteredOtp(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                              placeholder="Enter your OTP"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={handlePay}
                            disabled={isLoading}
                            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
                          >
                            {isLoading ? "Processing..." : "Pay Now"}
                          </button>
                        </div>
                      )}
                    </form>
                  )}

                  {paymentOption === "upi" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Your UPI ID
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Enter your UPI ID"
                        />
                      </div>
                      <button
                        onClick={handlePaymentSubmit}
                        className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                      >
                        Pay Now
                      </button>
                    </div>
                  )}

                  {paymentOption === "netbanking" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Select Your Bank
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                          <option value="">Select your Bank</option>
                          <option value="SBI NB">SBI NB</option>
                          <option value="HDFC Bank">HDFC Bank</option>
                          <option value="ICICI Bank">ICICI Bank</option>
                          <option value="Axis Bank">Axis Bank</option>
                          <option value="Kotak Bank">Kotak Bank</option>
                          <option value="Other Bank">Other Bank</option>
                        </select>
                      </div>
                      <button
                        onClick={handlePaymentSubmit}
                        className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                      >
                        Pay Now
                      </button>
                    </div>
                  )}

                  {paymentOption === "cash" && (
                    <div className="text-center space-y-4">
                      <img
                        src="https://i1.lmsin.net/website_images/in/checkout/cod-theme-icon.svg"
                        alt="Cash on Delivery"
                        className="mx-auto h-16"
                      />
                      <p className="text-sm text-gray-600">
                        Pay at the time of delivery by cash or scan QR and pay through UPI.
                      </p>
                      <button
                        onClick={handlePay}
                        disabled={isLoading}
                        className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
                      >
                        {isLoading ? "Placing Order..." : "Place Order"}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 text-xs text-gray-500">
                <div className="flex items-center mb-2">
                  <img
                    src="https://i1.lmsin.net/website_images/in/checkout/comodo-secure-icon.svg"
                    alt="Secure"
                    className="h-6 mr-2"
                  />
                  <span>Secure Payment</span>
                </div>
                <p className="mb-2">
                  Your credit card details are securely encrypted and passed directly to our PCI DSS compliant Payment Gateway.
                </p>
                <p>© 2023 RNA Intellectual Property Limited. Privacy Policy - Terms of Use - Terms & Conditions</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Payable Amount</h2>
              
              <div className="space-y-3 mb-4 p-4 border rounded-lg">
                <div className="flex justify-between">
                  <span>Total MRP</span>
                  <span className="font-semibold">₹{getTotalPrice()}</span>
                </div>
                
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span className="font-semibold">- ₹{calculateSavings()}</span>
                </div>
                
                <div className="flex justify-between text-green-600">
                  <span>Standard Shipping</span>
                  <span className="font-semibold">FREE</span>
                </div>
                
                <hr />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Grand Total</span>
                  <span>₹{getTotalPrice() - calculateSavings()}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-primary-600">Order Summary</h3>
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

export default Payment;