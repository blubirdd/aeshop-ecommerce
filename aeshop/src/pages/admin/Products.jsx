import React, { useContext } from 'react'
import { useEffect, useState } from "react";
import axiosClient from '../../axios-client.js';

import TableHeader from '../../components/admin/TableHeader.jsx';
import Loading from '../../components/others/Loading.jsx';
import ProductList from '../../components/admin/ProductList.jsx';
import Pagination from '../../components/others/Pagination.jsx';
import ConfirmDialog from '../../components/others/ConfirmDialog.jsx'

import { toast } from 'react-toastify';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [confirmDialog, setConfirmDialog] = useState(null);

  useEffect(() => {
    getProducts();
  }, [pagination.currentPage]);

  const onDelete = (product) => {
    setConfirmDialog({
      message: 'Are you sure you want to delete ' + product.name + '?',
      onConfirm: () => handleDeleteConfirmed(product.id),
      onCancel: () => setConfirmDialog(null),
    });
  };


  const handleDeleteConfirmed = (productID) => {
    axiosClient.delete(`/products/${productID}`)
      .then(() => {
        toast.success("Product successfully deleted");
        getProducts();
      })
      .finally(() => {
        setConfirmDialog(null);
      });
  };

  const getProducts = () => {
    setLoading(true);
  
    const params = new URLSearchParams(location.search);
    const page = params.get('page') || pagination.currentPage;
  
    axiosClient
      .get(`/products?page=${page}&${params.toString()}`)
      .then(({ data }) => {
        setLoading(false);
        setProducts(data.data);
        setPagination({
          currentPage: data.meta.current_page,
          totalPages: data.meta.last_page,
        });
      })
      .catch(() => {
        setLoading(false);
      });
  };
  

  useEffect(() => {
    HSStaticMethods.autoInit();
  },[loading] )

  return (
    <>
      {loading &&
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Loading />
        </div>
      }

      {confirmDialog && (
        <ConfirmDialog
          message={confirmDialog.message}
          onConfirm={confirmDialog.onConfirm}
          onCancel={confirmDialog.onCancel}
        />
      )}

      {!loading &&
        <div className="products">
          <TableHeader
            title="Products"
            createLink="/admin/products/new"
          />

          <ProductList
            products={products}
            onDelete={onDelete}
          />

          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={(page) => setPagination({ ...pagination, currentPage: page })}
          />
        </div>
      }

    </>
  )
}

export default Products