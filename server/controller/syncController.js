

exports.updateSync = async(req,res)=>{
        try{
            res.status(200).json({
                message:"success"
            })
        }catch(err){
            res.status(404).json({
                message:err
            })
        }
}


exports.acceptData = async(req,res)=>{
        try{
            res.status(200).json({
                message:"success"
            })
        }catch(err){
            res.status(404).json({
                message:err
            })
        }
}



exports.rejectData = async(req,res)=>{
        try{
            res.status(200).json({
                message:"success"
            })
        }catch(err){
            res.status(404).json({
                message:err
            })
        }
}
exports.rejectedAccept = async(req,res)=>{
        try{
            res.status(200).json({
                message:"success"
            })
        }catch(err){
            res.status(404).json({
                message:err
            })
        }
}