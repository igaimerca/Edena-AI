"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, Bell, UserCircle, Mic, Dumbbell, User, Settings, ChevronDown, Clock } from "lucide-react";
import Logo from "../../assets/images/logo.png";
import useAuthStore from "../../store/auth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

const Dashboard = () => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, setUser, logout } = useAuthStore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [setUser]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="font-bold text-lg text-gray-600 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
          Edena AI
        </p>
        <style jsx>{`
          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }
        `}</style>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-gray-100 transform transition-all duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          <img src={Logo.src} alt="Edena AI Logo" className="h-10 animate-pulse" />
        </div>
        <nav className="mt-4 space-y-2">
          <Link
            href="/dashboard/mock-interview"
            className="group flex items-center px-6 py-2 rounded-lg transition-colors hover:bg-gray-800"
          >
            <Mic className="w-4 h-4 mr-3 text-gray-400 group-hover:text-white" />
            <span className="text-sm font-medium">Mock Interview</span>
          </Link>
          <Link
            href="/dashboard/interview-gym"
            className="group flex items-center px-6 py-2 rounded-lg transition-colors hover:bg-gray-800"
          >
            <Dumbbell className="w-4 h-4 mr-3 text-gray-400 group-hover:text-white" />
            <span className="text-sm font-medium">Interview Gym</span>
          </Link>
          <Link
            href="/dashboard/profile"
            className="group flex items-center px-6 py-2 rounded-lg transition-colors hover:bg-gray-800"
          >
            <User className="w-4 h-4 mr-3 text-gray-400 group-hover:text-white" />
            <span className="text-sm font-medium">Profile</span>
          </Link>
          <Link
            href="/dashboard/settings"
            className="group flex items-center px-6 py-2 rounded-lg transition-colors hover:bg-gray-800"
          >
            <Settings className="w-4 h-4 mr-3 text-gray-400 group-hover:text-white" />
            <span className="text-sm font-medium">Settings</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-0 md:ml-64 transition-all duration-300 ease-in-out">
        {/* Header */}
        <header className="flex items-center justify-between bg-white/80 backdrop-blur-md shadow-md px-6 py-3">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-gray-600 mr-4 focus:outline-none"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-3 relative" ref={dropdownRef}>
            <button className="p-2 rounded-full hover:bg-gray-200 transition-colors focus:outline-none">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-1 focus:outline-none"
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border border-gray-300"
                />
              ) : (
                <UserCircle className="w-8 h-8 text-gray-600" />
              )}
              <span className="hidden sm:inline-block text-sm text-gray-800 font-semibold">
                {user?.displayName || user?.email || "User"}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <Link
                  href="/dashboard/profile"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                >
                  Profile
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <section className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-extrabold text-gray-800 mb-3">
                Mock Interview
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Experience simulated interviews with adaptive AI feedback.
              </p>
              <div className="flex flex-col sm:flex-row gap-16">
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-full font-semibold shadow-md hover:from-blue-500 hover:to-blue-600 transition transform hover:scale-105">
                  <Mic className="w-4 h-4" />
                  Start Interview
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-400 to-purple-500 text-white rounded-full font-semibold shadow-md hover:from-purple-500 hover:to-purple-600 transition transform hover:scale-105">
                  <Clock className="w-4 h-4" />
                  View Past Sessions
                </button>
              </div>
            </section>
            <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Interview Gym</h3>
                <p className="text-xs text-gray-600 mb-4">
                  Hone your skills with targeted practice and instant feedback.
                </p>
                <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-full font-semibold shadow-md hover:from-green-500 hover:to-green-600 transition transform hover:scale-105">
                  <Dumbbell className="w-4 h-4" />
                  Go to Interview Gym
                </button>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Profile</h3>
                <p className="text-xs text-gray-600 mb-4">
                  Manage your details and tailor your interview preferences.
                </p>
                <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-400 to-indigo-500 text-white rounded-full font-semibold shadow-md hover:from-indigo-500 hover:to-indigo-600 transition transform hover:scale-105">
                  <User className="w-4 h-4" />
                  Complete Profile
                </button>
              </div>
            </section>
          </div>
        </main>

        <footer className="bg-white text-gray-600 text-center py-3 shadow-inner">
          © {new Date().getFullYear()} Edena AI. All rights reserved.
        </footer>
      </div>
    </div>

  );
};

export default Dashboard;
