import React, { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext';
import SmallItem from './SmallItem';

function RelatedProducts({ productID }) {

  const { products } = useContext(ShopContext)
  const currentProduct = products.find((product) => product.id === productID);

  const relatedProducts = products.filter(
    (product) => product.category === currentProduct.category && product.id !== currentProduct.id
  );

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  //shuffle related products
  const shuffledRelatedProducts = shuffleArray(relatedProducts).slice(0, 4);

  return (
    <div className="sm:mx-8 my-2">
      <div className="flex justify-between mx-4 sm:mx-2 max-w-6xl ">
        <p className="text-xl font-semibold mb-2">Related Items</p>
      </div>
      <div className="flex flex-wrap gap-4">
        {shuffledRelatedProducts.slice(0, 4).map((relatedProduct) => (
          <SmallItem key={relatedProduct.id} {...relatedProduct} />
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
