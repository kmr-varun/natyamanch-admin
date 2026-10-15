interface SearchInputProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
}

export default function SearchInput({
  placeholder = 'Search...',
  value,
  onChange,
  className = '',
}: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full h-10 pl-[37px] pr-[13px] py-2 border border-[#e2e8f0] rounded-lg text-xs text-[#94a3b8] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#7f28bc]"
      />
      <img
        src="/icons/search-icon.svg"
        alt=""
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
      />
    </div>
  )
}
