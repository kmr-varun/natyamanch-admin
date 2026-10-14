export default function SubscriptionsFilterBar() {
  return (
    <div className="bg-white border border-[rgba(226,232,240,0.8)] rounded-xl p-[13px] flex items-center justify-between shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
      {/* Search Input */}
      <div className="w-[190px] relative">
        <input
          type="text"
          placeholder="Search categories..."
          className="w-full h-10 pl-[37px] pr-[13px] py-2 border border-[#e2e8f0] rounded-lg text-xs text-[#94a3b8] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#7f28bc]"
        />
        <img
          src="/icons/search-icon.svg"
          alt=""
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        {/* All Status Dropdown */}
        <div className="relative">
          <select className="h-10 pl-[13px] pr-[33px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs font-semibold text-[#334155] leading-4 appearance-none focus:outline-none focus:border-[#7f28bc]">
            <option>All Status</option>
            <option>Active</option>
            <option>Expired</option>
          </select>
          <img
            src="/icons/chevron-down-small.svg"
            alt=""
            className="absolute right-[13px] top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
          />
        </div>

        {/* All Payment Method Dropdown */}
        <div className="relative">
          <select className="h-10 pl-[13px] pr-[33px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs font-semibold text-[#334155] leading-4 appearance-none focus:outline-none focus:border-[#7f28bc]">
            <option>All Payment Method</option>
            <option>Stripe</option>
            <option>Razorpay</option>
          </select>
          <img
            src="/icons/chevron-down-small.svg"
            alt=""
            className="absolute right-[13px] top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
          />
        </div>

        {/* Select Date Range Dropdown */}
        <div className="relative">
          <select className="h-10 pl-[13px] pr-[33px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs font-semibold text-[#334155] leading-4 appearance-none focus:outline-none focus:border-[#7f28bc]">
            <option>Select Date Range</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
          <img
            src="/icons/chevron-down-small.svg"
            alt=""
            className="absolute right-[13px] top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
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
