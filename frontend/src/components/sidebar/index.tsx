'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import {
    Mic,
    Dumbbell,
    User,
    LogOut,
    HomeIcon,
    FileArchive
} from 'lucide-react'
import Logo from '@/assets/images/logo.png'



export default function Sidebar() {
    const pathname = usePathname()
    const { id } = useParams()
    const navItems = [
        { label: 'Dashboard', href: '/dashboard', icon: HomeIcon },
        { label: 'Mock Interview', href: '/dashboard/mock-interview', icon: Mic },
        { label: 'Interview Gym', href: '/dashboard/interview-gym', icon: Dumbbell },
        { label: 'Profile', href: `/dashboard/profile/${id}`, icon: User },
        { label: 'Resume upload', href: `/dashboard/resume-upload`, icon: FileArchive }
    ]
    return (
        <aside className="hidden md:block w-64 h-screen text-white fixed top-0 left-0 z-40 p-6">
            <div className="flex items-center justify-center h-16 mb-6">
                <img src={Logo.src} alt="Edena Logo" className="h-8" />
            </div>

            <nav className="space-y-2">
                {navItems.map(({ label, href, icon: Icon }) => {
                    const isActive = pathname === href
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                                ? 'bg-[#5D2CA8]/20 border border-[#5D2CA8]'
                                : 'hover:bg-white/10'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {label}
                        </Link>
                    )
                })}
            </nav>

            <div className="absolute bottom-6 left-6">
                <button className="flex items-center gap-2 text-sm text-white/60 hover:text-white">
                    <LogOut size={16} />
                    Logout
                </button>
            </div>
        </aside>
    )
}
