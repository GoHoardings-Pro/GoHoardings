const express = require('express');

const { acceptData,rejectData,rejectedAccept,updateSync } = require('./../controller/syncController')

const router = express.Router();

router.route('/accepts').put(acceptData).get(updateSync);
router.route('/rejects').put(rejectData).get(rejectedAccept)
// router.route()

module.exports =  router