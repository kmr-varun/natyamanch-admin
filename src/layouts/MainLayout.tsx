import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

// Page titles and descriptions
const pageInfo: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Welcome back, Admin!',
    description: "Here's what's happening with your platform today.",
  },
  '/users': {
    title: 'User Management',
    description: 'Manage user profiles, purchased videos, access, account status, and viewing activity.',
  },
  '/videos': {
    title: 'Plays Management',
    description: 'Manage videos, pricing, playback, and publishing status.',
  },
  '/videos/add': {
    title: 'Add New Video',
    description: 'Create a new video and configure its content, pricing, and playback settings.',
  },
  '/categories': {
    title: 'Categories',
    description: 'Organize your videos into categories to help users easily find content.',
  },
  '/subscriptions': {
    title: 'Subscription Management',
    description: 'Organize your videos into categories to help users easily find content.',
  },
  '/subscription-plans': {
    title: 'Subscription Plan',
    description: 'Organize your videos into categories to help users easily find content.',
  },
  '/mandals': {
    title: 'Mandals',
    description: 'Manage all registered organizations, their subscription plans, members and status.',
  },
  '/orders': {
    title: 'Orders & Payments',
    description: 'View and manage all video purchases, subscriptions and payments.',
  },
  '/content': {
    title: 'Content Management',
    description: 'Manage website pages and popups. Edit content, images, and settings to keep your website up to date.',
  },
  '/analytics': {
    title: 'Analytics',
    description: "Track your platform's performance, audience engagement and revenue insights.",
  },
  '/notifications': {
    title: 'Notifications',
    description: 'Send and manage notifications to keep your audience engaged.',
  },
  '/settings': {
    title: 'Settings',
    description: 'Manage your website settings, preferences and configurations.',
  },
}

export default function MainLayout() {
  const location = useLocation()
  const info = pageInfo[location.pathname] || pageInfo['/']

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={info.title} description={info.description} />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
