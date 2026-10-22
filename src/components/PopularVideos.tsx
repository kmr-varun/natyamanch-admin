import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { analyticsApi } from '../lib/api'

const fmtNum = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n)
const fmtInr = (n: number) => n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : n >= 1000 ? `₹${(n / 1000).toFixed(1)}K` : `₹${n}`

export default function PopularVideos() {
  const [videos, setVideos] = useState<{ id: string; title: string; thumbnail_url?: string; view_count: number; purchase_count: number; revenue: number }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    analyticsApi.topVideos().then(res => { setVideos(res.videos ?? []); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#f1f5f9] p-4 flex flex-col gap-1.5">
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-base font-semibold text-[#1d1b20] leading-8">Popular Videos</h2>
        <Link to="/videos" className="flex items-center gap-0.5 text-[11px] font-bold text-[#7f28bc] tracking-[0.55px] leading-[14px] hover:underline">
          View all
          <img src="/icons/chevron-right.svg" alt="" className="w-[4.933px] h-2" />
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {loading ? (
          <div className="py-8 text-center text-sm text-[#94a3b8]">Loading...</div>
        ) : videos.length === 0 ? (
          <div className="py-8 text-center text-sm text-[#94a3b8]">No videos yet</div>
        ) : (
          videos.slice(0, 5).map(video => (
            <div key={video.id} className="flex gap-3 items-center p-2 border border-[#eaeaea] rounded hover:border-[#7f28bc] transition-colors cursor-pointer">
              <div className="relative w-16 h-10 bg-[#f2ecf4] rounded-sm flex-shrink-0 overflow-hidden">
                {video.thumbnail_url ? (
                  <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-[8px] text-[#94a3b8]">No image</span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-semibold text-[#1d1b20] leading-6 truncate">{video.title}</h3>
                <p className="text-xs font-normal text-[#4c4b4b] leading-4">
                  {fmtNum(video.view_count)} views • {video.purchase_count} sales • {fmtInr(video.revenue)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="pt-4 mt-4 border-t border-[#ece6ee] flex items-center justify-between">
        <span className="text-xs font-semibold text-[#4c4b4b]">
          Top {videos.length} by purchases
        </span>
      </div>
    </div>
  )
}
