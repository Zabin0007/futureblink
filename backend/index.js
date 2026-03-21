require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./db')
const router = require('./Router/router')
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 5000
app.get('/',(req,res)=>{
    res.json('hiii')
})
app.use('/api',router)

app.listen(PORT,()=>{
    console.log('App is listening on port' , PORT);
    
})