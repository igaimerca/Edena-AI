export default function InterviewHeader({
    timeRemaining,
    onEnd,
  }: {
    timeRemaining: number
    onEnd: () => void
  }) {
    return (
      <header className="bg-[#1c1c1c] px-6 py-3 flex justify-between items-center border-b border-white/10">
        <h1 className="text-xl font-bold text-white">Live Interview</h1>
        <div className="flex gap-4 items-center text-white/70">
          <span>Time Left: {timeRemaining}s</span>
          <button onClick={onEnd} className="text-sm underline hover:text-white">
            End Interview
          </button>
        </div>
      </header>
    )
  }
  