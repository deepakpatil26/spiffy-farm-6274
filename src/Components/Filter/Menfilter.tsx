import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";

interface MenfilterProps {
  type: 'men' | 'women';
}

const Menfilter: React.FC<MenfilterProps> = ({ type }) => {
  const getCurrentPage = (page: string | null): number => {
    const pageNum = Number(page);
    return typeof pageNum !== "number" || pageNum <= 0 || !pageNum ? 1 : pageNum;
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.getAll("category");
  const [category, setCategory] = useState<string[]>(initialCategory || []);
  const [page] = useState<number>(getCurrentPage(searchParams.get("page")));
  const initialOrder = searchParams.get("order");
  const [order, setOrder] = useState<string>(initialOrder || "");
  const [showPriceFilter, setShowPriceFilter] = useState<boolean>(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState<boolean>(false);

  const handleSort = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCategory(prev => {
      if (prev.includes(value)) {
        return prev.filter(el => el !== value);
      }
      return [...prev, value];
    });
  };

  useEffect(() => {
    const params: Record<string, string | string[]> = {
      page: page.toString(),
      category,
    };
    if (order) {
      params.order = order;
    }
    setSearchParams(params);
  }, [category, page, order, setSearchParams]);

  return (
    <div className="flex flex-col md:flex-row gap-4 mx-4 md:mx-8 my-8 p-4 bg-gray-100 rounded-lg justify-center">
      {/* Price Filter */}
      <div className="relative">
        <button
          onClick={() => setShowPriceFilter(!showPriceFilter)}
          className="flex items-center justify-between w-full md:w-auto px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-sm md:text-base"
        >
          Filter By Price
          {showPriceFilter ? (
            <MdOutlineKeyboardArrowUp className="ml-2 h-5 w-5" />
          ) : (
            <MdOutlineKeyboardArrowDown className="ml-2 h-5 w-5" />
          )}
        </button>
        
        {showPriceFilter && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
            <div className="p-4 space-y-3" onChange={handleSort}>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="asc"
                  name="order"
                  defaultChecked={order === "asc"}
                  className="text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm">Low To High</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="desc"
                  name="order"
                  defaultChecked={order === "desc"}
                  className="text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm">High To Low</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="relative">
        <button
          onClick={() => setShowCategoryFilter(!showCategoryFilter)}
          className="flex items-center justify-between w-full md:w-auto px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-sm md:text-base"
        >
          Filter By Category
          {showCategoryFilter ? (
            <MdOutlineKeyboardArrowUp className="ml-2 h-5 w-5" />
          ) : (
            <MdOutlineKeyboardArrowDown className="ml-2 h-5 w-5" />
          )}
        </button>
        
        {showCategoryFilter && (
          <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-10">
            <div className="p-4 space-y-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  onChange={handleChange}
                  checked={category.includes(
                    type === "men" ? "Casual Shirts" : "Dresses and Jumpsuits"
                  )}
                  value={type === "men" ? "Casual Shirts" : "Dresses and Jumpsuits"}
                  type="checkbox"
                  className="text-primary-500 focus:ring-primary-500 rounded"
                />
                <span className="text-sm">
                  {type === "men" ? "Casual Shirts" : "Dresses and Jumpsuits"}
                </span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  onChange={handleChange}
                  checked={category.includes(
                    type === "men" ? "Jeans" : "Kurtas and Kurtis"
                  )}
                  value={type === "men" ? "Jeans" : "Kurtas and Kurtis"}
                  type="checkbox"
                  className="text-primary-500 focus:ring-primary-500 rounded"
                />
                <span className="text-sm">
                  {type === "men" ? "Jeans" : "Kurtas and Kurtis"}
                </span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menfilter;