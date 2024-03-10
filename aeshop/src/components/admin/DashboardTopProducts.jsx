import React, { useEffect, useState } from 'react';
import axiosClient from '../../axios-client';

function DashboardTopProducts() {
  
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await axiosClient.get('/top-products');
        setTopProducts(response.data.topProducts);
      } catch (error) {
        console.error('Error fetching top products:', error);
      }
    };

    fetchTopProducts();
  }, []);

  return (
    <>
      <div className="w-2/6">
        <div className="text-lg font-semibold mb-2">
          Top Selling Products
        </div>
        <div className="rounded-lg overflow-hidden border border-gray-200">
          <table className="min-w-full z-10 divide-y divide-gray-200 dark:divide-gray-700 bg-gray-50">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase dark:text-gray-400">Product</th>
                <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-800 uppercase dark:text-gray-400">Total Sold</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-white dark:divide-gray-700">
              {topProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="px-6 py-2 whitespace-wrap text-sm text-gray-800 dark:text-gray-200 align-middle">
                    <div className="flex items-center gap-x-3">
                      <img className="inline-block w-16 h-16 object-cover rounded-full" src={product.image} alt={product.name} />
                      <div className="grow">
                        <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">{product.name}</span>
                        <span className="block text-xs text-gray-500">Stock: {product.stock}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-wrap text-sm text-center text-gray-800 dark:text-gray-200 align-middle">{product.total_quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default DashboardTopProducts;
