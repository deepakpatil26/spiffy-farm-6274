import React, { useState } from "react";
import { toast } from "react-toastify";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import { newProductService } from "../../services/newProductService";
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
      const newProduct = {
        ...product,
        gender: product.gender as 'men' | 'women',
        type: product.type || '',
        actualPrice: product.actualPrice || product.price
      };

      await newProductService.addProduct(newProduct);
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
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow"
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
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">₹</span>
                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    className="w-full pl-8 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                    min="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Actual Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">₹</span>
                  <input
                    type="number"
                    name="actualPrice"
                    value={product.actualPrice}
                    onChange={handleChange}
                    className="w-full pl-8 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    min="0"
                  />
                </div>
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
                placeholder="e.g. Premium Leather Jacket"
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
                  <option value="unisex">Unisex</option>
                  <option value="kids">Kids</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <input
                  type="text"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  placeholder="e.g. Shoes, Electronics, Furniture"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                  list="category-suggestions"
                />
                <datalist id="category-suggestions">
                  <option value="Clothes" />
                  <option value="Electronics" />
                  <option value="Furniture" />
                  <option value="Shoes" />
                  <option value="Miscellaneous" />
                  <option value="Casual Shirts" />
                  <option value="Jeans" />
                  <option value="T-Shirts" />
                  <option value="Kurtas" />
                </datalist>
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
                  placeholder="e.g. regular, sale, new"
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
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg font-bold shadow-md transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
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