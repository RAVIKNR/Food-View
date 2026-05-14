const foodpartnerModel = require('../models/foodpartner.model')
const foodModel = require('../models/food.model')

async function getfoodpartnerById(req,res) {
     const foodPartnerId = req.params.id
    const foodPartner = await foodpartnerModel.findById(foodPartnerId)
    const fooditembyPartner = await foodModel.find({foodPartner:foodPartnerId})

    if(!foodPartner){
        return res.status(400).json({
            message:"Food Partner Not Found",
            
        })
    }

    return res.status(200).json({
        message:"Food Partner Found",
         foodPartner:{
           ...foodPartner.toObject(),
            foodItems:fooditembyPartner
        }
    })
}


module.exports = {getfoodpartnerById}