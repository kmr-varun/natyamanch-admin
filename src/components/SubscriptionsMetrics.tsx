import { MetricCard } from './shared'

export default function SubscriptionsMetrics() {
  return (
    <div className="flex gap-2">
      <MetricCard
        icon="/icons/crown-icon.svg"
        iconBg="bg-[#faf5ff]"
        title="Total Subscriptions"
        value="486"
        subtitle="+14% this month"
        showArrow
        width="w-[182px]"
      />
      <MetricCard
        icon={<img src="/icons/shield-check-gradient.svg" alt="" className="w-full h-full" />}
        iconBg="bg-transparent"
        title="Active Subscriptions"
        value="402"
        subtitle="+8% this month"
        showArrow
        customIcon
        width="w-[197px]"
        height="h-[82px]"
      />
      <MetricCard
        icon={<img src="/icons/clock-gradient.svg" alt="" className="w-full h-full" />}
        iconBg="bg-transparent"
        title="Expiring Soon"
        value="56"
        subtitle="(within 30 days)"
        subtitleColor="text-[#94a3b8]"
        customIcon
        height="h-[82px]"
      />
      <MetricCard
        icon="/icons/archive-icon.svg"
        iconBg="bg-[#fff1f2]"
        title="Expired / Cancelled"
        value="28"
        height="h-[82px]"
      />
    </div>
  )
}
