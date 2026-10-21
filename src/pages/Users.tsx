import { useState, useEffect, useRef } from 'react'
import StatsCard from '../components/StatsCard'
import UsersFilterToolbar from '../components/UsersFilterToolbar'
import UsersTable from '../components/UsersTable'
import AddUserModal from '../components/AddUserModal'
import { PageContainer } from '../components/shared'
import { usersApi, analyticsApi } from '../lib/api'
import type { AdminUserRow, Pagination } from '../lib/api'

export default function Users() {
  const [users, setUsers] = useState<AdminUserRow[]>([])
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 10, total: 0, totalPages: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [addUserModalOpen, setAddUserModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'active' | 'inactive'>('active')
  const [stats, setStats] = useState({ total: 0, active: 0 })
  const searchTimeout = useRef<ReturnType<typeof setTimeout>>()

  const fetchUsers = async (page: number, limit: number, search: string, tab: 'active' | 'inactive') => {
    setLoading(true)
    setError('')
    try {
      const params: Record<string, string | number> = { page, limit, status: tab }
      if (search) params.search = search
      const res = await usersApi.list(params)
      setUsers(res.data)
      if (res.pagination) setPagination(res.pagination)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const res = await analyticsApi.dashboard()
      setStats({ total: res.users.total, active: res.users.active })
    } catch {
      // stats are non-critical, fail silently
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  useEffect(() => {
    fetchUsers(1, pagination.limit, searchQuery, activeTab)
  }, [activeTab])

  const handleSearch = (query: string) => {
    clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(() => {
      setSearchQuery(query)
      fetchUsers(1, pagination.limit, query, activeTab)
    }, 400)
  }

  const handleTabChange = (tab: 'active' | 'inactive') => {
    setActiveTab(tab)
  }

  const handlePageChange = (page: number) => {
    fetchUsers(page, pagination.limit, searchQuery, activeTab)
    setPagination(p => ({ ...p, page }))
  }

  const handleLimitChange = (limit: number) => {
    setPagination(p => ({ ...p, limit }))
    fetchUsers(1, limit, searchQuery, activeTab)
  }

  const handleStatusUpdate = async (userId: string, status: string) => {
    try {
      await usersApi.updateStatus(userId, status)
      fetchUsers(pagination.page, pagination.limit, searchQuery, activeTab)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update status')
    }
  }

  return (
    <PageContainer>
      <div className="flex gap-3">
        <StatsCard
          icon="/icons/total-users-icon.svg"
          iconBg="#f86c2e"
          title="Total Users"
          value={stats.total.toString()}
          change="—"
          changeType="up"
        />
        <StatsCard
          icon="/icons/active-users-icon.svg"
          iconBg="#e23e5e"
          title="Active Users"
          value={stats.active.toString()}
          change="—"
          changeType="up"
        />
        <StatsCard
          icon="/icons/active-access-icon.svg"
          iconBg="#7f28bc"
          title="Showing"
          value={pagination.total.toString()}
          change="—"
          changeType="up"
        />
        <StatsCard
          icon="/icons/subscribed-users-icon.svg"
          iconBg="#4930ea"
          title="With Active Access"
          value={users.filter(u => u.active_videos > 0).length.toString()}
          change="—"
          changeType="up"
        />
      </div>

      <div className="pt-6">
        <UsersFilterToolbar
          onAddUser={() => setAddUserModalOpen(true)}
          onSearch={handleSearch}
          users={users}
        />
      </div>

      <div className="pt-6">
        <UsersTable
          users={users}
          loading={loading}
          error={error}
          pagination={pagination}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
          onStatusUpdate={handleStatusUpdate}
        />
      </div>

      <AddUserModal
        isOpen={addUserModalOpen}
        onClose={() => setAddUserModalOpen(false)}
        onSuccess={() => {
          fetchStats()
          fetchUsers(1, pagination.limit, searchQuery, activeTab)
        }}
      />
    </PageContainer>
  )
}
