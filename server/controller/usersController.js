
const db = require('../conn/conn')
db.changeUser({database : "odoads_tblcompanies"})



exports.goUsers = async(req, res) => {
    db.changeUser({database : "odoads_tblcompanies"})
    db.query("SELECT * FROM tblcontacts ", function (err, result) {
      if (err) throw err;
        res.status(200).json({
        message:'success get',
        data:result
    })
})
}



exports.odoUsers = async(req, res) => {
    db.query("SELECT * FROM tblcompanies ", function (err, result) {
      if (err) throw err;
  
    res.status(200).json({
        message:'success get',
        data:result
    })
})
}
  