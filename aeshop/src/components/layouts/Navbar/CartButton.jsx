import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../../../context/ShopContext';
import { Link } from 'react-router-dom';
import axiosClient from '../../../axios-client';
function CartButton() {
  
  const { getTotalOfCartProducts } = useContext(ShopContext);
  const { products, cartItems } = useContext(ShopContext);
  const [cartSummary, setcartSummary] = useState([]);
  let displayedItemCount = 0;
  
  useEffect(() => {
    getCartSummary();
  }, [cartSummary])

  const getCartSummary = async () => {
    const response = await axiosClient.get('/cartSummary')
    try {
      setcartSummary(response.data)
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  return (
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
                {cartSummary.totalQuantity}
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
  )
}

export default CartButton