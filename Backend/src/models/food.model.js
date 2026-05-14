const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    food:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    storeName:{
      type:String,
      required:true
    },
    video:{
        type:String,
        required:true
    },
    foodPartner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"foodpartner"
    },
    likeReels:{
        type:Number,
        default:0
    },
    savedReels:{
        type:Number,
        default:0
    }
})

const foodModel = mongoose.model("food",foodSchema)
module.exports = foodModel