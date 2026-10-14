interface StatsCardProps {
  icon: string
  iconBg: string
  title: string
  value: string
  change: string
  changeType: 'up' | 'down'
}

export default function StatsCard({ icon, iconBg, title, value, change, changeType }: StatsCardProps) {
  return (
    <div className="bg-white border border-[#f1f5f9] rounded-2xl shadow-sm p-[10px] py-[17px] flex-1 min-w-0">
      <div className="flex gap-3 items-start">
        {/* Icon */}
        <div
          className="w-[43px] h-[43px] rounded-full flex items-center justify-center flex-shrink-0 shadow-sm"
          style={{ backgroundColor: iconBg }}
        >
          <img src={icon} alt="" className="w-6 h-6 object-contain" />
        </div>

        {/* Content */}
        <div className="flex flex-col min-w-0">
          {/* Title and Value */}
          <div className="flex flex-col gap-[7px]">
            <p className="text-xs font-medium text-[#64748b] tracking-[0.28px] leading-5">
              {title}
            </p>
            <p className="text-2xl font-bold text-[#0f172a] leading-8">
              {value}
            </p>
          </div>

          {/* Change Stats */}
          <div className="flex flex-col gap-1 mt-[7px]">
            <p className="text-xs font-semibold text-[#059669] leading-[16.5px]">
              {changeType === 'up' ? '↑' : '↓'} {change}
            </p>
            <p className="text-xs font-normal text-[#94a3b8] leading-[16.5px]">
              vs. last month
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
