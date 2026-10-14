export default function AnalyticsPerformance() {
  const videos = [
    { rank: '1', title: 'Hello Inspector', views: '8,420', revenue: '₹1,26,300', badge: 'PLAY', badgeColor: 'bg-[rgba(120,53,15,0.8)] border-[#92400e] text-[#fde68a]' },
    { rank: '2', title: 'Sanket Milanacha', views: '5,230', revenue: '₹78,450', badge: 'PLAY', badgeColor: 'bg-[rgba(6,78,59,0.8)] border-[#065f46] text-[#a7f3d0]' },
    { rank: '3', title: 'Lapandav', views: '4,980', revenue: '₹62,700', badge: 'PLAY', badgeColor: 'bg-[rgba(136,19,55,0.8)] border-[#9f1239] text-[#fecdd3]' },
    { rank: '4', title: 'Sata Lota', views: '3,420', revenue: '₹48,110', badge: 'PLAY', badgeColor: 'bg-[rgba(49,46,129,0.8)] border-[#3730a3] text-[#c7d2fe]' },
    { rank: '5', title: 'Natyamanch Trailer', views: '2,940', revenue: '₹0', badge: 'PLAY', badgeColor: 'bg-[rgba(88,28,135,0.8)] border-[#6b21a8] text-[#e9d5ff]' },
  ]

  const countries = [
    { name: 'USA', flag: '/images/flag-usa.png', count: '4,320', percent: '34%', width: '34%' },
    { name: 'India', flag: '/images/flag-india.png', count: '3,210', percent: '26%', width: '26%' },
    { name: 'Canada', flag: '/images/flag-canada.png', count: '1,850', percent: '15%', width: '15%' },
    { name: 'UAE', flag: '/images/flag-uae.png', count: '1,420', percent: '11%', width: '11%' },
    { name: 'UK', flag: '/images/flag-uk.png', count: '980', percent: '8%', width: '8%' },
    { name: 'Others', flag: '🌐', count: '702', percent: '6%', width: '6%' },
  ]

  return (
    <div className="grid grid-cols-3 gap-5">
      {/* Column 1: Top Performing Videos */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm p-[21px] flex flex-col justify-between">
        <div className="flex items-center justify-between pb-3">
          <h3 className="text-sm font-semibold text-[#1e293b] leading-5">Top Performing Videos</h3>
          <span className="text-xs font-semibold text-[#7f28bc] leading-4">View All</span>
        </div>

        {/* Table */}
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-start border-b border-[#f1f5f9] pb-2 mb-px">
            <div className="w-8 text-[10px] font-bold text-[#2d2d2d] leading-4">#</div>
            <div className="flex-1 text-[10px] font-semibold text-[#2d2d2d] leading-4">Video</div>
            <div className="flex-1 text-[10px] font-semibold text-[#2d2d2d] leading-4 text-right">Views</div>
            <div className="flex-1 text-[10px] font-semibold text-[#2d2d2d] leading-4 text-right">Revenue</div>
          </div>

          {/* Rows */}
          {videos.map((video, idx) => (
            <div key={idx} className={`flex items-center ${idx < videos.length - 1 ? 'border-t border-[#f8fafc]' : ''} py-[10.5px]`}>
              <div className="w-8 text-[11px] font-medium text-[#94a3b8] leading-4">{video.rank}</div>
              <div className="flex-1 flex items-center gap-2.5">
                <div className={`w-7 h-5 border rounded flex items-center justify-center ${video.badgeColor}`}>
                  <span className="text-[7px] font-bold leading-4">{video.badge}</span>
                </div>
                <span className="text-[11px] font-semibold text-[#1e293b] leading-4 max-w-[90px] truncate">{video.title}</span>
              </div>
              <div className="flex-1 text-[11px] font-medium text-[#475569] leading-4 text-right">{video.views}</div>
              <div className="flex-1 text-[11px] font-semibold text-[#0f172a] leading-4 text-right">{video.revenue}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Column 2: User Growth */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm p-[21px] flex flex-col justify-between">
        <div className="flex items-center justify-between pb-2">
          <h3 className="text-sm font-semibold text-[#1e293b] leading-5">User Growth</h3>
          <span className="text-xs font-semibold text-[#7f28bc] leading-4">View All</span>
        </div>

        {/* Bar Chart */}
        <div className="h-[180px] flex items-end justify-around gap-0.5 pt-2">
          {[50, 55, 52, 54, 48, 51, 47, 49, 60, 43, 53, 40, 45, 58, 62, 48, 70, 55, 65, 50, 72, 60, 68, 75, 80].map((height, idx) => (
            <div
              key={idx}
              className="flex-1 bg-[#7f28bc] rounded-t"
              style={{ height: `${height}%` }}
            ></div>
          ))}
        </div>

        {/* X-Axis Labels */}
        <div className="flex items-start justify-between pl-6 pr-1 pt-1">
          {['15 Aug', '20 Aug', '25 Aug', '30 Aug', '04 Sep', '09 Sep', '14 Sep'].map((label, idx) => (
            <span key={idx} className="text-[9px] text-[#94a3b8] leading-[13.5px]">{label}</span>
          ))}
        </div>
      </div>

      {/* Column 3: Users by Country */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm p-[21px] flex flex-col justify-between">
        <div className="flex items-center justify-between pb-2">
          <h3 className="text-sm font-semibold text-[#1e293b] leading-5">Users by Country</h3>
          <span className="text-xs font-semibold text-[#7f28bc] leading-4">View All</span>
        </div>

        <div className="flex flex-col gap-3 py-[17px]">
          {countries.map((country, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-2 w-20">
                {country.name === 'Others' ? (
                  <span className="text-sm leading-5">{country.flag}</span>
                ) : (
                  <img src={country.flag} alt={country.name} className="w-[29px] h-[15px] object-cover" />
                )}
                <span className="text-xs font-medium text-[#334155] leading-4">{country.name}</span>
              </div>
              <span className="text-[11px] font-medium text-[#64748b] leading-4 w-12 text-right">{country.count}</span>
              <div className="flex-1 px-3">
                <div className="bg-[#f1f5f9] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#7f28bc] h-full rounded-full" style={{ width: country.width }}></div>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-[#1e293b] leading-4 w-8 text-right">{country.percent}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
