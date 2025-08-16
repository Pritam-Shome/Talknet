import React from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import getCurrentUser from './customHooks/getCurrentUser.jsx'
import { useSelector } from "react-redux"
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'







const App = () => {
  getCurrentUser();//it is for beacuse to work when the page is refreshed


  let {userData}=useSelector(state=>state.user)

  return (
    <div>
      <Routes>
         <Route path='/login' element={!userData?<Login/>:<Navigate to="/"/>}/>
      <Route path='/signup' element={!userData?<SignUp/>:<Navigate to="/profile"/>}/>
      <Route path='/' element={userData?<Home/>:<Navigate to="/login"/>}/>
      <Route path='/profile' element={userData?<Profile/>:<Navigate to="/signup"/>}/>

      </Routes>
    </div>
  )
}

export default App