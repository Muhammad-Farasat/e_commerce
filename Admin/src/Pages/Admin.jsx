import React from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import AddProduct from './AddProduct'
import Login from './Pages/Login'
import ListProduct from './ListProduct'

function Admin() {

  const token = localStorage.getItem('auth-token')

  if(!token){
    return <Navigate to='/login' />
  }

  return (
    <>
        <section >
            <Routes>
              <Route path='/addproduct' element={<AddProduct />} />
              <Route path='/login' element={<Login /> } />
              <Route path='/listofproduct' element={<ListProduct />} />
            </Routes>
        </section>

    </>

  )
}

export default Admin