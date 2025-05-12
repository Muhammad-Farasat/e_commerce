import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';





function LoginSignup() {

  const [state, setState] = useState('Log in')
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const changeHandler = (e) =>{
    setFormData({...formData, [e.target.name]:e.target.value })
  }

  const backend_url = import.meta.env.VITE_BACKEND_URL

  const login = async() =>{
    console.log("It has logged in!!!", formData)

    let responsiveData;

    console.log("Backend URL: " + backend_url)

    await fetch (`${backend_url}/login`,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then((resp)=>resp.json()).then((data)=>responsiveData=data)

    if(responsiveData.success){
      localStorage.setItem('auth-token', responsiveData.token)
      window.location.replace('/')
    }else{
      alert("Error has happened..!!")
    }


  }

  const signup = async() =>{
    console.log("It has signed up!!!", formData)

    let responsiveData;

    await fetch (`${backend_url}/signup`,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then((resp)=>resp.json()).then((data)=>responsiveData=data)

    if(responsiveData.success){
      localStorage.setItem('auth-token', responsiveData.token)
      localStorage.setItem('user', JSON.stringify(responsiveData.user))
      window.location.replace('/')
    }else{
      alert("Error has happened..!!")
      console.error()
    }


  }


  return (
    <>
    
    <section className='flex justify-between max-sm:justify-normal max-sm:overflow-x-hidden min-h-screen'>
      {/* Image Section (Preserved from original) */}
      <div 
        style={{ clipPath: 'polygon(0 0, 98% 0, 79% 100%, 0% 100%)' }} 
        className='bg-login_img w-3/6 h-[100vh] max-sm:hidden relative'
      >
        <div className='absolute inset-0 bg-[#0e0e0e73] flex items-center justify-center'>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white p-8 max-w-md"
          >
            <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
            <p className="text-lg opacity-90">
              {state === 'Log in' 
                ? 'Sign in to access your personalized dashboard'
                : 'Join our community to get started'}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form Section */}
      <div className='flex-1 flex justify-center items-center p-8'>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='w-full max-w-md'
        >
          <div className='bg-white rounded-xl shadow-lg p-8'>
            <motion.div 
              key={state}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className='text-3xl font-bold text-center mb-8 text-gray-800'>{state}</h1>

              <div className='space-y-6'>
                {state === 'Sign up' && (
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={changeHandler}
                      placeholder="Username"
                      className="w-full pl-10 pr-4 py-3 border-b-2 border-gray-200 focus:border-[#00d4ff] focus:outline-none transition-colors"
                    />
                  </div>
                )}

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={changeHandler}
                    className="w-full pl-10 pr-4 py-3 border-b-2 border-gray-200 focus:border-[#00d4ff] focus:outline-none transition-colors"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={changeHandler}
                    className="w-full pl-10 pr-4 py-3 border-b-2 border-gray-200 focus:border-[#00d4ff] focus:outline-none transition-colors"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={state === 'Log in' ? login : signup}
                  className="w-full bg-[#00d4ff] text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 mt-6"
                >
                  {state}
                  <FiArrowRight />
                </motion.button>
              </div>

              <div className="mt-6 text-center">
                {state === 'Log in' ? (
                  <p className="text-gray-600">
                    Don't have an account?{' '}
                    <button 
                      onClick={() => setState('Sign up')}
                      className="text-[#00d4ff] font-medium hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                ) : (
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <button 
                      onClick={() => setState('Log in')}
                      className="text-[#00d4ff] font-medium hover:underline"
                    >
                      Log in
                    </button>
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
    </>
  )
}

export default LoginSignup