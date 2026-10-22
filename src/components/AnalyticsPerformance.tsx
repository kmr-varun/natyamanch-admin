interface TopVideo {
  id: string
  title: string
  thumbnail_url?: string
  view_count: number
  purchase_count: number
  revenue: number
}

interface RegPoint { date: string; registrations: number }

interface Props {
  topVideos: TopVideo[]
  userRegistrations: RegPoint[]
}

const fmtNum = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n)
const fmtInr = (n: number) => n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : n >= 1000 ? `₹${(n / 1000).toFixed(1)}K` : `₹${n}`

const BADGE_COLORS = [
  'bg-[rgba(120,53,15,0.8)] border-[#92400e] text-[#fde68a]',
  'bg-[rgba(6,78,59,0.8)] border-[#065f46] text-[#a7f3d0]',
  'bg-[rgba(136,19,55,0.8)] border-[#9f1239] text-[#fecdd3]',
  'bg-[rgba(49,46,129,0.8)] border-[#3730a3] text-[#c7d2fe]',
  'bg-[rgba(88,28,135,0.8)] border-[#6b21a8] text-[#e9d5ff]',
]

const COUNTRIES = [
  { name: 'USA', flag: '/images/flag-usa.png', percent: '—' },
  { name: 'India', flag: '/images/flag-india.png', percent: '—' },
  { name: 'Canada', flag: '/images/flag-canada.png', percent: '—' },
  { name: 'UAE', flag: '/images/flag-uae.png', percent: '—' },
  { name: 'UK', flag: '/images/flag-uk.png', percent: '—' },
]

export default function AnalyticsPerformance({ topVideos, userRegistrations }: Props) {
  const maxReg = Math.max(...userRegistrations.map(d => d.registrations), 1)

  return (
    <div className="grid grid-cols-3 gap-5">
      {/* Column 1: Top Performing Videos */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm p-[21px] flex flex-col">
        <div className="flex items-center justify-between pb-3">
          <h3 className="text-sm font-semibold text-[#1e293b] leading-5">Top Performing Videos</h3>
        </div>

        {topVideos.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-sm text-[#94a3b8]">No data</div>
        ) : (
          <div className="flex flex-col">
            <div className="flex items-start border-b border-[#f1f5f9] pb-2 mb-px">
              <div className="w-8 text-[10px] font-bold text-[#2d2d2d] leading-4">#</div>
              <div className="flex-1 text-[10px] font-semibold text-[#2d2d2d] leading-4">Video</div>
              <div className="flex-1 text-[10px] font-semibold text-[#2d2d2d] leading-4 text-right">Views</div>
              <div className="flex-1 text-[10px] font-semibold text-[#2d2d2d] leading-4 text-right">Revenue</div>
            </div>
            {topVideos.slice(0, 5).map((video, idx) => (
              <div key={video.id} className={`flex items-center ${idx > 0 ? 'border-t border-[#f8fafc]' : ''} py-[10.5px]`}>
                <div className="w-8 text-[11px] font-medium text-[#94a3b8] leading-4">{idx + 1}</div>
                <div className="flex-1 flex items-center gap-2.5">
                  <div className={`w-7 h-5 border rounded flex items-center justify-center ${BADGE_COLORS[idx % BADGE_COLORS.length]}`}>
                    <span className="text-[7px] font-bold leading-4">PLAY</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#1e293b] leading-4 max-w-[90px] truncate">{video.title}</span>
                </div>
                <div className="flex-1 text-[11px] font-medium text-[#475569] leading-4 text-right">{fmtNum(video.view_count)}</div>
                <div className="flex-1 text-[11px] font-semibold text-[#0f172a] leading-4 text-right">{fmtInr(video.revenue)}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Column 2: User Registrations */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm p-[21px] flex flex-col justify-between">
        <div className="flex items-center justify-between pb-2">
          <h3 className="text-sm font-semibold text-[#1e293b] leading-5">User Registrations</h3>
        </div>

        <div className="h-[180px] flex items-end justify-around gap-0.5 pt-2">
          {userRegistrations.length === 0 ? (
            <div className="w-full flex items-center justify-center text-sm text-[#94a3b8]">No data</div>
          ) : (
            userRegistrations.map((d, idx) => (
              <div
                key={idx}
                title={`${d.date}: ${d.registrations}`}
                className="flex-1 bg-[#7f28bc] rounded-t min-h-[2px] transition-all"
                style={{ height: `${Math.max(2, (d.registrations / maxReg) * 100)}%` }}
              />
            ))
          )}
        </div>

        <div className="flex items-start justify-between pt-1">
          {userRegistrations.length > 0 && (() => {
            const step = Math.max(1, Math.floor(userRegistrations.length / 4))
            return [0, step, step * 2, step * 3, userRegistrations.length - 1]
              .filter((v, i, a) => a.indexOf(v) === i)
              .map(i => {
                const d = new Date(userRegistrations[i]?.date)
                return <span key={i} className="text-[9px] text-[#94a3b8] leading-[13.5px]">{`${d.getDate()} ${d.toLocaleString('en', { month: 'short' })}`}</span>
              })
          })()}
        </div>
      </div>

      {/* Column 3: Users by Country (static) */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm p-[21px] flex flex-col justify-between">
        <div className="flex items-center justify-between pb-2">
          <h3 className="text-sm font-semibold text-[#1e293b] leading-5">Users by Country</h3>
          <span className="text-[10px] text-[#94a3b8]">coming soon</span>
        </div>

        <div className="flex flex-col gap-3 py-[17px]">
          {COUNTRIES.map((country, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-2 w-20">
                <img src={country.flag} alt={country.name} className="w-[29px] h-[15px] object-cover" />
                <span className="text-xs font-medium text-[#334155] leading-4">{country.name}</span>
              </div>
              <span className="text-[11px] font-medium text-[#64748b] leading-4 w-12 text-right">—</span>
              <div className="flex-1 px-3">
                <div className="bg-[#f1f5f9] h-2 rounded-full" />
              </div>
              <span className="text-[11px] font-semibold text-[#1e293b] leading-4 w-8 text-right">—</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
