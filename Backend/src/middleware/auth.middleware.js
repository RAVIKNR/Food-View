
const jwt = require('jsonwebtoken')
const foodPartnerModel =require('../models/foodpartner.model')
const userModel = require('../models/user.model')

async function authFoodMiddleware(req,res,next){

    const token = req.cookies.token

    if(!token){
        return res.status(400).json({
            message:"Invalid Token"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_TOKEN)
         const foodPartner = await foodPartnerModel.findById(decoded.id)
          if (!foodPartner) {
            return res.status(401).json({
                message: "foodPartner not found"
            })
        }
         req.foodPartner = foodPartner
         next()
    }

    catch(err){
        return res.status(400).json({
            message:"Invalid Token"
        })
    }


}

async function authUserMiddleware(req,res,next){
    const token = req.cookies.token

    if(!token){
        return res.status(400).json({
            message:"Please login first"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_TOKEN)
            const user = await userModel.findById(decoded.id)
             if (user) {
            req.user = user
             return next()
        }
           const partner = await foodPartnerModel.findById(decoded.id)
           if (partner) {
            req.partner = partner
             return next()
        }

         return res.status(401).json({
            message: "Account not found"
        })

    }

    catch(err){
        return res.status(400).json({
            message:"Invalid token"
        })
    }



}



module.exports = {authFoodMiddleware,authUserMiddleware}