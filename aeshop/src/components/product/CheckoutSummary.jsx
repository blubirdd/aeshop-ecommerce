import React, { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';

function CheckoutSummary() {
  const { products, cartItems, getTotalOfCartProducts, getTotalCartAmount } = useContext(ShopContext);

  return (
    <div className="w-full md:w-1/3 bg-white border px-4 py-4 md:mr-5 md:px-6 md:py-4 mt-4 rounded-xl">
      <h1 className="font-semibold text-lg md:text-xl border-b pb-2">Order Summary</h1>
      <div className="flex flex-col md:flex-row justify-between mt-4 md:mt-10 mb-4 md:mb-5">
        <span className="font-semibold text-sm uppercase mb-2 md:mb-0">{getTotalOfCartProducts()} Items</span>
        <span className="font-semibold text-sm md:text-md">Subtotal: ₱{getTotalCartAmount().toLocaleString()}</span>
      </div>

      <div className="product-list md:overflow-auto md:h-[350px] rounded-sm [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500">
        {products.map((product) => {
          if (cartItems[product.id] > 0) {
            return (
              <div key={product.id} className="flex flex-col md:flex-row justify-between py-4 md:py-5 border-b md:border-b-4 border-b-gray-100">
                <div className="flex items-center md:items-start">
                  <div className="w-16 md:mr-4">
                    <img className="h-auto object-contain" src={product.image[0]} alt="" />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <span className="font-semibold md:text-sm">{product.name}</span>
                  </div>
                </div>
                <span className="text-center md:text-left w-full md:w-1/5 font-bold text-sky-950 text-sm md:text-md mt-2 md:mt-0">
                  ₱{(product.new_price * cartItems[product.id]).toLocaleString()}
                </span>
              </div>
            );
          }
          return null;
        })}
      </div>
      <div>
        <label className="font-medium inline-block mb-2 text-sm uppercase mt-4">Shipping</label>
        <input className="block p-2 text-gray-600 w-full text-sm" value="JNT Express - ₱50" readOnly />
      </div>
      <div className="border-t mt-4 mx-2">
        <div className="flex font-bold justify-between py-4 md:py-6 text-sm uppercase">
          <span>Total cost</span>
          <span className="text-lg text-sky-700">₱{(getTotalCartAmount() + 50).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSummary;
