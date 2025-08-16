import React from "react"
import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main.jsx"
import { useDispatch, useSelector } from "react-redux"
import { setUserData } from "../redux/userSlice.js"



///customHooks will get the data from backend and save it in redux store
//here it will /api/user/current which by isAuth and getCurrentUser get the user data like name and email and save it in redux store




const getCurrentUser=()=>{
    let dispatch=useDispatch()
    let {userData}=useSelector(state=>state.user)
    useEffect(()=>{
        const fetchUser=async ()=>{
            try {
                let result=await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
                dispatch(setUserData(result.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    },[userData])
}

export default getCurrentUser