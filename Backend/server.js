const app = require("./src/app")
const Connectdb = require("./src/db/db")
const dns = require('dns')


dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

Connectdb()
app.listen(3000,()=>{
    console.log("SERVER IS RUNNING ON PORT 3000")
})