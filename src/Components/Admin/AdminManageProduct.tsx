import React, { useState } from "react";
import { toast } from "react-toastify";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import { productService } from "../../services/productService";
import { Product } from "../../types";

const initialState: Omit<Product, 'id' | 'created_at'> = {
  image: "",
  img1: "",
  img2: "",
  img3: "",
  img4: "",
  price: 0,
  actualPrice: 0,
  title: "",
  gender: "men",
  category: "",
  type: "",
  discount: 0,
};

const AdminManageProduct: React.FC = () => {
  const [product, setProduct] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'actualPrice' || name === 'discount' 
        ? Number(value) 
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!product.title || !product.image || !product.price || !product.category) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsLoading(true);
    try {
      await productService.addProduct(product);
      toast.success("Product added successfully");
      setProduct(initialState);
    } catch (error: any) {
      toast.error("Error adding product: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <div className="ml-64 pt-16 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Main Image URL *
              </label>
              <input
                type="url"
                name="image"
                value={product.image}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image 1 URL
                </label>
                <input
                  type="url"
                  name="img1"
                  value={product.img1}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image 2 URL
                </label>
                <input
                  type="url"
                  name="img2"
                  value={product.img2}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image 3 URL
                </label>
                <input
                  type="url"
                  name="img3"
                  value={product.img3}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image 4 URL
                </label>
                <input
                  type="url"
                  name="img4"
                  value={product.img4}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price *
                </label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Actual Price
                </label>
                <input
                  type="number"
                  name="actualPrice"
                  value={product.actualPrice}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={product.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={product.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                >
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                >
                  <option value="">Select Category</option>
                  {product.gender === "women" ? (
                    <>
                      <option value="Kurtas and Kurtis">Kurtas and Kurtis</option>
                      <option value="Dresses and Jumpsuits">Dresses and Jumpsuits</option>
                    </>
                  ) : (
                    <>
                      <option value="Casual Shirts">Casual Shirts</option>
                      <option value="Jeans">Jeans</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <input
                  type="text"
                  name="type"
                  value={product.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount %
                </label>
                <input
                  type="number"
                  name="discount"
                  value={product.discount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {isLoading ? "Adding Product..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminManageProduct;