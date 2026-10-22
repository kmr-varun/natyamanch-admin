import { MetricCard } from './shared'

interface NotifStats { total: number; read: number; unread: number }

interface Props { stats: NotifStats | null }

export default function NotificationMetrics({ stats }: Props) {
  const readRate = stats && stats.total > 0 ? ((stats.read / stats.total) * 100).toFixed(1) : '0'

  const metrics = [
    {
      title: 'Total Sent',
      value: stats ? String(stats.total) : '—',
      subtitle: 'All notifications',
      icon: '/icons/bell-notification-icon.svg',
      bgColor: 'bg-[#faf5ff]',
      textColor: 'text-[#7f28bc]',
      showArrow: false,
    },
    {
      title: 'Read',
      value: stats ? String(stats.read) : '—',
      subtitle: `${readRate}% read rate`,
      icon: '/icons/eye-read-icon.svg',
      bgColor: 'bg-[#ecfdf5]',
      textColor: 'text-[#059669]',
      showArrow: false,
    },
    {
      title: 'Unread',
      value: stats ? String(stats.unread) : '—',
      subtitle: 'Pending reads',
      icon: '/icons/bell-notification-icon.svg',
      bgColor: 'bg-[#eff6ff]',
      textColor: 'text-[#64748b]',
      showArrow: false,
    },
    {
      title: 'Failed',
      value: '—',
      subtitle: 'Not tracked yet',
      icon: '/icons/x-circle-icon.svg',
      bgColor: 'bg-[#fef2f2]',
      textColor: 'text-[#64748b]',
      showArrow: false,
    },
  ]

  return (
    <div className="flex items-start gap-2">
      {metrics.map((metric, idx) => (
        <MetricCard
          key={idx}
          icon={metric.icon}
          iconBg={metric.bgColor}
          title={metric.title}
          value={metric.value}
          subtitle={metric.subtitle}
          subtitleColor={metric.textColor}
          showArrow={metric.showArrow}
        />
      ))}
    </div>
  )
}
