import type { ReactNode } from 'react'

interface MetricCardProps {
  icon: string | ReactNode
  iconBg: string
  title: string
  value: string
  subtitle?: string
  subtitleColor?: string
  showArrow?: boolean
  isIconText?: boolean
  customIcon?: boolean
  width?: string
  height?: string
}

export default function MetricCard({
  icon,
  iconBg,
  title,
  value,
  subtitle,
  subtitleColor = 'text-[#059669]',
  showArrow = false,
  isIconText = false,
  customIcon = false,
  width = 'flex-1',
  height = '',
}: MetricCardProps) {
  return (
    <div
      className={`${width} ${height} bg-white border border-[rgba(226,232,240,0.8)] rounded-xl p-2 flex gap-2.5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]`}
    >
      {/* Icon Container */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}
      >
        {isIconText ? (
          <span className="text-xl font-bold text-[#7e22ce] leading-7">{icon}</span>
        ) : customIcon ? (
          icon
        ) : (
          <img src={icon as string} alt="" className="w-6 h-6" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-0.5">
        <span className="text-xl font-semibold text-[#0f172a] leading-6">{value}</span>
        <span className="text-xs font-medium text-[#64748b] leading-4">{title}</span>
        {subtitle && (
          <div className="flex items-center gap-1 pt-0.5">
            {showArrow && (
              <span className={`text-[11px] font-semibold ${subtitleColor} leading-[16.5px]`}>
                ↑
              </span>
            )}
            <span className={`text-[11px] font-medium ${subtitleColor} leading-[16.5px]`}>
              {subtitle}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
