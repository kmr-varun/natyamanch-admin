import { useState } from 'react'
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

const filterOptions = ['7 Days', '30 Days', '3 Months', '6 Months']

// Mock data for different time ranges
const chartDataByFilter: Record<string, Array<{ date: string; revenue: number; sales: number }>> = {
  '7 Days': [
    { date: 'Sep 13', revenue: 3200, sales: 28 },
    { date: 'Sep 14', revenue: 4100, sales: 35 },
    { date: 'Sep 15', revenue: 2800, sales: 24 },
    { date: 'Sep 16', revenue: 4800, sales: 42 },
    { date: 'Sep 17', revenue: 3900, sales: 33 },
    { date: 'Sep 18', revenue: 4500, sales: 38 },
    { date: 'Sep 19', revenue: 5200, sales: 45 },
  ],
  '30 Days': [
    { date: 'Week 1', revenue: 15000, sales: 120 },
    { date: 'Week 2', revenue: 18000, sales: 145 },
    { date: 'Week 3', revenue: 12000, sales: 98 },
    { date: 'Week 4', revenue: 21000, sales: 165 },
  ],
  '3 Months': [
    { date: 'Aug', revenue: 45000, sales: 380 },
    { date: 'Sep', revenue: 52000, sales: 425 },
    { date: 'Oct', revenue: 48000, sales: 395 },
  ],
  '6 Months': [
    { date: 'May', revenue: 38000, sales: 310 },
    { date: 'Jun', revenue: 42000, sales: 345 },
    { date: 'Jul', revenue: 41000, sales: 338 },
    { date: 'Aug', revenue: 45000, sales: 380 },
    { date: 'Sep', revenue: 52000, sales: 425 },
    { date: 'Oct', revenue: 48000, sales: 395 },
  ],
}

export default function RevenueChart() {
  const [activeFilter, setActiveFilter] = useState('7 Days')
  const chartData = chartDataByFilter[activeFilter]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#f1f5f9] p-6 h-[431px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-base font-semibold text-[#1d1b20] leading-8">
          Revenue & Sales Overview
        </h2>

        {/* Filter Pills */}
        <div className="flex gap-1 bg-[#f8f2fa] p-1 rounded">
          {filterOptions.map((filter) => {
            const isActive = activeFilter === filter
            const [number, unit] = filter.split(' ')

            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-2.5 py-1 rounded-sm text-[11px] font-medium tracking-[0.55px] transition-colors ${
                  isActive
                    ? 'bg-[#7f28bc] text-white'
                    : 'text-[#50434a] hover:bg-[#f0e6f3]'
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

      {/* Chart Area */}
      <div className="flex-1 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="0" stroke="#ece6ee" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: '#50434a', fontSize: 12.8 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#82737a', fontSize: 11.636 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => {
                if (value >= 1000) return `$${value / 1000}K`
                return `$${value}`
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #f1f5f9',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              formatter={(value, name) => {
                if (typeof value !== 'number') return ['-', String(name)]
                if (name === 'revenue') return [`$${value}`, 'Revenue']
                return [value, 'Sales (Units)']
              }}
            />
            <Bar
              dataKey="revenue"
              fill="#7f28bc"
              radius={[4, 4, 0, 0]}
              barSize={40}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#3e0d60"
              strokeWidth={2}
              dot={{ fill: '#3e0d60', r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="pt-4 border-t border-[#ece6ee]">
        <div className="flex gap-6 items-center justify-center">
          <div className="flex gap-2 items-center">
            <div className="w-3 h-3 rounded-full bg-[#7f28bc]" />
            <span className="text-xs font-medium text-[#1d1b20] tracking-[0.55px]">
              Revenue ($)
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-3 h-3 rounded-full bg-[#3e0d60]" />
            <span className="text-xs font-medium text-[#1d1b20] tracking-[0.55px]">
              Total Sales (Units)
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
