import { useNavigate } from 'react-router-dom'
import { Button } from './shared'
import { handleFilter, handleExport } from '../utils/mockHandlers'

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
          <button onClick={() => handleFilter.apply('Category', 'All')} className="flex items-center justify-between w-[250px] px-5 py-3 bg-white border border-[rgba(17,17,17,0.1)] rounded-md text-xs text-[#8a8a8a] hover:border-[#7f28bc] transition-colors">
            All
            <img src="/icons/dropdown-arrow.svg" alt="" className="w-2 h-1" />
          </button>
        </div>
      </div>

      {/* Right Side: Action Buttons */}
      <div className="flex items-center gap-2">
        <Button onClick={() => handleExport.csv('Videos')} variant="secondary" icon="/icons/export-icon.svg" className="h-10 px-3.5">
          Export
        </Button>
        <Button onClick={() => navigate('/videos/add')} icon="/icons/add-user-icon.svg" className="h-10 px-6">
          Add New Video
        </Button>
      </div>
    </div>
  )
}
