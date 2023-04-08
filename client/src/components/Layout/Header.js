import React  from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'
const Header = () => {
    const [auth , setAuth] = useAuth();

    const handleLogout =()=>{
        setAuth({...auth ,user:null,token:null})
        localStorage.removeItem("auth")
    }
  return (
    
<nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 border mb-1 shadow-sm">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <NavLink to="/" className="flex items-center">
      <span className="self-center text-2xl font-extrabold whitespace-nowrap text-[#2196F3]">ShopHunt</span>
    </NavLink>
    <button data-collapse-toggle="navbar-dropdown" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
      <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <NavLink to="/" className="block py-2 pl-3 pr-4 text-blue-400 font-semibold" aria-current="page">Home</NavLink>
        </li>
        {!auth.user ?(
            <>
        <li>
          <NavLink to="/register" className="block py-2 pl-3 pr-4 text-blue-400 font-semibold" aria-current="page">register</NavLink>
        </li>
        <li>
          <NavLink to="/login" className="block py-2 pl-3 pr-4 text-blue-400 font-semibold" aria-current="page">Login</NavLink>
        </li>
        </>):
        (
          <>
          <li>
          <NavLink to={`/dashboard/${auth?.user.role===1?"admin":"user"}`} className="block py-2 pl-3 pr-4  text-blue-400 font-semibold" aria-current="page">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/login" className="block py-2 pl-3 pr-4 text-blue-400 font-semibold" aria-current="page"
          onClick={handleLogout}>Logout</NavLink>
        </li>
        </>
        )}
        
        
      </ul>
    </div>
  </div>
</nav>


  )
}

export default Header