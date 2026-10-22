import { useState, useEffect, useRef } from 'react'
import NotificationMetrics from '../components/NotificationMetrics'
import NotificationFilterBar from '../components/NotificationFilterBar'
import NotificationTable from '../components/NotificationTable'
import SendNotificationModal from '../components/SendNotificationModal'
import { PageContainer, Button } from '../components/shared'
import { notificationsApi, type AdminNotification, type Pagination } from '../lib/api'

export default function Notifications() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([])
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 0 })
  const [stats, setStats] = useState<{ total: number; read: number; unread: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [sendModalOpen, setSendModalOpen] = useState(false)
  const searchRef = useRef('')
  const readRef = useRef('')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const loadStats = async () => {
    try { const res = await notificationsApi.stats(); setStats(res.stats) } catch {}
  }

  const loadNotifications = async (params: Record<string, string | number> = {}) => {
    setLoading(true)
    try {
      const res = await notificationsApi.list({ page: 1, limit: 20, ...params })
      setNotifications(res.data ?? [])
      if (res.pagination) setPagination(res.pagination)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadStats(); loadNotifications() }, [])

  const handleSearch = (q: string) => {
    searchRef.current = q
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      loadNotifications({ search: q, isRead: readRef.current, page: 1 })
    }, 400)
  }

  const handleReadFilter = (v: string) => {
    readRef.current = v
    loadNotifications({ search: searchRef.current, isRead: v, page: 1 })
  }

  const handlePageChange = (page: number) => {
    loadNotifications({ search: searchRef.current, isRead: readRef.current, page })
  }

  const handleDelete = async (id: string) => {
    await notificationsApi.delete(id)
    await loadNotifications({ search: searchRef.current, isRead: readRef.current, page: pagination.page })
    await loadStats()
  }

  const handleSent = async (count: number) => {
    console.log(`Sent to ${count} users`)
    await loadStats()
    await loadNotifications()
  }

  return (
    <PageContainer className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1d1b20] leading-8">Notifications</h1>
          <p className="text-sm text-[#64748b] mt-0.5">Send and manage user notifications</p>
        </div>
        <Button onClick={() => setSendModalOpen(true)} icon="/icons/plus-icon.svg">
          Send Notification
        </Button>
      </div>

      <NotificationMetrics stats={stats} />
      <NotificationFilterBar onSearch={handleSearch} onReadFilter={handleReadFilter} />
      <NotificationTable
        notifications={notifications}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onDelete={handleDelete}
      />

      <SendNotificationModal
        isOpen={sendModalOpen}
        onClose={() => setSendModalOpen(false)}
        onSent={handleSent}
      />
    </PageContainer>
  )
}
