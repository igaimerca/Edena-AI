'use client'

import { useState } from 'react'
import Sidebar from '../sidebar'
import DashboardHeader from './DashboardHeader'
import DashboardFooter from './DashboardFooter'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar />

      {/* Right section of the layout */}
      <div className="flex flex-col flex-1 md:ml-64 h-screen">
        <DashboardHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Scrollable content only */}
        <main className="flex-1 overflow-y-auto bg-[#161616] rounded-lg">
          <div className="w-full max-full mx-auto min-h-[70vh]">
            {children}
          </div>
        </main>

        <DashboardFooter />
      </div>
    </div>
  )
}
