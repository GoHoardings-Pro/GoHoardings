const express = require('express')
const { goUsers,odoUsers } = require('../controller/usersController')


const router = express.Router()



router.route('/odoUsers').get(odoUsers); 
router.route('/goUsers').get(goUsers);



module.exports = router;