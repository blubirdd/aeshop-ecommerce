import React, { useEffect, useState, useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import Header from './Header'
import Footer from './Footer'
import Home from '../../pages/shop/Home'
import Category from '../../pages/shop/Category'
import Product from '../../pages/shop/Product'
import SearchResultsPage from '../../pages/shop/SearchResultsPage'
import Cart from '../../pages/shop/Cart'
import techBanner from '/banners/techBanner2.jpg'
import toysBanner from '/banners/toysBanner.jpg'
import artBanner from '/banners/artBanner.jpg'
import collectiblesBanner from '/banners/collectiblesBanner.jpg'
import { UserContext } from '../../context/UserContext'

function UserLayout() {

  const [loading, _setLoading] = useState(false);

  useEffect(() => {
  }, [loading]);

  const setLoading = (data) => {
    _setLoading(data);
  };

  return (
    <>
      <Navbar />
      <Header />
      <div className="max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tech" element={<Category loadingState={setLoading} category="Tech and Gadgets" description="Explore cutting-edge and collectible tech treasures. From vintage gadgets to limited edition releases, discover modern marvels that redefine innovation." banner={techBanner} />} />
          <Route path="/toys" element={<Category loadingState={setLoading} category="Toys and Games" description="Rediscover the joy of play with our diverse Toys and Games collection. From modern board games to cute plushies, find entertainment that sparks laughter and fun for every age." banner={toysBanner} />} />
          <Route path="/art" element={<Category loadingState={setLoading} category="Artworks" description="Transform your space with our stunning artworks. From vibrant contemporary prints to timeless paintings, find pieces that speak to your style and elevate your surroundings." banner={artBanner} />} />
          <Route path="/collectibles" element={<Category loadingState={setLoading} category="Collectibles" description="Explore the extraordinary in our diverse collectibles collection. Discover unique items that add character and charm to your life." banner={collectiblesBanner} />} />
          <Route path="/product" element={<Product />}>
            <Route path=":slug" element={<Product />} />
          </Route>
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>

        {!loading && <Footer />}

      </div>
    </>
  )
}

export default UserLayout