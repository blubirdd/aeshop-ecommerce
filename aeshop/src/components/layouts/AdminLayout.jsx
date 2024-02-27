import React, { useState, useEffect } from 'react';
import { Link, Navigate, Routes, Route } from "react-router-dom";
// import { useStateContext } from "../../context/ContextProvider.jsx";

// import Notification from '../Notification.jsx';
import Navbar from './Navbar';
import Sidebar from '../admin/Sidebar';
import Dashboard from '../../pages/admin/Dashboard';
function AdminLayout() {

//   const {notification} = useStateContext();

  return (
    <>
      <Navbar />
      <Sidebar />
      <main>
        <div className="w-full  pt-4 px-4 sm:px-6 md:px-8 lg:ps-72">
        <Routes>
            <Route path="/" element={<Dashboard />} />
        </Routes>
        </div>
      </main>

      {/* {notification &&
        <Notification message={notification} />
      } */}

    </>
  )
}

export default AdminLayout