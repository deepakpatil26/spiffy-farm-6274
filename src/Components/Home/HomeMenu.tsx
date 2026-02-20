import React from "react";
import { Link } from "react-router-dom";

const HomeMenu: React.FC = () => {
  const categories = [
    { name: "Clothes", slug: "clothes" },
    { name: "Electronics", slug: "electronics" },
    { name: "Furniture", slug: "furniture" },
    { name: "Shoes", slug: "shoes" },
    { name: "Miscellaneous", slug: "miscellaneous" },
  ];

  return (
    <div className="hidden lg:flex items-center justify-center space-x-10 relative">
      {categories.map((category) => (
        <div key={category.slug} className="relative group">
          <Link
            to={`/category/${category.slug}`}
            className="text-gray-700 hover:text-primary-500 font-semibold py-4 transition-colors duration-200 text-lg uppercase tracking-wide"
          >
            {category.name}
          </Link>
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></div>
        </div>
      ))}
    </div>
  );
};

export default HomeMenu;