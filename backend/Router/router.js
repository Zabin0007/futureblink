const express = require('express')
const { SavePrompt, getPrompt, askAi } = require('../Controller/promptService')
const router = express.Router()
router.post('/ask-ai',askAi)
router.post('/save',SavePrompt)
router.get('/prompts',getPrompt)
module.exports = router