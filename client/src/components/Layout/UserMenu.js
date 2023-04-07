import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="text-center">
      <div className="space-y-2">
        <h4 className="font-bold">Dashboard</h4>
        <NavLink
          to="/dashboard/user/profile"
          className="py-3 px-4 rounded-md bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900 block"
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className="py-3 px-4 rounded-md bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900 block"
        >
          Orders
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
