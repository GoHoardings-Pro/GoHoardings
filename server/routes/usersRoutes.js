const express = require('express')
const { goUsers,odoUsers,applyCard ,odoSwitchToggle, goUserSwitchToggle } = require('../controller/usersController')


const router = express.Router()



router.route('/odoUsers').get(odoUsers).post(odoSwitchToggle); 
router.route('/goUsers').get(goUsers).put(applyCard).post(goUserSwitchToggle);



module.exports = router;