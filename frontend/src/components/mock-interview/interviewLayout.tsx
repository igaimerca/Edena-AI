'use client'


import { useLiveInterview } from '@/hooks/mock-interview/useLiveInterview'
import { Mic } from 'lucide-react'
import InterviewSidebar from './interviewSidebar'
import InterviewHeader from './interviewHeader'
import InterviewChat from './interviewChart'

export default function InterviewLayout() {
  const {
    started,
    startInterview,
    currentQuestion,
    transcript,
    isAnswering,
    timeLeft,
    stopAnswering,
    nextQuestion,
  } = useLiveInterview()

  return (
    <div className="flex min-h-screen bg-black text-white">
      <InterviewSidebar title="Software Engineer" role="Internship" />
      <div className="flex-1 flex flex-col">
        <InterviewHeader timeRemaining={timeLeft} onEnd={stopAnswering} />

        <main className="flex-1 p-6 bg-[#121212] rounded-t-lg">
          {!started ? (
            <div className="flex justify-center items-center h-full">
              <button
                onClick={startInterview}
                className="bg-purple-600 px-6 py-3 rounded-md font-semibold text-white hover:bg-purple-700"
              >
                Start Interview
              </button>
            </div>
          ) : (
            <div className="space-y-6 max-w-4xl mx-auto">
              <InterviewChat question={currentQuestion} transcript={transcript} />

              {isAnswering && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-white/70 flex items-center gap-2">
                    <Mic className="w-4 h-4" />
                    Listening... {timeLeft}s left
                  </div>
                  <button
                    onClick={async () => {
                      await stopAnswering()
                      await nextQuestion()
                    }}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md"
                  >
                    Done Answering
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
