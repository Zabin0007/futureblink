const PROMPT = require("../Model/promptScema")
const { getAiResponse } = require("../services")

exports.askAi = async(req,res)=>{
    try {
        const { prompt } = req.body
        if(!prompt){
            return res.status(401).json("Prompt is Required....")
        }
        const aiResponse = await getAiResponse(prompt)
        console.log("Successful Get the AI Response");
        res.status(200).json({
            prompt,
            response:aiResponse
        })
        
    } catch (error) {
    res.status(500).json({ 
      error: error.message || 'Failed to get AI response'
    });
    }
}

exports.SavePrompt = async(req,res)=>{
        try {
            const {response,prompt} = req.body
            if(!response|| !prompt){
                return res.status(401).json("Both Response and Prompt are Required")
            }
            const newPrompt = new PROMPT({
                prompt,
                response
            })
            const savedPrompt = await newPrompt.save()
            res.status(201).json({
                message:"Prompt Saved succesfully",
                data:savedPrompt
            })
        } catch (error) {
                res.status(500).json(error)
        }
}

exports.getPrompt = async(req,res)=>{
    try {
        const prompts = await PROMPT.find().sort({createdAt:-1})
        res.status(200).json({
                message:"Prompt fetched succesfully",
                data:prompts})
    } catch (error) {
        res.status(500).json(error)
    }
}