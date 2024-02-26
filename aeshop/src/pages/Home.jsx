import React from 'react'

import Hero from '../components/section/Hero'
import Featured from '../components/section/Featured'
import Banners from '../components/section/Banners'
function Home() {
  return (
    <>
      <div className="bg-gray-50 dark:bg-slate-900 ">
        <Hero />
        <Banners />
        <Featured />
      </div>
    </>
  )
}

export default Home