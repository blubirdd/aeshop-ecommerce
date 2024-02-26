import React from 'react'
import Login from '../../pages/shop/Login'
import Register from '../../pages/shop/Register'
import { Route, Routes } from 'react-router-dom'

function GuestLayout() {
  return (
    <>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </>
  )
}

export default GuestLayout