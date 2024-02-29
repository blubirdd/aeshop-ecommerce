import React from 'react'
import { Link } from 'react-router-dom'

function ProductList({ products, onDelete }) {
  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border rounded-lg overflow-hidden dark:border-gray-700">
            <table className="min-w-full z-10 divide-y divide-gray-200 dark:divide-gray-700 bg-gray-50">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-800 uppercase dark:text-gray-400">ID</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase dark:text-gray-400">Name</th>
                  {/* <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase dark:text-gray-400">Details</th> */}
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase dark:text-gray-400">Description</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase dark:text-gray-400">Category</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase dark:text-gray-400">Stock</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase dark:text-gray-400">Price</th>
                  <th scope="col" className="px-3 py-3 text-start text-xs font-medium text-gray-800 uppercase dark:text-gray-400">Featured</th>
                  {/* <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase dark:text-gray-400">Old Price</th> */}
                  <th scope="col" className="px-4 py-3 text-start text-xs font-medium text-gray-800 uppercase dark:text-gray-400">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="py-3 whitespace-nowrap text-center text-sm text-gray-800 dark:text-gray-200">{product.id}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{product.name}</td>
                    {/* <td className="px-6 py-3 whitespace-wrap text-sm text-gray-800 dark:text-gray-200">{product.details}</td> */}
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{product.description}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{product.category}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{product.stock}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">₱{product.newPrice.toLocaleString()}</td>
                    {/* <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">₱{product.oldPrice.toLocaleString()}</td> */}
                    <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{product.featured}</td>
                    <td className="px-4  py-2 whitespace-nowrap space-x-1 text-sm font-medium">
                      <div className="hs-dropdown relative inline-flex">
                        <button id="hs-dropdown-custom-trigger" type="button" className="hs-dropdown-toggle bg-sky-700 hover:bg-sky-600 py-1 ps-1 pe-3 gap-x-1 inline-flex items-center text-sm font-semibold rounded-md  border  text-gray-800 shadow-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white">
                          <svg className="w-4 h-4 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M9.6 2.6A2 2 0 0 1 11 2h2a2 2 0 0 1 2 2l.5.3a2 2 0 0 1 2.9 0l1.4 1.3a2 2 0 0 1 0 2.9l.1.5h.1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2l-.3.5a2 2 0 0 1 0 2.9l-1.3 1.4a2 2 0 0 1-2.9 0l-.5.1v.1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2l-.5-.3a2 2 0 0 1-2.9 0l-1.4-1.3a2 2 0 0 1 0-2.9l-.1-.5H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2l.3-.5a2 2 0 0 1 0-2.9l1.3-1.4a2 2 0 0 1 2.9 0l.5-.1V4c0-.5.2-1 .6-1.4ZM8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm font-normal truncate max-w-[7.5rem] text-gray-200">
                            Manage
                          </span>
                        </button>

                        <div className="hs-dropdown-menu z-[999] transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-gray-100 shadow-md p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700" aria-labelledby="hs-dropdown-custom-trigger">
                          <Link to={'/admin/products/' + product.id} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-white focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700" href="#">
                            View item
                          </Link>
                          <Link to={'/admin/products/' + product.id} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-white focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700" href="#">
                            Edit item
                          </Link>
                          <button onClick={ev => onDelete(product)} type="button" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-white focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700" href="#">
                            Delete item
                          </button>
                        </div>
                      </div>

                      {/* <Link to={'/admin/products/' + product.id}>
                        <button type="button" className="py-1 px-2 inline-flex items-center bg-opacity-80 bg-op text-sm font-semibold rounded-lg border border-transparent bg-sky-900 text-gray-200 hover:bg-sky-800 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                          Edit
                        </button>
                      </Link>
                      <button onClick={ev => onDelete(product)} type="button" className="py-1 px-2 inline-flex items-center bg-opacity-80  text-sm font-semibold rounded-lg border border-transparent bg-red-700 text-gray-200 hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        Delete
                      </button> */}
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList