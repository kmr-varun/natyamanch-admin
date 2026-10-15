import { handleModal, handleCRUD } from '../utils/mockHandlers'

export default function OrderDetailsPanel() {

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl p-[21px] flex flex-col gap-5">
      {/* Header */}
      <div className="border-b border-[#f1f5f9] pb-[13px] flex items-center justify-between pr-[0.01px]">
        <h2 className="text-sm font-bold text-[#0f172a] leading-5">Order Details</h2>
        <button onClick={() => handleModal.close()} className="w-4 h-4">
          <img src="/icons/close-x-icon.svg" alt="" className="w-full h-full" />
        </button>
      </div>

      {/* Order ID & Status */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col pb-[1.5px]">
          <span className="text-[10px] font-semibold text-[#94a3b8] leading-[15px] tracking-[0.5px] uppercase">ORDER ID</span>
          <span className="text-sm font-semibold text-[#0f172a] leading-[17.5px] pb-[5.5px]">#NM000512</span>
          <span className="text-[11px] text-[#94a3b8] leading-[16.5px]">12 Aug 2025, 10:32 AM</span>
        </div>
        <div className="pt-0.5">
          <span className="px-2.5 py-1 bg-[#d1fae5] rounded-full text-[11px] font-semibold text-[#047857] leading-[16.5px]">
            Completed
          </span>
        </div>
      </div>

      {/* Customer Information */}
      <div className="border-t border-[#f1f5f9] pt-[9px] flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-[#0f172a] leading-4">Customer Information</h3>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#f3e8ff] rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-[#7e22ce] leading-4">RS</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#1e293b] leading-4">Rohan Deshpande</span>
            <span className="text-[11px] text-[#94a3b8] leading-4">rohan@example.com</span>
            <span className="text-[11px] font-medium text-[#64748b] leading-4">+91 98765 43210</span>
          </div>
        </div>
      </div>

      {/* Purchase Details */}
      <div className="border-t border-[#f1f5f9] pt-[9px] flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-[#0f172a] leading-4">Purchase Details</h3>
        <div className="flex gap-3 items-start">
          <div className="w-[87px] h-[92px] bg-gradient-to-t from-[#450a0a] to-[#78350f] border border-[#451a03] rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-[10px] font-bold text-[#fde68a] leading-[12.5px] text-center">Hello<br/>Inspector</span>
          </div>
          <div className="flex flex-col gap-0.5 flex-1">
            <span className="text-xs font-semibold text-[#0f172a] leading-4">Hello Inspector</span>
            <span className="text-[11px] text-[#94a3b8] leading-[16.5px]">Type: <span className="text-[#64748b]">Individual Purchase</span></span>
            <span className="text-[11px] text-[#94a3b8] leading-[16.5px]">Language: <span className="text-[#64748b]">Marathi</span></span>
            <span className="text-[11px] text-[#94a3b8] leading-[16.5px]">Duration: <span className="text-[#64748b]">2h 15m</span></span>
            <span className="text-[11px] text-[#94a3b8] leading-[16.5px]">Access: <span className="text-[#64748b]">48 hours from purchase</span></span>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="border-t border-[#f1f5f9] pt-[9px] flex flex-col gap-[6px]">
        <h3 className="text-sm font-semibold text-[#0f172a] leading-4">Payment Information</h3>
        <div className="flex items-center justify-between pt-0.5">
          <span className="text-[11px] text-[#94a3b8] leading-4">Amount</span>
          <span className="text-xs font-bold text-[#0f172a] leading-4">₹149</span>
        </div>
        <div className="flex items-center justify-between pr-[0.01px]">
          <span className="text-[11px] text-[#94a3b8] leading-4">Payment Method</span>
          <span className="text-[11px] font-medium text-[#334155] leading-4">Razorpay (UPI)</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[#94a3b8] leading-4">Transaction ID</span>
          <span className="text-[10px] text-[#475569] leading-4 font-mono">pay_NM1234567890</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[#94a3b8] leading-4">Payment Status</span>
          <span className="text-[11px] font-semibold text-[#059669] leading-4">Completed</span>
        </div>
        <div className="flex items-center justify-between pr-[0.01px] pt-1">
          <span className="text-[11px] text-[#94a3b8] leading-4">Invoice</span>
          <div className="flex items-center gap-1">
            <img src="/icons/download-small-icon.svg" alt="" className="w-[14px] h-[14px]" />
            <span className="text-[11px] font-semibold text-[#7f28bc] leading-4">Download Invoice</span>
          </div>
        </div>
      </div>

      {/* Access Information */}
      <div className="border-t border-[#f1f5f9] pt-[9px] pb-2 flex flex-col gap-[6px]">
        <h3 className="text-sm font-semibold text-[#0f172a] leading-4">Access Information</h3>
        <div className="flex items-center justify-between pr-[0.01px] pt-0.5">
          <span className="text-[11px] text-[#94a3b8] leading-[16.5px]">Purchase Date</span>
          <span className="text-[11px] font-medium text-[#334155] leading-[16.5px]">12 Aug 2025, 10:32 AM</span>
        </div>
        <div className="flex items-center justify-between pr-[0.01px]">
          <span className="text-[11px] text-[#94a3b8] leading-[16.5px]">Access Expires</span>
          <span className="text-[11px] font-medium text-[#334155] leading-[16.5px]">14 Aug 2025, 10:32 AM</span>
        </div>
        <div className="flex items-center justify-between pr-[0.01px]">
          <span className="text-[11px] text-[#94a3b8] leading-[16.5px]">Time Remaining</span>
          <span className="text-[11px] font-bold text-[#059669] leading-[16.5px]">36h 20m</span>
        </div>
      </div>

      {/* View User Profile Button */}
      <button onClick={() => handleCRUD.read('User Profile')} className="bg-[#7f28bc] rounded-lg px-4 py-2.5 flex items-center justify-center gap-2 hover:bg-[#6d1fa3]">
        <img src="/icons/user-profile-icon.svg" alt="" className="w-4 h-4" />
        <span className="text-xs font-semibold text-white leading-4">View User Profile</span>
      </button>
    </div>
  )
}