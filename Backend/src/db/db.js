const mongoose = require("mongoose")

async function Connectdb() {
    try{
        await mongoose.connect(process.env.MONGO_URI)
            console.log("CONNECTED TO DB")
    }
    catch(err){
        console.log("Can't Connect")
    }

}

module.exports = Connectdb