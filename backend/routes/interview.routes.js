const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer() // parses multipart/form-data into req.file with buffer

const { ttsController, sttController, saveAnswer, startInterviewSession } = require('../controllers/interview.controller')
router.post('/save-answer', saveAnswer)


// Text-to-Speech endpoint (no upload needed)
router.post('/tts', ttsController)

// Speech-to-Text endpoint (expects audio file under "audio")
router.post('/stt', upload.single('audio'), sttController)
router.post('/save-answer', saveAnswer)
router.post('/start-session', startInterviewSession)

module.exports = router
