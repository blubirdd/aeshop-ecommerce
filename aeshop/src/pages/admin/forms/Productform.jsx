import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from '../../../axios-client.js';
import Loading from '../../../components/others/Loading.jsx';
import { toast } from 'react-toastify';

function ProductForm() {

  const navigate = useNavigate();
  let { id } = useParams();
  const [product, setProduct] = useState({
    id: null,
    name: '',
    image: null,
    details: '',
    description: '',
    category: '',
    stock: '',
    newPrice: '',
    oldPrice: '',
    featured: 'No',
  })

  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)

  const [originalProduct, setOriginalproduct] = useState(null);

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/products/${id}`)
        .then(({ data }) => {
          setLoading(false)
          setProduct(data)
          setOriginalproduct(data);
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    const formData = new FormData();
    if (product.id) {
      formData.append('_method', 'PATCH')
    }
    formData.append('name', product.name);
    if (product.image !== null && typeof product.image !== 'string') {
      formData.append('image', product.image);
    }
    formData.append('details', product.details);
    formData.append('description', product.description);
    formData.append('category', product.category);
    formData.append('stock', product.stock);
    formData.append('new_price', product.newPrice);
    formData.append('old_price', product.oldPrice);
    formData.append('featured', product.featured);

    for (const entry of formData.entries()) {
      console.log(entry);
    }
    
    if (product.id) {
      axiosClient.post(`/products/${product.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(() => {
          toast.success("Product successfully Updated");
          navigate('/admin/products');
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });

    } else {
      axiosClient.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
        .then(() => {
          toast.success("Product successfully created");
          navigate('/admin/products');
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  }

  const handleImageChange = (ev) => {
    console.log('File selected:', ev.target.files[0]);
    const file = ev.target.files[0];
    setProduct((product) => ({ ...product, image: file }));
  };

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
              {originalProduct && originalProduct.name}
            </span>
          </h1>
          }

          {!product.id &&
            <h1 className="text-xl p-2 font-bold">Creat new product</h1>
          }
          <div className="flex flex-col  max-w-4xl p-4 bg-white border-2 shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <form onSubmit={onSubmit} encType='multipart/form-data'>

              <div className="flex mt-2 space-x-4">
                <div className="p-2 overflow-y-auto flex-grow">
                  <label className="block text-sm font-medium mb-2 dark:text-white">Product Name</label>
                  <input
                    className="py-3 px-4 block w-full rounded-md text-sm border border-gray-200 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    placeholder="Enter product name"
                    type="text"
                    value={product.name}
                    onChange={ev => setProduct({ ...product, name: ev.target.value })}
                  />
                </div>

                <div className="p-2 overflow-y-auto flex-grow">
                  <label htmlFor="file-input" className="block text-sm font-medium mb-2 dark:text-white">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="block border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400"
                    onChange={handleImageChange}
                  />
                </div>

              </div>


              <div className="flex mt-2 space-x-4">
                <div className="p-2 overflow-y-auto flex-grow">
                  <label className="block text-sm font-medium mb-2 dark:text-white">Description</label>
                  <input
                    className="py-3 px-4 block w-full rounded-md text-sm border border-gray-200 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    placeholder="Enter description"
                    type="text"
                    value={product.description}
                    onChange={ev => setProduct({ ...product, description: ev.target.value })}
                  />
                </div>
                <div className="p-2 overflow-y-auto flex-grow">
                  <label className="block text-sm font-medium mb-2 dark:text-white">Category</label>
                  <select
                    className="py-3 px-4 block w-full rounded-md text-sm border border-gray-200 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    value={product.category}
                    onChange={ev => setProduct({ ...product, category: ev.target.value })}
                  >
                    <option value="" disabled>--Select a category--</option>
                    <option value="Tech & Gadgets">Tech & Gadgets</option>
                    <option value="Toys and Games">Toys and Games</option>
                    <option value="Artworks">Artworks</option>
                    <option value="Collectibles">Collectibles</option>
                  </select>
                </div>


                <div className="p-2 overflow-y-auto flex-grow">
                  <label className="block text-sm font-medium mb-2 dark:text-white">Available Stocks</label>
                  <input
                    className="py-3 px-4 block w-full rounded-md text-sm border border-gray-200 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    placeholder="Enter product stock"
                    type="text"
                    value={product.stock}
                    onChange={ev => setProduct({ ...product, stock: ev.target.value })}
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
                  onChange={ev => setProduct({ ...product, details: ev.target.value })}
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
                    onChange={ev => setProduct({ ...product, newPrice: ev.target.value })}
                  />
                </div>
                <div className="p-2 overflow-y-auto flex-grow">
                  <label className="block text-sm font-medium mb-2 dark:text-white">Discount %</label>
                  <input
                    className="py-3 px-4 block w-full rounded-md text-sm border border-gray-200 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    placeholder="Enter product original price"
                    type="text"
                    value={product.oldPrice}
                    onChange={ev => setProduct({ ...product, oldPrice: ev.target.value })}
                  />
                </div>

                <div className="p-2 overflow-y-auto flex-grow">
                  <label className="block text-sm font-medium mb-2 dark:text-white">Featured</label>
                  <select
                    className="py-3 px-4 block w-full rounded-md text-sm border border-gray-200 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    value={product.featured}
                    onChange={handleImageChange}
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
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