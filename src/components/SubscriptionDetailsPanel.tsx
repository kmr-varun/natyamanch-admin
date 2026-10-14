export default function SubscriptionDetailsPanel() {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl p-[21px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#f1f5f9]">
        <h2 className="text-sm font-semibold text-[#0f172a] leading-5">Subscription Details</h2>
        <button className="p-1">
          <img src="/icons/close-x-icon.svg" alt="" className="w-4 h-4" />
        </button>
      </div>

      {/* User Profile */}
      <div className="flex items-center justify-between py-4 border-b border-[#f1f5f9]">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-[#f3e8ff] rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-[#6b21a8] leading-5">PK</span>
          </div>
          <div>
            <p className="text-xs font-bold text-[#0f172a] leading-4 mb-px">Priya Kulkarni</p>
            <p className="text-[11px] text-[#94a3b8] leading-[13.75px] pb-[0.75px]">priya@mmnj.org</p>
            <p className="text-[11px] text-[#94a3b8] leading-[16.5px] pt-[3px]">+91 98987 65432</p>
          </div>
        </div>
        <button className="px-[11px] py-[5px] border border-[#7f28bc] rounded-md flex items-center gap-1 text-xs font-semibold text-[#7f28bc] leading-[16.5px] hover:bg-[#faf5ff]">
          View User
          <img src="/icons/external-link-small.svg" alt="" className="w-3 h-3" />
        </button>
      </div>

      {/* Organization Section */}
      <div className="flex flex-col gap-2 py-[14px] border-b border-[#f1f5f9]">
        <h3 className="text-xs font-semibold text-[#333] leading-[16.5px] tracking-[0.55px] uppercase">ORGANIZATION</h3>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#faf5ff] rounded-lg flex items-center justify-center">
            <img src="/icons/building-icon.svg" alt="" className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#0f172a] leading-4 mb-[-1px]">Pune Marathi Mandal</p>
            <p className="text-[11px] text-[#94a3b8] leading-[13.75px] pb-[0.75px]">India</p>
          </div>
        </div>
      </div>

      {/* Plan Details Section */}
      <div className="flex flex-col gap-2.5 py-[14px] border-b border-[#f1f5f9]">
        <h3 className="text-xs font-semibold text-[#333] leading-4 tracking-[0.55px] uppercase">PLAN DETAILS</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between">
            <span className="text-xs text-[#64748b] leading-4">Plan Name</span>
            <span className="text-xs font-bold text-[#0f172a] leading-4">100 Account Plan</span>
          </div>
          <div className="flex items-start justify-between">
            <span className="text-xs text-[#64748b] leading-4">Plan Type</span>
            <span className="text-xs font-medium text-[#1e293b] leading-4">Mandal / Organization</span>
          </div>
          <div className="flex items-start justify-between">
            <span className="text-xs text-[#64748b] leading-4">Price</span>
            <span className="text-xs font-bold text-[#0f172a] leading-4">₹14,999 / year</span>
          </div>
          <div className="flex items-start justify-between">
            <span className="text-xs text-[#64748b] leading-4">Start Date</span>
            <span className="text-xs font-medium text-[#1e293b] leading-4">10 Aug 2025</span>
          </div>
          <div className="flex items-start justify-between">
            <span className="text-xs text-[#64748b] leading-4">End Date</span>
            <span className="text-xs font-medium text-[#1e293b] leading-4">10 Aug 2027</span>
          </div>
          <div className="flex items-center justify-between pt-0.5">
            <span className="text-xs text-[#64748b] leading-4">Status</span>
            <span className="px-2 py-0.5 bg-[#ecfdf5] rounded-full text-[10px] font-semibold text-[#059669] leading-4">
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Payment Information Section */}
      <div className="flex flex-col gap-2.5 py-[14px] border-b border-[#f1f5f9]">
        <h3 className="text-xs font-semibold text-[#333] leading-4 tracking-[0.55px] uppercase">PAYMENT INFORMATION</h3>
        <div className="flex flex-col gap-[7.5px]">
          <div className="flex items-start justify-between">
            <span className="text-xs text-[#64748b] leading-4">Payment Method</span>
            <span className="text-xs font-medium text-[#1e293b] leading-4">Stripe</span>
          </div>
          <div className="flex items-start justify-between">
            <span className="text-xs text-[#64748b] leading-4">Transaction ID</span>
            <span className="text-[11px] text-[#334155] font-mono leading-4">pi_3N...7H2</span>
          </div>
          <div className="flex items-start justify-between">
            <span className="text-xs text-[#64748b] leading-4">Payment Date</span>
            <span className="text-xs font-medium text-[#1e293b] leading-4">10 Aug 2025, 04:20 PM</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#64748b] leading-4">Invoice</span>
            <a href="#" className="flex items-center gap-1 text-xs font-medium text-[#5e17eb] leading-4 hover:underline">
              <img src="/icons/download-icon.svg" alt="" className="w-[14px] h-[14px]" />
              Download Invoice
            </a>
          </div>
        </div>
      </div>

      {/* Usage Section */}
      <div className="flex flex-col gap-2.5 py-[14px] border-b border-[#f1f5f9]">
        <h3 className="text-xs font-semibold text-[#333] leading-4 tracking-[0.55px] uppercase">USAGE</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between">
            <span className="text-xs text-[#64748b] leading-4">Total Seats</span>
            <span className="text-xs font-bold text-[#0f172a] leading-4">100</span>
          </div>
          <div className="flex items-start justify-between">
            <span className="text-xs text-[#64748b] leading-4">Active Members</span>
            <span className="text-xs font-bold text-[#0f172a] leading-4">78</span>
          </div>
          <div className="flex items-start justify-between">
            <span className="text-xs text-[#64748b] leading-4">Available Seats</span>
            <span className="text-xs font-bold text-[#0f172a] leading-4">22</span>
          </div>
        </div>
        <button className="w-full px-[13px] py-[9px] border border-[#e2e8f0] rounded-lg text-xs font-semibold text-[#334155] leading-4 hover:bg-gray-50">
          Manage Members
        </button>
      </div>

      {/* Actions Section */}
      <div className="flex flex-col gap-2 pt-[14px]">
        <h3 className="text-xs font-semibold text-[#333] leading-[16.5px] tracking-[0.55px] uppercase">ACTIONS</h3>
        <button className="w-full flex items-center gap-2.5 px-[13px] py-2 border border-[#e2e8f0] rounded-lg text-xs font-semibold text-[#334155] leading-4 hover:bg-gray-50">
          <img src="/icons/calendar-extend-icon.svg" alt="" className="w-[15px] h-[14.222px]" />
          Extend Subscription
        </button>
        <button className="w-full flex items-center gap-2.5 px-[13px] py-2 border border-[#e2e8f0] rounded-lg text-xs font-semibold text-[#334155] leading-4 hover:bg-gray-50">
          <img src="/icons/refresh-icon.svg" alt="" className="w-4 h-4" />
          Change Plan
        </button>
        <button className="w-full flex items-center gap-2.5 px-[13px] py-2 bg-[rgba(255,241,242,0.5)] border border-[#fecdd3] rounded-lg text-xs font-semibold text-[#e11d48] leading-4 hover:bg-[#fff1f2]">
          <img src="/icons/trash-icon.svg" alt="" className="w-4 h-4" />
          Cancel Subscription
        </button>
      </div>
    </div>
  )
}
