const express = require("express")
const app = express()
require('dotenv').config()
app.use(express.json())
const cookieparser = require('cookie-parser')
app.use(cookieparser())
const cors = require('cors')
app.use(cors({
   origin:'http://localhost:5173',
   credentials:true
}))

const foodRoute = require('./routes/food.route')
const authenticationRoute = require('./routes/auth.routes')
const foodpartneRoute = require('./routes/foodpartner.routes')


app.use("/api/auth",authenticationRoute)
app.use("/api/food",foodRoute)
app.use('/api/store',foodpartneRoute)

module.exports = app