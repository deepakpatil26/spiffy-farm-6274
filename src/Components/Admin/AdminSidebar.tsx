import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineProductionQuantityLimits, MdOutlineAddCircleOutline } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";

interface SidebarItem {
  title: string;
  icon: React.ReactNode;
  link: string;
}

const sidebarData: SidebarItem[] = [
  {
    title: "Products",
    icon: <MdOutlineProductionQuantityLimits className="w-5 h-5" />,
    link: "/products",
  },
  {
    title: "Add Product",
    icon: <MdOutlineAddCircleOutline className="w-5 h-5" />,
    link: "/manageProduct",
  },
  {
    title: "Manage Users",
    icon: <BsGraphUpArrow className="w-5 h-5" />,
    link: "/users",
  },
];

const AdminSidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="fixed left-0 top-16 h-full w-64 bg-gray-100 border-r border-gray-200 z-40">
      <div className="p-4">
        <ul className="space-y-2">
          {sidebarData.map((item, index) => {
            const isActive = location.pathname === item.link;
            return (
              <li key={index}>
                <Link
                  to={item.link}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-primary-500 text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span className={isActive ? "text-white" : "text-gray-500"}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;