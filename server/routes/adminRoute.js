const express = require('express')

const router = express.Router();

const { protect, getMe,me, login } = require('../controller/authController.js')


router.post('/login',login);


router.get('/me', protect , getMe , me)

module.exports = router;