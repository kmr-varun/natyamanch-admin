import { useState, useEffect } from 'react'
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { analyticsApi } from '../lib/api'

const filterOptions = [
  { label: '7 Days', days: 7 },
  { label: '30 Days', days: 30 },
  { label: '3 Months', days: 90 },
  { label: '6 Months', days: 180 },
]

const fmtDate = (d: string) => {
  const date = new Date(d)
  return `${date.getDate()} ${date.toLocaleString('en', { month: 'short' })}`
}

export default function RevenueChart() {
  const [activeFilter, setActiveFilter] = useState('30 Days')
  const [chartData, setChartData] = useState<{ date: string; revenue: number; sales: number }[]>([])
  const [loading, setLoading] = useState(true)

  const loadChart = async (days: number) => {
    setLoading(true)
    try {
      const res = await analyticsApi.revenueChart(days)
      setChartData((res.data ?? []).map(d => ({ date: fmtDate(d.date), revenue: d.revenue, sales: d.orders })))
    } catch {}
    setLoading(false)
  }

  useEffect(() => { loadChart(30) }, [])

  const handleFilter = (label: string, days: number) => {
    setActiveFilter(label)
    loadChart(days)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#f1f5f9] p-6 h-[431px] flex flex-col">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-base font-semibold text-[#1d1b20] leading-8">Revenue & Sales Overview</h2>
        <div className="flex gap-1 bg-[#f8f2fa] p-1 rounded">
          {filterOptions.map(({ label, days }) => {
            const isActive = activeFilter === label
            const [number, unit] = label.split(' ')
            return (
              <button
                key={label}
                onClick={() => handleFilter(label, days)}
                className={`px-2.5 py-1 rounded-sm text-[11px] font-medium tracking-[0.55px] transition-colors ${
                  isActive ? 'bg-[#7f28bc] text-white' : 'text-[#50434a] hover:bg-[#f0e6f3]'
                }`}
              >
                <div className="flex flex-col items-center leading-[14px]">
                  <span>{number}</span>
                  <span>{unit}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex-1 pt-2">
        {loading ? (
          <div className="h-full flex items-center justify-center text-sm text-[#94a3b8]">Loading...</div>
        ) : chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm text-[#94a3b8]">No data for this period</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 40 }}>
              <CartesianGrid strokeDasharray="0" stroke="#ece6ee" vertical={false} />
              <XAxis dataKey="date" tick={{ fill: '#50434a', fontSize: 12.8 }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fill: '#82737a', fontSize: 11.636 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => v >= 1000 ? `₹${(v / 1000).toFixed(0)}K` : `₹${v}`}
              />
              <Tooltip
                contentStyle={{ backgroundColor: 'white', border: '1px solid #f1f5f9', borderRadius: '8px', fontSize: '12px' }}
                formatter={(value, name) => {
                  if (typeof value !== 'number') return ['-', String(name)]
                  if (name === 'revenue') return [`₹${value}`, 'Revenue']
                  return [value, 'Sales (Units)']
                }}
              />
              <Bar dataKey="revenue" fill="#7f28bc" radius={[4, 4, 0, 0]} barSize={40} />
              <Line type="monotone" dataKey="sales" stroke="#3e0d60" strokeWidth={2} dot={{ fill: '#3e0d60', r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="pt-4 border-t border-[#ece6ee]">
        <div className="flex gap-6 items-center justify-center">
          <div className="flex gap-2 items-center">
            <div className="w-3 h-3 rounded-full bg-[#7f28bc]" />
            <span className="text-xs font-medium text-[#1d1b20] tracking-[0.55px]">Revenue (₹)</span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-3 h-3 rounded-full bg-[#3e0d60]" />
            <span className="text-xs font-medium text-[#1d1b20] tracking-[0.55px]">Total Sales (Units)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
