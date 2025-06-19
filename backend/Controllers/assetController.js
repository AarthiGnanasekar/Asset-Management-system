import Asset from "../Models/Asset.js"

export const addAsset=async(req,res,next)=>{
    try{
      const assetDetails=new Asset(req.body)
      await assetDetails.save()
      res.status(201).send({message:"Asset added"})
    }
    catch(error){
      next(error)    //calls the error hanling middleware
    }
}
export const allAssets=async(req,res,next)=>{
    try{
       const assets=await Asset.find()
       res.status(201).send(assets)
    }
    catch(error){
        next(error)
    }
}
// export const deleteAssets=async(req,res,next)=>{
//     try{
//     const {id}=req.params

//     const deletingAsset=await Asset.findByIdAndDelete(id)
//     if(deletingAsset){
//        return res.status(200).send({message:"Asset deleted successfully"})
//     }
//     else{
//         return res.status(404).send({message:"Asset not found"})
//     }

//     }
//     catch(error){
//         next(error)
//     }
// }


export const deleteAssets=async(req,res,next)=>{
   try{
    const {id}=req.params
    await Asset.deleteOne({_id:id})
    res.status(200).send({message:"Asset deleted"})
   }
   catch(error){
    next(error)
   }
}

// export const updateAssets=async(req,res,next)=>{
//     try{
//         const {id}=req.params
//         const updateDta=req.body
         

//         const toUpdate=await Asset.findByIdAndUpdate(id,updateDta,{new:true,runValidators:true})

//         if(toUpdate){
//             return res.status(200).send({message:"Asset updated successfully"})
//         }
//         else{
//             return res.status(404).send({message:"Asset not found"})
//         }
//     }
//     catch(error){
//         next(error)
//     }
// }
export const updateAssets=async(req,res,next)=>{
    try{
    const {id}=req.query
    await Asset.updateOne({_id:id},{...req.body})
    res.status(200).send({message:"Asset details updated"})
    }
    catch(error){
        next(error)
    }
}