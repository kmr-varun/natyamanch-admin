const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

function getToken() {
  return localStorage.getItem('admin_token')
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  const data = await res.json()

  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_refresh_token')
      window.location.href = '/login'
    }
    throw new Error(data?.error?.message || `HTTP ${res.status}`)
  }

  return data as T
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
}

// Auth
export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ success: boolean; user: AdminUser; token: string; refreshToken: string }>(
      '/auth/login', { email, password }
    ),
  me: () => api.get<{ success: boolean; user: AdminUser }>('/auth/me'),
  logout: () => api.post('/auth/logout', {}),
}

// Analytics
export const analyticsApi = {
  dashboard: () => api.get<{
    success: boolean
    users: { total: number; today: number; last7days: number; active: number }
    revenue: { total: number | null; today: number | null; last7days: number | null; last30days: number | null }
    videos: { total: number; published: number; total_views: number | null }
    orders: { total: number; completed: number; pending: number; today: number }
  }>('/admin/analytics/dashboard'),
  revenueChart: (days = 30) => api.get(`/admin/analytics/revenue/chart?days=${days}`),
  topVideos: () => api.get('/admin/analytics/videos/top'),
  userRegistrations: (days = 30) => api.get(`/admin/analytics/users/registrations?days=${days}`),
}

// Videos
export const videosApi = {
  list: (params?: Record<string, string | number>) => {
    const q = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : ''
    return api.get<{ success: boolean; data: AdminVideo[]; pagination: Pagination }>(`/admin/videos${q}`)
  },
  get: (id: string) => api.get<{ success: boolean; video: AdminVideo }>(`/admin/videos/${id}`),
  create: (body: Partial<AdminVideo>) => api.post<{ success: boolean; video: AdminVideo }>('/admin/videos', body),
  update: (id: string, body: Partial<AdminVideo>) => api.put<{ success: boolean; video: AdminVideo }>(`/admin/videos/${id}`, body),
  delete: (id: string) => api.delete<{ success: boolean }>(`/admin/videos/${id}`),
  publish: (id: string) => api.put<{ success: boolean }>(`/admin/videos/${id}/publish`, {}),
  unpublish: (id: string) => api.put<{ success: boolean }>(`/admin/videos/${id}/unpublish`, {}),
}

// Users
export const usersApi = {
  list: (params?: Record<string, string | number>) => {
    const q = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : ''
    return api.get<{ success: boolean; data: AdminUserRow[]; pagination: Pagination }>(`/admin/users${q}`)
  },
  get: (id: string) => api.get<{ success: boolean; user: AdminUserRow }>(`/admin/users/${id}`),
  updateStatus: (id: string, status: string) => api.put<{ success: boolean }>(`/admin/users/${id}/status`, { status }),
}

// Orders
export const ordersApi = {
  list: (params?: Record<string, string | number>) => {
    const q = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : ''
    return api.get<{ success: boolean; data: AdminOrder[]; pagination: Pagination }>(`/admin/orders${q}`)
  },
  get: (id: string) => api.get<{ success: boolean; order: AdminOrder }>(`/admin/orders/${id}`),
  stats: () => api.get<{ success: boolean; stats: OrderStats }>('/admin/orders/stats/summary'),
}

// Categories
export const categoriesApi = {
  list: () => api.get<{ success: boolean; categories: AdminCategory[] }>('/admin/categories'),
  create: (body: Partial<AdminCategory>) => api.post<{ success: boolean; category: AdminCategory }>('/admin/categories', body),
  update: (id: string, body: Partial<AdminCategory>) => api.put<{ success: boolean; category: AdminCategory }>(`/admin/categories/${id}`, body),
  delete: (id: string) => api.delete<{ success: boolean }>(`/admin/categories/${id}`),
}

// Coupons
export const couponsApi = {
  list: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : ''
    return api.get<{ success: boolean; data: AdminCoupon[]; pagination: Pagination }>(`/admin/coupons${q}`)
  },
  create: (body: Partial<AdminCoupon>) => api.post<{ success: boolean; coupon: AdminCoupon }>('/admin/coupons', body),
  update: (id: string, body: Partial<AdminCoupon>) => api.put<{ success: boolean; coupon: AdminCoupon }>(`/admin/coupons/${id}`, body),
  delete: (id: string) => api.delete<{ success: boolean }>(`/admin/coupons/${id}`),
  activate: (id: string) => api.put<{ success: boolean }>(`/admin/coupons/${id}/activate`, {}),
  deactivate: (id: string) => api.put<{ success: boolean }>(`/admin/coupons/${id}/deactivate`, {}),
}

// Mandals / Organizations
export const mandalsApi = {
  list: (params?: Record<string, string | number>) => {
    const q = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : ''
    return api.get<{ success: boolean; data: AdminOrg[]; pagination: Pagination }>(`/admin/organizations${q}`)
  },
  get: (id: string) => api.get<{ success: boolean; organization: AdminOrg }>(`/admin/organizations/${id}`),
  create: (body: Partial<AdminOrg> & { adminUserId: string }) =>
    api.post<{ success: boolean; organization: AdminOrg }>('/admin/organizations', body),
  update: (id: string, body: Partial<AdminOrg>) => api.put<{ success: boolean; organization: AdminOrg }>(`/admin/organizations/${id}`, body),
  members: (id: string) => api.get<{ success: boolean; data: OrgMember[]; pagination: Pagination }>(`/admin/organizations/${id}/members`),
  addMember: (orgId: string, userId: string) =>
    api.post<{ success: boolean }>(`/admin/organizations/${orgId}/members`, { userId }),
  removeMember: (orgId: string, userId: string) =>
    api.delete<{ success: boolean }>(`/admin/organizations/${orgId}/members/${userId}`),
}

// Notifications
export const notificationsApi = {
  list: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : ''
    return api.get<{ success: boolean; data: AdminNotification[]; pagination: Pagination }>(`/admin/notifications${q}`)
  },
  broadcast: (body: { title: string; message: string; type?: string; userId?: string }) =>
    api.post<{ success: boolean; sent: number }>('/admin/notifications/broadcast', body),
}

// Settings
export const settingsApi = {
  get: () => api.get<{ success: boolean; settings: Record<string, string> }>('/admin/settings'),
  update: (settings: Record<string, string>) =>
    api.put<{ success: boolean }>('/admin/settings', settings),
}

// Subscription Plans
export const plansApi = {
  list: () => api.get<{ success: boolean; plans: AdminPlan[] }>('/admin/subscription-plans'),
  create: (body: Partial<AdminPlan>) => api.post<{ success: boolean; plan: AdminPlan }>('/admin/subscription-plans', body),
  update: (id: string, body: Partial<AdminPlan>) => api.put<{ success: boolean; plan: AdminPlan }>(`/admin/subscription-plans/${id}`, body),
  delete: (id: string) => api.delete<{ success: boolean }>(`/admin/subscription-plans/${id}`),
}

// Types
export interface AdminUser {
  id: string; email: string; name: string; phone?: string; role: string
}
export interface AdminUserRow {
  id: string; email: string; name: string; phone?: string; account_status: string
  purchased_videos: number; active_videos: number; created_at: string
}
export interface AdminVideo {
  id: string; title: string; slug: string; short_description?: string
  thumbnail_url?: string; category_id?: string; price_inr: number
  cloudflare_video_id?: string; is_published: number; is_featured: number
  view_count: number; duration_seconds: number; created_at: string
  category_name?: string
}
export interface AdminOrder {
  id: string; user_id: string; video_id: string; amount_inr: number
  status: string; payment_gateway?: string; created_at: string
  user_name?: string; user_email?: string; video_title?: string
}
export interface AdminCategory {
  id: string; name: string; slug: string; description?: string
  is_active: number; sort_order: number; video_count?: number
}
export interface AdminCoupon {
  id: string; code: string; discount_type: 'percentage' | 'fixed'
  discount_value: number; is_active: number; usage_count: number
  usage_limit?: number; end_date?: string
}
export interface AdminOrg {
  id: string; name: string; plan_size: number; seats_total: number
  seats_used: number; subscription_status: string; contact_email?: string
  admin_name?: string; member_count?: number
}
export interface OrgMember {
  id: string; user_id: string; name: string; email: string; role: string; joined_at: string
}
export interface AdminNotification {
  id: string; user_id?: string; title: string; message: string
  type: string; is_read: number; created_at: string
  user_name?: string; user_email?: string
}
export interface AdminPlan {
  id: string; name: string; plan_type: string; price_inr: number
  duration_days: number; features: string[]; is_active: number
}
export interface OrderStats {
  total_orders: number; completed_orders: number; pending_orders: number
  failed_orders: number; total_revenue: number; today_revenue: number
}
export interface Pagination {
  page: number; limit: number; total: number; totalPages: number
}
