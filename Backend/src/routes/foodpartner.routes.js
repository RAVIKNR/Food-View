const express = require('express')
const router = express.Router()
const foodPartnerController = require('../controller/foodpartner.controller')
const authMiddleware = require('../middleware/auth.middleware')


router.get('/:id',foodPartnerController.getfoodpartnerById)

module.exports = router