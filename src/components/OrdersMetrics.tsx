import { MetricCard } from './shared'
import type { OrderStats } from '../lib/api'

interface Props {
  stats: OrderStats | null
}

function fmtRevenue(n?: number) {
  if (n == null) return '—'
  return '₹' + n.toLocaleString('en-IN')
}

export default function OrdersMetrics({ stats }: Props) {
  return (
    <div className="flex gap-2">
      <MetricCard
        icon="/icons/cart-gradient.svg"
        iconBg="bg-[#faf5ff]"
        title="Total Orders"
        value={stats ? String(stats.total_orders) : '—'}
        width="w-[182px]"
      />
      <MetricCard
        icon="/icons/check-circle-icon.svg"
        iconBg="bg-[#ecfdf5]"
        title="Completed"
        value={stats ? String(stats.completed_orders) : '—'}
        height="h-[82px]"
      />
      <MetricCard
        icon="/icons/clock-icon.svg"
        iconBg="bg-[#fffbeb]"
        title="Pending"
        value={stats ? String(stats.pending_orders) : '—'}
        height="h-[82px]"
      />
      <MetricCard
        icon="/icons/archive-icon.svg"
        iconBg="bg-[#fff1f2]"
        title="Total Revenue"
        value={fmtRevenue(stats?.total_revenue)}
        height="h-[82px]"
      />
    </div>
  )
}
