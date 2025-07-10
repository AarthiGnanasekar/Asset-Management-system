import express from "express"
import { assignedAsset,getAllAssets, returnAssignedAsset } from "../Controllers/adminController.js"


const adminRouter=express.Router()


//assign assets
adminRouter.post("/assign/asset",assignedAsset)

//update assigned asset
adminRouter.put("/return/asset",returnAssignedAsset)

//get all assets
adminRouter.get("/assign/all", getAllAssets);

export default adminRouter


