import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { Link } from 'react-router-dom';
import axiosClient from '../../axios-client';
import Loading from '../others/Loading';

function OrderSummary() {

  // const { getTotalOfCartProducts, getTotalCartAmount, cartItems } = useContext(ShopContext);
  const [cartSummary, setcartSummary] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCartSummary();
  }, [])

  const getCartSummary = async () => {
    setLoading(true);
    const response = await axiosClient.get('/cartSummary')
    try {
      setcartSummary(response.data)
      setLoading(false);
    } catch (error) {
      console.error("Error: ", error);
      setLoading(false);
    }
  }

  return (
    <>
      <div className="w-full md:w-1/3 mx-auto bg-white border border-gray-300 px-10 py-10">
        <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
        {loading &&
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        }
        {!loading &&
          <div className="summary">
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">{cartSummary.totalQuantity} Items</span>
              <span className="font-semibold text-sm">₱{cartSummary.totalAmount?.toLocaleString()}</span>
            </div>
            <div>
              <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>JNT Express - ₱50</option>
              </select>
            </div>
            <div className="border-t mt-8">
              <div className="flex font-bold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>₱{(cartSummary.totalAmount + 50).toLocaleString()}</span>
              </div>
              {cartSummary.totalQuantity >= 1 ? (
                <Link to="/checkout">
                  <button className="bg-sky-700 font-semibold hover:bg-sky-600 py-3 text-md text-white uppercase w-full rounded-md">Checkout</button>
                </Link>
              ) : (
                <>
                  <button disabled className="bg-gray-300 cursor-not-allowed font-semibold py-3 text-md text-white uppercase w-full rounded-md">Checkout</button>
                  <p className="text-center text-red-400 text-sm">There are no items in your cart</p>
                </>
              )}
            </div>
          </div>
        }

      </div>

    </>



  )
}

export default OrderSummary