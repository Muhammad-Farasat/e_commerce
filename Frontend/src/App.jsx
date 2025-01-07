import { useRef, useEffect } from 'react'
import './App.css'
import NavBar from './Components/NavBar/NavBar'
import {BrowserRouter, Routes, Route, Router, useLocation} from 'react-router-dom'
import ShopCategory from './Pages/ShopCategory'
import Shop from './Pages/Shop'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import LoginSignup from './Pages/LoginSignup'


function App() {
  return(
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}



function AppContent() {

  const location = useLocation()

  return (
    <>
      
      {location.pathname !== '/LoginSignup'  && <NavBar />  }
        
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<ShopCategory category='Men' />} />
          <Route path='/womens' element={<ShopCategory category='Women' />} />
          <Route path='/kids' element={<ShopCategory category='Kids' />} />          
          <Route path='/product' element={<Product />} >
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/LoginSignup' element={<LoginSignup />} />
        </Routes>

    </>
  )
}

export default App
