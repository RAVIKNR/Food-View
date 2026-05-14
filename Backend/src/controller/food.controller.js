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
      await likesModel.deleteOne({
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
    const like = await likesModel.create({
        user:user._id,
        food:foodId
    })

    await foodModel.findByIdAndUpdate(foodId,{
        $inc:{likeCount:+1}
    })
      return res.status(200).json({
        message:"Food liked",
        like
})

}

async function savedFood(req,res) {
  const {foodId} = req.body
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
      await foodModel.findByIdAndUpdate(foodId,{
        $inc:{saveCount:-1}
      })

    return res.status(200).json({
      message:"unsaved sucessfully"
    })

  }

   const save =  await saveModel.create({
      user:user._id,
      food:foodId
    })

     await foodModel.findByIdAndUpdate(foodId,{
        $inc:{saveCount:+1}
     })
   
   return res.status(200).json({
      message:"saved sucessfully",
      save
   })

}

async function getSavedFood(req,res){

  const user = req.user

 const getfood = await saveModel
  .find({ user: user._id })
  .populate('food');
  
  if(!getfood || getfood.length === 0){
    return res.status(404).json({
      message:"No saved videos present"
    })
  }

  return res.status(200).json({
    mesage:"You saved Videos",
    getfood
  })


}

module.exports = {createFood,getFood,likedFood,savedFood,getSavedFood}

