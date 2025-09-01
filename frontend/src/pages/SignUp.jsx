import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../main'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function SignUp() {
    let navigate = useNavigate()
    let [show, setShow] = useState(false)
    let [userName, setUserName] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [loading, setLoading] = useState(false)
    let [err, setErr] = useState("")
    let dispatch = useDispatch()

    const handleSignUp = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            let result = await axios.post(`${serverUrl}/api/auth/signup`, {
                userName, email, password
            }, { withCredentials: true })
            dispatch(setUserData(result.data))
            navigate("/profile")
            setEmail("")
            setPassword("")
            setLoading(false)
            setErr("")
        } catch (error) {
            console.log(error)
            setLoading(false)
            setErr(error?.response?.data?.message)
        }
    }

    return (
        <div className="w-full h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <div className="w-full max-w-md h-[600px] bg-white rounded-2xl shadow-xl flex flex-col gap-8">
                <div className="w-full h-[180px] bg-blue-400 rounded-b-[35%] shadow-md flex items-center justify-center">
                    <h1 className="text-gray-700 font-bold text-3xl">
                        Welcome to <span className="text-white">chatly</span>
                    </h1>
                </div>

                <form
                    className="w-full flex flex-col gap-6 items-center px-6"
                    onSubmit={handleSignUp}
                >
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full h-12 border border-blue-400 px-4 py-2 rounded-lg shadow-sm text-gray-700 text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full h-12 border border-blue-400 px-4 py-2 rounded-lg shadow-sm text-gray-700 text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />

                    <div className="w-full h-12 border border-blue-400 rounded-lg shadow-sm relative flex items-center">
                        <input
                            type={show ? "text" : "password"}
                            placeholder="Password"
                            className="w-full h-full px-4 py-2 rounded-lg text-gray-700 text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <span
                            className="absolute right-4 text-sm text-blue-500 font-medium cursor-pointer select-none"
                            onClick={() => setShow(prev => !prev)}
                        >
                            {show ? "Hide" : "Show"}
                        </span>
                    </div>

                    {err && <p className="text-red-500 text-sm">{"*" + err}</p>}

                    <button
                        className="px-6 py-3 bg-blue-500 rounded-xl shadow-md text-lg w-48 font-semibold text-white hover:bg-blue-600 transition disabled:opacity-70"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Sign Up"}
                    </button>

                    <p
                        className="text-gray-600 text-sm cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        Already have an account?{" "}
                        <span className="text-blue-500 font-semibold">Login</span>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default SignUp
