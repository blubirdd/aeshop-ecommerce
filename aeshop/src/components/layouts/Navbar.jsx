import React, { useContext, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext'
import { UserContext } from '../../context/UserContext';
import aeshop from '/aeshop.jpg'
import UserButton from './Navbar/UserButton';
import GuestButton from './Navbar/GuestButton';
import CartButton from './Navbar/CartButton';
import SearchInput from './Navbar/SearchInput';
import NotificationButton from './Navbar/NotificationButton';

function Navbar() {

  const { user, token, setUser, setToken } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      console.log("USER LOGGED IN: " + user.name);
    }
    else {
      console.log("NO USER LOGGED IN");
    }
  }, []);

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-40 w-full bg-white text-sm py-2.5 sm:py-4 dark:bg-slate-900 dark:border-gray-700">
      <nav className="flex basis-full max-w-7xl items-center w-full mx-auto px-2 sm:px-4 md:px-6" aria-label="Global">
        <div className="me-2 md:me-2">
          <a
            className="flex-none text-xl font-semibold dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            href="/"
          >
            <img src={aeshop} className="w-32" />
          </a>
        </div>
        <div className="w-full flex items-center justify-end ms-auto sm:justify-between sm:gap-x-3 sm:order-3">
          <SearchInput />
          <div className="flex flex-row items-center justify-end gap-3">

            <NotificationButton />

            {/* cart button */}
            {location.pathname !== '/cart' && (
              <CartButton />
            )}

            {token ? <UserButton /> : <GuestButton />}

          </div>
        </div>
      </nav>
    </header >
  )
}

export default Navbar