import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function AnalyticsTrendCharts() {
  // Mock data for the trend chart
  const trendData = [
    { date: '15 Aug', views: 1200, revenue: 45000 },
    { date: '18 Aug', views: 2500, revenue: 65000 },
    { date: '21 Aug', views: 1800, revenue: 52000 },
    { date: '24 Aug', views: 3200, revenue: 82000 },
    { date: '27 Aug', views: 2100, revenue: 58000 },
    { date: '30 Aug', views: 3800, revenue: 95000 },
    { date: '02 Sep', views: 2800, revenue: 72000 },
    { date: '05 Sep', views: 3400, revenue: 85000 },
    { date: '08 Sep', views: 2200, revenue: 62000 },
    { date: '11 Sep', views: 3600, revenue: 88000 },
    { date: '14 Sep', views: 3000, revenue: 78000 },
  ]

  return (
    <div className="grid grid-cols-3 gap-5">
      {/* Left: Views & Revenue Trend - 2 columns wide */}
      <div className="col-span-2 bg-white border border-[#e2e8f0] rounded-xl shadow-sm p-5 h-[321px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-[#1e293b] leading-5">Views & Revenue Trend</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-[#7f28bc] rounded-full"></div>
              <span className="text-xs font-medium text-[#475569] leading-4">Video Views</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-[#ec4899] rounded-full"></div>
              <span className="text-xs font-medium text-[#475569] leading-4">Revenue (INR)</span>
            </div>
          </div>
        </div>

        {/* Chart Area */}
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="0" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fill: '#94a3b8', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="left"
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value / 1000}K`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `₹${value / 1000}K`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="views"
                stroke="#7f28bc"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke="#ec4899"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Right: Revenue by Plan Type - 1 column wide */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm p-[21px] flex flex-col justify-between">
        <h3 className="text-sm font-semibold text-[#1e293b] leading-5 pb-2">Revenue by Plan Type</h3>

        <div className="flex items-center justify-between py-[53.5px]">
          {/* Donut Chart */}
          <div className="w-36 h-36 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Individual Videos', value: 42 },
                    { name: 'Monthly Pass', value: 26 },
                    { name: 'Mandal Plans', value: 20 },
                    { name: 'Other', value: 12 },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={0}
                  dataKey="value"
                >
                  <Cell fill="#7f28bc" />
                  <Cell fill="#f97316" />
                  <Cell fill="#3b82f6" />
                  <Cell fill="#ec4899" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center label */}
            <div className="relative -mt-32 flex items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <span className="text-xs font-bold text-[#0f172a] leading-3">₹4,98,320</span>
                <span className="text-[9px] font-medium text-[#94a3b8] leading-[13.5px] pt-0.5">Total Revenue</span>
              </div>
            </div>
          </div>

          {/* Legends */}
          <div className="flex-1 flex flex-col gap-2 pr-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-[7.34px] h-2.5 bg-[#7f28bc] rounded-full"></div>
                <span className="text-[11px] font-medium text-[#475569] leading-4">Individual<br />Videos</span>
              </div>
              <span className="text-xs font-bold text-[#0f172a] leading-4">42%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-[9.13px] h-2.5 bg-[#f97316] rounded-full"></div>
                <span className="text-[11px] font-medium text-[#475569] leading-4">Monthly<br />Pass</span>
              </div>
              <span className="text-xs font-bold text-[#0f172a] leading-4">26%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-[9.16px] h-2.5 bg-[#3b82f6] rounded-full"></div>
                <span className="text-[11px] font-medium text-[#475569] leading-4">Mandal<br />Plans</span>
              </div>
              <span className="text-xs font-bold text-[#0f172a] leading-4">20%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-[#ec4899] rounded-full"></div>
                <span className="text-[11px] font-medium text-[#475569] leading-4">Other</span>
              </div>
              <span className="text-xs font-bold text-[#0f172a] leading-4">12%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
