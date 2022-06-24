const express = require('express');

const { rejectedAccept,rejectedData,updateSync,updateStatus } = require('../controller/syncController')

const router = express.Router();

router.route('/accepts').get(updateSync).put(updateStatus);


router.route('/rejects').get(rejectedData).put(rejectedAccept)

module.exports =  router