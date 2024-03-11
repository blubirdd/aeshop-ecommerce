import React, { useEffect, useState } from 'react';
import axiosClient from '../../axios-client';
import { Link } from 'react-router-dom'

function DashboardRecentOrders() {

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const response = await axiosClient.get('/recent-orders');
        setRecentOrders(response.data.recentOrders);
      } catch (error) {
        console.error('Error fetching recent orders:', error);
      }
    };

    fetchRecentOrders();
  }, []);

  return (
    <>
      <div className="w-4/6">
        <div className="text-lg font-semibold mb-2">
          Most Recent Orders
        </div>
        <div className="rounded-lg overflow-hidden border border-gray-200 ">
          <table className="min-w-full z-10 divide-y divide-gray-200 dark:divide-gray-700 bg-gray-50">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-800 uppercase dark:text-gray-400">Order ID</th>
                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase dark:text-gray-400">Customer</th>
                <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-800 uppercase dark:text-gray-400">No. of Items</th>
                <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-800 uppercase dark:text-gray-400">Total</th>
                <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-800 uppercase dark:text-gray-400 w-32">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-white dark:divide-gray-700">
              {recentOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="py-3 whitespace-wrap text-center text-sm text-gray-800 dark:text-gray-200 align-middle">{order.id}</td>
                  <td className="px-6 py-3 whitespace-wrap text-sm text-gray-800 dark:text-gray-200">{order.customer_name}</td>
                  <td className="px-3 py-3 whitespace-wrap text-sm text-center text-gray-800 dark:text-gray-200 align-middle">{order.totalProducts}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-center text-gray-800 dark:text-gray-200 align-middle">{order.total_price}</td>
                  <td className="px-2  py-1 whitespace-nowrap space-x-1 text-sm font-medium align-middle text-center items-center">
                    <div className="hs-dropdown relative inline-flex">
                      <button id="hs-dropdown-custom-trigger" type="button" className="hs-dropdown-togglepy-1 ps-1 pe-2 gap-x-1 inline-flex items-center text-sm font-semibold rounded-md text-gray-800 shadow-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white">
                        <svg className="w-4 h-4 text-sky-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M5 10.9a8.7 8.7 0 0 1 6.4-3.6V6a2 2 0 0 1 2.3-2c.4 0 .7.1 1 .3l5.5 4.3a2.1 2.1 0 0 1 0 3.3l-5.5 4.3a2 2 0 0 1-2 .3 2 2 0 0 1-1.2-1.9v-1C6 15 5.2 19 5.2 19.3a1 1 0 0 1-1 .8 1 1 0 0 1-1-.7A10.2 10.2 0 0 1 5 10.9Z" />
                        </svg>
                        <span className="text-sm font-normal truncate max-w-[7.5rem] text-sky-600">
                          View
                        </span>
                      </button>
                      <div className="hs-dropdown-menu z-[999] transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-gray-100 shadow-md p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700" aria-labelledby="hs-dropdown-custom-trigger">
                        <Link to={'/admin/orders/' + order.id} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-white focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700" href="#">
                          View item
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default DashboardRecentOrders