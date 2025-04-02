import { useEffect, useState } from 'react'
import { useTextToSpeech } from './useTextToSpeech'
import { useSpeechToText } from './useSpeechToText'

const QUESTIONS = [
  "Tell me about yourself.",
  "Describe a challenge you faced and how you handled it.",
  "Why do you want this role?"
]

export function useInterviewFlow() {
  const [index, setIndex] = useState(0)
  const [questionText, setQuestionText] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [timeLeft, setTimeLeft] = useState(120)

  const [transcript, setTranscript] = useState('')
  const [userAnswer, setUserAnswer] = useState('')

  const { playSpeech } = useTextToSpeech()
  const { startRecording, stopRecording } = useSpeechToText()

  useEffect(() => {
    if (isRecording && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleDoneAnswering()
    }
  }, [isRecording, timeLeft])

  const startInterview = async () => {
    const question = QUESTIONS[index]
    setQuestionText(question)
    setIsThinking(true)
    await playSpeech(question)
    setIsThinking(false)
    setIsRecording(true)
    setTimeLeft(120)
    const result = await startRecording()
    setTranscript(result)
  }

  const handleDoneAnswering = async () => {
    setIsRecording(false)
    stopRecording()
    setIndex(i => i + 1)
    setUserAnswer(transcript)
    if (index + 1 < QUESTIONS.length) {
      setTimeout(startInterview, 1000)
    } else {
      // End of interview
      setQuestionText('')
    }
  }

  return {
    questionText,
    currentQuestion: QUESTIONS[index],
    userAnswer,
    transcript,
    isRecording,
    isThinking,
    timeLeft,
    handleDoneAnswering,
    startInterview
  }
}
