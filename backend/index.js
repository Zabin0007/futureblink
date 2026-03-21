const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use
const PORT = 5000
app.get('/',(req,res)=>{
    res.json('hiii')
})
app.post('/ai',(req,res)=>{
    const { prompt } = req.body
    console.log('Received Prompt',prompt);
    if(!prompt){
        return res.status(401).json("Prompt is Required")
    }
    const dummyResponse = `You asked ${prompt}, Here u go`
    res.status(200).json({
        prompt,
        response:dummyResponse
    })
})
app.listen(PORT,()=>{
    console.log('App is listening on port' , PORT);
    
})