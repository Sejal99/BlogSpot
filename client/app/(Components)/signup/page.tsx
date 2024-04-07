"use client"
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState, useRef } from "react"
import Cookies from 'js-cookie'
import gallery from '../../(assets)/gallery.png'
import  Swal from 'sweetalert2'
import Image from 'next/image'
import Navbar from '../Navbar'
import '../styles.css'
import { base_url } from '../secret'

const Page = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [disable, setDisable] = useState(false)
  const [message, setMessage] = useState('')

  const router = useRouter()
  const inputRef = useRef(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      const allowedExtensions = ["png", "jpeg", "jpg", "svg", "webp"]
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase()
  
      if (fileExtension && allowedExtensions.includes(fileExtension)) {
        setFile(selectedFile)
        setError('')
      } else {      
        console.error("Invalid file type. Please select a .png, .jpg, .svg file.")
        setError("Invalid file type. Please select a .png, .jpg, .svg, or webp file.")
        e.target.value = ''
      }
    }
  }

  const handleSignup = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
     
    try {
      const res = await fetch(`${base_url}/user/`, {
        method: "POST",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: username,
          email: email,
          password: password,
          filename: file?.name,
          contentType: file?.type
        })
      })
      if (!res.ok) {
        throw new Error('Network connection error!')
      }
      const data = await res.json()
        
      Swal.fire("User registered successfully!")
      router.push('/login')
  
    } catch(err) {
      console.log(err)
    }
  }

  const handleImageClick = () => {
    //@ts-ignore
    inputRef.current.click()
  }

  const sendImage = async () => {
    try {
      const res = await fetch(`${base_url}/user/picture`, {
        method: "POST",
        //@ts-ignore
        headers: {
          'Content-Type': "application/json",
          'authorization': localStorage.getItem('token'),
        },
        body: JSON.stringify({
          filename: file?.name,
          contentType: file?.type
        })
      })
      if (!res.ok) {
        throw new Error('Network problem!')
      }
      const data = await res.json()
        
      if (data) {
        const s3PutUrl = data

        const res2 = await fetch(s3PutUrl, {
          method: "PUT",
          //@ts-ignore
          headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Content-Type": file?.type
          },
          body: file
        })
        
        if (!res2.ok) {
          throw new Error("Network Problem!")
        }
        
        setDisable(true)
        setMessage("Profile Picture uploaded successfully!")
        
      } else {
        setMessage("Error while uploading")
      }
        
    } catch(err) {
      setDisable(false)
      setMessage("Error while uploading")
      console.log(err)
    }
  }
    
  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <div className="mt-8 flex justify-center items-center">
        <div className="bg-white p-4 py-6 shadow-md rounded-md w-[22rem]">
          <h2 className="text-2xl font-bold mb-4">Registration</h2>
          <form onSubmit={handleSignup}>
            <div className="mb-2">
              <div onClick={handleImageClick} className='flex items-center justify-center'>
                {file ? 
                  <Image src={URL.createObjectURL(file)} className="rounded-full" height={100} width={100} alt="profile" />
                  : <Image src={gallery} className="rounded-full" height={100} width={100} alt="profile" />
                }
                <input
                  ref={inputRef}
                  type="file"
                  id="file"
                  accept=".png, .jpg, .jpeg, .svg"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <div className='flex justify-center items-center gap-2 mt-2'>
                <button type='button' disabled={disable} onClick={sendImage} className={`px-4 py-2 rounded-md text-white ${disable ? 'bg-gray-500' : 'bg-cyan-500 hover:bg-cyan-600 focus:outline-none'}`}>Upload</button>
                {error !== "" &&  <div className="text-red-600 font-medium">{error}</div>}
                <div className='text-green-700 font-medium'>{message}</div>
              </div>
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-1">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Page
