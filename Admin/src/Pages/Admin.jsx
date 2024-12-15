import React from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import AddProduct from './AddProduct'
import Login from './Login'
import ListProduct from './ListProduct'

function Admin() {

  const token = localStorage.getItem('auth-token')

  if(!token){
    return <Navigate to='/login' />
  }

  return (
    <>
            <Routes>
              <Route path='/addproduct' element={<AddProduct />} />
              <Route path='/login' element={<Login /> } />
              <Route path='/listofproduct' element={<ListProduct />} />
            </Routes>

    </>

  )
}

export default Admin