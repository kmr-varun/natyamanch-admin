import { useEffect, useState } from 'react'
import StatsCard from '../components/StatsCard'
import RevenueChart from '../components/RevenueChart'
import MandalsTable from '../components/MandalsTable'
import RecentOrdersTable from '../components/RecentOrdersTable'
import PopularVideos from '../components/PopularVideos'
import { PageContainer } from '../components/shared'
import { analyticsApi } from '../lib/api'

interface DashboardStats {
  users: { total: number; today: number; last7days: number; active: number }
  revenue: { total: number | null; today: number | null; last7days: number | null; last30days: number | null }
  videos: { total: number; published: number; total_views: number | null }
  orders: { total: number; completed: number; pending: number; today: number }
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)

  useEffect(() => {
    analyticsApi.dashboard().then(res => setStats(res)).catch(console.error)
  }, [])

  const fmt = (n: number | null | undefined) =>
    n == null ? '—' : n >= 100000 ? `₹${(n / 1000).toFixed(0)}k` : n >= 1000 ? `₹${(n / 1000).toFixed(1)}k` : String(n)

  return (
    <PageContainer>
      <div className="flex gap-3">
        <StatsCard
          icon="/icons/users-icon.svg"
          iconBg="#f86c2e"
          title="Total Users"
          value={stats ? String(stats.users.total) : '—'}
          change={stats ? `+${stats.users.last7days} this week` : ''}
          changeType="up"
        />
        <StatsCard
          icon="/icons/revenue-icon.svg"
          iconBg="#e23e5e"
          title="Total Revenue"
          value={stats ? fmt(stats.revenue.total) : '—'}
          change={stats ? `${fmt(stats.revenue.today)} today` : ''}
          changeType="up"
        />
        <StatsCard
          icon="/icons/sales-icon.svg"
          iconBg="#7f28bc"
          title="Total Orders"
          value={stats ? String(stats.orders.total) : '—'}
          change={stats ? `${stats.orders.today} today` : ''}
          changeType="up"
        />
        <StatsCard
          icon="/icons/subscriptions-icon.svg"
          iconBg="#4930ea"
          title="Pending Orders"
          value={stats ? String(stats.orders.pending) : '—'}
          change={stats ? `${stats.orders.completed} completed` : ''}
          changeType="up"
        />
        <StatsCard
          icon="/icons/video-access-icon.svg"
          iconBg="#e23e5e"
          title="Published Videos"
          value={stats ? String(stats.videos.published) : '—'}
          change={stats ? `${stats.videos.total} total` : ''}
          changeType="up"
        />
      </div>

      <div className="grid grid-cols-12 gap-6 pt-6">
        <div className="col-span-7">
          <RevenueChart />
        </div>
        <div className="col-span-5">
          <MandalsTable />
        </div>
      </div>

      <div className="flex gap-6 pt-6">
        <div className="flex-1">
          <RecentOrdersTable />
        </div>
        <div className="w-[503px]">
          <PopularVideos />
        </div>
      </div>
    </PageContainer>
  )
}
