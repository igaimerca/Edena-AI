export default function InterviewChat({ question, transcript }: { question: string; transcript: string }) {
    return (
      <div className="bg-[#1e1e1e] p-4 rounded-lg space-y-4">
        <div>
          <p className="text-sm text-purple-400">AI asked:</p>
          <p className="text-lg font-semibold">{question}</p>
        </div>
        {transcript && (
          <div>
            <p className="text-sm text-green-400">You answered:</p>
            <p className="text-white/90">{transcript}</p>
          </div>
        )}
      </div>
    )
  }
  