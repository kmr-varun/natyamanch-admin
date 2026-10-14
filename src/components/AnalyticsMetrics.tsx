export default function AnalyticsMetrics() {
  const metrics = [
    {
      title: 'Total Users',
      value: '12,482',
      growth: '+12%',
      period: 'vs last 30 days',
      icon: '/icons/drama-masks-icon.svg',
      bgColor: 'bg-[#faf5ff]',
    },
    {
      title: 'Total Video Views',
      value: '28,930',
      growth: '+18%',
      period: 'vs last 30 days',
      icon: '/icons/play-circle-icon.svg',
      bgColor: 'bg-[#ecfdf5]',
    },
    {
      title: 'Total Orders',
      value: '1,248',
      growth: '+22%',
      period: 'vs last 30 days',
      icon: '/icons/cart-bg-icon.svg',
      bgColor: 'bg-transparent',
      isImage: true,
    },
    {
      title: 'Total Revenue',
      value: '₹4,98,320',
      growth: '+20%',
      period: 'vs last 30 days',
      icon: '₹',
      bgColor: 'bg-[#f3e8ff]',
      isText: true,
    },
  ]

  return (
    <div className="flex items-start gap-5">
      {metrics.map((metric, idx) => (
        <div
          key={idx}
          className="flex-1 bg-white border border-[#e2e8f0] rounded-xl shadow-sm p-[17px] flex items-center gap-4"
        >
          {/* Icon Container */}
          <div className={`w-12 h-12 ${metric.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
            {metric.isText ? (
              <span className="text-xl font-bold text-[#7e22ce] leading-7">₹</span>
            ) : metric.isImage ? (
              <img src={metric.icon} alt="" className="w-12 h-12" />
            ) : (
              <img src={metric.icon} alt="" className="w-6 h-6" />
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col gap-0.5 pt-[1.5px]">
            <span className="text-xs font-medium text-[#64748b] leading-4">{metric.title}</span>
            <div className="flex flex-col pt-0.5">
              <span className="text-xl font-bold text-[#0f172a] leading-[25px]">{metric.value}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-medium text-[#059669] leading-[16.5px]">{metric.growth}</span>
              <span className="text-[11px] text-[#94a3b8] leading-[16.5px]">{metric.period}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
