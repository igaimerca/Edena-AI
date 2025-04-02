const openai = require('../config/openai.config')
const fs = require('fs')

exports.textToSpeech = async (req, res) => {
  try {
    const { text } = req.body

    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'nova',
      input: text,
    })

    const buffer = Buffer.from(await mp3.arrayBuffer())
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': buffer.length,
    })
    res.send(buffer)
  } catch (err) {
    console.error('TTS error:', err)
    res.status(500).json({ error: 'Text-to-speech failed' })
  }
}

exports.speechToText = async (req, res) => {
  try {
    const audioFile = req.file
    if (!audioFile) return res.status(400).json({ error: 'No audio uploaded' })

    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audioFile.path),
      model: 'whisper-1',
    })

    fs.unlinkSync(audioFile.path)
    res.json({ transcript: transcription.text })
  } catch (err) {
    console.error('STT error:', err)
    res.status(500).json({ error: 'Speech-to-text failed' })
  }
}

exports.generateQuestion = async (req, res) => {
  try {
    const { role } = req.body
    const prompt = `Give me one challenging behavioral interview question for a ${role} role. Only return the question.`

    const response = await openai.chat.completions.create({
      model: 'gpt-4-1106-preview',
      messages: [
        { role: 'system', content: 'You are an expert interviewer.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    })

    res.json({ question: response.choices[0].message.content.trim() })
  } catch (err) {
    console.error('Question generation error:', err)
    res.status(500).json({ error: 'Failed to generate question' })
  }
}
