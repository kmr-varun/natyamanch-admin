export default function SubscriptionsMetrics() {
  return (
    <div className="flex gap-2">
      {/* Total Subscriptions */}
      <div className="w-[182px] bg-white border border-[rgba(226,232,240,0.8)] rounded-xl p-2 flex gap-2">
        <div className="bg-[#faf5ff] rounded-xl w-12 h-12 flex items-center justify-center flex-shrink-0">
          <img src="/icons/crown-icon.svg" alt="" className="w-6 h-6" />
        </div>
        <div className="flex flex-col gap-[3.5px]">
          <span className="text-xl font-semibold text-[#0f172a] leading-6">486</span>
          <span className="text-xs font-medium text-[#64748b] leading-4">Total Subscriptions</span>
          <div className="flex items-center gap-1 pt-0.5">
            <span className="text-[11px] font-semibold text-[#059669] leading-[16.5px]">↑</span>
            <span className="text-[11px] font-semibold text-[#059669] leading-[16.5px]">+14% this month</span>
          </div>
        </div>
      </div>

      {/* Active Subscriptions */}
      <div className="w-[197px] bg-white border border-[rgba(226,232,240,0.8)] rounded-xl p-2 flex gap-2 h-[82px]">
        <div className="w-12 h-12 flex-shrink-0">
          <img src="/icons/shield-check-gradient.svg" alt="" className="w-full h-full" />
        </div>
        <div className="flex flex-col gap-[3.5px]">
          <span className="text-xl font-semibold text-[#0f172a] leading-6">402</span>
          <span className="text-xs font-medium text-[#64748b] leading-4">Active Subscriptions</span>
          <div className="flex items-center gap-1 pt-0.5">
            <span className="text-[11px] font-semibold text-[#059669] leading-[16.5px]">↑</span>
            <span className="text-[11px] font-semibold text-[#059669] leading-[16.5px]">+8% this month</span>
          </div>
        </div>
      </div>

      {/* Expiring Soon */}
      <div className="flex-1 bg-white border border-[rgba(226,232,240,0.8)] rounded-xl p-2 flex gap-2 h-[82px]">
        <div className="w-12 h-12 flex-shrink-0">
          <img src="/icons/clock-gradient.svg" alt="" className="w-full h-full" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xl font-semibold text-[#0f172a] leading-6">56</span>
          <span className="text-xs font-medium text-[#64748b] leading-4">Expiring Soon</span>
          <span className="text-[11px] text-[#94a3b8] leading-[11px]">(within 30 days)</span>
        </div>
      </div>

      {/* Expired / Cancelled */}
      <div className="flex-1 bg-white border border-[rgba(226,232,240,0.8)] rounded-xl p-2 flex gap-2 h-[82px]">
        <div className="bg-[#fff1f2] rounded-xl w-12 h-12 flex items-center justify-center flex-shrink-0">
          <img src="/icons/archive-icon.svg" alt="" className="w-5 h-5" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xl font-semibold text-[#0f172a] leading-6">28</span>
          <span className="text-xs font-medium text-[#64748b] leading-4 w-[111px]">Expired / Cancelled</span>
        </div>
      </div>
    </div>
  )
}
