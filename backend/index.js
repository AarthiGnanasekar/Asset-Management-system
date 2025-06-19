import express from "express"
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser"
//dotenv configuration
import {config} from "dotenv"
import connectDB from "./Config/dbConfig.js"
import adminRouter from "./routes/adminRouter.js"
import assetRouter from "./routes/assetRouter.js"
import employeeRouter from "./routes/employeeRouter.js"
import errorrHandler from "./Middlewares/ErrorBounding.js"
import authRouter from "./routes/authRouter.js"
config()



//server declaration
const app=express()

//middlewares
app.use(express.json())//json parser
app.use(express.urlencoded({extended:true})) //url data parser
app.use(cookieParser())//cookie parser data
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}))//cors policy resolve
app.use(morgan("dev"))//http logger

//demo route
app.get("/",(req,res)=> res.send({message:"Server is working"}))

//routes
app.use("/api/admin",adminRouter)
app.use("/api/asset",assetRouter)
app.use("/api/employee",employeeRouter)
app.use("/api/auth",authRouter)

//error bounding

app.use(errorrHandler)

//connect db
connectDB()

//server listening
const port=process.env.SERVER_PORT || 4040
app.listen(port,()=>{
    console.log("server running in " +port)
})