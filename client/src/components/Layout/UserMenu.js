import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="text-center border md:h-[75vh]">
      <div className="p-4">
        <h4 className="font-bold py-2 px-4 border-b-2 bg-blue-gray-50 text-gray-800">Dashboard</h4>
        <NavLink
          to="/dashboard/user/profile"
          className="block py-2 px-4 border-b text-gray-800 hover:bg-gray-200"
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className="block py-2 px-4 border-b text-gray-800 hover:bg-gray-200"
        >
          Orders
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
