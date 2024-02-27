import React, { useContext } from 'react'
import Login from '../../pages/shop/Login'
import Register from '../../pages/shop/Register'
import { Navigate, Route, Routes } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

function GuestLayout() {
  const { token, user } = useContext(UserContext);

  //temporary for testing
  if(token){
    if (user.role === 'user' || user.role === "admin") {
      return <Navigate to="/" />;
    }
  }
  else{
    console.log("NO TOKEN AVAILABLE");
  }
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