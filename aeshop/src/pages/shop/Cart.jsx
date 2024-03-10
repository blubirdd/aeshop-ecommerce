import React, {useState, useEffect} from 'react'
import CartItem from '../../components/product/CartItem'
import OrderSummary from '../../components/product/OrderSummary'
import axiosClient from '../../axios-client'
function Cart() {

  return (
    <div className="mx-auto">
      <div className="flex flex-col md:flex-row">
      <CartItem />
      <OrderSummary   />
      </div>
    </div>
  )
}

export default Cart