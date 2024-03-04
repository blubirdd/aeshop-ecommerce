import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../../context/ShopContext'
import axiosClient from '../../axios-client';

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { toast } from 'react-toastify';

function ProductDisplay({ product }) {

  const { addToCart, getItemStock, cartItems } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);
  const [initialStock, setInitialStock] = useState(product.stock);

  const stock = product.stock;

  //
  const [item, setItem] = useState({
    product_id: product.id,
    quantity: 1,
  });

  useEffect(() => {
    console.log("INITIAL STOCK IS " + initialStock);
  }, [initialStock]);


  const handleAddToCart = (productID) => {
    axiosClient.post('/cart', item)
    .then(() => {
      toast.success("Product added to cart successfully");
    })
    .catch(err => {
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors)
      }
    })
  };

  const handleIncrement = () => {
    if (quantity < stock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else {
      console.error("Maximum stock reached");
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  // const handleAddToCart = () => {
  //   addToCart(product.id, quantity);
  //   setInitialStock((prevInitialStock) => prevInitialStock - quantity);
  //   setQuantity(1);
  // };

  const [galleryOptions, setGalleryOptions] = useState({
    showPlayButton: false, 
    lazyLoad: true,
    showFullscreenButton: false,
  });

  const images =  [
    {
      original: product.image,
      thumbnail: product.image,
    }
  ]; 

  // const images = product.image.map((img, index) => ({
  //   original: img,
  //   thumbnail: img,

  // }));
  return (
    <>
      <div className="overflow-hidden bg-neutral-50 font-poppins dark:bg-gray-800">
        <div className="max-w-7xl px-4 py-4 mt-2 mx-auto lg:py-8 md:px-6">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 md:w-1/2 ">
              <div className="sticky top-0 z-10 overflow-hidden bg-white rounded-md p-2">
              <ImageGallery items={images} {...galleryOptions}  /> 
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2">
              <div className="lg:pl-4">
                <div className="pb-6 mb-8 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="max-w-xl mt-2 mb-2 text-xl font-bold dark:text-gray-300 md:text-4xl">
                    {product.name}
                  </h2>

                  <p className="inline-block text-3xl mb-4 font-bold text-sky-900 dark:text-gray-400 ">
                    <span>₱{product.newPrice?.toLocaleString()} &nbsp;</span>
                  </p>

                  <p className="max-w-md mb-1 text-gray-500 dark:text-gray-400 text-sm">
                    Stock: {product.stock}
                  </p>

                  <div className="space-y-2 items-center">
                    <div className="mb-4 mr-4 lg:mb-0">
                      <div className="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg dark:bg-slate-900 dark:border-gray-700" data-hs-input-number>
                        <div className="flex items-center gap-x-1.5">
                          <button
                            type="button"
                            onClick={handleDecrement}
                            className="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          >
                            <svg className="flex-shrink-0 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /></svg>
                          </button>
                          <input
                            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                            className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-white"
                            type="text"
                            value={quantity}
                          />
                          <button
                            type="button"
                            className="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                            onClick={handleIncrement}
                            disabled={quantity >= initialStock || cartItems[product.id] >= initialStock}
                          >
                            <svg className="flex-shrink-0 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                          </button>
                        </div>
                      </div>
                      {quantity > stock ? (
                        <p className="text-sm text-red-400">This item is out of stock</p>
                      ) : quantity >= stock || cartItems[product.id] >= stock ? (
                        <p className="text-sm text-red-400">Maximum stock reached</p>
                      ) : null}
                    </div>
                    <div className="mb-4 mr-4 lg:mb-0">
                      {/* add to cart button  */}
                      <button
                        onClick={() => { handleAddToCart() }}
                        className="w-full md:w-80 h-10 p-2 mr-4 rounded-md text-lg font-bold bg-sky-700 hover:bg-sky-600 disabled:bg-gray-400 dark:text-gray-200 text-gray-50   dark:bg-blue-600 dark:hover:bg-blue-500"
                        disabled={quantity > stock || cartItems[product.id] >= stock}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>

                  <p className="max-w-md my-4 font-semibold text-gray-700 dark:text-gray-400">
                    {product.description}
                  </p>
                  <p className="max-w-lg text-justify text-gray-700 dark:text-gray-400">
                    {product.details}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDisplay