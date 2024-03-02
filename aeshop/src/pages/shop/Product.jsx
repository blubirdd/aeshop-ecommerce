import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { useParams } from 'react-router-dom';
import ProductDisplay from '../../components/product/ProductDisplay';
import RelatedProducts from '../../components/product/RelatedProducts';
import axiosClient from '../../axios-client';
import Loading from '../../components/others/Loading';

function Product() {
  const { slug } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    retrieveProduct();
  }, [slug]);

  const retrieveProduct = async () => {

    setLoading(true);
    const response = await axiosClient.get(`/products/${slug}`)
      try{
        setProduct(response.data);
        console.log(response.data)
        setLoading(false);
      }
      catch(error) {
        console.error('Failed to retrieve product:', error);
        setLoading(false);
      };
  };

  return (
    <>
      {loading &&
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3">
          <Loading />
        </div>
      }

      {!loading &&
        <div>
          <ProductDisplay product={product} />
          {/* <RelatedProducts productID={product.id} /> */}
        </div>
      }

    </>
  );
}

export default Product;
