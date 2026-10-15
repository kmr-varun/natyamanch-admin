import { handleFilter } from '../utils/mockHandlers'

export default function NotificationFilterBar() {

  return (
    <div className="bg-white border border-[rgba(226,232,240,0.8)] shadow-sm rounded-xl p-[13px] flex items-center justify-end gap-4">
      {/* Search */}
      <div className="flex-1 max-w-[384px] relative">
        <input
          type="text"
          placeholder="Search"
          className="w-full h-[31px] pl-9 pr-[13px] text-xs text-[#94a3b8] bg-white border border-[#e2e8f0] rounded-lg"
        />
        <img
          src="/icons/search-icon-gray.svg"
          alt=""
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <button onClick={() => handleFilter.apply('Status', 'All')} className="bg-white border border-[#e2e8f0] rounded-lg px-[13px] py-[7px] flex items-center gap-1 min-w-[95px]">
          <span className="text-xs font-medium text-[#334155] leading-4">All Status</span>
          <img src="/icons/dropdown-arrow-gray.svg" alt="" className="w-[18px] h-[18px]" />
        </button>
        <button onClick={() => handleFilter.apply('Type', 'All')} className="bg-white border border-[#e2e8f0] rounded-lg px-[13px] py-[7px] flex items-center gap-1">
          <span className="text-xs font-medium text-[#334155] leading-4">All Type</span>
          <img src="/icons/dropdown-arrow-gray.svg" alt="" className="w-[18px] h-[18px]" />
        </button>
        <button onClick={() => handleFilter.apply('Audience', 'All')} className="bg-white border border-[#e2e8f0] rounded-lg px-[13px] py-[7px] flex items-center gap-1">
          <span className="text-xs font-medium text-[#334155] leading-4">All Audience</span>
          <img src="/icons/dropdown-arrow-gray.svg" alt="" className="w-[18px] h-[18px]" />
        </button>
        <button onClick={() => handleFilter.apply('DateRange', 'All')} className="bg-white border border-[#e2e8f0] rounded-lg px-[13px] py-[7px] flex items-center gap-1">
          <span className="text-xs font-medium text-[#334155] leading-4">Select Date Range</span>
          <img src="/icons/dropdown-arrow-gray.svg" alt="" className="w-[18px] h-[18px]" />
        </button>
        <button onClick={() => handleFilter.clear()} className="px-2 py-1 text-xs font-medium text-[#7f28bc] leading-4">Reset</button>
      </div>
    </div>
  )
}
