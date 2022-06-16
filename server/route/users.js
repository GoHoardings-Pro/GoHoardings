const express = require('express')
const router = express.Router()

const db = require('../conn/conn')
db.changeUser({database : "odoads_tblcompanies"})

router.get('/odoUsers' , (req, res) => {
  db.query("SELECT * FROM tblcompanies ", function (err, result) {
    if (err) throw err;
    return res.send(result);
  });
});

router.get('/goUsers' , (req, res) => {
  db.changeUser({database : "odoads_tblcompanies"})
  db.query("SELECT * FROM tblcontacts ", function (err, result) {
    if (err) throw err;
    return res.send(result);
  });
});

module.exports = router;