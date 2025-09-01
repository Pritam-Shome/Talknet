import React, { useRef, useState } from 'react'
import dp from "../assets/dp.webp"
import { IoCameraOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../main';
import { setUserData } from '../redux/userSlice';

function Profile() {
    let { userData } = useSelector(state => state.user)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let [name, setName] = useState(userData.name || "")
    let [frontendImage, setFrontendImage] = useState(userData.image || dp)
    let [backendImage, setBackendImage] = useState(null)
    let image = useRef()
    let [saving, setSaving] = useState(false)

    const handleImage = (e) => {
        let file = e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }

    const handleProfile = async (e) => {
        e.preventDefault()
        setSaving(true)
        try {
            let formData = new FormData()
            formData.append("name", name)
            if (backendImage) {
                formData.append("image", backendImage)
            }
            let result = await axios.put(`${serverUrl}/api/user/profile`, formData, { withCredentials: true })
            setSaving(false)
            dispatch(setUserData(result.data))
            navigate("/")
        } catch (error) {
            console.log(error)
            setSaving(false)
        }
    }

    return (
        <div className="w-full h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col justify-center items-center gap-6 px-4">
            {/* Back Button */}
            <div
                className="fixed top-5 left-5 cursor-pointer hover:scale-105 transition"
                onClick={() => navigate("/")}
            >
                <IoIosArrowRoundBack className="w-12 h-12 text-gray-600" />
            </div>

            {/* Profile Image */}
            <div
                className="bg-white rounded-full border-4 border-blue-400 shadow-lg relative cursor-pointer hover:scale-105 transition"
                onClick={() => image.current.click()}
            >
                <div className="w-48 h-48 rounded-full overflow-hidden flex justify-center items-center">
                    <img src={frontendImage} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-blue-400 flex justify-center items-center shadow-md">
                    <IoCameraOutline className="text-white w-5 h-5" />
                </div>
            </div>

            {/* Profile Form */}
            <form
                className="w-full max-w-md flex flex-col gap-5 items-center"
                onSubmit={handleProfile}
            >
                <input
                    type="file"
                    accept="image/*"
                    ref={image}
                    hidden
                    onChange={handleImage}
                />

                <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full h-12 border border-blue-400 px-4 py-2 rounded-lg shadow-sm text-gray-700 text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />

                <input
                    type="text"
                    readOnly
                    className="w-full h-12 border border-blue-300 px-4 py-2 rounded-lg shadow-sm text-gray-500 text-lg bg-gray-50 cursor-not-allowed"
                    value={userData?.userName}
                />

                <input
                    type="email"
                    readOnly
                    className="w-full h-12 border border-blue-300 px-4 py-2 rounded-lg shadow-sm text-gray-500 text-lg bg-gray-50 cursor-not-allowed"
                    value={userData?.email}
                />

                <button
                    className="px-6 py-3 bg-blue-500 rounded-xl shadow-md text-lg w-48 font-semibold text-white hover:bg-blue-600 transition disabled:opacity-70"
                    disabled={saving}
                >
                    {saving ? "Saving..." : "Save Profile"}
                </button>
            </form>
        </div>
    )
}

export default Profile
