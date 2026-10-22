const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

function getToken() {
  return localStorage.getItem('admin_token')
}

let _refreshInFlight: Promise<string | null> | null = null

async function refreshAccessToken(): Promise<string | null> {
  if (_refreshInFlight) return _refreshInFlight
  _refreshInFlight = (async () => {
    const refreshToken = localStorage.getItem('admin_refresh_token')
    if (!refreshToken) return null
    try {
      const res = await fetch(`${API_BASE}/auth/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      })
      if (!res.ok) {
        localStorage.removeItem('admin_token')
        localStorage.removeItem('admin_refresh_token')
        return null
      }
      const data = await res.json()
      localStorage.setItem('admin_token', data.token)
      localStorage.setItem('admin_refresh_token', data.refreshToken)
      return data.token
    } catch {
      return null
    } finally {
      _refreshInFlight = null
    }
  })()
  return _refreshInFlight
}

async function request<T>(path: string, options: RequestInit = {}, retry = true): Promise<T> {
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
    if (res.status === 401 && token && retry) {
      const newToken = await refreshAccessToken()
      if (newToken) {
        return request<T>(path, options, false)
      }
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_refresh_token')
      window.location.href = '/login'
      return Promise.reject(new Error('Session expired'))
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
  revenueChart: (days = 30) => api.get<{ success: boolean; data: { date: string; orders: number; revenue: number }[] }>(`/admin/analytics/revenue/chart?days=${days}`),
  topVideos: () => api.get<{ success: boolean; videos: { id: string; title: string; thumbnail_url?: string; view_count: number; price_inr: number; purchase_count: number; revenue: number }[] }>('/admin/analytics/videos/top'),
  userRegistrations: (days = 30) => api.get<{ success: boolean; data: { date: string; registrations: number }[] }>(`/admin/analytics/users/registrations?days=${days}`),
}

// Videos
export const videosApi = {
  list: (params?: Record<string, string | number>) => {
    const q = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : ''
    return api.get<{ success: boolean; data: AdminVideo[]; pagination: Pagination }>(`/admin/videos${q}`)
  },
  get: (id: string) => api.get<{ success: boolean; video: AdminVideo }>(`/admin/videos/${id}`),
  create: (body: VideoCreateBody) => api.post<{ success: boolean; video: AdminVideo }>('/admin/videos', body),
  update: (id: string, body: VideoCreateBody) => api.put<{ success: boolean; video: AdminVideo }>(`/admin/videos/${id}`, body),
  delete: (id: string) => api.delete<{ success: boolean }>(`/admin/videos/${id}`),
  publish: (id: string) => api.put<{ success: boolean }>(`/admin/videos/${id}/publish`, {}),
  unpublish: (id: string) => api.put<{ success: boolean }>(`/admin/videos/${id}/unpublish`, {}),
  uploadFromUrl: (url: string, name: string) =>
    api.post<{ success: boolean; uid: string; readyToStream: boolean; thumbnail: string }>('/admin/videos/upload-from-url', { url, name }),
  cloudflareStatus: (videoId: string) =>
    api.get<{ success: boolean; video: { uid: string; readyToStream: boolean; status: { state: string }; thumbnail: string; duration: number } }>(`/admin/videos/cloudflare/${videoId}`),
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
  delete: (id: string) => api.delete<{ success: boolean }>(`/admin/orders/${id}`),
}

// Categories
export interface CategoryBody {
  name?: string; slug?: string; description?: string; sortOrder?: number; isActive?: boolean
}
export const categoriesApi = {
  list: () => api.get<{ success: boolean; categories: AdminCategory[] }>('/admin/categories'),
  create: (body: CategoryBody & { name: string }) => api.post<{ success: boolean; category: AdminCategory }>('/admin/categories', body),
  update: (id: string, body: CategoryBody) => api.put<{ success: boolean; category: AdminCategory }>(`/admin/categories/${id}`, body),
  delete: (id: string) => api.delete<{ success: boolean }>(`/admin/categories/${id}`),
}

// Subscriptions
export const subscriptionsApi = {
  list: (params?: Record<string, string | number>) => {
    const q = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : ''
    return api.get<{ success: boolean; data: AdminSubscription[]; pagination: Pagination }>(`/admin/subscriptions${q}`)
  },
  stats: () => api.get<{ success: boolean; stats: SubscriptionStats }>('/admin/subscriptions/stats'),
  get: (id: string) => api.get<{ success: boolean; subscription: AdminSubscription }>(`/admin/subscriptions/${id}`),
  create: (body: SubscriptionBody & { userId: string; planId: string }) =>
    api.post<{ success: boolean; subscription: AdminSubscription }>('/admin/subscriptions', body),
  update: (id: string, body: SubscriptionBody) =>
    api.put<{ success: boolean; subscription: AdminSubscription }>(`/admin/subscriptions/${id}`, body),
  delete: (id: string) => api.delete<{ success: boolean }>(`/admin/subscriptions/${id}`),
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
  stats: () => api.get<{ success: boolean; stats: OrgStats }>('/admin/organizations/stats'),
  get: (id: string) => api.get<{ success: boolean; organization: AdminOrg }>(`/admin/organizations/${id}`),
  create: (body: { name: string; planSize: number; adminUserId: string; contactPerson?: string; contactEmail?: string; contactPhone?: string; location?: string; priceInr?: number; subscriptionEndDays?: number }) =>
    api.post<{ success: boolean; organization: AdminOrg }>('/admin/organizations', body),
  update: (id: string, body: { name?: string; planSize?: number; contactPerson?: string; contactEmail?: string; contactPhone?: string; location?: string; subscriptionStatus?: string; subscriptionEnd?: string; priceInr?: number }) =>
    api.put<{ success: boolean; organization: AdminOrg }>(`/admin/organizations/${id}`, body),
  delete: (id: string) => api.delete<{ success: boolean }>(`/admin/organizations/${id}`),
  members: (id: string) => api.get<{ success: boolean; data: OrgMember[]; pagination: Pagination }>(`/admin/organizations/${id}/members`),
  addMember: (orgId: string, userId: string) =>
    api.post<{ success: boolean }>(`/admin/organizations/${orgId}/members`, { userId }),
  removeMember: (orgId: string, userId: string) =>
    api.delete<{ success: boolean }>(`/admin/organizations/${orgId}/members/${userId}`),
}

// Content
export interface AdminContent {
  id: string
  section_key: string
  title: string
  description?: string
  content_type: 'json_array' | 'json_object' | 'html' | 'text'
  content: string
  is_active: number
  sort_order: number
  created_at: string
  updated_at: string
}
export const contentApi = {
  list: () => api.get<{ success: boolean; sections: AdminContent[] }>('/admin/content'),
  get: (key: string) => api.get<{ success: boolean; section: AdminContent }>(`/admin/content/${key}`),
  update: (key: string, body: { title?: string; description?: string; content?: string; isActive?: boolean; sortOrder?: number }) =>
    api.put<{ success: boolean; section: AdminContent }>(`/admin/content/${key}`, body),
  create: (body: { sectionKey: string; title: string; description?: string; contentType?: string; content?: string; sortOrder?: number }) =>
    api.post<{ success: boolean; section: AdminContent }>('/admin/content', body),
  delete: (key: string) => api.delete<{ success: boolean }>(`/admin/content/${key}`),
}

// Notifications
export const notificationsApi = {
  list: (params?: Record<string, string | number>) => {
    const q = params ? '?' + new URLSearchParams(Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)]))).toString() : ''
    return api.get<{ success: boolean; data: AdminNotification[]; pagination: Pagination }>(`/admin/notifications${q}`)
  },
  stats: () => api.get<{ success: boolean; stats: { total: number; read: number; unread: number } }>('/admin/notifications/stats'),
  broadcast: (body: { title: string; message: string; type?: string; userId?: string }) =>
    api.post<{ success: boolean; sent: number }>('/admin/notifications/broadcast', body),
  delete: (id: string) => api.delete<{ success: boolean }>(`/admin/notifications/${id}`),
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
  create: (body: PlanBody & { name: string; priceInr: number; durationDays: number }) =>
    api.post<{ success: boolean; plan: AdminPlan }>('/admin/subscription-plans', body),
  update: (id: string, body: PlanBody) =>
    api.put<{ success: boolean; plan: AdminPlan }>(`/admin/subscription-plans/${id}`, body),
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
  id: string; title: string; slug: string; short_description?: string; full_description?: string
  thumbnail_url?: string; category_id?: string; category_name?: string; language?: string
  price_inr: number; cloudflare_video_id?: string; trailer_cloudflare_id?: string
  is_published: boolean; is_featured: boolean; view_count: number; duration_seconds: number
  created_at: string; updated_at?: string; year?: number; certification?: string
  cast_crew?: string; playback_policy?: string; playback_limit?: number
  seo_meta_title?: string; seo_meta_description?: string; seo_keywords?: string
}
export interface VideoCreateBody {
  title: string; slug?: string; shortDescription?: string; fullDescription?: string
  categoryId?: string; language?: string; durationSeconds?: number; priceInr: number
  certification?: string; castCrew?: { name: string; role: string }[]; year?: number
  cloudflareVideoId?: string; trailerCloudflareId?: string; playbackPolicy?: string
  isPublished?: boolean; isFeatured?: boolean
  seoMetaTitle?: string; seoMetaDescription?: string
}
export interface AdminOrder {
  id: string; user_id: string; video_id: string; amount_inr: number
  discount_amount?: number; status: string; payment_gateway?: string
  gateway_payment_id?: string; coupon_id?: string; created_at: string
  user_name?: string; user_email?: string; video_title?: string; thumbnail_url?: string
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
  contact_person?: string; contact_phone?: string; location?: string
  price_inr?: number; subscription_end?: string; admin_user_id?: string
  admin_name?: string; admin_email?: string; member_count?: number; created_at?: string
}
export interface OrgStats {
  total: number; active: number; expired: number; inactive: number; expiring_soon: number
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
  duration_days: number; features: string[]; is_active: boolean
  description?: string; sort_order: number
}
export interface PlanBody {
  name?: string; description?: string; planType?: string
  priceInr?: number; durationDays?: number; features?: string[]
  isActive?: boolean; sortOrder?: number
}
export interface OrderStats {
  total_orders: number; completed_orders: number; pending_orders: number
  failed_orders: number; total_revenue: number; today_revenue: number
}
export interface AdminSubscription {
  id: string; user_id: string; plan_id: string
  status: string; start_date: string; end_date?: string
  amount_paid_inr?: number; payment_gateway?: string; transaction_id?: string; notes?: string
  created_at: string; updated_at?: string
  user_name?: string; user_email?: string
  plan_name?: string; plan_type?: string; plan_price_inr?: number; duration_days?: number
}
export interface SubscriptionStats {
  total: number; active: number; expired: number; cancelled: number; expiring_soon: number
}
export interface SubscriptionBody {
  userId?: string; planId?: string; status?: string
  startDate?: string; endDate?: string; amountPaidInr?: number
  paymentGateway?: string; transactionId?: string; notes?: string
}
export interface Pagination {
  page: number; limit: number; total: number; totalPages: number
}
