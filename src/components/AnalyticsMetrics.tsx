interface DashStats {
  users: { total: number; today: number; last7days: number; active: number }
  revenue: { total: number | null; today: number | null; last7days: number | null; last30days: number | null }
  videos: { total: number; published: number; total_views: number | null }
  orders: { total: number; completed: number; pending: number; today: number }
}

interface Props {
  stats: DashStats | null
}

const fmtNum = (n: number | null | undefined) => {
  if (n == null) return '—'
  if (n >= 10000000) return `${(n / 10000000).toFixed(1)}Cr`
  if (n >= 100000) return `${(n / 100000).toFixed(1)}L`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
  return String(n)
}

const fmtInr = (n: number | null | undefined) => {
  if (n == null) return '—'
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`
  return `₹${n}`
}

export default function AnalyticsMetrics({ stats }: Props) {
  const metrics = [
    {
      title: 'Total Users',
      value: stats ? fmtNum(stats.users.total) : '—',
      sub: stats ? `+${stats.users.last7days} this week` : 'Loading...',
      icon: '/icons/drama-masks-icon.svg',
      bgColor: 'bg-[#faf5ff]',
    },
    {
      title: 'Total Video Views',
      value: stats ? fmtNum(stats.videos.total_views) : '—',
      sub: stats ? `${stats.videos.published} published` : 'Loading...',
      icon: '/icons/play-circle-icon.svg',
      bgColor: 'bg-[#ecfdf5]',
    },
    {
      title: 'Total Orders',
      value: stats ? fmtNum(stats.orders.total) : '—',
      sub: stats ? `${stats.orders.today} today` : 'Loading...',
      icon: '/icons/cart-bg-icon.svg',
      bgColor: 'bg-transparent',
      isImage: true,
    },
    {
      title: 'Total Revenue',
      value: stats ? fmtInr(stats.revenue.total) : '—',
      sub: stats ? `${fmtInr(stats.revenue.last30days)} this month` : 'Loading...',
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
          <div className={`w-12 h-12 ${metric.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
            {metric.isText ? (
              <span className="text-xl font-bold text-[#7e22ce] leading-7">₹</span>
            ) : metric.isImage ? (
              <img src={metric.icon as string} alt="" className="w-12 h-12" />
            ) : (
              <img src={metric.icon as string} alt="" className="w-6 h-6" />
            )}
          </div>
          <div className="flex flex-col gap-0.5 pt-[1.5px]">
            <span className="text-xs font-medium text-[#64748b] leading-4">{metric.title}</span>
            <span className="text-xl font-bold text-[#0f172a] leading-[25px]">{metric.value}</span>
            <span className="text-[11px] text-[#94a3b8] leading-[16.5px]">{metric.sub}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
