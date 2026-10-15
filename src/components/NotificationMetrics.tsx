import { MetricCard } from './shared'

export default function NotificationMetrics() {
  const metrics = [
    {
      title: 'Total Notifications',
      value: '124',
      subtitle: '+18% this month',
      icon: '/icons/bell-notification-icon.svg',
      bgColor: 'bg-[#faf5ff]',
      textColor: 'text-[#059669]',
      showArrow: true,
    },
    {
      title: 'Delivered',
      value: '102',
      subtitle: '82.3% delivery rate',
      icon: '/icons/check-circle-icon.svg',
      bgColor: 'bg-[#ecfdf5]',
      textColor: 'text-[#64748b]',
      showArrow: false,
    },
    {
      title: 'Read',
      value: '14',
      subtitle: '11.3% read rate',
      icon: '/icons/eye-read-icon.svg',
      bgColor: 'bg-[#eff6ff]',
      textColor: 'text-[#64748b]',
      showArrow: false,
    },
    {
      title: 'Failed',
      value: '8',
      subtitle: '6.4% failed rate',
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
