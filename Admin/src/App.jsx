import { useState } from 'react'
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Admin from './Pages/Admin'

function App() {

  return (
    <>
    {/* <BrowserRouter> */}
      <Routes>
        <Route path='/*' element={<Admin />} />
      </Routes>
    {/* </BrowserRouter> */}
    
    </>
  )
}

export default App
