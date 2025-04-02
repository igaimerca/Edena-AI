import { useRef, useState } from 'react'
import { speakWithOpenAI, transcribeAudio } from '@/lib/api'
import useAuthStore from '@/store/auth'

const sampleQuestions = [
  'Tell me about yourself.',
  'Describe a time you faced a challenge at work.',
  'How do you handle tight deadlines?',
]

export const useLiveInterview = () => {
  const [started, setStarted] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [transcript, setTranscript] = useState('')
  const [isAnswering, setIsAnswering] = useState(false)
  const [timeLeft, setTimeLeft] = useState(120)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const audioChunks = useRef<Blob[]>([])
  const resolveStop = useRef<(() => void) | null>(null)

  const user = useAuthStore((state) => state.user)

  const startInterview = async () => {
    if (!user?.backendId) return
  
    const res = await fetch('http://localhost:3001/api/interview/start-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.backendId }),
    })
  
    const data = await res.json()
    setSessionId(data.sessionId)
    setStarted(true)
  
    const question = sampleQuestions[questionIndex]
    setCurrentQuestion(question)
  
    await speakWithOpenAI(question)
    await beginRecording()          // 👈 async so wait for it
    startTimer()                    // 👈 set isAnswering here
  }
  

  const startTimer = () => {
    setTimeLeft(120)
    setIsAnswering(true)
  
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleStopAnswering()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const beginRecording = async () => {
    setIsAnswering(true) // 👈 ensure it's TRUE
  
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const recorder = new MediaRecorder(stream)
    recorderRef.current = recorder
    audioChunks.current = []
  
    recorder.ondataavailable = (e) => {
      audioChunks.current.push(e.data)
    }
  
    recorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' })
    
      try {
        const text = await transcribeAudio(audioBlob)
        console.log("🎙️ Transcription:", text) // ✅ should not be undefined
    
        setTranscript(text)
    
        if (sessionId && text) {
          await fetch('http://localhost:3001/api/interview/save-answer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sessionId,
              question: currentQuestion,
              response: text,
            }),
          })
        }
      } catch (err) {
        console.error("❌ Transcription failed", err)
      }
    
      resolveStop.current?.()
    }
    
  
    recorder.start()
  }
  
  

  const handleStopAnswering = () => {
    return new Promise<void>((resolve) => {
      if (intervalRef.current) clearInterval(intervalRef.current)
  
      // Prepare for post-recording resolution
      resolveStop.current = () => {
        setIsAnswering(false) // 👈 hide the button
        resolve()
      }
  
      recorderRef.current?.stop()
    })
  }
  

  const nextQuestion = async () => {
    const next = questionIndex + 1
    if (next < sampleQuestions.length) {
      setTranscript('')
      setQuestionIndex(next)
      setCurrentQuestion(sampleQuestions[next])
      await speakWithOpenAI(sampleQuestions[next])
      await beginRecording()
      startTimer()
    } else {
      setCurrentQuestion('')
    }
  }

  return {
    started,
    startInterview,
    currentQuestion,
    transcript,
    isAnswering,
    timeLeft,
    stopAnswering: handleStopAnswering,
    nextQuestion,
  }
}
