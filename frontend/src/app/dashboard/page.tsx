'use client'

import { Mic, Clock, Dumbbell, User } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Mock Interview */}
      <section className="bg-gradient-to-br from-[#1e1e1e] to-[#121212] rounded-2xl border border-white/10 shadow-lg p-6">
        <h2 className="text-2xl font-extrabold text-white mb-3">Mock Interview</h2>
        <p className="text-sm text-white/60 mb-6">
          Experience simulated interviews with adaptive AI feedback.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <Link
            href="/dashboard/mock-interview"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#5D2CA8] hover:bg-[#4c1c98] text-white rounded-full font-semibold shadow transition transform hover:scale-105"
          >
            <Mic className="w-4 h-4" />
            Start Interview
          </Link>

          <Link
            href="/dashboard/mock-interview/history"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#2f2f2f] hover:bg-[#3c3c3c] text-white rounded-full font-semibold shadow transition transform hover:scale-105"
          >
            <Clock className="w-4 h-4" />
            View Past Sessions
          </Link>
        </div>
      </section>

      {/* Interview Gym & Profile */}
      <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Interview Gym */}
        <div className="bg-gradient-to-br from-[#1b1b1b] to-[#121212] rounded-2xl border border-white/10 shadow-lg p-6">
          <h3 className="text-xl font-bold text-white mb-2">Interview Gym</h3>
          <p className="text-xs text-white/60 mb-4">
            Hone your skills with targeted practice and instant feedback.
          </p>
          <Link
            href="/dashboard/interview-gym"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-full font-semibold transition transform hover:scale-105"
          >
            <Dumbbell className="w-4 h-4" />
            Go to Interview Gym
          </Link>
        </div>

        {/* Profile */}
        <div className="bg-gradient-to-br from-[#1b1b1b] to-[#121212] rounded-2xl border border-white/10 shadow-lg p-6">
          <h3 className="text-xl font-bold text-white mb-2">Profile</h3>
          <p className="text-xs text-white/60 mb-4">
            Manage your details and tailor your interview preferences.
          </p>
          <Link
            href="/dashboard/profile"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-full font-semibold transition transform hover:scale-105"
          >
            <User className="w-4 h-4" />
            Complete Profile
          </Link>
        </div>
      </section>
    </div>
  )
}
