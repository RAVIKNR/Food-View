const foodModel = require('../models/food.model')
const storageServive = require('../storage/storage.service')
const {v4:uuid} = require('uuid')
const likesModel = require('../models/likes.model')
const saveModel = require('../models/saved.model')

async function createFood(req,res) {
 
  const foodPartner = req.foodPartner


  const file = req.file.buffer
  const fileName = uuid()
  const result = await storageServive.uploadFile(file,fileName)

   const foodItem = await foodModel.create({
    food:req.body.name,
    description:req.body.description,
    video:result.url,
    foodPartner:foodPartner._id,
    storeName:req.body.storeName
   })



  return res.status(201).json({
    message:"Food Item  is Created",
    foodItem
  })
 


}

async function getFood (req,res){

    const menu = await foodModel.find({})

    return res.status(200).json({
      message:"Fetched Sucessfully",
      menu
    })

}

async function likedFood(req,res){

    const user = req.user
    const {foodId} = req.body

    const isAlreadyLiked = await likesModel.findOne({
         user:user._id,
         food:foodId
    })

    if(isAlreadyLiked){
      await likeModel.deleteOne({
        user:user._id,
        food:foodId
      })
      await foodModel.findByIdAndUpdate(foodId,{
        $inc:{likeCount:-1}
      })

      return res.status(200).json({
        message:"Food unliked"
      })

    }
    const like = await likeModel.create({
        user:user._Id,
        food:foodId
    })

    await foodModel.findByIdAndUpdate(foodId,{
        $inc:{likeCount:+1}
    })
      return res.status(200).json({
        message:"Food liked"
})

}

async function savedFood(req,res) {
  foodId = req.body
  const user = req.user

  const isAlreadySaved = await saveModel.findOne({
    user:user._id,
    food:foodId
  })

  if(isAlreadySaved){

    await saveModel.deleteOne({
      user:user._id,
    food:foodId
    })

    return res.status(200).json({
      message:"unsaved sucessfully"
    })

  }

    await saveModel.create.findOne({
      user:user._id,
      food:foodId
    })

   
   return res.status(200).json({
      message:"saved sucessfully"
   })

}

module.exports = {createFood,getFood,likedFood,savedFood}

