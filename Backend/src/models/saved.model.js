const mongoose = require('mongoose')

const saveSchema = mongoose.Schema({
    user:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"user"
    },
    food:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"food"
    }
})

const saveModel = mongoose.model("save",saveSchema)

module.exports = saveModel