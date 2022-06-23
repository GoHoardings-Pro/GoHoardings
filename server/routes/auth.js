const express = require('express')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router()
const db = require('../conn/conn')

router.post('/login', async (req, res) => {
  db.changeUser({database:"users"})
    const password = req.body.password;
    const email = req.body.email;
    db.query("SELECT * FROM users WHERE email = ? ", [email], async (err, result) => {
        if (err) throw err;
            if (!result.length || await bcrypt.compare(password, result[0].password))
             {
            
              res.json({ success: false, message: "Wrong Email & Password" });
            } else {
              const role = result[0].role
              const email = result[0].email
              const id = result[0].id;
              const token = jwt.sign({ id }, "Login_Successfull", {
                expiresIn: 5000,
              });
              return res.send({ success: true, token: token, email: email,password, id, role });
             
            };
    });
});


router.put("/update", async (req, res) => {
  db.changeUser({database:"sql_login"})
  const {id, email, password:Npassword, role} = req.body;
  const password = await bcrypt.hash(Npassword,8)
  db.query(
    "UPDATE users SET  email = ?, password = ?, role = ? WHERE id = ?",
    [email, password, role, id],
    (err, result) => {
      if (err) {
        res.json({success : err, message: "update Unsucessfull"});
      };
      res.send({status : result, success:"Updated SuccessFul"})    
    }
  );
});


module.exports = router;