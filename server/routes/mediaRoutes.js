const express = require('express');

const { inventory, company, city } = require('../controller/mediaController');

const router = express.Router();

router.route('/inventory').post(inventory)
router.route('/company').get(company)
router.route('/city').get(city)

module.exports = router