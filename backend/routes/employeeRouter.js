import express from "express"
import { adminVerify } from "../Middlewares/adminVerify.js"
import { addEmployee, allEmployee, getEmployee } from "../Controllers/employeeController.js"



const employeeRouter=express.Router()

//det loggedin employee data

employeeRouter.get("/",getEmployee)
 
employeeRouter.post("/add",adminVerify,addEmployee)

employeeRouter.get("/all",adminVerify,allEmployee)

export default employeeRouter