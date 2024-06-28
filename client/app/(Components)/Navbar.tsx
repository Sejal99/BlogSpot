"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

const Navbar = () => {
  const [token, setToken]= useState<string|null>()
  const router= useRouter()
  const handleClick = ()=> {
    router.push('/login')
    
  }
  const handleLogout = ()=> {
    localStorage.clear()
    router.push('/')

  }

  useEffect(()=> {
    setToken(localStorage.getItem('token'))
  },[])

  return (
    <div className=' px-8 items-center bg-slate-700 justify-between flex gap-3 p-3 py-4'>
        <div onClick={()=> router.push('/')} className=' cursor-pointer text-[1.8rem] hover:text-white font-semibold text-white'>Blogify</div>
        <div className=' items-center flex gap-5'>
          {!token ? (
            <div className=' flex gap-5'>
              <button onClick={()=> router.push('/signup')} className='   rounded-lg font-medium text-[1.2rem] hover:text-white text-white'>Signup</button>
            <button onClick={handleClick} className='   rounded-lg font-medium text-[1.2rem] hover:text-white text-white'>Signin</button>
            </div>
          ) : (
            <div className=' flex gap-5'>
              <button onClick={()=> router.push('/all-blogs')} className='   rounded-lg font-semibold text-[1.2rem] text-white'>All Blogs</button>
              <button onClick={()=> router.push('/createBlog')} className='   rounded-lg font-semibold text-[1.2rem] text-white'>Create Blog</button>
              <button onClick={()=> router.push('/myBlogs')} className='   rounded-lg font-semibold text-[1.2rem] text-white'>My Blogs</button>
              <button onClick={handleLogout} className='   rounded-lg font-semibold text-[1.2rem] text-white'>Logout</button>
            </div>
          )
        }
            
        </div>
    </div>
  )
}

export default Navbar

