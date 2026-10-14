export default function NotificationMetrics() {
  const metrics = [
    {
      title: 'Total Notifications',
      value: '124',
      subtitle: '↑ +18% this month',
      icon: '/icons/bell-notification-icon.svg',
      bgColor: 'bg-[#faf5ff]',
      textColor: 'text-[#059669]',
    },
    {
      title: 'Delivered',
      value: '102',
      subtitle: '82.3% delivery rate',
      icon: '/icons/check-circle-icon.svg',
      bgColor: 'bg-[#ecfdf5]',
      textColor: 'text-[#64748b]',
    },
    {
      title: 'Read',
      value: '14',
      subtitle: '11.3% read rate',
      icon: '/icons/eye-read-icon.svg',
      bgColor: 'bg-[#eff6ff]',
      textColor: 'text-[#64748b]',
    },
    {
      title: 'Failed',
      value: '8',
      subtitle: '6.4% failed rate',
      icon: '/icons/x-circle-icon.svg',
      bgColor: 'bg-[#fef2f2]',
      textColor: 'text-[#64748b]',
    },
  ]

  return (
    <div className="flex items-start gap-2">
      {metrics.map((metric, idx) => (
        <div
          key={idx}
          className="flex-1 bg-white border border-[rgba(226,232,240,0.8)] rounded-xl px-2.5 py-[17px] flex items-center gap-2"
        >
          <div className={`w-12 h-12 ${metric.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
            <img src={metric.icon} alt="" className="w-6 h-6" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-2xl font-bold text-[#0f172a] leading-6">{metric.value}</span>
            <span className="text-xs text-[#64748b] leading-4 pt-0.5">{metric.title}</span>
            <span className={`text-[11px] ${idx === 0 ? metric.textColor : 'text-[#64748b]'} leading-[16.5px]`}>
              {metric.subtitle}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
