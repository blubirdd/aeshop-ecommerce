import React from 'react'
import CheckoutSummary from '../components/product/CheckoutSummary'
import CheckoutForm from '../components/product/CheckoutForm'

function Checkout() {
  return (
    <>
      <div className="flex flex-col sm:flex-row">
        <CheckoutForm />
        <CheckoutSummary />
      </div>
    </>
  )
}

export default Checkout