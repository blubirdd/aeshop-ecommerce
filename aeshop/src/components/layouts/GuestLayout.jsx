import React, { useContext, useEffect } from 'react'
import Login from '../../pages/shop/Login'
import Register from '../../pages/shop/Register'
import { useNavigate, Route, Routes } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

function GuestLayout() {
  const { token, user } = useContext(UserContext);
  const navigate = useNavigate();

    if(token){
      if (user.role === "admin") {
        navigate('/admin');
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