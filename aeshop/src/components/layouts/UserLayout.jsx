import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import Header from './Header'
import Footer from './Footer'

import Home from '../../pages/Home'
import Category from '../../pages/Category'
import Product from '../../pages/Product'
import SearchResultsPage from '../../pages/SearchResultsPage'
import Cart from '../../pages/Cart'
import techBanner from '/banners/techBanner2.jpg'
import toysBanner from '/banners/toysBanner.jpg'
import artBanner from '/banners/artBanner.jpg'
import collectiblesBanner from '/banners/collectiblesBanner.jpg'

function UserLayout() {
  return (
    <>
      <Navbar />
      <Header />
      <div className="max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tech" element={<Category category="Tech & Gadgets" description="Explore cutting-edge and collectible tech treasures. From vintage gadgets to limited edition releases, discover modern marvels that redefine innovation." banner={techBanner} />} />
          <Route path="/toys" element={<Category category="Toys and Games" description="Rediscover the joy of play with our diverse Toys and Games collection. From modern board games to cute plushies, find entertainment that sparks laughter and fun for every age." banner={toysBanner} />} />
          <Route path="/art" element={<Category category="Artworks" description="Transform your space with our stunning artworks. From vibrant contemporary prints to timeless paintings, find pieces that speak to your style and elevate your surroundings." banner={artBanner} />} />
          <Route path="/collectibles" element={<Category category="Collectibles" description="Explore the extraordinary in our diverse collectibles collection. Discover unique items that add character and charm to your life." banner={collectiblesBanner} />} />
          <Route path="/product" element={<Product />}>
            <Route path=":productName" element={<Product />} />
          </Route>
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />

      </div>
    </>
  )
}

export default UserLayout