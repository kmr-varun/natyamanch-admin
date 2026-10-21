import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { authApi } from '../lib/api'
import type { AdminUser } from '../lib/api'

interface AuthContextValue {
  user: AdminUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) { setLoading(false); return }
    authApi.me()
      .then(res => setUser(res.user))
      .catch((err) => {
        const msg = err instanceof Error ? err.message : ''
        if (msg.includes('401') || msg.includes('Session expired') || msg.includes('Unauthorized')) {
          localStorage.removeItem('admin_token')
          localStorage.removeItem('admin_refresh_token')
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const login = async (email: string, password: string) => {
    const res = await authApi.login(email, password)
    if (!res.user || res.user.role !== 'admin') throw new Error('Admin access required')
    localStorage.setItem('admin_token', res.token)
    localStorage.setItem('admin_refresh_token', res.refreshToken)
    setUser(res.user)
  }

  const logout = async () => {
    try { await authApi.logout() } catch {}
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_refresh_token')
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
