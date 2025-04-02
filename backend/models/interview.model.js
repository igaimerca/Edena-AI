// models/InterviewSession.js
const mongoose = require('mongoose')

const AnswerSchema = new mongoose.Schema({
  question: { type: String, required: true },
  response: { type: String, required: true }
})

const InterviewSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startedAt: { type: Date, default: Date.now },
  answers: [AnswerSchema]
})

module.exports = mongoose.model('InterviewSession', InterviewSessionSchema)
