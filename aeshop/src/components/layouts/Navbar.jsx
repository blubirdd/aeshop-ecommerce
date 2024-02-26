import React, { useContext, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext'
import aeshop from '/aeshop.jpg'

function Navbar() {

  const { getTotalOfCartProducts } = useContext(ShopContext);
  const { products, cartItems } = useContext(ShopContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    setSearchQuery('');
  }, [location]);

  let displayedItemCount = 0;

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
          <div className="sm:hidden">
            <button
              type="button"
              className="inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-xs dark:bg-gray-800 dark:hover:bg-slate-800 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800">
              <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            </button>
          </div>

          <div className="hidden sm:block">
            <label htmlFor="icon" className="sr-only">Search</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                className="py-2 pe-10 ps-3 block w-80 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Search for an item"
              />
              <button
                type="button"
                onClick={handleSearch}
                className="absolute inset-y-0 end-0 flex items-center px-4 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ">
                  <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          <div className="flex flex-row items-center justify-end gap-3">
            <div className="hs-dropdown [--trigger:hover]  z-50">
              {/* notification button */}
              <button
                type="button"
                id="hs-dropdown-hover-event"
                className="w-[2.375rem] h-[2.375rem] hs-dropdown-toggle inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-offcanvas="#hs-offcanvas-left"
              >
                <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 21">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C15 15.4 15 16 14.462 16H1.538C1 16 1 15.4 1 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 8 3.464ZM4.54 16a3.48 3.48 0 0 0 6.92 0H4.54Z" />
                </svg>
              </button>
              <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[20rem] border bg-gray-50 shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full" aria-labelledby="hs-dropdown-hover-event">
                <div className="py-2 first:pt-0 last:pb-0">
                  <span className="block py-3 px-3 text-sm text-black dark:text-white">
                    Your notifications will show up here
                  </span>
                </div>
              </div>
            </div>
            {/* cart button */}
            {location.pathname !== '/cart' && (
              <div className="cartButton z-50">
                <div className="hs-dropdown [--trigger:hover]">
                  <Link to="/cart">
                    <button
                      type="button"
                      id="hs-dropdown-hover-event"
                      className="hs-dropdown-toggle relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out"
                      aria-label="Cart"
                      data-hs-offcanvas="#hs-offcanvas-right"
                    >
                      <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                      <span className="absolute inset-0 object-right-top -mr-6 -mt-3">
                        <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                          {getTotalOfCartProducts()}
                        </div>
                      </span>
                    </button>
                  </Link>

                  <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[20rem] border bg-gray-50 shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full" aria-labelledby="hs-dropdown-hover-event">
                    <div className="py-2 first:pt-0 last:pb-0">
                      <span className="block py-2 px-3 text-xs font-medium uppercase text-gray-400 dark:text-gray-500">
                        Recently Added Items
                      </span>

                      {getTotalOfCartProducts() === 0 ? (
                        <p className="p-4 text-gray-800">
                          There are no items in your cart
                        </p>
                      ) : (
                        products.map((product) => {
                          if (cartItems[product.id] > 0 && displayedItemCount < 5) {
                            displayedItemCount++;
                            return (
                              <Link to="/cart" key={product.id} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700">
                                <img src={product.image[0]} className="w-10 h-auto" alt={`Product: ${product.name}`} />
                                <span>{product.name} </span>
                                <span className="ml-auto text-sky-950 font-semibold">₱{product.new_price.toLocaleString()} </span>
                              </Link>
                            );
                          }
                        })
                      )}
                    </div>
                    {
                      getTotalOfCartProducts() >= 1 &&
                      <div className="py-2 first:pt-0 last:pb-0">
                        <Link to="/cart" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700" href="#">
                          View my Shopping Cart
                        </Link>
                      </div>
                    }
                  </div>
                </div>
              </div>
            )}

            <Link to="/guest/login"
              className="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
              <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-2 3h4a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z" />
              </svg>
            </Link>

            {/* user button */}
            {/* <div className="hs-dropdown [--trigger:hover] relative inline-flex">
              <button
                id="hs-dropdown-hover-event"
                type="button"
                className="hs-dropdown-toggle w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                <img
                  className="inline-block w-[2rem] h-[2rem] ms-4 rounded-full ring-2 ring-white dark:ring-gray-800"
                  src={profileImage}
                  alt="Image Description"
                />
              </button>

              <div className="hs-dropdown-menu transition-[opacity,margin] z-50 duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-gray-50 shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full" aria-labelledby="hs-dropdown-hover-event">
                <div className="py-3 px-5 -m-2 bg-gray-100 rounded-t-lg dark:bg-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Signed in as</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-300">james@site.com</p>
                </div>
                <div className="mt-2 py-2 first:pt-0 last:pb-0 ">
                  <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm  bg-gray-50 hover:bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                    <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                    Manage account
                  </a>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </nav>
    </header >
  )
}

export default Navbar