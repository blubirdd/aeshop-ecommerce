import React, { createContext, useEffect, useState } from 'react';
import { products } from '../constants';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < products.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
}

//24 hours
const DEFAULT_EXPIRATION_TIME = 24 * 60 * 60 * 1000;

function ShopContextProvider({ children }) {

  const [cartItems, setCartItems] = useState(() => {
    const storedData = localStorage.getItem('aeshopCart');
    if (storedData) {
      const { data, expiration } = JSON.parse(storedData);
      if (Date.now() < expiration) {
        return data;
      }
    }
    return getDefaultCart();
  });

  useEffect(() => {
    const expiration = Date.now() + DEFAULT_EXPIRATION_TIME;
    localStorage.setItem('aeshopCart', JSON.stringify({ data: cartItems, expiration }));
  }, [cartItems]);

  const [notifications, setNotifications] = useState([]);


  const setNotification = (message) => {
    // _setNotification(message);

    // setTimeout(() => {
    //   _setNotification("");
    // }, 2000);
  };


  const addToCart = (itemID, quantity) => {
    setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] + quantity }));
    const product = products.find((product) => product.id === itemID);

    setNotifications((prev) => [...prev, `${product.name} added to cart successfully`]);
  }

  const increaseQuantity = (itemID) => {
    setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] + 1 }));
  }

  //decrease quantity
  const removeFromCart = (itemID) => {
    setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] - 1 }));
  }

  //delete item from cart
  const deleteFromCart = (itemID) => {
    setCartItems((prev) => ({ ...prev, [itemID]: 0 }));
    console.log("Item removed from cart successfully");
  };

  //get total amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product.id === Number(item))
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  }

  //get number of unique products
  const getTotalOfCartProducts = () => {
    let totalCartItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalCartItems++;
      }
    }
    return totalCartItems;
  };

  const getItemStock = (itemID) => {
    const product = products.find((product) => product.id === itemID);
    return product ? product.stock : 0;
  };

  const contextValue = {
    products,
    cartItems,
    addToCart,
    increaseQuantity,
    removeFromCart,
    deleteFromCart,
    getTotalCartAmount,
    getTotalOfCartProducts,
    getItemStock,
    notifications,
    setNotification,
  };


  // useEffect(() => {
  //   console.log('Updated Cart Items:', cartItems);
  // }, [cartItems]);

  // useEffect(() => {
  //   console.log('Products in ShopContextProvider:', products);
  // }, [products]);

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
}

export default ShopContextProvider;
