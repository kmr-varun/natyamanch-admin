export default function SubscriptionPlansFilterBar() {
  return (
    <div className="bg-white p-6 flex items-center justify-between">
      {/* Tabs */}
      <div className="flex items-center gap-6">
        <button className="pb-[14px] border-b-2 border-[#7f28bc] text-xs font-semibold text-[#7f28bc] leading-4">
          All Plans (5)
        </button>
        <button className="pb-3 text-xs font-semibold text-[#64748b] leading-4">
          Individual Plans (2)
        </button>
        <button className="pb-3 text-xs font-semibold text-[#64748b] leading-4">
          Mandal Plans (3)
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-2">
        {/* Search Input */}
        <div className="w-[208px] relative">
          <input
            type="text"
            placeholder="Search plans..."
            className="w-full h-[31px] pl-[33px] pr-[13px] py-2 border border-[#e2e8f0] rounded-lg text-xs text-[#94a3b8] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#7f28bc]"
          />
          <img
            src="/icons/search-small-icon.svg"
            alt=""
            className="absolute left-[10px] top-1/2 -translate-y-1/2 w-[14px] h-[14px] pointer-events-none"
          />
        </div>

        {/* Filters Button */}
        <button className="px-[13px] py-[7px] border border-[#e2e8f0] rounded-lg flex items-center gap-[6px] hover:bg-gray-50">
          <img src="/icons/filter-icon.svg" alt="" className="w-[14px] h-[14px]" />
          <span className="text-xs font-medium text-[#475569] leading-4">Filters</span>
        </button>
      </div>
    </div>
  )
}
