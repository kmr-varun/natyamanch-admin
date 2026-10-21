import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import SubscriptionsMetrics from '../components/SubscriptionsMetrics'
import SubscriptionsFilterBar from '../components/SubscriptionsFilterBar'
import SubscriptionsTable from '../components/SubscriptionsTable'
import AddSubscriptionModal from '../components/AddSubscriptionModal'
import { PageContainer, Button } from '../components/shared'
import { subscriptionsApi, type AdminSubscription, type Pagination, type SubscriptionStats } from '../lib/api'

export default function Subscriptions() {
  const [subs, setSubs] = useState<AdminSubscription[]>([])
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 10, total: 0, totalPages: 0 })
  const [stats, setStats] = useState<SubscriptionStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const searchRef = useRef('')
  const statusRef = useRef('')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const loadStats = async () => {
    try { const res = await subscriptionsApi.stats(); setStats(res.stats) } catch {}
  }

  const loadSubs = async (params: Record<string, string | number> = {}) => {
    setLoading(true)
    try {
      const res = await subscriptionsApi.list({ page: 1, limit: 10, ...params })
      setSubs(res.data)
      if (res.pagination) setPagination(res.pagination)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadStats(); loadSubs() }, [])

  const handleSearch = (q: string) => {
    searchRef.current = q
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      loadSubs({ search: q, status: statusRef.current, page: 1 })
    }, 400)
  }

  const handleStatusFilter = (s: string) => {
    statusRef.current = s
    loadSubs({ search: searchRef.current, status: s, page: 1 })
  }

  const handlePageChange = (page: number) => {
    loadSubs({ search: searchRef.current, status: statusRef.current, page })
  }

  const handleDelete = async (id: string) => {
    await subscriptionsApi.delete(id)
    await loadSubs({ search: searchRef.current, status: statusRef.current, page: pagination.page })
    await loadStats()
  }

  const handleAdded = async () => {
    setAddModalOpen(false)
    await loadStats()
    await loadSubs()
  }

  return (
    <PageContainer>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1d1b20] leading-8">Subscriptions</h1>
            <p className="text-sm text-[#64748b] mt-0.5">Manage user subscriptions and access</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/subscription-plans">
              <Button variant="secondary">View Plans</Button>
            </Link>
            <Button onClick={() => setAddModalOpen(true)}>Add Subscription</Button>
          </div>
        </div>

        <SubscriptionsMetrics stats={stats} />
        <SubscriptionsFilterBar onSearch={handleSearch} onStatusFilter={handleStatusFilter} />
        <SubscriptionsTable
          subscriptions={subs}
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange}
          onDelete={handleDelete}
        />
      </div>

      <AddSubscriptionModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdded={handleAdded}
      />
    </PageContainer>
  )
}
