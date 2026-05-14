const express = require('express')
const authController = require('../controller/auth.controller') 
const multer = require('multer')
const upload = multer({storage:multer.memoryStorage()})


const router = express.Router()

//User Authentication

router.post('/user/registration',authController.registration)
router.post("/user/login",authController.Login)
router.post("/user/logout",authController.Logout)


//Food Partner Authentication

router.post('/partner/registration',upload.single('logo'),authController.Partnerregistration)
router.post("/partner/login",authController.PartnerLogin)
router.post("/partner/logout",authController.PartnerLogout)

module.exports = router