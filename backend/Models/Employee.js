import mongoose  from "mongoose";


const employeeSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    empId:{type:String,required:true,unique:true},
    phone:{type:Number,required:true,unique:true},
    department:{type:String,enum:["HR","IT","Management","Finance","Branding"]},
    role:{type:String},
    status:{type:String,enum:["active","inactive","resigned"]}
},{timestamps:true})


const Employee=mongoose.model("Employees",employeeSchema)

export default Employee