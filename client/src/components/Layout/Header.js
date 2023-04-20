import { useState } from "react";

import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import SearchInput from "../Form/SearchInput";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import {AiOutlineClose,AiOutlineMenu} from "react-icons/ai"
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import useCategory from "../hooks/useCategory";
const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const {categories} = useCategory();
  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: null });
    localStorage.removeItem("auth");
  };
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <nav className="border shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center w-full justify-between ">
            <div className="flex-shrink-0">
              <NavLink to="/">
                <span className="self-center text-3xl  font-bold  text-[#2196F3]">
                  SHOPHUNT
                </span>
              </NavLink>
            </div>
            <div className="hidden lg:block">
              <div className="flex items-center justify-between w-full space-x-4">
                {/* Current: "-900 text-gray-400", Default: "text-gray-300 hover:-700 hover:text-gray-400" */}
                <SearchInput />
                <NavLink
                  to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                  className="-900 text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </NavLink>
                <div>
                  <Menu>
                    <MenuHandler>
                      <div className="-900 cursor-pointer text-gray-400 px-3 py-2 rounded-md text-sm font-medium">
                        Categories
                      </div>
                    </MenuHandler>
                    <MenuList>
                      {categories?.map((c) => (
                        <NavLink to={`/category/${c.slug}`} key={c._id}>
                          <MenuItem>{c.name}</MenuItem>
                        </NavLink>
                      ))}
                    </MenuList>
                  </Menu>
                </div>
                {!auth.user ? (
                  <>
                    <NavLink
                      to="/register"
                      className="-900 text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
                      aria-current="page"
                    >
                      register
                    </NavLink>
                    <NavLink
                      to="/login"
                      className="-900 text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
                      aria-current="page"
                    >
                      Login
                    </NavLink>
                  </>
                ) : (
                  <NavLink
                    to="/login"
                    className="-900 text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
                    onClick={handleLogout}
                  >
                    {" "}
                    Logout
                  </NavLink>
                )}
                <div>
                <NavLink to={`/cart`}>
                  <div className="relative">
                    <FaShoppingCart className="text-2xl text-gray-500" />
                    {cart?.length > 0 && (
                      <span className="absolute -top-1 -right-2 bg-blue-400 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-gray-400">
                        {cart?.length}
                      </span>
                    )}
                  </div>
                </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="-mr-2 flex lg:hidden">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <AiOutlineMenu size={"1.5rem"}/>
                ) : (
                  
                  <AiOutlineClose size={"1.5rem"}/>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div
        className={`${isOpen ? "block" : "hidden"} lg:hidden `} 
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {/* Current: "-900 text-gray-400", Default: "text-gray-300 hover:-700 hover:text-gray-400" */}
          <SearchInput />
          <NavLink
            to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
            className="-900 text-gray-400 block px-3 py-2 rounded-md text-base font-medium"
          >
            Dashboard
          </NavLink>
          <div>
            <Menu>
              <MenuHandler>
                <div className=" cursor-pointer text-gray-400 px-3 py-2 rounded-md text-sm font-medium">
                  Categories
                </div>
              </MenuHandler>
              <MenuList>
                {categories?.map((c) => (
                  <NavLink to={`/category/${c.slug}`} key={c._id}>
                    <MenuItem>{c.name}</MenuItem>
                  </NavLink>
                ))}
              </MenuList>
            </Menu>
          </div>
          <NavLink to={`/cart`}>
            <div className="relative px-3 py-2">
              <FaShoppingCart className="text-2xl text-gray-500" />
              {cart?.length > 0 && (
                <span className="absolute -top-1 -left-[-1.5rem] bg-blue-400 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-gray-400">
                  {cart?.length}
                </span>
              )}
            </div>
          </NavLink>
          {!auth.user ? (
            <>
              <NavLink
                to="/register"
                className="-900 text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
                aria-current="page"
              >
                register
              </NavLink>

              <NavLink
                to="/login"
                className="-900 text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
                aria-current="page"
              >
                Login
              </NavLink>
            </>
          ) : (
            <NavLink
              to="/login"
              className="-900 text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
              onClick={handleLogout}
            >
              {" "}
              Logout
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

