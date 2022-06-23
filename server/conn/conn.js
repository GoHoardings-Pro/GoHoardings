const mysql = require("mysql");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "users",

})

db.connect((err)=>{
  if(err) return err

  console.log('db connected');
})



module.exports = db;