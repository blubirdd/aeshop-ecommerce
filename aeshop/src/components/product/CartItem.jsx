import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ConfirmDialog from '../others/ConfirmDialog';
import axiosClient from '../../axios-client';
function CartItem() {

  const [cart, setCart] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    fetchCart();
  }, [])

  const fetchCart = async () => {
    try {
      const response = await axiosClient.get('/cart')
      setCart(response.data.cart);
      console.log(response.data.cart);
    } catch (error) {
      console.error("Error: ", error)
    }
  }

  const handleDecreaseQuantity = (productID) => {
    handleUpdateQuantity(productID, 'dec');
  }

  const handleIncreaseQuantity = (productID) => {
    handleUpdateQuantity(productID, 'inc');
  }

  const handleUpdateQuantity = async (productID, action) => {
    try {
      await axiosClient.patch(`/cart/${productID}`, { action });
      fetchCart();
    } catch (error) {
      console.error("Error: ", error);
    }
  };


  const showConfirmationDialog = (productID) => {
    setItemToDelete(productID);
    setShowConfirmDialog(true);
  };

  const handleDeleteConfirmation = () =>{
    if(itemToDelete){
      handleRemoveFromCart(itemToDelete);
      setItemToDelete(null);
      setShowConfirmDialog(false);
    }
  }

  const handleRemoveFromCart = async (productID) => {
    try {
     axiosClient.delete(`/cart/${productID}`)
      fetchCart();
    } catch (error) {
      console.error("Error: ", error)
    }

  }

  return (
    <>
      {showConfirmDialog && (
        <ConfirmDialog
          message="Are you sure you want to remove this item from the cart?"
          onConfirm={handleDeleteConfirmation}
          onCancel={() => setShowConfirmDialog(false)}
        />
      )}

      <div className="cart-item-container w-full md:w-3/4 bg-white px-5 sm:px-10 py-10 sm:overflow-auto sm:h-[600px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500">
        <div className="flex justify-between pb-1">
          <h1 className="font-semibold text-2xl">My Cart</h1>
        </div>
        <div className="flex mt-4 mb-5">
          <h3 className="font-semibold text-gray-600 text-xs uppercase w-3/5">Product Details</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">Total</h3>
        </div>

        {/* cart items */}
        {cart.products?.map((product) => {
          return (
            <div key={product.product.id} className="flex items-center hover:bg-gray-50 -mx-8 px-5 sm:px-6 py-5 border-b-4 border-b-gray-100">
              <div className="flex w-3/5">
                <Link to={`/product/${product.product.slug}`} className="w-16 sm:w-24">
                  <img className="h-auto object-contain" src={product.product.image} alt="" />
                </Link>
                <div className="flex flex-col ml-4 flex-grow mb-2">
                  <span className="font-bold text-xs sm:text-lg">{product.product.name}</span>
                  <span className="text-sky-900 font-bold py-1 text-xs md:text-sm">₱{product.product.newPrice?.toLocaleString()}</span>
                  <button
                    type="button"
                    onClick={() => showConfirmationDialog(product.product.id)}
                    className="group flex mt-auto font-semibold text-start hover:text-red-500 text-red-400 text-xs">
                    <span className="ps-1">Remove</span>
                  </button>
                </div>
              </div>
              <div className="w-1/5 flex flex-col items-center justify-center">
                <div className="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg dark:bg-slate-900 dark:border-gray-700" data-hs-input-number>
                  <div className="flex items-center gap-x-1.5">
                    <button
                      type="button"
                      onClick={() => handleDecreaseQuantity(product.product.id)}
                      className="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      data-hs-input-number-decrement>
                      <svg className="flex-shrink-0 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /></svg>
                    </button>
                    <input
                      className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-white"
                      type="text"
                      value={product.quantity}
                      onChange={(e) => { }}
                      readOnly
                      data-hs-input-number-input
                    />
                    <button
                      type="button"
                      onClick={() => handleIncreaseQuantity(product.product.id)}
                      className="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      // disabled={product.stock >= product.stock}
                      data-hs-input-number-increment>

                      <svg className="flex-shrink-0 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                    </button>
                  </div>
                </div>
                {/* {cartItems[product.id] >= product.stock && (
                      <p className=" text-red-400 text-xs p-2">Max reached</p>
                    )} */}
              </div>
              <span className="text-center w-1/5 font-bold text-sky-950 text-sm sm:text-md">₱{(product.product.newPrice * product.quantity)?.toLocaleString()}</span>
            </div>
          );
          return null;
        })}
        {cart.products?.length === 0 ? (
          <div>
            <p>There are no items in your cart</p>
            <Link to="/" className="flex font-semibold text-sky-600 text-sm mt-10">
              <svg className="fill-current mr-2 text-sky-600 w-4" viewBox="0 0 448 512">
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Browse Products
            </Link>
          </div>
        ) : (
          <Link to="/" className="flex font-semibold text-sky-600 text-sm mt-10">
            <svg className="fill-current mr-2 text-sky-600 w-4" viewBox="0 0 448 512">
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </Link>
        )}
      </div>
    </>
  )
}

export default CartItem