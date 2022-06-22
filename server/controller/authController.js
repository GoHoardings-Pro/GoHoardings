const db = require('./../conn/conn');

exports.login = async(req,res,next) => {
    const { email, password} = req.body;
 try{

      const user = await 
   
// db.query("SELECT * from ")
      res.status(200).json({
         message: 'admin login success'
      })
 }catch(error){
    res.status(404).json({
        message:error
    })
 }       
    
}