import express from "express"
import { signUp,login,logOut } from "../controllers/auth.controller.js"


const authRouter=express.Router()

authRouter.post("/signup",signUp)
authRouter.post("/login",login)
authRouter.get("/logout",logOut)


export default authRouter



// /api/auth/signup
// /api/auth/login
// /api/auth/logOut
