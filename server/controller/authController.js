const db = require('./../conn/conn');
const jwt = require('jsonwebtoken')

exports.login = async (req, res, next) => {
   try {
      const { email, password } = req.body;
      console.log(email, password);

      //email: uday@gmail.com 
      // password: a


      db.changeUser({ database: "users" })

      db.query("SELECT * FROM admin WHERE email = ? ", [email], async (err, result) => {
         if (err) throw err;
         
         if (!result.length === result[0].password) {

            res.status(404).json({
               success: false,
               message: "Wrong Email & Password"
            });
         } else {
            const role = result[0].role
            const email = result[0].email
            const id = result[0].id;
            const name = result[0].name;
            const token = jwt.sign({ id }, "Login_Successfull", {
               expiresIn: 5000,
            });
            console.log(token);
            return res.status(200).json({
               success: true,
               token: token,
               user: {
                  name,
                  email,
                  password,
                  id,
                  role
               }});

         };
      });

   }

   catch (error) {
      res.status(404).json({
         message: error
      })
   }

}