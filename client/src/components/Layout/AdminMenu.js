import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center border md:h-[75vh]">
        <div className="p-4">
          <h4 className="font-bold py-2 px-4 border-b-2 bg-blue-gray-50 text-gray-800">Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/create-category"
            className="block py-2 px-4 border-b text-gray-800 hover:bg-gray-200"
            activeClassName="bg-gray-200"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="block py-2 px-4 border-b text-gray-800 hover:bg-gray-200"
            activeClassName="bg-gray-200"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="block py-2 px-4 border-b text-gray-800 hover:bg-gray-200"
            activeClassName="bg-gray-200"
          >
            Users
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="block py-2 px-4 border-b text-gray-800 hover:bg-gray-200"
            activeClassName="bg-gray-200"
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="block py-2 px-4 border-b text-gray-800 hover:bg-gray-200"
            activeClassName="bg-gray-200"
          >
            orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
