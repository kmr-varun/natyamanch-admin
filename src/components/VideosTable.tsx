import { useState } from 'react'
import { handlePagination } from '../utils/mockHandlers'
import { ActionMenu, DeleteConfirmModal } from './shared'
import ViewVideoModal from './ViewVideoModal'

interface Video {
  id: number
  title: string
  thumbnail: string
  duration: string
  views: string
  tag: string
  category: string
  price: string
  dateUploaded: string
  status: 'Published' | 'Draft'
}

const initialVideos: Video[] = [
  {
    id: 1,
    title: 'Odissi Dance Introduction',
    thumbnail: '/images/video-thumb.png',
    duration: '31:26',
    views: '7.1k',
    tag: 'Mangalacharan',
    category: 'Classical Dance',
    price: '$3,900',
    dateUploaded: 'Sep 15, 2026',
    status: 'Published',
  },
  {
    id: 2,
    title: 'Bharatanatyam Fundamentals',
    thumbnail: '/images/video-thumb.png',
    duration: '45:12',
    views: '5.2k',
    tag: 'Adavu',
    category: 'Classical Dance',
    price: '$2,500',
    dateUploaded: 'Sep 14, 2026',
    status: 'Published',
  },
  {
    id: 3,
    title: 'Kathak Workshop',
    thumbnail: '/images/video-thumb.png',
    duration: '28:45',
    views: '8.3k',
    tag: 'Chakkar',
    category: 'Classical Dance',
    price: '$3,200',
    dateUploaded: 'Sep 13, 2026',
    status: 'Published',
  },
  {
    id: 4,
    title: 'Kuchipudi Basics',
    thumbnail: '/images/video-thumb.png',
    duration: '35:20',
    views: '4.8k',
    tag: 'Tarangam',
    category: 'Classical Dance',
    price: '$2,800',
    dateUploaded: 'Sep 12, 2026',
    status: 'Published',
  },
  {
    id: 5,
    title: 'Mohiniyattam Introduction',
    thumbnail: '/images/video-thumb.png',
    duration: '40:15',
    views: '6.5k',
    tag: 'Lasya',
    category: 'Classical Dance',
    price: '$3,500',
    dateUploaded: 'Sep 11, 2026',
    status: 'Published',
  },
]

export default function VideosTable() {
  const [videos, setVideos] = useState<Video[]>(initialVideos)
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [videoToDelete, setVideoToDelete] = useState<Video | null>(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [videoToView, setVideoToView] = useState<Video | null>(null)

  const handleEdit = (video: Video) => {
    console.log('Edit video:', video)
    alert(`Edit video: ${video.title}\n\nIn production, this would navigate to /videos/edit/${video.id} with the video data pre-filled.`)
  }

  const handleView = (video: Video) => {
    setVideoToView(video)
    setViewModalOpen(true)
    setOpenMenuId(null)
  }

  const handleDeleteClick = (video: Video) => {
    setVideoToDelete(video)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (videoToDelete) {
      setVideos(videos.filter(v => v.id !== videoToDelete.id))
      console.log('Deleted video:', videoToDelete)
      setVideoToDelete(null)
    }
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-[#e6e6e6]">
        {/* Header */}
        <div className="bg-[rgba(248,242,250,0.6)] border-b border-[#f2ecf4] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-base font-bold text-[#1d1b20] leading-6">Videos</h2>
            <span className="text-base text-[#d4c2ca]">•</span>
            <span className="text-xs font-normal text-[#2e2e2e]">
              Showing <span className="text-[#1d1b20]">1–{videos.length}</span> of{' '}
              <span className="text-[#1d1b20]">{videos.length}</span> videos
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-normal text-[#2e2e2e]">Show:</span>
            <div className="pl-3 pr-6 py-1 bg-white border border-[#f2ecf4] rounded-sm shadow-sm">
              <span className="text-[11px] font-bold text-[#1d1b20] tracking-[0.55px]">10 per page</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f7ecff] border-b border-[#f2ecf4]">
                <th className="w-24 px-6 py-5">
                  <input type="checkbox" className="w-4 h-4 border border-[#767676] rounded-sm" />
                </th>
                <th className="px-4 py-5 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-center min-w-[336px]">
                  Video
                </th>
                <th className="px-4 py-5 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-center">
                  Category
                </th>
                <th className="px-4 py-3 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-center">
                  Price
                </th>
                <th className="px-4 py-3 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-center">
                  Date Uploaded
                </th>
                <th className="px-4 py-5 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-center">
                  Status
                </th>
                <th className="px-6 py-5 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <tr key={video.id} className="border-b border-[#f8f2fa]">
                  <td className="px-6 py-5.5">
                    <input type="checkbox" className="w-4 h-4 border border-[#767676] rounded-sm" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {/* Thumbnail */}
                      <div className="relative w-[92px] h-[52px] bg-[#ece6ee] rounded flex-shrink-0 overflow-hidden">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        {/* Duration Badge */}
                        <div className="absolute bottom-1 right-1 bg-[rgba(0,0,0,0.8)] px-1.5 py-0.5 rounded-sm">
                          <span className="text-[10px] text-white tracking-[-0.25px] leading-[10px]">
                            {video.duration}
                          </span>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex flex-col">
                        <h3 className="text-sm font-semibold text-[#1d1b20] tracking-[-0.4px] leading-6">
                          {video.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-[#7a7a7a] tracking-[0.55px] leading-[14px]">
                          <div className="flex items-center gap-0.5">
                            <img src="/icons/play-icon.svg" alt="" className="w-3 h-2" />
                            <span>{video.views}</span>
                          </div>
                          <span className="text-[10px] leading-5">•</span>
                          <span>{video.tag}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-7 text-center">
                    <span className="inline-flex px-2.5 py-1 bg-[#ece6ee] text-[#7f28bc] text-[11px] font-medium tracking-[0.55px] leading-[14px] rounded-md">
                      {video.category}
                    </span>
                  </td>
                  <td className="px-2 py-7 text-sm font-semibold text-[#1d1b20] text-center leading-5">
                    {video.price}
                  </td>
                  <td className="px-4 py-7.5 text-[11px] font-semibold text-[#2e2e2e] text-center tracking-[0.55px] leading-[14px]">
                    {video.dateUploaded}
                  </td>
                  <td className="px-2 py-7 text-center">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#ecfdf5] rounded-xl">
                      <div className="w-1.5 h-1.5 bg-[#10b981] rounded-full" />
                      <span className="text-[11px] font-medium text-[#047857] tracking-[0.55px] leading-[14px]">
                        {video.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5.5 text-center">
                    <div className="relative inline-block">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === video.id ? null : video.id)}
                        className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors rotate-90"
                      >
                        <img src="/icons/dots-vertical.svg" alt="Actions" className="w-1 h-3" />
                      </button>
                      <ActionMenu
                        isOpen={openMenuId === video.id}
                        onClose={() => setOpenMenuId(null)}
                        options={[
                          {
                            label: 'View Video',
                            onClick: () => handleView(video),
                          },
                          {
                            label: 'Edit Video',
                            onClick: () => handleEdit(video),
                          },
                          {
                            label: 'Delete',
                            onClick: () => handleDeleteClick(video),
                            className: 'text-[#ef4444] hover:bg-[#fef2f2]',
                          },
                        ]}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer with Pagination */}
        <div className="bg-[rgba(248,242,250,0.6)] border-t border-[#f2ecf4] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs">
            <span className="text-[#2e2e2e]">Showing</span>
            <span className="font-semibold text-[#1d1b20]">1–{videos.length}</span>
            <span className="text-[#2e2e2e]">of</span>
            <span className="font-semibold text-[#1d1b20]">{videos.length}</span>
            <span className="text-[#696969]">videos</span>
            <span className="px-2 text-[#7a7a7a]">|</span>
            <span className="text-[#2e2e2e]">Rows per page:</span>
            <div className="px-3 py-1 bg-[#f8f2fa] rounded-md">
              <span className="text-[11px] font-bold text-[#1d1b20] tracking-[0.55px]">10</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePagination.previous}
              className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium text-[#585858] tracking-[0.36px] hover:bg-white transition-colors"
            >
              <img src="/icons/chevron-left.svg" alt="" className="w-[4.933px] h-2" />
              Previous
            </button>

            <button
              onClick={() => handlePagination.goToPage(1)}
              className="w-8 h-8 flex items-center justify-center bg-[#7f28bc] text-white text-xs font-semibold tracking-[0.36px] rounded shadow-sm"
            >
              1
            </button>
            <button
              onClick={() => handlePagination.goToPage(2)}
              className="w-8 h-8 flex items-center justify-center text-[#585858] text-xs font-semibold tracking-[0.36px] rounded hover:bg-white transition-colors"
            >
              2
            </button>
            <button
              onClick={() => handlePagination.goToPage(3)}
              className="w-8 h-8 flex items-center justify-center text-[#585858] text-xs font-semibold tracking-[0.36px] rounded hover:bg-white transition-colors"
            >
              3
            </button>
            <button
              onClick={() => handlePagination.goToPage(4)}
              className="w-8 h-8 flex items-center justify-center text-[#585858] text-xs font-semibold tracking-[0.36px] rounded hover:bg-white transition-colors"
            >
              4
            </button>
            <button
              onClick={() => handlePagination.goToPage(5)}
              className="w-8 h-8 flex items-center justify-center text-[#585858] text-xs font-semibold tracking-[0.36px] rounded hover:bg-white transition-colors"
            >
              5
            </button>

            <button
              onClick={handlePagination.next}
              className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium text-[#585858] tracking-[0.36px] hover:bg-white transition-colors"
            >
              Next
              <img src="/icons/chevron-right-small.svg" alt="" className="w-[4.933px] h-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setVideoToDelete(null)
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Video"
        message="Are you sure you want to delete"
        itemName={videoToDelete?.title || ''}
      />

      {/* View Video Modal */}
      <ViewVideoModal
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false)
          setVideoToView(null)
        }}
        data={videoToView}
      />
    </>
  )
}
