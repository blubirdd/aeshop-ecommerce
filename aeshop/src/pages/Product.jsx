import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom'
import ProductDisplay from '../components/product/ProductDisplay';
import RelatedProducts from '../components/product/RelatedProducts';

function Product() {
  const { products } = useContext(ShopContext);
  const { productName } = useParams();

  const product = products.find(
    (product) => encodeURIComponent(product.name.toLowerCase().replace(/\s+/g, '-')) === productName
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ProductDisplay product={product} />
      <RelatedProducts productID={product.id} />
    </>
  );
}

export default Product;
