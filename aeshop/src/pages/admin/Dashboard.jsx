import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import DashboardTopProducts from '../../components/admin/DashboardTopProducts';
import DashboardRecentOrders from '../../components/admin/DashboardRecentOrders';
function Dashboard() {

  return (
    <>
      <h3 className="text-gray-700 text-xl font-medium">Dashboard</h3>
      <div className="flex flex-wrap -mx-3 mt-2">

        <div className="w-full mt-2 px-3 sm:w-1/2 md:w-1/4 sm:mt-0">
          <div className="flex items-center px-5 py-6 shadow-sm rounded-lg bg-white border border-gray-200">
            <div className="p-3 rounded-full bg-sky-700 bg-opacity-75">
              <svg className="w-8 h-8 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M4 4c0-.6.4-1 1-1h1.5c.5 0 .9.3 1 .8L7.9 6H19a1 1 0 0 1 1 1.2l-1.3 6a1 1 0 0 1-1 .8h-8l.2 1H17a3 3 0 1 1-2.8 2h-2.4a3 3 0 1 1-4-1.8L5.7 5H5a1 1 0 0 1-1-1Z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="mx-5">
              <h4 className="text-2xl font-semibold text-gray-700">15</h4>
              <div className="text-gray-500">New Orders</div>
            </div>
          </div>
        </div>

        <div className="w-full mt-2 px-3 sm:w-1/2 md:w-1/4 sm:mt-0">
          <div className="flex items-center px-5 py-6 shadow-sm rounded-lg bg-white border border-gray-200">
            <div className="p-3 rounded-full bg-amber-500 bg-opacity-75">
              <svg className="w-8 h-8 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M14 7h-4v3a1 1 0 1 1-2 0V7H6a1 1 0 0 0-1 1L4 19.7A2 2 0 0 0 6 22h12c1 0 2-1 2-2.2L19 8c0-.5-.5-.9-1-.9h-2v3a1 1 0 1 1-2 0V7Zm-2-3a2 2 0 0 0-2 2v1H8V6a4 4 0 1 1 8 0v1h-2V6a2 2 0 0 0-2-2Z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="mx-5">
              <h4 className="text-2xl font-semibold text-gray-700">15</h4>
              <div className="text-gray-500">Products</div>
            </div>
          </div>
        </div>

        <div className="w-full mt-2 px-3 sm:w-1/2 md:w-1/4 sm:mt-0">
          <div className="flex items-center px-5 py-6 shadow-sm rounded-lg bg-white border border-gray-200">
            <div className="p-3 rounded-full bg-teal-700 bg-opacity-75">
              <svg className="w-8 h-8 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M20.3 8.6c.1.3.3.6.6.8a3.5 3.5 0 0 1 0 5.2 2.4 2.4 0 0 0-.8 1.9 3.5 3.5 0 0 1-3.6 3.6 2.5 2.5 0 0 0-2 .8 3.5 3.5 0 0 1-5 0 2.4 2.4 0 0 0-2-.8A3.5 3.5 0 0 1 4 16.5a2.4 2.4 0 0 0-.8-2 3.5 3.5 0 0 1 0-5 2.4 2.4 0 0 0 .8-2A3.5 3.5 0 0 1 7.5 4a2.4 2.4 0 0 0 2-.8 3.5 3.5 0 0 1 5 0 2.4 2.4 0 0 0 2 .8A3.5 3.5 0 0 1 20 7.5c0 .4 0 .7.2 1ZM9.9 7.4a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm6 2.2a1 1 0 0 0-1.5-1.4l-6.2 6.2a1 1 0 0 0 1.4 1.4l6.2-6.2Zm-2.9 5a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z" clipRule="evenodd" />
              </svg>

            </div>
            <div className="mx-5">
              <h4 className="text-2xl font-semibold text-gray-700">15</h4>
              <div className="text-gray-500">Total Sales</div>
            </div>
          </div>
        </div>

        <div className="w-full mt-2 px-3 sm:w-1/2 md:w-1/4 sm:mt-0">
          <div className="flex items-center px-5 py-6 shadow-sm rounded-lg bg-white border border-gray-200">
            <div className="p-3 rounded-full bg-sky-800 bg-opacity-75">
              <svg className="w-8 h-8 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4c0 1.1.9 2 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.8-3.1a5.5 5.5 0 0 0-2.8-6.3c.6-.4 1.3-.6 2-.6a3.5 3.5 0 0 1 .8 6.9Zm2.2 7.1h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1l-.5.8c1.9 1 3.1 3 3.1 5.2ZM4 7.5a3.5 3.5 0 0 1 5.5-2.9A5.5 5.5 0 0 0 6.7 11 3.5 3.5 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4c0 1.1.9 2 2 2h.5a6 6 0 0 1 3-5.2l-.4-.8Z" clipRule="evenodd" />
              </svg>

            </div>
            <div className="mx-5">
              <h4 className="text-2xl font-semibold text-gray-700">15</h4>
              <div className="text-gray-500">Users</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-6 mb-2 gap-x-4">
        <DashboardTopProducts />
        <DashboardRecentOrders />
      </div>
    </>
  );
}

export default Dashboard;
