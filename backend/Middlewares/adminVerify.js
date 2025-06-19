import { verifyToken } from "../Utils/jwt.js"
import Admin from "../Models/Admin.js"
export const adminVerify=async (req,res,next)=>{
    try{
//    console.log(req.cookies)
   const{token}=req.cookies
   const {id}=verifyToken(token)
   //check the id is valid or not

   const isAdmin=Admin.findById(id)
   if(isAdmin){
    next()
   }
   else{
    throw new Error("Invalid admin credentials")
   }
    }
    catch(error){
       throw new Error(error)
    }
}