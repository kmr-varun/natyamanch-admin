interface DropdownProps {
  options: string[]
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
  height?: string
  iconType?: 'chevron' | 'arrow'
}

export default function Dropdown({
  options,
  placeholder = 'Select option',
  value,
  onChange,
  className = '',
  height = 'h-10',
  iconType = 'chevron',
}: DropdownProps) {
  const iconSrc = iconType === 'arrow' ? '/icons/dropdown-arrow.svg' : '/icons/chevron-down-small.svg'
  const iconSize = iconType === 'arrow' ? 'w-[18px] h-[18px]' : 'w-4 h-4'
  const iconRight = iconType === 'arrow' ? 'right-[9px]' : 'right-[13px]'
  const padding = height === 'h-[30px]' ? 'py-[7px]' : 'py-2'

  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={`${height} pl-[13px] pr-[33px] ${padding} bg-white border border-[#e2e8f0] rounded-lg text-xs font-semibold text-[#334155] leading-4 appearance-none focus:outline-none focus:border-[#7f28bc] w-full`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <img
        src={iconSrc}
        alt=""
        className={`absolute ${iconRight} top-1/2 -translate-y-1/2 ${iconSize} pointer-events-none`}
      />
    </div>
  )
}
