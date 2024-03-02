import React from 'react'
import CartItem from '../../components/product/CartItem'
import OrderSummary from '../../components/product/OrderSummary'
function Cart() {
  return (
    <div className="mx-auto">
      <div className="flex flex-col md:flex-row">
      <CartItem />
      {/* <OrderSummary /> */}
      </div>
    </div>
  )
}

export default Cart