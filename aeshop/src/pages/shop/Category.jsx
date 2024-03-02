import React, { useContext, useEffect, useState } from 'react';
import axiosClient from '../../axios-client';
import Loading from '../../components/others/Loading';
import Item from '../../components/product/Item';

function Category({ banner, description, category, loadingState }) {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategoryProducts();
  }, [category]);

  const fetchCategoryProducts = async () => {
    setLoading(true);
    loadingState(true);
    try {
      const response = await axiosClient.get('/products', {
        params: {
          category: {
            eq: category,
          },
        },
      });

      setCategoryProducts(response.data.data);
      console.log(response.data.data);
      setLoading(false);
      loadingState(false);
    } catch (error) {
      console.error('Error fetching category products:', error);
      setLoading(false);
    }
  };

  return (
    <>
      {loading &&
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3">
          <Loading />
        </div>
      }
      {!loading &&
        <div className="category-products">
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
            {categoryProducts.map((item) => {
              if (category === item.category) {
                return <Item key={item.id} {...item} />;
              } else {
                return null;
              }
            })}
          </div>
        </div>
      }
    </>
  );
}

export default Category;
