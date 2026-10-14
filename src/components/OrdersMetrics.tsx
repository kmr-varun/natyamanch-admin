export default function OrdersMetrics() {
  return (
    <div className="flex items-center gap-[55px]">
      {/* Metrics Cards */}
      <div className="flex gap-2">
        {/* Total Orders */}
        <div className="flex-1 bg-white border border-[rgba(226,232,240,0.8)] rounded-xl px-[13px] py-[17px] flex gap-4 items-center">
          <div className="w-12 h-12 flex-shrink-0">
            <img src="/icons/cart-gradient.svg" alt="" className="w-full h-full" />
          </div>
          <div className="flex flex-col">
            <span className="text-[20px] font-bold text-[#0f172a] leading-[30px]">512</span>
            <span className="text-xs font-medium text-[#64748b] leading-4">Total Orders</span>
            <span className="text-[11px] font-medium text-[#059669] leading-[16.5px] pt-0.5">↑ +12% this month</span>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="flex-1 bg-white border border-[rgba(226,232,240,0.8)] rounded-xl px-[13px] py-[17px] flex gap-4 items-center">
          <div className="w-12 h-12 bg-[#ecfdf5] rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-[20px] font-bold text-[#059669] leading-7">₹</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[20px] font-bold text-[#0f172a] leading-[30px]">₹1,54,280</span>
            <span className="text-xs font-medium text-[#64748b] leading-4">Total Revenue</span>
            <span className="text-[11px] font-medium text-[#059669] leading-[16.5px] pt-0.5">↑ +18% this month</span>
          </div>
        </div>

        {/* Individual Purchases */}
        <div className="flex-1 bg-white border border-[rgba(226,232,240,0.8)] rounded-xl px-[13px] py-[17px] flex gap-4 items-center">
          <div className="w-12 h-12 bg-[#eff6ff] rounded-xl flex items-center justify-center flex-shrink-0">
            <img src="/icons/user-circle-icon.svg" alt="" className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-[20px] font-bold text-[#0f172a] leading-[30px]">438</span>
            <span className="text-xs font-medium text-[#64748b] leading-4">Individual Purchases</span>
            <span className="text-[11px] font-medium text-[#059669] leading-[16.5px] pt-0.5">↑ +10% this month</span>
          </div>
        </div>

        {/* Mandal Subscriptions */}
        <div className="flex-1 bg-white border border-[rgba(226,232,240,0.8)] rounded-xl px-[13px] py-[17px] flex gap-4 items-center">
          <div className="w-12 h-12 bg-[#eef2ff] rounded-xl flex items-center justify-center flex-shrink-0">
            <img src="/icons/mandal-building-icon.svg" alt="" className="w-[25.015px] h-[20.5px]" />
          </div>
          <div className="flex flex-col">
            <span className="text-[20px] font-bold text-[#0f172a] leading-[30px]">74</span>
            <span className="text-xs font-medium text-[#64748b] leading-4">Mandal Subscriptions</span>
            <span className="text-[11px] font-medium text-[#059669] leading-[16.5px] pt-0.5">↑ +28% this month</span>
          </div>
        </div>
      </div>

      {/* Export Button */}
      <div className="w-[190px] flex items-center justify-end rounded-xl py-3">
        <button className="px-[14px] py-2 bg-[#7f28bc] rounded-lg flex items-center gap-[6px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#6d1fa3]">
          <img src="/icons/download-export-icon.svg" alt="" className="w-3 h-3" />
          <span className="text-xs font-semibold text-white leading-4">Export Orders</span>
        </button>
      </div>
    </div>
  )
}
