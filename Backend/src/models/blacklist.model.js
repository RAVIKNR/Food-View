const mongoose = require('mongoose')

const blacklistSchema = new mongoose.Schema({

    token:{
        type:String,
        required:true,
        unique:[true,"unique token is required"]
    }

})

blacklistSchema.index({createdAt:1},{
    expireAfterSeconds:60*60*24*3
})

const blacklistModel = mongoose.model("blacklistedTokens",blacklistSchema)

module.exports = blacklistModel