import React, { useEffect, useState } from 'react';
import { products } from '../../constants';
import Item from '../product/Item';
import Loading from '../others/Loading';
import axiosClient from '../../axios-client';

function Featured() {
  // const featuredProducts = products.filter((item) => item.featured === true);
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFeaturedProducts();
  }, [])

  const fetchFeaturedProducts = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get('user/products', {
        params: {
          featured: {
            eq: 'Yes'
          },
        },
      });
      setFeaturedProducts(response.data.data);
      console.log(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      setLoading(false);
    }

  }
  return (
    <>
      <div className="mx-auto pb-6 pt-16">
        <h2 className="pb-1 text-5xl font-bold text-center text-gray-800 dark:text-gray-400">
          Hot Picks
        </h2>
        <div className="mx-auto mb-1 border-4 border-b border-sky-700 w-44 dark:border-gray-400"></div>
      </div>
      {loading &&
        <div className="flex justify-center items-center h-screen ">
          <Loading />
        </div>
      }

      {!loading &&
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-4 mx-auto">
          {featuredProducts.map((item) => {
            return <Item key={item.id} {...item} />;
          })}
        </div>
      }

    </>
  );
}

export default Featured;
