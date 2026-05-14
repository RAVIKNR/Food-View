const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
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
        required:true,
        minlength:6,
        maxlength:15
    }
},{timestamps:true})




userSchema.pre("save",async function() {
    if(!this.isModified("password")){
        return
    }
    const hash = await bcrypt.hash(this.password,10)
    this.password = hash 
})
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password,this.password)
}

const userModel = mongoose.model("user",userSchema)

module.exports = userModel