interface MandalsMetricsProps {
  mandals?: any[]
}

export default function MandalsMetrics({ mandals }: MandalsMetricsProps = {}) {
  const totalCount = mandals?.length || 28
  const activeCount = mandals?.filter(m => m.status === 'Active').length || 24
  return (
    <div className="flex gap-2">
      {/* Total Organizations */}
      <div className="flex-1 bg-white border border-[rgba(226,232,240,0.9)] rounded-xl px-[9px] py-[18px] flex gap-2 items-center shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="bg-[#faf5ff] rounded-xl w-12 h-12 flex items-center justify-center flex-shrink-0">
          <img src="/icons/mandal-building-icon.svg" alt="" className="w-[25.015px] h-[20.5px]" />
        </div>
        <div className="flex flex-col gap-[1.5px]">
          <span className="text-2xl font-bold text-[#1e293b] leading-6">{totalCount}</span>
          <span className="text-xs font-semibold text-[#475569] leading-[15px] pt-[2.5px]">Total Organizations</span>
          <div className="flex items-center gap-0.5">
            <span className="text-[11px] font-medium text-[#059669] leading-[16.5px]">↑</span>
            <span className="text-[11px] font-medium text-[#059669] leading-[16.5px]">+12% this month</span>
          </div>
        </div>
      </div>

      {/* Active Mandals */}
      <div className="flex-1 bg-white border border-[rgba(226,232,240,0.9)] rounded-xl px-[9px] py-[18px] flex gap-2 items-center shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="bg-[#ecfdf5] rounded-xl w-12 h-12 flex items-center justify-center flex-shrink-0">
          <div className="w-4 h-4 bg-[#10b981] rounded-full shadow-[0px_0px_0px_4px_#d1fae5]"></div>
        </div>
        <div className="flex flex-col gap-[1.5px]">
          <span className="text-2xl font-bold text-[#1e293b] leading-6">{activeCount}</span>
          <span className="text-xs font-semibold text-[#475569] leading-[15px] pt-[2.5px]">Active Mandals</span>
          <div className="flex items-center gap-0.5">
            <span className="text-[11px] font-medium text-[#059669] leading-[16.5px]">↑</span>
            <span className="text-[11px] font-medium text-[#059669] leading-[16.5px]">+9% this month</span>
          </div>
        </div>
      </div>

      {/* Expiring Soon */}
      <div className="flex-1 bg-white border border-[rgba(226,232,240,0.9)] rounded-xl px-[9px] py-[18px] flex gap-2 items-center shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="w-12 h-12 flex-shrink-0">
          <img src="/icons/mandal-clock-gradient.svg" alt="" className="w-full h-full" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-2xl font-bold text-[#1e293b] leading-6">3</span>
          <span className="text-xs font-semibold text-[#475569] leading-[15px] pt-0.5">Expiring Soon</span>
          <span className="text-[11px] font-medium text-[#94a3b8] leading-[16.5px]">(within 30 days)</span>
        </div>
      </div>

      {/* Inactive / Cancelled */}
      <div className="flex-1 bg-white border border-[rgba(226,232,240,0.9)] rounded-xl px-[9px] py-[18px] flex gap-2 items-center h-[98px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="bg-[#fef2f2] rounded-xl w-12 h-12 flex items-center justify-center flex-shrink-0">
          <img src="/icons/plan-inactive-icon.svg" alt="" className="w-5 h-5" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold text-[#1e293b] leading-6">1</span>
          <span className="text-xs font-semibold text-[#475569] leading-[15px]">Inactive / Cancelled</span>
        </div>
      </div>
    </div>
  )
}
