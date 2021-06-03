const express = require('express')
const app= express()
const PORT = process.env.PORT || 4000
const mongoose= require('mongoose')
const {MONGOURI} = require('./keys')


mongoose.connect(MONGOURI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected',()=> {
    console.log("connected to mongodb")
})
mongoose.connection.on('error', (err)=> {
    console.log("err connecting to mongodb", err)
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))

if(process.env.NODE_ENV=="production") {
    app.use(express.static('front_end/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname, 'front_end', 'build', 'index.html'))
    })
}

app.listen(PORT, () =>{
    console.log("server is running on", PORT)
})