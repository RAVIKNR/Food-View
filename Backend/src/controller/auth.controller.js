const userModel = require("../models/user.model")
const jwt = require('jsonwebtoken')
const blacklistModel = require('../models/blacklist.model')
const foodpartnerModel = require('../models/foodpartner.model')
const storageService = require('../storage/storage.service')

//USER

async function registration(req,res){
    
    const {name,email,password,contactNumber}=req.body

    const isAlreadyExist = await userModel.findOne({
        email
    })

    if(isAlreadyExist){
        return res.status(409).json({
            message:"Email is already exist"
        })
    }

    const user = await userModel.create({
        name,email,password,contactNumber
    })

    const token = jwt.sign({id:user._id},process.env.JWT_TOKEN)

    res.cookie("usertoken",token)
    
    return res.status(201).json({
        message:"User Successfully Created",
        user
    })

}

async function Login(req,res) {
    
    const {email,password}=req.body

    const user = await userModel.findOne({
        email
    })

    if(!user){
        return res.status(401).json({
            message:"User Not Found"
        })
    }

    const isPasswordValid = await user.comparePassword(password)
    
    if(!isPasswordValid){
        return  res.status(401).json({
            message:"Invalid Password"
        })
    }

    const token = jwt.sign({id:user._id},process.env.JWT_TOKEN)

    res.cookie("token",token)

    return res.status(200).json({
        message:"Successfully Login"
    })

}

async function Logout(req,res){
   
   const token = req.cookies.token

   if(!token){
    return res.status(200).json({
        message:"User Successfully Logout"
    })
   }

   const blacklistToken = await blacklistModel.create({
    token
   })

   res.clearCookie("token")

   return res.status(200).json({
        message:"User Successfully Logout"
    })


}


//PARTNER

async function Partnerregistration(req,res){
   const {partnerName,email,password,name,restaurantName,contactNumber,address,totalMeal,customerServe}= req.body

   const isAlreadyexist = await foodpartnerModel.findOne({
    email
   })

   if(isAlreadyexist){
      return res.status(409).json({
        message:"user Already exist"
      })
   }
  const file = req.file.buffer
  const fileName = "logo"
     const result = await storageService.uploadFile(file,fileName)

   const foodPartner = await foodpartnerModel.create({
    partnerName,email,password,restaurantName,contactNumber,address,totalMeal,customerServe,
    logo:result.url
   })

   const token = jwt.sign({id:foodPartner._id},process.env.JWT_TOKEN)

    res.cookie("partnertoken",token)
    
    return res.status(201).json({
        message:"User Successfully Created",
      
    })

}

async function PartnerLogin(req,res){
    const{email,password} = req.body

    const user = await foodpartnerModel.findOne({
        email
    })

    if(!user){
        return res.status(401).json({
            message:"user not exist"
        })
    }

    const isPasswordValid = await user.comparePassword(password)

    if(!isPasswordValid){
        return res.status(401).json({
            message:"Email or Password is wrong",
        })
    }

    const token = jwt.sign({id:user._id},process.env.JWT_TOKEN)

    res.cookie("token",token)

    return res.status(200).json({
        message:"Successfully Login"
    })



}

async function PartnerLogout(req,res){
   
   const token = req.cookies.token

   if(!token){
    return res.status(200).json({
        message:"User Successfully Logout"
    })
   }

   const blacklistToken = await blacklistModel.create({
    token
   })

   res.clearCookie("token")

   return res.status(200).json({
        message:"User Successfully Logout"
    })


}

module.exports = {registration,Login,Logout,Partnerregistration,PartnerLogin,PartnerLogout}