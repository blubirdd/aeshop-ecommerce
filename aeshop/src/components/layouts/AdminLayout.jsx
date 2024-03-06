import React, { useState, useEffect, useContext } from 'react';
import { Link, Navigate, Routes, Route } from "react-router-dom";
import { UserContext } from '../../context/UserContext';
import Notification from '../others/Notification';
import Navbar from './Navbar';
import Sidebar from '../admin/Sidebar';
import Dashboard from '../../pages/admin/Dashboard';
import Users from '../../pages/admin/Users';
import UserForm from '../../pages/admin/forms/Userform';
import Posts from '../../pages/admin/Posts';
import PostForm from '../../pages/admin/forms/Postform';
import Products from '../../pages/admin/Products';
import ProductForm from '../../pages/admin/forms/Productform';
import Orders from '../../pages/admin/Orders';


function AdminLayout() {

  return (
    <>
      <Navbar />
      <Sidebar />
      <main>
        <div className="w-full  pt-4 px-4 sm:px-6 md:px-8 lg:ps-72">
          <Routes>
            {/* <Route path="/admin" element={<Navigate to="/dashboard" />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/new" element={<UserForm key="userCreate" />} />
            <Route path="/users/:id" element={<UserForm key="userUpdate" />} />

            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/new" element={<PostForm key="postCreate" />} />
            <Route path="/posts/:id" element={<PostForm key="postUpdate" />} />

            <Route path="/products" element={<Products />} />
            <Route path="/products/new" element={<ProductForm key="productCreate" />} />
            <Route path="/products/:id" element={<ProductForm key="productUpdate" />} />

            <Route path ="/orders" element={<Orders />} />
            
            </Routes>
        </div>
      </main>

    </>
  )
}

export default AdminLayout