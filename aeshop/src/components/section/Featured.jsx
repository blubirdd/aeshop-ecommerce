import React from 'react';
import { products } from '../../constants';
import Item from '../product/Item';

function Featured() {
  const featuredProducts = products.filter((item) => item.featured === true);

  return (
    <>
      <div className="mx-auto pb-6 pt-16">
        <h2 className="pb-1 text-5xl font-bold text-center text-gray-800 dark:text-gray-400">
          Hot Picks
        </h2>
        <div className="mx-auto mb-1 border-4 border-b border-sky-700 w-44 dark:border-gray-400"></div>
      </div>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-4 mx-auto">
        {featuredProducts.map((item) => {
          return <Item key={item.id} {...item} />;
        })}
      </div>
    </>
  );
}

export default Featured;
