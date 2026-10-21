import { useNavigate } from 'react-router-dom'
import { Button } from './shared'

interface VideosFilterToolbarProps {
  onSearch: (q: string) => void
  onStatusFilter: (s: string) => void
  status: string
}

export default function VideosFilterToolbar({ onSearch, onStatusFilter, status }: VideosFilterToolbarProps) {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-lg shadow-sm h-[84px] flex items-center px-4 justify-between">
      <div className="flex items-center gap-4">
        <div className="relative w-80">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
            <img src="/icons/search.svg" alt="" className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search videos by title or slug..."
            onChange={e => onSearch(e.target.value)}
            className="w-full h-[34px] pl-9 pr-7 bg-white border border-[#e2e8f0] rounded-full text-xs text-[#94a3b8] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#7f28bc] shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          {(['', 'published', 'draft'] as const).map(s => (
            <button
              key={s}
              onClick={() => onStatusFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                status === s
                  ? 'bg-[#7f28bc] text-white'
                  : 'bg-white border border-[#e2e8f0] text-[#64748b] hover:border-[#7f28bc]'
              }`}
            >
              {s === '' ? 'All' : s === 'published' ? 'Published' : 'Draft'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={() => navigate('/videos/add')} icon="/icons/add-user-icon.svg" className="h-10 px-6">
          Add New Video
        </Button>
      </div>
    </div>
  )
}
