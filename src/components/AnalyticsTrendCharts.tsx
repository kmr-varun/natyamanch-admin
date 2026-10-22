import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface RevenuePoint { date: string; orders: number; revenue: number }
interface OrgStats { total: number; active: number; expired: number; inactive: number; expiring_soon: number }

interface Props {
  trendData: RevenuePoint[]
  orgStats: OrgStats | null
  days: number
  onDaysChange: (days: number) => void
}

const PERIOD_OPTIONS = [
  { label: '7D', days: 7 },
  { label: '30D', days: 30 },
  { label: '90D', days: 90 },
]

const fmtDate = (d: string) => {
  const date = new Date(d)
  return `${date.getDate()} ${date.toLocaleString('en', { month: 'short' })}`
}

export default function AnalyticsTrendCharts({ trendData, orgStats, days, onDaysChange }: Props) {
  const chartData = trendData.map(d => ({ ...d, date: fmtDate(d.date) }))

  const donutData = orgStats
    ? [
        { name: 'Active', value: orgStats.active, color: '#7f28bc' },
        { name: 'Expiring', value: orgStats.expiring_soon, color: '#f97316' },
        { name: 'Expired', value: orgStats.expired, color: '#ec4899' },
        { name: 'Inactive', value: orgStats.inactive, color: '#3b82f6' },
      ].filter(d => d.value > 0)
    : []

  return (
    <div className="grid grid-cols-3 gap-5">
      {/* Left: Orders & Revenue Trend */}
      <div className="col-span-2 bg-white border border-[#e2e8f0] rounded-xl shadow-sm p-5 h-[321px]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-[#1e293b] leading-5">Orders & Revenue Trend</h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-[#7f28bc] rounded-full" />
              <span className="text-xs font-medium text-[#475569] leading-4">Orders</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-[#ec4899] rounded-full" />
              <span className="text-xs font-medium text-[#475569] leading-4">Revenue (₹)</span>
            </div>
            <div className="flex gap-1 bg-[#f8f2fa] p-0.5 rounded">
              {PERIOD_OPTIONS.map(opt => (
                <button
                  key={opt.days}
                  onClick={() => onDaysChange(opt.days)}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                    days === opt.days ? 'bg-[#7f28bc] text-white' : 'text-[#64748b] hover:bg-[#f0e6f3]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="h-[250px]">
          {chartData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-[#94a3b8]">No data for this period</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="0" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v}`} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px' }} formatter={(val, name) => [name === 'revenue' ? `₹${val}` : val, name === 'revenue' ? 'Revenue' : 'Orders']} />
                <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#7f28bc" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#ec4899" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Right: Organization Status */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm p-[21px] flex flex-col justify-between">
        <h3 className="text-sm font-semibold text-[#1e293b] leading-5 pb-2">Organization Status</h3>

        {orgStats ? (
          <div className="flex items-center justify-between py-[53.5px]">
            <div className="w-36 h-36 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={donutData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={0} dataKey="value">
                    {donutData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="relative -mt-32 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                  <span className="text-xs font-bold text-[#0f172a] leading-3">{orgStats.total}</span>
                  <span className="text-[9px] font-medium text-[#94a3b8] leading-[13.5px] pt-0.5">Total Orgs</span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-2 pr-1">
              {[
                { label: 'Active', value: orgStats.active, color: 'bg-[#7f28bc]' },
                { label: 'Expiring', value: orgStats.expiring_soon, color: 'bg-[#f97316]' },
                { label: 'Expired', value: orgStats.expired, color: 'bg-[#ec4899]' },
                { label: 'Inactive', value: orgStats.inactive, color: 'bg-[#3b82f6]' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 ${item.color} rounded-full`} />
                    <span className="text-[11px] font-medium text-[#475569] leading-4">{item.label}</span>
                  </div>
                  <span className="text-xs font-bold text-[#0f172a] leading-4">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-sm text-[#94a3b8]">Loading...</div>
        )}
      </div>
    </div>
  )
}
