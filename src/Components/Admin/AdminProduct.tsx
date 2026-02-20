import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import { newProductService } from "../../services/newProductService";
import { productService } from "../../services/productService";
import { Product } from "../../types";

const AdminProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Use newProductService to get all products, sorted by newest first
      const result = await newProductService.getProducts({ limit: 50 }); // Fetch top 50 newest products
      setProducts(result.data);
    } catch (err: any) {
      setError("Failed to fetch products. Please try again.");
      console.error(err);
      toast.error("Error fetching products");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      // Keep using productService for delete as it might need specific backend ID logic
      // or check if newProductService has delete (it doesn't seem to based on previous read)
      await productService.deleteProduct(id);
      toast.success("Product deleted successfully");
      getData(); // Refresh list
    } catch (error) {
      console.error(error);
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
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Manage Products</h2>
          <Link
            to="/manageProduct"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
          >
            + Add New Product
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="relative h-48">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-700">
                    {product.category}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1" title={product.title}>
                    {product.title}
                  </h3>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-lg font-bold text-primary-600">₹{product.price}</p>
                    {product.gender && (
                      <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-0.5 rounded">{product.gender}</span>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Link
                      to={`/editProduct/${product.id}`}
                      className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 px-3 rounded-lg text-center text-sm font-medium transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 py-2 px-3 rounded-lg text-center text-sm font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && products.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 text-lg">No products found.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminProduct;