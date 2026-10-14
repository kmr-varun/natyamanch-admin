export default function OrdersFilterBar() {
  return (
    <div className="bg-white border border-[rgba(226,232,240,0.8)] rounded-xl p-[13px] flex items-center justify-end gap-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
      {/* Search Input */}
      <div className="flex-1 max-w-[384px] relative">
        <input
          type="text"
          placeholder="Search"
          className="w-full h-[31px] pl-[37px] pr-[13px] py-2 border border-[#e2e8f0] rounded-lg text-xs text-[#94a3b8] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#7f28bc]"
        />
        <img
          src="/icons/search-icon-gray.svg"
          alt=""
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        {/* All Status */}
        <div className="relative">
          <select className="h-[30px] pl-[13px] pr-[33px] py-[7px] bg-white border border-[#e2e8f0] rounded-lg text-xs font-semibold text-[#334155] leading-4 appearance-none focus:outline-none focus:border-[#7f28bc]">
            <option>All Status</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
          <img
            src="/icons/dropdown-arrow.svg"
            alt=""
            className="absolute right-[9px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] pointer-events-none"
          />
        </div>

        {/* All Type */}
        <div className="relative">
          <select className="h-[30px] pl-[13px] pr-[33px] py-[7px] bg-white border border-[#e2e8f0] rounded-lg text-xs font-semibold text-[#334155] leading-4 appearance-none focus:outline-none focus:border-[#7f28bc]">
            <option>All Type</option>
            <option>Individual</option>
            <option>Mandal</option>
          </select>
          <img
            src="/icons/dropdown-arrow.svg"
            alt=""
            className="absolute right-[9px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] pointer-events-none"
          />
        </div>

        {/* All Plans/Videos */}
        <div className="relative">
          <select className="h-[30px] pl-[13px] pr-[33px] py-[7px] bg-white border border-[#e2e8f0] rounded-lg text-xs font-semibold text-[#334155] leading-4 appearance-none focus:outline-none focus:border-[#7f28bc]">
            <option>All Plans/Videos</option>
            <option>Videos</option>
            <option>Monthly Plan</option>
            <option>Annual Plan</option>
          </select>
          <img
            src="/icons/dropdown-arrow.svg"
            alt=""
            className="absolute right-[9px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] pointer-events-none"
          />
        </div>

        {/* Select Date Range */}
        <div className="relative">
          <select className="h-[30px] pl-[13px] pr-[33px] py-[7px] bg-white border border-[#e2e8f0] rounded-lg text-xs font-semibold text-[#334155] leading-4 appearance-none focus:outline-none focus:border-[#7f28bc]">
            <option>Select Date Range</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
          <img
            src="/icons/dropdown-arrow.svg"
            alt=""
            className="absolute right-[9px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] pointer-events-none"
          />
        </div>

        {/* Reset Button */}
        <button className="px-2 py-1 text-xs font-semibold text-[#7f28bc] leading-4 hover:underline">
          Reset
        </button>
      </div>
    </div>
  )
}
