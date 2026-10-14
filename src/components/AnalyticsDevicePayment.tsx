export default function AnalyticsDevicePayment() {
  return (
    <div className="grid grid-cols-3 gap-5">
      {/* Column 1: Device Type */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm p-[21px] flex flex-col justify-between">
        <h3 className="text-sm font-semibold text-[#1e293b] leading-5 pb-2">Device Type</h3>

        <div className="flex items-center justify-between py-[28.75px]">
          {/* Donut Chart */}
          <div className="relative w-32 h-32 flex-shrink-0">
            <div
              className="w-full h-full rounded-full"
              style={{
                background: `conic-gradient(
                  #7f28bc 0% 58%,
                  #3b82f6 58% 86%,
                  #f97316 86% 96%,
                  #ec4899 96% 100%
                )`,
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[70px] h-[70px] bg-white rounded-full flex flex-col items-center justify-center">
                <span className="text-xs font-bold text-[#0f172a] leading-3">28,930</span>
                <span className="text-[9px] font-medium text-[#94a3b8] leading-[13.5px] pt-0.5">Total Views</span>
              </div>
            </div>
          </div>

          {/* Legends */}
          <div className="flex-1 flex flex-col gap-2 pr-2">
            {[
              { label: 'Mobile', percent: '58%', color: 'bg-[#7f28bc]' },
              { label: 'Desktop', percent: '28%', color: 'bg-[#3b82f6]' },
              { label: 'Tablet', percent: '10%', color: 'bg-[#f97316]' },
              { label: 'Smart TV', percent: '4%', color: 'bg-[#ec4899]' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 ${item.color} rounded-full`}></div>
                  <span className="text-[11px] font-medium text-[#475569] leading-4">{item.label}</span>
                </div>
                <span className="text-xs font-bold text-[#0f172a] leading-4">{item.percent}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Column 2: Payment Methods */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm p-[21px] flex flex-col justify-between">
        <h3 className="text-sm font-semibold text-[#1e293b] leading-5 pb-3">Payment Methods</h3>

        <div className="flex flex-col gap-4 py-[6.75px]">
          {[
            { label: 'Razorpay (UPI / Cards)', percent: '64%', width: '64%' },
            { label: 'Stripe (International)', percent: '24%', width: '24%' },
            { label: 'Free Access', percent: '8%', width: '8%' },
            { label: 'Others', percent: '4%', width: '4%' },
          ].map((method, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <div className="flex items-start justify-between">
                <span className="text-xs font-medium text-[#475569] leading-4">{method.label}</span>
                <span className="text-xs font-bold text-[#0f172a] leading-4">{method.percent}</span>
              </div>
              <div className="bg-[#f1f5f9] h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#7f28bc] h-full rounded-full" style={{ width: method.width }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Column 3: New vs Returning Users */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm p-5 h-[255.5px]">
        {/* Header */}
        <div className="flex items-center justify-between pb-2">
          <h3 className="text-sm font-semibold text-[#1e293b] leading-5">New vs Returning Users</h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-[#7f28bc] rounded-full"></div>
              <span className="text-[11px] font-medium text-[#475569] leading-[16.5px]">New</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-[#ec4899] rounded-full"></div>
              <span className="text-[11px] font-medium text-[#475569] leading-[16.5px]">Returning</span>
            </div>
          </div>
        </div>

        {/* Chart Area - Placeholder */}
        <div className="h-[140px] bg-gradient-to-br from-[#faf5ff] to-[#fef2f2] rounded-lg flex items-center justify-center relative overflow-hidden mt-2">
          {/* Simulated dual line chart */}
          <div className="absolute inset-0 flex items-end px-4">
            <svg className="w-full h-full" preserveAspectRatio="none">
              {/* Purple line (New users) */}
              <polyline
                points="0,80 40,60 80,70 120,50 160,65 200,40 240,55 280,45"
                fill="none"
                stroke="#7f28bc"
                strokeWidth="2"
              />
              {/* Pink line (Returning users) */}
              <polyline
                points="0,100 40,85 80,95 120,75 160,90 200,65 240,80 280,70"
                fill="none"
                stroke="#ec4899"
                strokeWidth="2"
              />
            </svg>
          </div>
          <span className="text-sm text-[#94a3b8]">Trend Chart</span>
        </div>

        {/* X-Axis Labels */}
        <div className="flex items-start justify-between pl-4 pr-1 pt-1">
          {['15 Aug', '20 Aug', '25 Aug', '30 Aug', '04 Sep', '09 Sep', '14 Sep'].map((label, idx) => (
            <span key={idx} className="text-[9px] text-[#94a3b8] leading-[13.5px]">{label}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
