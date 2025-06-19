import express from "express"
import { assignedAsset, returnAssignedAsset } from "../Controllers/adminController.js"


const adminRouter=express.Router()


//assign assets
adminRouter.post("/assign/asset",assignedAsset)

//update assigned asset
adminRouter.put("/return/asset",returnAssignedAsset)

export default adminRouter


