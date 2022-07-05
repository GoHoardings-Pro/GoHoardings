const express = require('express')

const router = express.Router();

const { protect, getMe,me, login,logout } = require('../controller/authController.js')


router.post('/login',login);
router.get('/logout',logout)

router.get('/me', protect , getMe , me)

module.exports = router;