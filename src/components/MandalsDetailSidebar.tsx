export default function MandalsDetailSidebar() {
  return (
    <div className="bg-white border border-[rgba(226,232,240,0.9)] rounded-xl p-[17px] flex flex-col gap-1 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
      {/* Organization Name & Status */}
      <div className="pb-3 flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-[#0f172a] leading-[19.25px]">Marathi Mandal New Jersey</h2>
          <span className="px-2 bg-[#d1fae5] rounded-full text-[10px] font-semibold text-[#047857] leading-4">
            Active
          </span>
        </div>

        {/* Meta List */}
        <div className="flex flex-col gap-[6px]">
          <div className="flex items-center gap-2">
            <img src="/icons/location-icon.svg" alt="" className="w-[14px] h-[14px]" />
            <span className="text-[11px] text-[#64748b] leading-4">New Jersey, USA</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/icons/email-icon.svg" alt="" className="w-[14px] h-[14px]" />
            <span className="text-[11px] font-medium text-[#475569] leading-4">rohan@mmnj.org</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/icons/phone-icon.svg" alt="" className="w-[14px] h-[14px]" />
            <span className="text-[11px] text-[#64748b] leading-4">+1 987 654 3210</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/icons/website-icon.svg" alt="" className="w-[14px] h-[14px]" />
            <span className="text-[11px] text-[#475569] leading-4">https://www.mmnj.org</span>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="h-px border-t border-[#f1f5f9]"></div>

      {/* Subscription Details */}
      <div className="py-3 flex flex-col gap-2.5">
        <h3 className="text-sm font-semibold text-black opacity-60 leading-4">Subscription Details</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] text-[#94a3b8] leading-4">Plan</span>
            <span className="text-[11.5px] font-bold text-[#1e293b] leading-4">100 Account Plan</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] text-[#94a3b8] leading-4">Price</span>
            <span className="text-[11.5px] font-bold text-[#1e293b] leading-4">
              ₹14,999 <span className="font-normal text-[#94a3b8]">/ year</span>
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] text-[#94a3b8] leading-4">Start Date</span>
            <span className="text-[11.5px] font-medium text-[#334155] leading-4">10 Aug 2025</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] text-[#94a3b8] leading-4">Valid Until</span>
            <span className="text-[11.5px] font-medium text-[#334155] leading-4">10 Aug 2027</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] text-[#94a3b8] leading-4">Status</span>
            <span className="px-2 bg-[#d1fae5] rounded-full text-[10px] font-semibold text-[#047857] leading-4">
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="h-px border-t border-[#f1f5f9]"></div>

      {/* Members */}
      <div className="py-3 flex flex-col gap-[6px]">
        <div className="flex items-center gap-2">
          <img src="/icons/users-group-icon.svg" alt="" className="w-4 h-4" />
          <h3 className="text-sm font-semibold text-[#1e293b] leading-4">Members</h3>
        </div>
        <div className="flex items-center gap-2 pt-0.5">
          <img src="/icons/user-check-icon.svg" alt="" className="w-4 h-4" />
          <span className="text-xs font-bold text-[#1e293b] leading-4">78 / 100 used</span>
        </div>
        <div className="h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
          <div className="h-full w-[78%] bg-gradient-to-r from-[#7e22ce] to-[#4f46e5] rounded-full"></div>
        </div>
        <span className="text-[10.5px] text-[#94a3b8] leading-4 pb-[6px]">22 seats available</span>
        <button className="w-full px-[13px] py-[9px] border border-[#e2e8f0] rounded-lg flex items-center justify-center gap-[6px] hover:bg-gray-50">
          <span className="text-xs font-semibold text-[#334155] leading-4">Manage Members</span>
          <img src="/icons/arrow-right-small.svg" alt="" className="w-[8.285px] h-[3.281px]" />
        </button>
      </div>

      {/* Separator */}
      <div className="h-px border-t border-[#f1f5f9]"></div>

      {/* Admin / Contact */}
      <div className="py-3 flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <img src="/icons/user-shield-icon.svg" alt="" className="w-4 h-4" />
          <h3 className="text-sm font-semibold text-[#1e293b] leading-4">Admin / Contact</h3>
        </div>
        <div className="flex gap-2.5 items-start">
          <div className="w-8 h-8 bg-[#f3e8ff] rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-[#7f28bc] leading-4">RD</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-[#1e293b] leading-[13.75px] pb-[0.75px]">Rohan Deshpande</span>
            <span className="text-[10px] text-[#94a3b8] leading-[12.5px]">President</span>
            <span className="text-[11px] text-[#64748b] leading-[13.75px] pt-[3.75px] pb-[0.75px]">rohan@mmnj.org</span>
            <span className="text-[11px] text-[#64748b] leading-[13.75px] pt-px pb-[0.75px]">+1 987 654 3210</span>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="h-px border-t border-[#f1f5f9]"></div>

      {/* Actions */}
      <div className="pt-3 flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <img src="/icons/settings-icon.svg" alt="" className="w-4 h-4" />
          <h3 className="text-sm font-semibold text-[#1e293b] leading-4">Actions</h3>
        </div>
        <div className="flex flex-col gap-2">
          <button className="w-full px-[13px] py-[9px] border border-[#e2e8f0] rounded-lg flex items-center gap-2 hover:bg-gray-50">
            <img src="/icons/receipt-icon.svg" alt="" className="w-4 h-4" />
            <span className="text-xs font-semibold text-[#334155] leading-4">View Orders</span>
          </button>
          <button className="w-full px-[13px] py-[9px] border border-[#e2e8f0] rounded-lg flex items-center gap-2 hover:bg-gray-50">
            <img src="/icons/calendar-up-icon.svg" alt="" className="w-4 h-4" />
            <span className="text-xs font-semibold text-[#334155] leading-4">Extend / Upgrade Plan</span>
          </button>
          <button className="w-full px-[13px] py-[9px] border border-[#e2e8f0] rounded-lg flex items-center gap-2 hover:bg-gray-50">
            <img src="/icons/pause-circle-icon.svg" alt="" className="w-4 h-4" />
            <span className="text-xs font-semibold text-[#334155] leading-4">Suspend Organization</span>
          </button>
          <button className="w-full px-[13px] py-[9px] border border-[#fecaca] rounded-lg flex items-center gap-2 hover:bg-red-50">
            <img src="/icons/trash-red-icon.svg" alt="" className="w-4 h-4" />
            <span className="text-xs font-semibold text-[#dc2626] leading-4">Deactivate Organization</span>
          </button>
        </div>
      </div>
    </div>
  )
}
