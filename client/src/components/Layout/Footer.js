import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className=' py-4 text-white text-center  font-bold bg-[#2196F3]'>
        <p>All rights reserved by @suryasai</p>
        <ul className="flex flex-col justify-center items-center font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
  <li>
          <Link to="/About" className="block py-2 pl-3 pr-4 text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</Link>
        </li>
        <li>
          <Link to="/Contact" className="block py-2 pl-3 pr-4 text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</Link>
        </li>
        <li>
          <Link to="/Policy" className="block py-2 pl-3 pr-4 text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Policy</Link>
        </li>
        </ul>
    </div>
  )
}

export default Footer