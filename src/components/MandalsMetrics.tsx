import { MetricCard } from './shared'
import type { OrgStats } from '../lib/api'

interface Props {
  stats: OrgStats | null
}

export default function MandalsMetrics({ stats }: Props) {
  return (
    <div className="flex gap-2">
      <MetricCard
        icon="/icons/building-icon.svg"
        iconBg="bg-[#faf5ff]"
        title="Total Mandals"
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
        title="Expired / Inactive"
        value={stats ? String(stats.expired + stats.inactive) : '—'}
        height="h-[82px]"
      />
    </div>
  )
}
