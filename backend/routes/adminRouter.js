import express from "express"
import { assignedAsset, getAssignedAsset, returnAssignedAsset } from "../Controllers/adminController.js"


const adminRouter=express.Router()


//assign assets
adminRouter.post("/assign/asset",assignedAsset)

//update assigned asset
adminRouter.put("/return/asset",returnAssignedAsset)

//get assigned assets
adminRouter.get("/assign/all",getAssignedAsset)

export default adminRouter


