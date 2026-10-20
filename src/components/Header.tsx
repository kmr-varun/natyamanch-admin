import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface HeaderProps {
  title?: string
  description?: string
}

export default function Header({ title, description }: HeaderProps) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'AD'

  return (
    <header className="bg-white flex items-center justify-between px-8 py-[25px] border-b border-gray-100">
      {/* Left: Greeting */}
      <div className="flex flex-col gap-0.5">
        <h1 className="text-2xl font-semibold text-[#0f172a] tracking-[-0.6px] leading-8">
          {title || `Welcome back, ${user?.name || 'Admin'}!`}
        </h1>
        <p className="text-xs text-[#64748b] leading-4">
          {description || "Here's what's happening with your platform today."}
        </p>
      </div>

      {/* Right: Search, Notifications, Profile */}
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative w-80">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
            <img src="/icons/search.svg" alt="" className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search users, videos, orders..."
            className="w-full h-[34px] pl-9 pr-7 bg-white border border-[#e2e8f0] rounded-full text-xs text-[#94a3b8] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#7f28bc] shadow-sm"
          />
        </div>

        {/* Notification Bell */}
        <button className="relative p-[11px] bg-white border border-[#f1f5f9] rounded-full shadow-sm hover:bg-gray-50 transition-colors">
          <img src="/icons/bell.svg" alt="Notifications" className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#e11d48] rounded-full border-2 border-white"></span>
        </button>

        {/* User Profile Pill */}
        <div className="relative flex items-center gap-3 pl-2">
          <button
            onClick={() => setShowMenu(v => !v)}
            className="flex items-center gap-3 focus:outline-none"
          >
            <div className="w-9 h-9 bg-[#7f28bc] rounded-full flex items-center justify-center shadow-sm">
              <span className="text-xs font-bold text-white leading-4">{initials}</span>
            </div>
            <div className="flex flex-col gap-1 text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-[#1e293b] leading-4">{user?.name || 'Admin'}</span>
                <img src="/icons/chevron-down.svg" alt="" className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-medium text-[#94a3b8] leading-[12.5px]">Super Admin</span>
            </div>
          </button>

          {showMenu && (
            <div className="absolute right-0 top-12 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
