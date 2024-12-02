import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import NewCollection from '../Components/NewCollection/NewCollection'
import Footer from '../Components/Footer/Footer'

function Shop() {
  const backend_url = import.meta.env.VITE_BACKEND_URL
  fetch(`${backend_url}/message`)
  .then((res) => res.json())
  .then((data) => console.log(data)); // { message: "Hello, World!" }

  fetch(`${backend_url}/message`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ newMessage: 'Hi, Farasat!' }),
})
  .then((res) => res.json())
  .then((data) => console.log(data)); // { success: true, updatedMessage: "Hi, Farasat!" }


return (
    <>

        <Hero />
        <Popular />
        <NewCollection />
        <Footer />
    </>
  )
}

export default Shop