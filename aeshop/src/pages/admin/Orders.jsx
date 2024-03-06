import React, { useContext } from 'react'
import { useEffect, useState } from "react";
import axiosClient from '../../axios-client.js';

import TableHeader from '../../components/admin/TableHeader.jsx';
import Loading from '../../components/others/Loading.jsx';
import OrderList from '../../components/admin/OrderList.jsx';
import Pagination from '../../components/others/Pagination.jsx';
import ConfirmDialog from '../../components/others/ConfirmDialog.jsx'

import { toast } from 'react-toastify';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [confirmDialog, setConfirmDialog] = useState(null);

  useEffect(() => {
    getOrders();
  }, [pagination.currentPage]);

  const getOrders = () => {
    setLoading(true);
  
    const params = new URLSearchParams(location.search);
    const page = params.get('page') || pagination.currentPage;
  
    axiosClient
      .get(`/orders?page=${page}&${params.toString()}`)
      .then(({ data }) => {
        setLoading(false);
        setOrders(data.orders);
        setPagination({
          currentPage: data.meta.current_page,
          totalPages: data.meta.last_page,
        });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onDelete = (order) => {
    setConfirmDialog({
      message: 'Are you sure you want to delete ' + order.name + '?',
      onConfirm: () => handleDeleteConfirmed(order.id),
      onCancel: () => setConfirmDialog(null),
    });
  };


  const handleDeleteConfirmed = (orderID) => {
    axiosClient.delete(`/orders/${orderID}`)
      .then(() => {
        toast.success("Order successfully deleted");
        getOrders();
      })
      .finally(() => {
        setConfirmDialog(null);
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
        <div className="orders">
          <TableHeader
            title="Orders"
            createLink="/admin/orders/new"
          />

          <OrderList
            orders={orders}
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

export default Orders