import { useState, useEffect, useRef } from 'react'
import OrdersMetrics from '../components/OrdersMetrics'
import OrdersFilterBar from '../components/OrdersFilterBar'
import OrdersTable from '../components/OrdersTable'
import { PageContainer } from '../components/shared'
import { ordersApi, type AdminOrder, type Pagination, type OrderStats } from '../lib/api'

export default function Orders() {
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 10, total: 0, totalPages: 0 })
  const [stats, setStats] = useState<OrderStats | null>(null)
  const [loading, setLoading] = useState(true)
  const searchRef = useRef('')
  const statusRef = useRef('')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const loadStats = async () => {
    try { const res = await ordersApi.stats(); setStats(res.stats) } catch {}
  }

  const loadOrders = async (params: Record<string, string | number> = {}) => {
    setLoading(true)
    try {
      const res = await ordersApi.list({ page: 1, limit: 10, ...params })
      setOrders(res.data)
      if (res.pagination) setPagination(res.pagination)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadStats(); loadOrders() }, [])

  const handleSearch = (q: string) => {
    searchRef.current = q
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      loadOrders({ search: q, status: statusRef.current, page: 1 })
    }, 400)
  }

  const handleStatusFilter = (s: string) => {
    statusRef.current = s
    loadOrders({ search: searchRef.current, status: s, page: 1 })
  }

  const handlePageChange = (page: number) => {
    loadOrders({ search: searchRef.current, status: statusRef.current, page })
  }

  const handleDelete = async (id: string) => {
    await ordersApi.delete(id)
    await loadOrders({ search: searchRef.current, status: statusRef.current, page: pagination.page })
    await loadStats()
  }

  return (
    <PageContainer>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1d1b20] leading-8">Orders</h1>
            <p className="text-sm text-[#64748b] mt-0.5">Track purchases and payment history</p>
          </div>
        </div>

        <OrdersMetrics stats={stats} />
        <OrdersFilterBar onSearch={handleSearch} onStatusFilter={handleStatusFilter} />
        <OrdersTable
          orders={orders}
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange}
          onDelete={handleDelete}
        />
      </div>
    </PageContainer>
  )
}
