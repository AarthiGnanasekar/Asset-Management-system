import express from "express"
import {adminLogin, employeeLogin, getAuthStatus, logout} from "../Controllers/authController.js"

const authRouter=express.Router()

//admin login

authRouter.post("/admin/login",adminLogin)

//employee login

authRouter.post("/employee/login",employeeLogin)

//auth status verification
authRouter.get("/me",getAuthStatus)

//remove the auth token from cookies
authRouter.get("/logout",logout)

export default authRouter