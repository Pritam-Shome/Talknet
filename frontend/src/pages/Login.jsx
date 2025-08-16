import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../main.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice.js'

const Login = () => {
  let navigate = useNavigate();
  let [email,setEmail]=useState("");
  let [password,setPassword]=useState("");
  let [loading,setLoading]=useState(false)
  let [err,setErr]=useState("")
  let dispatch=useDispatch();


  const handleLogin= async (e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      let result=await axios.post(`${serverUrl}/api/auth/login`,{
        email:email,
        password:password
      },{withCredentials:true});

       dispatch(setUserData(result.data))
      
       setEmail("")
       
       setPassword("")
       setLoading(false)
       setErr("")

    } catch (error) {
      console.log(error)
      setLoading(false)
      setErr(error.response.data.message)

    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 p-4'>
      <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'>
        <div className='text-center mb-6'>
          <h1 className='text-3xl font-bold text-gray-800'>
            WELCOME TO <span className='text-indigo-600'>CHATAPP</span>
          </h1>
        </div>
        <form className='flex flex-col space-y-4' onSubmit={handleLogin}>
          <input
            type="email"
            placeholder='email'
            className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder='password'
            className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          {err && <p className='text-red-500'>{"*" + err}</p>}

          <button
            type="submit"
            className='bg-indigo-600 text-white font-bold py-2 rounded-lg hover:bg-indigo-700 transition duration-300'
            disabled={loading}
          >
            {loading?"Loading...":"Login"}
          </button>
          <p className='text-center text-sm text-gray-600 mt-4 cursor-pointer' onClick={() => navigate("/signup")}>
            Don't have an account? <span className='text-indigo-600 hover:text-indigo-800 transition duration-300 font-medium'>Sign up</span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login