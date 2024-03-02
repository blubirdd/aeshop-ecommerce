import React, { useContext, useEffect } from 'react'
import Login from '../../pages/shop/Login'
import Register from '../../pages/shop/Register'
import { Navigate, Route, Routes } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

function GuestLayout() {
  const { token, user } = useContext(UserContext);

  //temporary for testing
  useEffect(()=>{
    if(token){
      if (user.role === 'user' || user.role === "admin") {
        return <Navigate to="/" />;
      }
    }
    else{
      console.log("NO TOKEN AVAILABLE");
    }
  },[token])

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