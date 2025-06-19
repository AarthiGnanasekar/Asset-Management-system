import express from "express"
import { addAsset, allAssets, deleteAssets, updateAssets } from "../Controllers/assetController.js"
import { adminVerify } from "../Middlewares/adminVerify.js"


const assetRouter=express.Router()

//get all assets
assetRouter.get("/all",allAssets)

//add asset

assetRouter.post("/add",adminVerify,addAsset)

//update asset
assetRouter.put("/update/:id",adminVerify,updateAssets)

// delete asset
assetRouter.delete("/delete/:id",adminVerify,deleteAssets)


export default assetRouter