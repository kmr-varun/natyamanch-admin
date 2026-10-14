export default function ContentPagesTable() {
  const pages = Array(10).fill({
    id: '01',
    title: 'Home',
    subtitle: 'Main landing page',
    slug: '/',
    date: '12 Sep 2025',
    time: '10:30 AM',
    status: 'Published',
  })

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm overflow-hidden p-px">
      {/* Tabs */}
      <div className="border-b border-[#e2e8f0] px-5 pt-3 pb-px flex items-center gap-6">
        <button className="pb-[14px] border-b-2 border-[#7f28bc] text-sm font-semibold text-[#7f28bc] leading-4">
          Pages (18)
        </button>
        <button className="pb-[14px] text-sm font-semibold text-[#64748b] leading-4">
          Popups (6)
        </button>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        {/* Header */}
        <div className="bg-[rgba(248,250,252,0.75)] border-b border-[#e2e8f0] flex items-start">
          <div className="w-[71px] px-3 py-3 flex items-center justify-center">
            <input type="checkbox" className="w-[14px] h-[14px] border border-[#cbd5e1] rounded" />
          </div>
          <div className="w-[70px] px-3 py-3 flex items-center justify-center">
            <span className="text-xs font-bold text-[#2e2e2e] leading-4">#</span>
          </div>
          <div className="w-[163px] px-3 py-3 flex items-start">
            <span className="text-xs font-semibold text-[#2e2e2e] leading-4">Page Title</span>
          </div>
          <div className="flex-1 px-3 py-3 flex items-center">
            <span className="text-xs font-semibold text-[#2e2e2e] leading-4">URL / Slug</span>
          </div>
          <div className="flex-1 px-3 py-3 flex items-center justify-center">
            <span className="text-xs font-semibold text-[#2e2e2e] leading-4">Last Updated</span>
          </div>
          <div className="flex-1 px-3 py-3 flex items-center justify-center">
            <span className="text-xs font-semibold text-[#2e2e2e] leading-4">Status</span>
          </div>
          <div className="flex-1 px-3 py-3 flex items-center justify-end">
            <span className="text-xs font-semibold text-[#2e2e2e] leading-4">Actions</span>
          </div>
        </div>

        {/* Body */}
        {pages.map((page, idx) => (
          <div key={idx} className="bg-[rgba(250,245,255,0.3)] flex items-center h-[72px]">
            <div className="w-[71px] px-3 flex items-center justify-center">
              <input type="checkbox" className="w-[14px] h-[14px] border border-[#cbd5e1] rounded" />
            </div>
            <div className="w-[70px] px-2 flex items-center justify-center">
              <span className="text-xs text-[#94a3b8] leading-4">{page.id}</span>
            </div>
            <div className="w-[163px] flex items-center gap-3 pr-3">
              <img src="/images/page-thumbnail.png" alt="" className="w-11 h-11 rounded flex-shrink-0 object-cover" />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-[#0f172a] leading-[15px]">{page.title}</span>
                <span className="text-[11px] text-[#94a3b8] leading-4">{page.subtitle}</span>
              </div>
            </div>
            <div className="flex-1 pl-7 pr-3">
              <span className="text-[11px] text-[#64748b] leading-4 font-mono">{page.slug}</span>
            </div>
            <div className="flex-1 px-3 flex flex-col items-center">
              <span className="text-[11px] font-medium text-[#334155] leading-[13.75px]">{page.date}</span>
              <span className="text-[11px] text-[#94a3b8] leading-[13.75px]">{page.time}</span>
            </div>
            <div className="flex-1 px-3 flex items-center justify-center">
              <span className="px-2.5 py-0.5 bg-[#ecfdf5] border border-[#a7f3d0] rounded-full text-[10px] font-semibold text-[#047857] leading-4">
                {page.status}
              </span>
            </div>
            <div className="flex-1 px-4 flex items-center justify-end gap-[6px]">
              <button className="bg-white border border-[#e2e8f0] rounded-md px-[11px] py-[5px] flex items-center gap-1">
                <img src="/icons/edit-pencil-icon.svg" alt="" className="w-3 h-3" />
                <span className="text-[11px] font-medium text-[#334155] leading-4">Edit</span>
              </button>
              <button className="p-1 rounded">
                <img src="/icons/three-dots-icon.svg" alt="" className="w-[14px] h-[14px]" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="border-t border-[#e2e8f0] px-4 py-[16.5px] flex items-center justify-between">
        <span className="text-xs text-[#64748b] leading-4">Showing 1 to 10 of 18 pages</span>
        <div className="flex items-center gap-1">
          <button className="w-7 h-7 border border-[#e2e8f0] rounded flex items-center justify-center p-px">
            <img src="/icons/chevron-left-small.svg" alt="" className="w-[14px] h-[14px]" />
          </button>
          <button className="w-7 h-7 bg-[#7f28bc] rounded flex items-center justify-center text-xs font-semibold text-white leading-4">
            1
          </button>
          <button className="w-7 h-7 border border-[#e2e8f0] rounded flex items-center justify-center text-xs text-[#475569] leading-4">
            2
          </button>
          <button className="w-7 h-7 border border-[#e2e8f0] rounded flex items-center justify-center p-px">
            <img src="/icons/chevron-right-small.svg" alt="" className="w-[14px] h-[14px]" />
          </button>
        </div>
      </div>
    </div>
  )
}
