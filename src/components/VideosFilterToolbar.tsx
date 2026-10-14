import { useNavigate } from 'react-router-dom'

export default function VideosFilterToolbar() {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-lg shadow-sm h-[84px] flex items-center px-4 justify-between">
      {/* Left Side: Search & Category */}
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative w-80">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
            <img src="/icons/search.svg" alt="" className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search users, videos, orders..."
            className="w-full h-[34px] pl-9 pr-7 bg-white border border-[#e2e8f0] rounded-full text-xs text-[#94a3b8] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#7f28bc] shadow-sm"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-5">
          <span className="text-base font-medium text-black">Category</span>
          <button className="flex items-center justify-between w-[250px] px-5 py-3 bg-white border border-[rgba(17,17,17,0.1)] rounded-md text-xs text-[#8a8a8a] hover:border-[#7f28bc] transition-colors">
            All
            <img src="/icons/dropdown-arrow.svg" alt="" className="w-2 h-1" />
          </button>
        </div>
      </div>

      {/* Right Side: Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Export Button */}
        <button className="flex items-center gap-2 h-10 px-3.5 border border-[#7f28bc] rounded text-xs font-medium text-[#7f28bc] tracking-[0.36px] hover:bg-[#f7ecff] transition-colors">
          <img src="/icons/export-icon.svg" alt="" className="w-3 h-3" />
          Export
        </button>

        {/* Add New Video Button */}
        <button
          onClick={() => navigate('/videos/add')}
          className="flex items-center gap-2 h-10 px-6 bg-[#7f28bc] rounded text-xs font-medium text-white tracking-[0.36px] shadow-[0px_2px_4px_rgba(56,6,43,0.2)] hover:bg-[#6d1fa3] transition-colors"
        >
          <img src="/icons/add-user-icon.svg" alt="" className="w-4 h-3" />
          Add New Video
        </button>
      </div>
    </div>
  )
}
