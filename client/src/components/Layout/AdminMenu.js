import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="bg-gray-100 p-4">
          <h4 className="font-bold">Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/create-category"
            className="block py-2 px-4 text-gray-800 hover:bg-gray-200"
            activeClassName="bg-gray-200"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="block py-2 px-4 text-gray-800 hover:bg-gray-200"
            activeClassName="bg-gray-200"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="block py-2 px-4 text-gray-800 hover:bg-gray-200"
            activeClassName="bg-gray-200"
          >
            Users
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
