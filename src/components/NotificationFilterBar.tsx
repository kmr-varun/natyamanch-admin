interface Props {
  onSearch: (q: string) => void
  onReadFilter: (v: string) => void
}

export default function NotificationFilterBar({ onSearch, onReadFilter }: Props) {
  return (
    <div className="bg-white border border-[rgba(226,232,240,0.8)] shadow-sm rounded-xl p-[13px] flex items-center justify-end gap-4">
      <div className="flex-1 max-w-[384px] relative">
        <input
          type="text"
          placeholder="Search by title, message or user..."
          onChange={e => onSearch(e.target.value)}
          className="w-full h-[31px] pl-9 pr-[13px] text-xs text-[#334155] bg-white border border-[#e2e8f0] rounded-lg outline-none focus:border-[#7f28bc]"
        />
        <img src="/icons/search-icon-gray.svg" alt="" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <select
            onChange={e => onReadFilter(e.target.value)}
            className="appearance-none bg-white border border-[#e2e8f0] rounded-lg pl-3 pr-8 py-[7px] text-xs font-medium text-[#334155] leading-4 outline-none focus:border-[#7f28bc]"
          >
            <option value="">All Status</option>
            <option value="false">Unread</option>
            <option value="true">Read</option>
          </select>
          <img src="/icons/dropdown-arrow-gray.svg" alt="" className="absolute right-2 top-1/2 -translate-y-1/2 w-[18px] h-[18px] pointer-events-none" />
        </div>
      </div>
    </div>
  )
}
