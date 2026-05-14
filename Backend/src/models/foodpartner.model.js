const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const foodpartnerSchema =mongoose.Schema({
    partnerName:{
        type:String,
        required:[true,'name is required']
    },
    restaurantName:{
     type:String,
        required:[true,'Restaurant name is required']

    },
    contactNumber:{
       type:String,
        required:[true,'Contact number is required'],
        minlength:10,
        maxlenght:10
    },
    email:{
        type:String,
       unique:true,
       match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
       trim:true,
       required:true,
        lowercase: true
    },
    password:{
        type:String,
        required:[true,"password is true"],
        minlength:6,
        maxlenght:15
    },
    address:{
        type:String,
        required:[true,'address is required']
    },
    logo:{
        type:String,
    },
    totalMeal:{
     type:String,
    },
    customerServe:{
      type:String
    }
},{timestamps:true})

foodpartnerSchema.pre("save",async function() {
    if(!this.isModified("password")){
    return
    }
   const hash = await bcrypt.hash(this.password,10)
   this.password = hash
})

foodpartnerSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password,this.password)
}

const foodpartnerModel = mongoose.model("foodpartner",foodpartnerSchema)     

module.exports = foodpartnerModel