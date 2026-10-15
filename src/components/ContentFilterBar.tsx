import { handleFilter, handleCRUD } from '../utils/mockHandlers'

export default function ContentFilterBar() {

  return (
    <div className="bg-white shadow-sm rounded-lg px-4 py-[22px] flex items-center gap-[65px]">
      {/* Search and Status Filter */}
      <div className="flex-1 flex items-center gap-4">
        {/* Search Input */}
        <div className="relative w-[320px]">
          <input
            type="text"
            placeholder="Search pages"
            className="w-full h-[34px] pl-9 pr-7 text-xs text-[#94a3b8] bg-white border border-[#e2e8f0] rounded-full shadow-sm"
          />
          <img
            src="/icons/search-icon-gray.svg"
            alt=""
            className="absolute left-[14px] top-1/2 -translate-y-1/2 w-4 h-4"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-5">
          <span className="text-base font-semibold text-black">Status</span>
          <button onClick={() => handleFilter.apply('Status', 'All')} className="w-[97px] bg-white border border-[rgba(17,17,17,0.1)] rounded-md px-5 py-3 flex items-center gap-2.5">
            <span className="flex-1 text-xs font-bold text-[#8a8a8a]">All</span>
            <img src="/icons/dropdown-arrow.svg" alt="" className="w-2 h-1" />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Add Popup Button */}
        <button onClick={() => handleCRUD.create('Popup')} className="h-10 px-[14px] border border-[#7f28bc] rounded flex items-center gap-2">
          <img src="/icons/add-popup-icon.svg" alt="" className="w-3 h-3" />
          <span className="text-xs font-semibold text-[#7f28bc] leading-4 tracking-[0.36px]">Add Popup</span>
        </button>

        {/* Add Page Button */}
        <button onClick={() => handleCRUD.create('Page')} className="w-[151px] h-10 bg-[#7f28bc] shadow-[0px_2px_4px_rgba(56,6,43,0.2)] rounded px-6 flex items-center justify-center gap-2">
          <img src="/icons/add-page-icon.svg" alt="" className="w-[16.5px] h-3" />
          <span className="text-xs font-semibold text-white leading-4 tracking-[0.36px]">Add Page</span>
        </button>
      </div>
    </div>
  )
}
