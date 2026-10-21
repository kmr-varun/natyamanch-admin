interface Props {
  onSearch: (q: string) => void
}

export default function ContentFilterBar({ onSearch }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 relative">
        <img src="/icons/search-icon.svg" alt="" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
        <input
          type="text"
          placeholder="Search sections by name or key…"
          onChange={e => onSearch(e.target.value)}
          className="w-full h-9 pl-9 pr-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#7f28bc]"
        />
      </div>
    </div>
  )
}
