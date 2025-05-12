import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AddProduct from './AddProduct';
import ListProduct from './ListProduct';
import SideBar from '../Components/SideBar/SideBar'
import Orders from './Orders';


function Admin() {
  const token = localStorage.getItem('auth-token');

  // Redirect to login if no token is found
  if (!token) {
    return <Navigate to='/login' />;
  }

  return (
    <section className='flex relative max-sm:flex-col'>
        <SideBar/>
        <Routes>
          <Route path='/addproduct' element={<AddProduct />} />
          <Route path='/listofproduct' element={<ListProduct />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
    </section>
  );
}

export default Admin;
