import React, { useState } from 'react'


const Login = () => {
    
    const [formData, setFormData] = useState({email: '', password:''})
    
    const changeHandler = (e) =>{
        setFormData({...formData, [e.target.name]:e.target.value })
      }

    const setlogin = async () =>{
        const response = await fetch(`${import.meta.env.BACKEND_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
            console.log(JSON.stringify(formData))        

        const data = await response.json()

        if(data.success){
            localStorage.setItem('auth-token', data.token)
            window.location.href = '/'
        }else{
            console.log("Something went wrong..!");
        }
        

    }


  return (
    <>
    <section className='flex justify-between'>

    <div className='flex justify-center mt-24 mx-auto '>
    <div className=' w-[30rem] h-[38rem] flex flex-col items-center py-4 '>
        <h1 className='font-bold text-3xl '> Log-in </h1>

        <div className='space-y-4 mt-10 '>


            <div>
                <input name='email' type="email" placeholder='email' value={formData.email} onChange={changeHandler} className='bg-transparent border-2 w-96 h-14 py-1 px-4  '  />
            </div>

            <div>
                <input name='password' type="password" placeholder='password' value={formData.password} onChange={changeHandler} className='bg-transparent border-2 w-96 h-14 py-1 px-4  '  />
            </div>
            
            <div>
                <button className=' bg-[#00d4ff] w-full h-10 px-10 py-2 font-medium text-white ' onClick={()=>setlogin()} >Login</button>
            </div>

        </div>


    </div>
    </div>

        </section>
    </>
  )
}

export default Login