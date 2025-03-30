'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Bell, ChevronDown, Menu, UserCircle } from 'lucide-react'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/store/auth'
import { auth } from '@/firebase/firebaseConfig'

export default function DashboardHeader({ toggleSidebar }: { toggleSidebar: () => void }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { user, logout } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    logout()
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-3">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="md:hidden text-white mr-4 focus:outline-none"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-white">Dashboard</h1>
      </div>

      <div className="flex items-center space-x-3 relative" ref={dropdownRef}>
        <button className="p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none">
          <Bell className="w-5 h-5 text-white/70" />
        </button>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-1 focus:outline-none"
        >
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="User Avatar"
              className="w-8 h-8 rounded-full border border-white/20"
            />
          ) : (
            <UserCircle className="w-8 h-8 text-white/80" />
          )}
          <span className="hidden sm:inline-block text-sm text-white font-semibold">
            {user?.displayName || user?.email || 'User'}
          </span>
          <ChevronDown className="w-4 h-4 text-white/70" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-40 bg-[#1e1e1e] rounded-lg shadow-lg border border-white/10 z-50">
            <Link
              href="/dashboard/profile"
              className="block px-3 py-2 text-sm text-white/80 hover:bg-white/10"
            >
              Profile
            </Link>
            <Link
              href="/dashboard/settings"
              className="block px-3 py-2 text-sm text-white/80 hover:bg-white/10"
            >
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-sm text-white/80 hover:bg-white/10"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
