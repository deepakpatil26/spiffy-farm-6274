import React from "react";
import "./Admin.css";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import { Link } from "react-router-dom";
import { MdOutlineAddCircleOutline } from "react-icons/md";

const sidebarData = [
  {
    title: "Products",
    icon: <MdOutlineProductionQuantityLimits />,
    link: "/products",
  },
  {
    title: "Add Product",
    icon: <MdOutlineAddCircleOutline />,
    link: "/manageProduct",
  },
  { title: "Manage Users", icon: <BsGraphUpArrow />, link: "/users" },
];

function AdminSidebar() {
  return (
    <div className="AdminSideBar">
      <ul className="SidebarList">
        {sidebarData.map((el, id) => {
          return (
            <Link to={el.link} key={id}>
              <li className="row">
                <div className="icon">{el.icon}</div>
                <div className="title">{el.title}</div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
export default AdminSidebar;
