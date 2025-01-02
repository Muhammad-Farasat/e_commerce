import React, { useEffect, useRef } from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import NewCollection from '../Components/NewCollection/NewCollection'
import Footer from '../Components/Footer/Footer'

function Shop() {

  const handleRef = useRef()

  useEffect(()=>{
    if (handleRef.current) {
      handleRef.current.scrollIntoView({block: 'start'})
    }
  }, [])

return (
    <>
      <div ref={handleRef} />
        <Hero />
        <Popular />
        <NewCollection />
        <Footer />

      </>
  )
}

export default Shop