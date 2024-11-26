import React from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import AddProduct from './AddProduct'
import ListProduct from './ListProduct'
import SideBar from '../Components/SideBar/SideBar'

function Admin() {

  const token = localStorage.getItem('auth-token')

  if(!token){
    return <Navigate to='/login' />
  }

  return (
    <>
        <section className='flex max-sm:flex-col '>
           <SideBar/>
            <Routes>
              <Route path='/addproduct' element={<AddProduct />} />
              <Route path='/listofproduct' element={<ListProduct />} />
            </Routes>
        </section>

    </>

  )
}

export default Admin