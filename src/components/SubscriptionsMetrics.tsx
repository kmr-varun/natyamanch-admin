import { MetricCard } from './shared'
import type { SubscriptionStats } from '../lib/api'

interface Props {
  stats: SubscriptionStats | null
}

export default function SubscriptionsMetrics({ stats }: Props) {
  return (
    <div className="flex gap-2">
      <MetricCard
        icon="/icons/crown-icon.svg"
        iconBg="bg-[#faf5ff]"
        title="Total Subscriptions"
        value={stats ? String(stats.total) : '—'}
        width="w-[182px]"
      />
      <MetricCard
        icon="/icons/check-circle-icon.svg"
        iconBg="bg-[#ecfdf5]"
        title="Active"
        value={stats ? String(stats.active) : '—'}
        height="h-[82px]"
      />
      <MetricCard
        icon="/icons/clock-icon.svg"
        iconBg="bg-[#fffbeb]"
        title="Expiring Soon"
        value={stats ? String(stats.expiring_soon) : '—'}
        subtitle="within 30 days"
        subtitleColor="text-[#94a3b8]"
        height="h-[82px]"
      />
      <MetricCard
        icon="/icons/archive-icon.svg"
        iconBg="bg-[#fff1f2]"
        title="Expired / Cancelled"
        value={stats ? String(stats.expired + stats.cancelled) : '—'}
        height="h-[82px]"
      />
    </div>
  )
}
