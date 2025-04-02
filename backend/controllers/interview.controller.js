const { openai } = require('../config/openai.config')
const fs = require('fs')
const path = require('path')
const { File, FormData } = require('formdata-node')
const InterviewSession = require('../models/interview.model')

exports.ttsController = async (req, res) => {
    try {
        const { text } = req.body

        if (!text) return res.status(400).json({ error: 'Text is required' })

        const mp3 = await openai.audio.speech.create({
            model: 'tts-1',
            voice: 'nova',
            input: text,
            response_format: 'mp3',
        })

        const buffer = Buffer.from(await mp3.arrayBuffer())

        res.set({
            'Content-Type': 'audio/mpeg',
            'Content-Length': buffer.length,
        })
        res.send(buffer)
    } catch (err) {
        console.error('TTS Error:', err)
        res.status(500).json({ error: 'Failed to generate speech' })
    }
}

exports.sttController = async (req, res) => {
    try {
        const audio = req.file
        if (!audio) return res.status(400).json({ error: 'No audio file provided' })

        // Convert buffer to File
        const file = new File([audio.buffer], 'audio.webm', { type: audio.mimetype })

        const transcript = await openai.audio.transcriptions.create({
            file: file,
            model: 'whisper-1',
            response_format: 'text',
            language: 'en'
        })

        res.json({ transcript })
    } catch (err) {
        console.error('STT Error:', err)
        res.status(500).json({ error: 'Failed to transcribe audio' })
    }
}

exports.saveAnswer = async (req, res) => {
    try {
        const { sessionId, question, response } = req.body

        if (!sessionId || !question || !response) {
            return res.status(400).json({ error: 'Missing data' })
        }

        const session = await InterviewSession.findById(sessionId)
        if (!session) return res.status(404).json({ error: 'Session not found' })

        session.answers.push({ question, response })
        await session.save()

        res.status(200).json({ message: 'Answer saved' })
    } catch (err) {
        console.error('Save Answer Error:', err)
        res.status(500).json({ error: 'Failed to save answer' })
    }
}

exports.startInterviewSession = async (req, res) => {
    try {
        const { userId } = req.body
        const session = await InterviewSession.create({ userId })
        res.json({ sessionId: session._id })
    } catch (err) {
        console.error('Start Session Error:', err)
        res.status(500).json({ error: 'Failed to start session' })
    }
}
