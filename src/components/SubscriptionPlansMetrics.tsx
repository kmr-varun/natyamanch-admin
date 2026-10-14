export default function SubscriptionPlansMetrics() {
  return (
    <div className="flex gap-4">
      {/* Total Plans */}
      <div className="flex-1 bg-white border border-[rgba(226,232,240,0.8)] rounded-xl p-[17px] flex gap-4 items-center shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="bg-[#faf5ff] rounded-lg w-11 h-11 flex items-center justify-center flex-shrink-0">
          <img src="/icons/subscription-plan-icon.svg" alt="" className="w-6 h-6" />
        </div>
        <div className="flex flex-col gap-0">
          <span className="text-[20px] font-bold text-[#0f172a] leading-[25px]">5</span>
          <span className="text-xs font-medium text-[#64748b] leading-4">Total Plans</span>
          <div className="flex items-center gap-0.5 pt-[1.5px]">
            <span className="text-[11px] font-semibold text-[#059669] leading-[16.5px]">↑</span>
            <span className="text-[11px] font-semibold text-[#059669] leading-[16.5px]">+1 this month</span>
          </div>
        </div>
      </div>

      {/* Active Plans */}
      <div className="flex-1 bg-white border border-[rgba(226,232,240,0.8)] rounded-xl px-[17px] py-[24.75px] flex gap-4 items-center shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="bg-[#ecfdf5] rounded-lg w-11 h-11 flex items-center justify-center flex-shrink-0">
          <div className="w-4 h-4 bg-[#10b981] rounded-full shadow-[0px_0px_0px_4px_#d1fae5]"></div>
        </div>
        <div className="flex flex-col gap-0">
          <span className="text-[20px] font-bold text-[#0f172a] leading-[25px]">3</span>
          <span className="text-xs font-medium text-[#64748b] leading-4">Active Plans</span>
        </div>
      </div>

      {/* Upcoming Plan */}
      <div className="flex-1 bg-white border border-[rgba(226,232,240,0.8)] rounded-xl px-[17px] py-[24.75px] flex gap-4 items-center shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="w-11 h-11 flex-shrink-0">
          <img src="/icons/plan-upcoming-gradient.svg" alt="" className="w-full h-full" />
        </div>
        <div className="flex flex-col gap-0">
          <span className="text-[20px] font-bold text-[#0f172a] leading-[25px]">1</span>
          <span className="text-xs font-medium text-[#64748b] leading-4">Upcoming Plan</span>
        </div>
      </div>

      {/* Inactive Plan */}
      <div className="flex-1 bg-white border border-[rgba(226,232,240,0.8)] rounded-xl px-[17px] py-[24.75px] flex gap-4 items-center shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="bg-[#fef2f2] rounded-lg w-11 h-11 flex items-center justify-center flex-shrink-0">
          <img src="/icons/plan-inactive-icon.svg" alt="" className="w-5 h-5" />
        </div>
        <div className="flex flex-col gap-0">
          <span className="text-[20px] font-bold text-[#0f172a] leading-[25px]">1</span>
          <span className="text-xs font-medium text-[#64748b] leading-4">Inactive Plan</span>
        </div>
      </div>
    </div>
  )
}
