// Mock data for popular videos
const mockVideos = [
  {
    id: 1,
    thumbnail: '/images/video-thumbnail.png',
    title: 'Bharatanatyam Basics',
    views: '12.4K',
    sales: 892,
    duration: '54m',
  },
  {
    id: 2,
    thumbnail: '/images/video-thumbnail.png',
    title: 'Bharatanatyam Basics',
    views: '12.4K',
    sales: 892,
    duration: '54m',
  },
  {
    id: 3,
    thumbnail: '/images/video-thumbnail.png',
    title: 'Bharatanatyam Basics',
    views: '12.4K',
    sales: 892,
    duration: '54m',
  },
]

export default function PopularVideos() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#f1f5f9] p-4 flex flex-col gap-1.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-base font-semibold text-[#1d1b20] leading-8">
          Popular Videos
        </h2>
        <button className="flex items-center gap-0.5 text-[11px] font-bold text-[#7f28bc] tracking-[0.55px] leading-[14px] hover:underline">
          View all
          <img src="/icons/chevron-right.svg" alt="" className="w-[4.933px] h-2" />
        </button>
      </div>

      {/* Video List */}
      <div className="flex flex-col gap-3">
        {mockVideos.map((video) => (
          <div
            key={video.id}
            className="flex gap-3 items-center p-2 border border-[#eaeaea] rounded hover:border-[#7f28bc] transition-colors cursor-pointer"
          >
            {/* Thumbnail */}
            <div className="relative w-16 h-10 bg-[#f2ecf4] rounded-sm flex-shrink-0 overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              {/* Duration Badge */}
              <div className="absolute bottom-0.5 right-0.5 bg-[rgba(56,56,56,0.85)] px-1 rounded-sm">
                <span className="text-[8px] font-bold text-white leading-3">
                  {video.duration}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-semibold text-[#1d1b20] leading-6 truncate">
                {video.title}
              </h3>
              <p className="text-xs font-normal text-[#4c4b4b] leading-4">
                {video.views} views • {video.sales} sales
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-4 mt-4 border-t border-[#ece6ee] flex items-center justify-between">
        <div className="text-xs font-semibold text-[#4c4b4b]">
          Catalog Health:{' '}
          <span className="text-[#047857]">99.8% Available</span>
        </div>
        <button className="text-xs font-semibold text-[#7f28bc] tracking-[0.55px] leading-[14px] hover:underline">
          Curate List
        </button>
      </div>
    </div>
  )
}
