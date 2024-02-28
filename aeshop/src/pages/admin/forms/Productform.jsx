import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from '../../../axios-client.js';
import Loading from '../../../components/others/Loading.jsx';
import { toast } from 'react-toastify';

function ProductForm() {

  const navigate = useNavigate();
  let { id } = useParams();
  const [product, setproduct] = useState({
    id: null,
    description: '',
    details: '',
    category: '',
    stock: '',
    new_price: '',
    old_price: '',
    featured: '',
  })

  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)

  const [originalproduct, setOriginalproduct] = useState(null);

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/products/${id}`)
        .then(({ data }) => {
          setLoading(false)
          setproduct(data)
          setOriginalproduct(data);
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (product.id) {
      axiosClient.put(`/products/${product.id}`, product)
        .then(() => {
          toast.success("Product successfully Updated");
          navigate('/admin/products')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient.product('/products', product)
        .then(() => {
          toast.success("Product successfully created");
          navigate('/admin/products')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  return (
    <>
      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Loading />
        </div>
      )}
      {errors &&
        <div className="alert">
          {Object.keys(errors).map(key => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>
      }
      {!loading && (
        <>
          {product.id && <h1 className="text-xl p-2 font-bold"> Update product:&nbsp;
            <span className="font-normal">
              {originalproduct && originalproduct.name}
            </span>
          </h1>
          }

          {!product.id &&
            <h1 className="text-xl p-2 font-bold">Creat new product</h1>
          }
          <div className="flex flex-col  max-w-4xl p-4 bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <form onSubmit={onSubmit}>
              <div className="p-2 overflow-y-auto">
                <label className="block text-sm font-medium mb-2 dark:text-white">Product Name</label>
                <input
                  className="py-3 px-4 block w-full rounded-md text-sm border border-gray-200 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder="Enter title"
                  type="text"
                  value={product.name}
                  onChange={ev => setproduct({ ...product, name: ev.target.value })}
                />
              </div>

              <div className="flex mt-2 space-x-4">
                <div className="p-2 overflow-y-auto flex-grow">
                  <label className="block text-sm font-medium mb-2 dark:text-white">Description</label>
                  <input
                    className="py-3 px-4 block w-full rounded-md text-sm border border-gray-200 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    placeholder="Enter description"
                    type="text"
                    value={product.description}
                    onChange={ev => setproduct({ ...product, description: ev.target.value })}
                  />
                </div>
                <div className="p-2 overflow-y-auto flex-grow">
                  <label className="block text-sm font-medium mb-2 dark:text-white">Category</label>
                  <select
                    className="py-3 px-4 block w-full rounded-md text-sm border border-gray-200 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    value={product.category}
                    onChange={ev => setproduct({ ...product, category: ev.target.value })}
                  >
                    <option value="Tech & Gadgets">Tech & Gadgets</option>
                    <option value="Toys and Games">Toys and Games</option>
                    <option value="Artworks">Artworks</option>
                    <option value="Collectibles">Collectibles</option>
                  </select>
                </div>

                <div className="p-2 overflow-y-auto flex-grow">
                  <label className="block text-sm font-medium mb-2 dark:text-white">Stock</label>
                  <input
                    className="py-3 px-4 block w-full rounded-md text-sm border border-gray-200 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    placeholder="Enter category"
                    type="text"
                    value={product.stock}
                    onChange={ev => setproduct({ ...product, stock: ev.target.value })}
                  />
                </div>
              </div>

              <div className="p-2 overflow-y-auto">
                <label className="block text-sm font-medium mb-2 dark:text-white">Details</label>
                <textarea
                  className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  rows="3"
                  placeholder="Enter Details..."
                  value={product.details}
                  onChange={ev => setproduct({ ...product, details: ev.target.value })}
                />
              </div>

              <div className="flex mt-2 pb-4 space-x-4">
                <div className="p-2 overflow-y-auto flex-grow">
                  <label className="block text-sm font-medium mb-2 dark:text-white">Price</label>
                  <input
                    className="py-3 px-4 block w-full rounded-md text-sm border border-gray-200 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    placeholder="Enter product price"
                    type="text"
                    value={product.newPrice}
                    onChange={ev => setproduct({ ...product, new_price: ev.target.value })}
                  />
                </div>
                <div className="p-2 overflow-y-auto flex-grow">
                  <label className="block text-sm font-medium mb-2 dark:text-white">Discount %</label>
                  <input
                    className="py-3 px-4 block w-full rounded-md text-sm border border-gray-200 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    placeholder="Enter product original price"
                    type="text"
                    value={product.oldPrice}
                    onChange={ev => setproduct({ ...product, old_price: ev.target.value })}
                  />
                </div>

                <div className="p-2 overflow-y-auto flex-grow">
                  <label className="block text-sm font-medium mb-2 dark:text-white">Featured</label>
                  <select
                    className="py-3 px-4 block w-full rounded-md text-sm border border-gray-200 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    value={product.featured}
                    onChange={ev => setproduct({ ...product, featured: ev.target.value })}
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

              </div>

              <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                <button onClick={() => navigate(-1)} type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-neutral-100 text-gray-800 shadow-sm hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                  Cancel
                </button>
                <button type="submit" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                  Save changes
                </button>
              </div>
            </form>
          </div >
        </>
      )
      }
    </>
  )
}

export default ProductForm