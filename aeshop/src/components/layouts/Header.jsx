import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function Header() {

  const [menu, setMenu] = useState("shop");
  return (
    <nav className="sticky -top-px z-30 bg-white text-sm font-medium border-b-2 text-black ring-1 ring-gray-900 ring-opacity-5 shadow-sm shadow-gray-100 pt-3 md:pb-3 -mt-px dark:bg-slate-900 dark:border-gray-800 dark:shadow-slate-700/[.7]" aria-label="Jump links">
      <div className="max-w-7xl nap-x w-full flex items-center overflow-x-auto px-4 sm:px-6 lg:px-8 pb-4 md:pb-0 mx-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-slate-900">
        <p onClick={() => { setMenu("shop") }} className="snap-center shrink-0 pe-5 sm:pe-8 sm:last-pe-0">
          <NavLink to='/'
            className="aria-[current=page]:border-b-2 border-sky-600 inline-flex items-center gap-x-2 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            Home
          </NavLink>
        </p>
        <p onClick={() => { setMenu("tech") }} className="snap-center shrink-0 pe-5 sm:pe-8 sm:last-pe-0">
          <NavLink to='/tech'
            className="aria-[current=page]:border-b-2 border-sky-600 inline-flex items-center gap-x-2 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            Tech & Gadgets
          </NavLink>
        </p>
        <p onClick={() => { setMenu("toys") }} className="snap-center shrink-0 pe-5 sm:pe-8 sm:last-pe-0">
          <NavLink to='/toys'
            className="aria-[current=page]:border-b-2 border-sky-600 inline-flex items-center gap-x-2 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            Toys and Games
          </NavLink>
        </p>
        <p onClick={() => { setMenu("art") }} className="snap-center shrink-0 pe-5 sm:pe-8 sm:last-pe-0">
          <NavLink to='/art'
            className="aria-[current=page]:border-b-2 border-sky-600 inline-flex items-center gap-x-2 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            Artworks
          </NavLink>
        </p>
        <p onClick={() => { setMenu("collectibles") }} className="snap-center shrink-0 pe-5 sm:pe-8 sm:last-pe-0">
          <NavLink to='/collectibles'
            className="aria-[current=page]:border-b-2 border-sky-600 inline-flex items-center gap-x-2 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            Collectibles
          </NavLink>
        </p>
      </div>
    </nav>
  )
}

export default Header