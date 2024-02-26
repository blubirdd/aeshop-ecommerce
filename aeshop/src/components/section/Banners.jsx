import React from 'react'
import homeBanner1 from '/banners/homeBanner1.png'
import homeBanner2 from '/banners/homeBanner2.jpg'
import homeBanner3 from '/banners/homeBanner3.jpg'
import { Link } from 'react-router-dom'
function Banners() {
  return (
    <>
      <div id="featured"  className="mx-auto pb-4 pt-10">
        <h2 className="pb-1 text-4xl sm:text-5xl font-bold text-center text-gray-800 dark:text-gray-400">
          Featured Items
        </h2>
        <div className="mx-auto mb-1 border-4 border-b border-sky-600 w-64 dark:border-gray-400"></div>
      </div>
      <div className="banners sm:mx-14">
        <div className="md:flex mt-4 mx-4 md:-mx-4">
          <div className="w-full h-64 mt-8 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2 mb-4 md:mb-0 shadow-md shadow-gray-400 transition-transform ease-in-out duration-300 hover:scale-[1.005]"
            style={{ backgroundImage: `url(${homeBanner2})` }}>
            <Link to="/collectibles" className="bg-gray-900 bg-opacity-40 hover:bg-opacity-20 duration-500 flex flex-col items-start justify-end pb-8 h-full">
              <div className="px-8 max-w-xl">
                <h2 className="text-3xl text-white font-bold">South Park Collection</h2>
                <button className="flex items-center px-3 py-2 mx-a mt-4 bg-black bg-opacity-30 hover:bg-white duration-300 text-white hover:text-black text-sm uppercase font-medium rounded-full border border-white focus:outline-none">
                  <span>Shop Now</span>
                  <svg className="h-5 w-5 ml-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </button>
              </div>
            </Link>
          </div>

          <div className="w-full h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2 shadow-md shadow-gray-400 transition-transform ease-in-out duration-300 hover:scale-[1.005]"
            style={{ backgroundImage: `url(${homeBanner1})` }}>
            <Link to="/toys"  className="bg-gray-900 bg-opacity-40 hover:bg-opacity-20 duration-500 flex flex-col items-start justify-end pb-8 h-full">
              <div className="px-8 max-w-xl">
                <h2 className="text-3xl text-white font-bold">Gift Plushies</h2>
                <button className="flex items-center px-3 py-2 mx-a mt-4 bg-black bg-opacity-30 hover:bg-white duration-300 text-white hover:text-black text-sm uppercase font-medium rounded-full border border-white focus:outline-none">
                  <span>Shop Now</span>
                  <svg className="h-5 w-5 ml-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </button>
              </div>
            </Link>
          </div>
        </div>

        <div className="h-72 mt-6 mx-4 md:mx-0 rounded-md overflow-hidden bg-cover bg-center shadow-md shadow-gray-400 transition-transform ease-in-out duration-300 hover:scale-[1.005]"
          style={{ backgroundImage: `url(${homeBanner3})` }}>
          <Link to="/product/chongyun-8bit-controller" className="bg-gray-900 bg-opacity-40 hover:bg-opacity-20 duration-500 flex flex-col items-start justify-end pb-8 h-full">
            <div className="px-10 max-w-3xl">
              <h2 className="text-3xl text-white font-bold">Genshin Impact Chongyun</h2>
              <p className="mt-2 text-gray-100">Grab the new Chongyun 8bitdo Controller. With a meticulously crafted 8-bit design, reminiscent of the gaming controllers from 8BitDo.</p>
              <button className="flex items-center px-3 py-2 mx-a mt-4 bg-black bg-opacity-30 hover:bg-white duration-300 text-white hover:text-black text-sm uppercase font-medium rounded-full border border-white focus:outline-none">
                <span>Shop Now</span>
                <svg className="h-5 w-5 ml-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </button>
            </div>
          </Link>
        </div>
      </div>


    </>

  )
}

export default Banners