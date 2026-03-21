const mongoose = require('mongoose')

const promptSchema = new mongoose.Schema({
    prompt:{
        type:String,
        required:true,
    },
    response:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
})

const PROMPT = mongoose.model("Prompt",promptSchema)
module.exports = PROMPT