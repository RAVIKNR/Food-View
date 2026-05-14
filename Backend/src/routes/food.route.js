const express = require("express")
const router = express.Router()
const foodController = require('../controller/food.controller')
const authMiddleware = require('../middleware/auth.middleware')
const multer = require('multer')
const upload = multer({storage:multer.memoryStorage()})


router.post("/",authMiddleware.authFoodMiddleware,upload.single("file"),foodController.createFood)

router.get("/",authMiddleware.authUserMiddleware,foodController.getFood)

router.post('/like',authMiddleware.authUserMiddleware,foodController.likedFood)

router.post('/save',authMiddleware.authUserMiddleware,foodController.savedFood)

module.exports = router