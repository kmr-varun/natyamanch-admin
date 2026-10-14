export default function OrdersTable() {
  const orders = Array(5).fill({
    id: '#NM000512',
    user: { name: 'Priya Kulkarni', email: 'priya@mmnj.org', initials: 'PK' },
    type: 'Individual',
    item: { title: 'Hello Inspector', subtitle: 'Video Purchase', badge: 'Hello' },
    amount: '₹149',
    date: { date: '12 Aug 2025', time: '10:32 AM' },
    status: 'Completed',
    payment: 'Razorpay',
  })

  return (
    <div className="flex flex-col gap-4">
      {/* Tabs */}
      <div className="border-b border-[#e2e8f0]">
        <div className="flex items-start gap-7 px-5 pt-[14px] pb-px">
          <button className="pb-[14px] border-b-2 border-[#7e22ce] text-sm font-semibold text-[#7e22ce] leading-4">
            All Purchases (28)
          </button>
          <button className="pb-[13.5px] pt-0.5 text-sm font-semibold text-[#64748b] leading-4">
            Individual Purchases (438)
          </button>
          <button className="pb-[13.5px] pt-0.5 text-sm font-semibold text-[#64748b] leading-4">
            Mandal Subscriptions (74)
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden p-px">
        {/* Table Header */}
        <div className="bg-[rgba(248,250,252,0.75)] border-b border-[#e2e8f0] flex items-start">
          <div className="w-[26px] px-3 py-5 flex items-center justify-center">
            <input type="checkbox" className="w-4 h-4 border border-[#cbd5e1] rounded" />
          </div>
          <div className="w-[86px] px-2 py-5 flex items-center justify-center">
            <span className="text-[11px] font-bold text-[#64748b] leading-4 tracking-[0.55px] uppercase">ORDER ID</span>
          </div>
          <div className="w-[131px] px-3 py-5 flex items-center justify-center">
            <span className="text-[11px] font-bold text-[#64748b] leading-4 tracking-[0.55px] uppercase">USER</span>
          </div>
          <div className="flex-1 px-2 py-5 flex items-center justify-center">
            <span className="text-[11px] font-bold text-[#64748b] leading-4 tracking-[0.55px] uppercase">TYPE</span>
          </div>
          <div className="w-[109px] px-3 py-5 flex items-center justify-center">
            <span className="text-[11px] font-bold text-[#64748b] leading-4 tracking-[0.55px] uppercase">ITEM / PLAN</span>
          </div>
          <div className="w-[70px] px-2 py-5 flex items-center justify-center">
            <span className="text-[11px] font-bold text-[#64748b] leading-4 tracking-[0.55px] uppercase">AMOUNT</span>
          </div>
          <div className="flex-1 px-2 py-5 flex items-center justify-center">
            <span className="text-[11px] font-bold text-[#64748b] leading-4 tracking-[0.55px] uppercase">DATE</span>
          </div>
          <div className="flex-1 px-2 py-5 flex items-center justify-center">
            <span className="text-[11px] font-bold text-[#64748b] leading-4 tracking-[0.55px] uppercase">STATUS</span>
          </div>
          <div className="flex-1 px-2 py-3 flex items-center justify-center">
            <span className="text-[11px] font-bold text-[#64748b] leading-4 tracking-[0.55px] uppercase text-center">PAYMENT<br/>METHOD</span>
          </div>
          <div className="w-[51px] px-2 py-5 flex items-center justify-center">
            <span className="text-[11px] font-bold text-[#64748b] leading-4 tracking-[0.55px] uppercase text-center">ACTIONS</span>
          </div>
        </div>

        {/* Table Body */}
        {orders.map((order, idx) => (
          <div key={idx} className="bg-[rgba(250,245,255,0.4)] flex items-center h-[93px]">
            <div className="w-[26px] px-3 flex items-center justify-center">
              <div className="w-[18px] h-[18px] bg-[#9333ea] border border-transparent rounded p-px flex items-center justify-center">
                <img src="/icons/checkbox-checked.svg" alt="" className="w-4 h-4" />
              </div>
            </div>
            <div className="w-[86px] px-2 flex items-center">
              <span className="text-xs font-medium text-[#0f172a] leading-4">{order.id}</span>
            </div>
            <div className="w-[131px] flex items-center gap-2">
              <div className="w-7 h-7 bg-[#f3e8ff] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[10px] font-semibold text-[#7e22ce] leading-4">{order.user.initials}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#0f172a] leading-[15px]">{order.user.name}</span>
                <span className="text-[10px] text-[#94a3b8] leading-[12.5px]">{order.user.email}</span>
              </div>
            </div>
            <div className="flex-1 px-2 flex items-center justify-center">
              <span className="px-2 py-0.5 bg-[#eff6ff] rounded text-[10px] font-medium text-[#2563eb] leading-4">{order.type}</span>
            </div>
            <div className="w-[109px] pl-3 flex items-center gap-2">
              <div className="w-7 h-7 bg-gradient-to-t from-[#450a0a] to-[#78350f] border border-[#451a03] rounded flex items-center justify-center flex-shrink-0">
                <span className="text-[8px] font-bold text-[#fde68a] leading-4">{order.item.badge}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-[#0f172a] leading-[15px]">{order.item.title}</span>
                <span className="text-[10px] text-[#94a3b8] leading-[12.5px]">{order.item.subtitle}</span>
              </div>
            </div>
            <div className="w-[70px] px-2 flex items-center justify-center">
              <span className="text-xs font-semibold text-[#0f172a] leading-4">{order.amount}</span>
            </div>
            <div className="flex-1 px-2 flex items-center justify-center">
              <div className="text-[11px] text-[#475569] leading-[13.75px] text-center">
                {order.date.date}<br/><span className="text-[#94a3b8]">{order.date.time}</span>
              </div>
            </div>
            <div className="flex-1 px-2 flex items-center justify-center">
              <span className="px-2 py-0.5 bg-[#d1fae5] rounded-full text-[10px] font-semibold text-[#047857] leading-4">{order.status}</span>
            </div>
            <div className="flex-1 px-2 flex items-center justify-center">
              <span className="text-xs text-[#475569] leading-4">{order.payment}</span>
            </div>
            <div className="w-[51px] px-2 flex items-center justify-center">
              <button className="p-1">
                <img src="/icons/three-dots-icon.svg" alt="" className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {/* Pagination */}
        <div className="border-t border-[#f1f5f9] px-3 py-[12.5px] flex items-center justify-between">
          <span className="text-xs text-[#64748b] leading-4">Showing 1 to 10 of 512 orders</span>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 border border-[#e2e8f0] rounded flex items-center justify-center p-px hover:bg-gray-50">
              <img src="/icons/chevron-left-small.svg" alt="" className="w-[14px] h-[14px]" />
            </button>
            <button className="w-7 h-7 bg-[#7f28bc] rounded flex items-center justify-center text-xs font-semibold text-white leading-4">1</button>
            <button className="w-7 h-7 rounded flex items-center justify-center text-xs text-[#475569] leading-4">2</button>
            <button className="w-7 h-7 rounded flex items-center justify-center text-xs text-[#475569] leading-4">3</button>
            <button className="w-7 h-7 rounded flex items-center justify-center text-xs text-[#475569] leading-4">4</button>
            <button className="w-7 h-7 rounded flex items-center justify-center text-xs text-[#475569] leading-4">5</button>
            <button className="w-7 h-7 border border-[#e2e8f0] rounded flex items-center justify-center p-px hover:bg-gray-50">
              <img src="/icons/chevron-right-small.svg" alt="" className="w-[14px] h-[14px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}