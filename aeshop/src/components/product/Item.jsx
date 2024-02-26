import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';

function Item({ ...product }) {
  const { addToCart } = useContext(ShopContext);

  return (
    <div className="flex flex-col w-full md:w-72 mx-6 md:mx-0  transform overflow-hidden bg-white dark:bg-slate-800 shadow-md hover:shadow-lg border border-gray-200 duration-300">
      <Link to={`/product/${encodeURIComponent(product.name.toLowerCase().replace(/\s+/g, '-'))}`}>
        <img
          className="w-full h-64 rounded-t-md p-1 object-contain object-center transition-transform ease-in-out duration-500 transform-gpu hover:scale-105"
          src={product.image[0]}
          alt={product.name}
        />
      </Link>
      <div className="p-4 flex-grow flex flex-col">
        <Link to={`/product/${encodeURIComponent(product.name.toLowerCase().replace(/\s+/g, '-'))}`}>
          <h2 className="text-md font-bold dark:text-white text-gray-900 hover:text-sky-800">{product.name}</h2>
        </Link>
        <h2 className="mb-2 text-sm font-normal dark:text-white text-gray-400">{product.description}</h2>
        <div className="flex mt-auto items-center">
          <p className="mr-2 text-xl font-semibold text-sky-900 dark:text-white">₱{product.new_price.toLocaleString()}</p>
          <p className="text-sm font-medium text-sky-950 line-through dark:text-gray-300">₱{product.old_price.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default Item;
