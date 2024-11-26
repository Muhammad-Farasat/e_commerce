import React, { useContext, useEffect, useRef, useState } from 'react'
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';
import { HiBars3BottomRight } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import Shop from '../../Pages/Shop';
import { ShopContext } from '../../Context/ShopContext';


const NavBar = () => {

    const [menu, setMenu] = useState('shop');
    const {getTotalItems} = useContext(ShopContext);
    // const [isSeller, setIsSeller] = useState(false)

    const [hamburger, setHamburger] = useState(false)


    useEffect(()=>{

       const user = JSON.parse(localStorage.getItem('user'))
        console.log(user)
        // if(user && user.role === 'seller'){
        //     setIsSeller(true)
        // }

    },[])

  return (
    <>
        <section className=' flex justify-center '>
                <div className="container w-4/5 bg-[#0e0e0eb4] h-20 font-Rajdhani rounded-bl-lg rounded-br-lg px-6 flex justify-between items-center max-sm:h-12 max-sm:px-2 ">
                    
                    <div className='logo max-sm:text-xs text-2xl text-[#f4f4f4] font-extrabold tracking-wider cursor-pointer '>
                        <Link to={'/'}>
                            <p>UrbanFabric</p>
                        </Link>
                    </div>

                    <div onClick={()=>setHamburger(!hamburger)} className=' hidden text-3xl text-[#f4f4f4] max-sm:text-xl max-md:block max-lg:block '>
                        <div className='cursor-pointer'>
                            {
                                hamburger ? <RxCross2 className='z-[999] text-[f4f4f4] absolute' /> 
                                :           <HiBars3BottomRight className='z-50  ' />
                            }
                        </div>

                        <div className={`w-[22rem] h-[100vh] max-sm:w-60 z-[99] bg-[#1a1a1a] absolute top-0 right-0 flex px-10 flex-col transition-all duration-300  ${hamburger ? 'block' : 'hidden'}` }>
                            
                            <div className= 'mt-32  '  >
                                <ul className=' flex flex-col gap-y-5  font-Rajdhani-Regular text-xl cursor-pointer'>
                                    <li onClick={() =>{setMenu('mens')}} > <Link to={'/mens'}>Mens</Link> {menu==='mens' ? <hr className=' border-blue-500 border-[1px] ' /> : <></>} </li>
                                    <li onClick={() =>{setMenu('womens')}} > <Link to={'/womens'} >Womens</Link> {menu==='womens' ? <hr className=' border-blue-500 border-[1px] ' /> : <></>} </li>
                                    <li onClick={() =>{setMenu('kids')}} > <Link to={'/kids'}>Kids</Link> {menu==='kids' ? <hr className=' border-blue-500 border-[1px] ' /> : <></>} </li>
                                </ul>
                            </div>
                            
                            <div className='mt-8 flex flex-col items-start gap-y-8 font-Rajdhani-Medium font-bold tracking-widest '>
                                <Link to={'/cart'}> 
                                    <div className='text-2xl relative'>
                                        <MdOutlineShoppingCart />
                                        <div className="noOfItems absolute -top-1.5 -right-2 bg-red-600 rounded-full w-4 h-4 flex justify-center items-center ">
                                            <p className='absolute top-0 text-xs ' >{getTotalItems()}</p>
                                        </div>
                                    </div>
                                </Link>
                                {
                                    localStorage.getItem('auth-token') ?
                                    <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}} className='border-2 rounded-lg px-4 py-1 text-sm text-[#fff] ' >logout</button> :
                                    <Link to={'/LoginSignup'} className=' ' >
                                        <button className=' mt-8 border-2 rounded-lg px-4 py-1 text-sm text-[#ffffff]  border-[#00d4ff] hover:bg-[#00d4ff]  ' >Login</button>
                                    </Link>
                                
                                }
                            
                            </div>        
                        
                        </div>

                    </div>
                    
                    
                    <div className='max-md:hidden max-lg:hidden '>
                        <ul className=' flex gap-5 font-Rajdhani-Regular text-lg text-[#f4f4f4] cursor-pointer'>
                            <li onClick={() =>{setMenu('mens')}} > <Link to={'/mens'}>Mens</Link> {menu==='mens' ? <hr className=' border-blue-500 border-[1px] ' /> : <></>} </li>
                            <li onClick={() =>{setMenu('womens')}} > <Link to={'/womens'} >Womens</Link> {menu==='womens' ? <hr className=' border-blue-500 border-[1px] ' /> : <></>} </li>
                            <li onClick={() =>{setMenu('kids')}} > <Link to={'/kids'}>Kids</Link> {menu==='kids' ? <hr className=' border-blue-500 border-[1px] ' /> : <></>} </li>
                        </ul>
                    </div>

                    {/* ^^^^^^^ Buttons here ^^^^^^^^ */}
                    
                    <div className='max-md:hidden max-lg:hidden flex items-center gap-6 font-Rajdhani-Medium font-bold tracking-widest '>
                        <Link to={'/cart'}> 
                            <div className='text-2xl text-[#f4f4f4] relative'>
                                <MdOutlineShoppingCart />
                                <div className="noOfItems absolute -top-1.5 -right-2 bg-red-600 rounded-full w-4 h-4 flex justify-center items-center ">
                                    <p className='absolute top-0 text-xs text-[#f4f4f4] ' >{getTotalItems()}</p>
                                </div>
                            </div>
                        </Link>
                        {
                            localStorage.getItem('auth-token') ?
                            <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}} className='border-2 text-sm rounded-xl px-5 py-1 text-[#f4f4f4] hover:border-[#00d4ff] hover:bg-[#00d4ff] hover:text-[#fff] ' >logout</button> :
                            <Link to={'/LoginSignup'} >
                                <button className=' max-md:mt-14 border-2 rounded-xl px-5 py-1 text-sm hover:border-[#00d4ff] hover:bg-[#00d4ff] hover:text-[#fff] ' >Login</button>
                            </Link>
                        
                        }
                    
                    </div>
                
                </div>
        </section> 
    </>
  )
}

export default NavBar