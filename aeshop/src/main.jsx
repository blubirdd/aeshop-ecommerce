import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '../node_modules/preline/dist/preline.js'
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from './context/ShopContext'
import ScrollToTop from './components/others/ScrollToTop.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ShopContextProvider>
        <ScrollToTop />
        <App />
      </ShopContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
