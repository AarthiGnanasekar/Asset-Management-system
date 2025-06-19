import Admin from "../Models/Admin.js"
import Employee from "../Models/Employee.js"
// import jwt from "jsonwebtoken"
import { generateToken, verifyToken } from "../Utils/jwt.js"
export const adminLogin=async(req,res,next)=>{

    try{
         const{email,password}=req.body

         if(email && password){
         const isAdmin= await Admin.findOne({email})
         if(isAdmin){
            if(password===isAdmin.password){
                //send the admin id as a token in cookies
                const token=generateToken({id:isAdmin._id,role:"admin"})
            
               res.cookie("token",token,{maxAge:1000*60*60*24*7,httpOnly:true})
               res.status(200).send({message:"Login Succcessful"})
            }else{
                throw new Error("Password not matched")
            }
         }
         else{
           throw new Error ("User details Not found")
         }
         }
         else{
           throw new Error("Provide all the fields")
         }
    }
    catch(error){
   next(error)
    }
}

export const employeeLogin = async (req, res, next) => {
  try {
    const { email, password ,empId} = req.body;

    if ( password && email || empId) {
      let employee;
       if(email){
         employee = await Employee.findOne({ email });
       }
       else{
         employee = await Employee.findOne({ empId });
       }
    

      if (employee) {
        if (password === employee.password) {
          // generate token (e.g., JWT) with employee ID
          const token = generateToken({ id: employee._id,role:"employee" });

          // send token in cookies
          res.cookie("token", token, {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            httpOnly: true,
          });

          res.status(200).send({ message: "Login successful" });
        } else {
          throw new Error("Password not matched");
        }
      } else {
        throw new Error("Employee not found");
      }
    } else {
      throw new Error("Provide all the fields");
    }
  } catch (error) {
    next(error);
  }
};
 export const getAuthStatus=async(req,res,next)=>{
  try{
  //  console.log(req.cookies)

  const{token}=req.cookies
  const {id,role}=verifyToken(token)
  if(role=="admin"){
    //get the admin data
    const adminDetails=await Admin.findById(id,{_id:0,password:0})
    return res.status(200).send(adminDetails)
  }
  else if (role=="employee"){
     const employeeDetails=await Employee.findById(id,{_id:0,password:0,__v:0})
      return res.status(200).send(employeeDetails)
  }
  }
  catch(error){
    next(error)
  }
 }

 export const logout=async(req,res,next)=>{
  try{
  //  console.log(req.cookies)
  res.clearCookie("token")
  res.status(200).send({message:"Logout successful"})
  }
  catch(error){
    next(error)
  }
 }