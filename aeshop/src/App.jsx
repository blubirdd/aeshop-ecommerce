import React, { useEffect, useContext } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Notification from './components/others/Notification';
import { ShopContext } from './context/ShopContext';

import UserLayout from './components/layouts/UserLayout';
import GuestLayout from './components/layouts/GuestLayout';
import Checkout from './pages/shop/Checkout';
import NotFound from './pages/shop/NotFound';
import AdminLayout from './components/layouts/AdminLayout';

function App() {

  //PrelineUI reinitialization helper
  const location = useLocation();

  useEffect(() => {
    import('preline/preline');
  }, []);

  useEffect(() => {
    // @ts-ignore
    HSStaticMethods.autoInit();
  }, [location.pathname]);

  //intiaizlie aos
  useEffect(() => {
    AOS.init({
      disable: function() {
        var maxWidth = 720;
        return window.innerWidth < maxWidth;
      }
    });
  }, []);

  const { notifications, removeNotification } = useContext(ShopContext);

  return (
    <>
      <Routes>
        <Route path="*" element={<UserLayout />} />
        <Route path="/guest/*" element={<GuestLayout />} />
        <Route path="/checkout/" element={<Checkout />} />
        <Route path="/admin" element={<AdminLayout />} />
      </Routes>

      <div className=" notification-container fixed z-[999] pointer-events-none bottom-4 -right-20 space-y-2">
          {notifications.map((message, index) => (
            <Notification key={index} id={index} message={message} removeNotification={removeNotification} />
          ))}
      </div>
    </>
  )
}

export default App
