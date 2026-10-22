import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const menuItems = [
  { icon: '/icons/dashboard.svg', label: 'Dashboard', path: '/' },
  { icon: '/icons/users.svg', label: 'Users', path: '/users' },
  { icon: '/icons/videos.svg', label: 'Videos / Plays', path: '/videos' },
  { icon: '/icons/categories.svg', label: 'Categories', path: '/categories' },
  { icon: '/icons/subscriptions.svg', label: 'Subscriptions', path: '/subscriptions' },
  { icon: '/icons/mandals.svg', label: 'Mandals', path: '/mandals' },
  { icon: '/icons/orders.svg', label: 'Orders & Payments', path: '/orders' },
  { icon: '/icons/content.svg', label: 'Content Pages', path: '/content' },
  { icon: '/icons/analytics.svg', label: 'Analytics', path: '/analytics' },
  { icon: '/icons/notifications.svg', label: 'Notifications', path: '/notifications' },
  { icon: '/icons/settings.svg', label: 'Settings', path: '/settings' },
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()

  return (
    <aside className="w-[260px] h-screen bg-white border-r border-[#f1f5f9] flex flex-col">
      {/* Logo */}
      <div className="h-20 flex items-center px-7 py-5 border-b border-transparent">
        <img src="/logo.png" alt="Natyamanch" className="h-full w-auto object-contain" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2.5">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-[#f7ecff] text-[#7f28bc]'
                  : 'text-[#4d4d4d] hover:bg-gray-50'
              }`}
            >
              <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                <img
                  src={item.icon}
                  alt=""
                  className="max-w-full max-h-full object-contain"
                  style={{ filter: isActive ? 'brightness(0) saturate(100%) invert(28%) sepia(84%) saturate(1654%) hue-rotate(260deg) brightness(92%) contrast(93%)' : 'none' }}
                />
              </div>
              <span className="text-sm font-medium tracking-[0.28px]">{item.label}</span>
            </Link>
          )
        })}

        {/* Logout */}
        <button onClick={async () => { await logout(); navigate('/login') }} className="w-full flex items-center gap-2 px-4 py-2.5 rounded text-[#ff383c] hover:bg-red-50 transition-colors">
          <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
            <img
              src="/icons/logout.svg"
              alt=""
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <span className="text-sm font-medium tracking-[0.28px]">Logout</span>
        </button>
      </nav>
    </aside>
  )
}
