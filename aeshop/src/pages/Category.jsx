import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Item from '../components/product/Item';

function Category({ banner, description, category }) {
  const { products } = useContext(ShopContext);
  const categoryProducts = products.filter((item) => category === item.category);
  return (
    <>
      <div className="mx-1 md:mx-7 h-52 sm:mt-4 sm:mb-4 shadow-gray-800 shadow-sm rounded-sm overflow-hidden bg-cover bg-center" 
        style={{ backgroundImage: `url(${banner})` }}>
        <div className="bg-gray-900 bg-opacity-60 flex items-center h-full">
          <div className="px-10 max-w-3xl">
            <h2 className="text-4xl text-white font-semibold">{category}</h2>
            <p className="mt-2 text-gray-300">{description}</p>
          </div>
        </div>
      </div>
      <p className="ps-4 sm:ps-10 pt-4">Showing {categoryProducts.length} of {categoryProducts.length} items</p>  
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-6 mx-auto my-2">
        {products.map((item) => {
          if (category === item.category) {
            return <Item key={item.id} {...item} />;
          } else {
            return null;
          }
        })}
      </div>
    </>
  );
}

export default Category;
