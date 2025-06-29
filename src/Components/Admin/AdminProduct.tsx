import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import { productService } from "../../services/productService";
import { Product } from "../../types";

const AdminProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<'men' | 'women'>("women");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = category === 'men' 
        ? await productService.getMenProducts()
        : await productService.getWomenProducts();
      setProducts(result.data);
    } catch (err: any) {
      setError("Failed to fetch products. Please try again.");
      toast.error("Error fetching products");
    } finally {
      setIsLoading(false);
    }
  }, [category]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await productService.deleteProduct(id);
      toast.success("Product deleted successfully");
      getData();
    } catch (error) {
      toast.error("Error deleting product");
    }
  };

  if (error) {
    return (
      <>
        <AdminNavbar />
        <AdminSidebar />
        <div className="ml-64 pt-16 p-8">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={getData}
              className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg"
            >
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <div className="ml-64 pt-16 p-8">
        <div className="mb-6">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as 'men' | 'women')}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="women">Women</option>
            <option value="men">Men</option>
          </select>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-lg font-bold text-primary-600">₹{product.price}</p>
                  <div className="flex space-x-2 mt-4">
                    <Link
                      to={`/editProduct/${product.id}`}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-center transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminProduct;