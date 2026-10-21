import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import MainLayout from './layouts/MainLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Videos from './pages/Videos'
import AddVideo from './pages/AddVideo'
import EditVideo from './pages/EditVideo'
import Categories from './pages/Categories'
import Subscriptions from './pages/Subscriptions'
import SubscriptionPlans from './pages/SubscriptionPlans'
import Mandals from './pages/Mandals'
import Orders from './pages/Orders'
import Content from './pages/Content'
import Analytics from './pages/Analytics'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading…</div>
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="videos" element={<Videos />} />
        <Route path="videos/add" element={<AddVideo />} />
        <Route path="videos/edit/:id" element={<EditVideo />} />
        <Route path="categories" element={<Categories />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="subscription-plans" element={<SubscriptionPlans />} />
        <Route path="mandals" element={<Mandals />} />
        <Route path="orders" element={<Orders />} />
        <Route path="content" element={<Content />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
