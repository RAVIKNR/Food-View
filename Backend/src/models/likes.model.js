const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    food:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"food"
    }
})

const likeModel = mongoose.model("likes",likeSchema)

module.exports = likeModel