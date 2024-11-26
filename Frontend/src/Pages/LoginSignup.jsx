import React, { useState } from 'react'

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


  const login = async() =>{
    console.log("It has logged in!!!", formData)

    let responsiveData;

    await fetch ('http://localhost:4000/login',{
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

    await fetch ('http://localhost:4000/signup',{
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
      <section className='flex justify-between'>

        <div style={{'clip-path': 'polygon(0 0, 98% 0, 79% 100%, 0% 100%)'}} className=' bg-login_img  w-3/6 h-[100vh] '>
          <div className='bg-[#0e0e0e73] w-full h-full '></div>
        </div>

        <div className='flex justify-center mt-24 mx-auto '>
          <div className=' w-[30rem] h-[38rem] flex flex-col items-center py-4 '>
            <h1 className='font-bold text-3xl '> {state} </h1>

            <div className='space-y-4 mt-10 '>

              {
                state === 'Sign up' ? 
                <div>
                  <input type="text" name='username' value={formData.username} onChange={changeHandler} placeholder='username' 
                  className='bg-transparent border-2 py-1 px-4 w-96 h-14  ' />
                </div> : ''
              }


              <div>
                <input name='email' type="email" placeholder='email' value={formData.email} onChange={changeHandler} className='bg-transparent border-2 w-96 h-14 py-1 px-4  '  />
              </div>

              <div>
                <input name='password' type="password" placeholder='password' value={formData.password} onChange={changeHandler} className='bg-transparent border-2 w-96 h-14 py-1 px-4  '  />
              </div>
              
              <div>
                <button className=' bg-[#00d4ff] w-full h-10 px-10 py-2 font-medium text-white ' onClick={()=>{state==='Log in' ? login() : signup() }} >{state}</button>
              </div>

              <div>
                {
                  state==='Log in' ? 
                  <div className='flex items-center gap-2'>
                      <p>Create new account?</p> 
                      <p onClick={()=>{setState('Sign up')}} className=' cursor-pointer font-bold text-[#00d4ff] '>Click here</p>
                  </div>  : 
                  <div className='flex items-center gap-2'>
                    <p>Already have an account?</p>
                    <p onClick={()=>{setState('Log in')}} className=' cursor-pointer font-bold text-[#00d4ff] '>login here</p>
                  </div>
                }
              </div>

            </div>


          </div>
        </div>
     
      </section>
    </>
  )
}

export default LoginSignup