const axios = require('axios')
exports.getAiResponse = async(data)=>{
    try{
        const apiKey = process.env.openRouterAPIKEY 
        if(!apiKey){
            throw new Error("Api key is Not Given")
        }

        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'mistralai/mistral-7b-instruct-v0.1',
                messages:[
                    {
                        role:'user',
                        content:data
                    }
                ],
                max_tokens: 1000,
                temperature: 0.7
            },
            {
                headers:{
                    'Authorization':`Bearer ${apiKey}`,
                    'Content-Type':"application/json",
                    'HTTP-Referer': process.env.APP_URL || 'http://localhost:5000',
                    'X-Title': 'Future Blink App'
                }
            }
        );
        
        const aiResponse = response.data.choices[0].message.content
        console.log("AI Response:", aiResponse);
        return aiResponse
    }
    catch(err){
        console.error("AI API Error:", err.response?.data || err.message);
        throw new Error(`AI API failed: ${err.response?.data?.error?.message || err.message}`);
    }
}