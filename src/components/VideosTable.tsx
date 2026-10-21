import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ActionMenu, DeleteConfirmModal } from './shared'
import ViewVideoModal from './ViewVideoModal'
import type { AdminVideo, Pagination } from '../lib/api'

interface VideosTableProps {
  videos: AdminVideo[]
  loading: boolean
  pagination: Pagination
  onPageChange: (page: number) => void
  onPublishToggle: (video: AdminVideo) => void
  onDelete: (video: AdminVideo) => void
  onRefresh: () => void
}

const CF_SUBDOMAIN = 'customer-w1lqmmjxo1pu5rut'

function getThumbnail(video: AdminVideo): string | null {
  if (video.thumbnail_url) return video.thumbnail_url
  if (video.cloudflare_video_id) return `https://${CF_SUBDOMAIN}.cloudflarestream.com/${video.cloudflare_video_id}/thumbnails/thumbnail.jpg`
  return null
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatDuration(seconds: number) {
  if (!seconds) return '—'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function VideosTable({ videos, loading, pagination, onPageChange, onPublishToggle, onDelete }: VideosTableProps) {
  const navigate = useNavigate()
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [videoToDelete, setVideoToDelete] = useState<AdminVideo | null>(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [videoToView, setVideoToView] = useState<AdminVideo | null>(null)

  const start = (pagination.page - 1) * pagination.limit + 1
  const end = Math.min(pagination.page * pagination.limit, pagination.total)

  const pageNumbers = () => {
    const total = pagination.totalPages
    const cur = pagination.page
    const pages: number[] = []
    for (let i = Math.max(1, cur - 2); i <= Math.min(total, cur + 2); i++) pages.push(i)
    return pages
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
              {pagination.total > 0 ? (
                <>Showing <span className="text-[#1d1b20]">{start}–{end}</span> of <span className="text-[#1d1b20]">{pagination.total}</span> videos</>
              ) : 'No videos found'}
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f7ecff] border-b border-[#f2ecf4]">
                <th className="px-4 py-5 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-left min-w-[300px] pl-6">Video</th>
                <th className="px-4 py-5 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-center">Category</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-center">Price</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-center">Uploaded</th>
                <th className="px-4 py-5 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-center">Status</th>
                <th className="px-6 py-5 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-[#f8f2fa]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-[92px] h-[52px] bg-gray-100 rounded animate-pulse" />
                        <div className="flex flex-col gap-1.5">
                          <div className="h-3.5 w-40 bg-gray-100 rounded animate-pulse" />
                          <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
                        </div>
                      </div>
                    </td>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <td key={j} className="px-4 py-4 text-center">
                        <div className="h-3 w-16 bg-gray-100 rounded animate-pulse mx-auto" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : videos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-sm text-gray-400">
                    No videos found. <a href="/videos/add" className="text-[#7f28bc] hover:underline">Add your first video.</a>
                  </td>
                </tr>
              ) : (
                videos.map(video => (
                  <tr key={video.id} className="border-b border-[#f8f2fa] hover:bg-[#fdfaff] transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <div className="relative w-[92px] h-[52px] bg-[#ece6ee] rounded flex-shrink-0 overflow-hidden">
                          {getThumbnail(video) ? (
                            <img
                              src={getThumbnail(video)!}
                              alt={video.title}
                              className="w-full h-full object-cover"
                              onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <img src="/icons/video-icon.svg" alt="" className="w-6 h-6 opacity-30" />
                            </div>
                          )}
                          {video.duration_seconds > 0 && (
                            <div className="absolute bottom-1 right-1 bg-[rgba(0,0,0,0.8)] px-1.5 py-0.5 rounded-sm">
                              <span className="text-[10px] text-white tracking-[-0.25px] leading-[10px]">
                                {formatDuration(video.duration_seconds)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-sm font-semibold text-[#1d1b20] tracking-[-0.4px] leading-6 line-clamp-1">
                            {video.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-[#7a7a7a] tracking-[0.55px] leading-[14px]">
                            <div className="flex items-center gap-0.5">
                              <img src="/icons/play-icon.svg" alt="" className="w-3 h-2" />
                              <span>{video.view_count.toLocaleString()}</span>
                            </div>
                            {video.cloudflare_video_id && (
                              <>
                                <span className="text-[10px] leading-5">•</span>
                                <span className="text-[10px] font-mono text-[#9a7aaa]">{video.cloudflare_video_id.slice(0, 8)}…</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-7 text-center">
                      {video.category_name ? (
                        <span className="inline-flex px-2.5 py-1 bg-[#ece6ee] text-[#7f28bc] text-[11px] font-medium tracking-[0.55px] leading-[14px] rounded-md">
                          {video.category_name}
                        </span>
                      ) : <span className="text-xs text-gray-400">—</span>}
                    </td>
                    <td className="px-2 py-7 text-sm font-semibold text-[#1d1b20] text-center leading-5">
                      ₹{video.price_inr.toLocaleString('en-IN')}
                    </td>
                    <td className="px-4 py-7 text-[11px] font-semibold text-[#2e2e2e] text-center tracking-[0.55px] leading-[14px]">
                      {formatDate(video.created_at)}
                    </td>
                    <td className="px-2 py-7 text-center">
                      {video.is_published ? (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#ecfdf5] rounded-xl">
                          <div className="w-1.5 h-1.5 bg-[#10b981] rounded-full" />
                          <span className="text-[11px] font-medium text-[#047857] tracking-[0.55px] leading-[14px]">Published</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-xl">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                          <span className="text-[11px] font-medium text-gray-500 tracking-[0.55px] leading-[14px]">Draft</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-5 text-right">
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
                              label: 'View Details',
                              onClick: () => { setVideoToView(video); setViewModalOpen(true); setOpenMenuId(null) },
                            },
                            {
                              label: 'Edit Video',
                              onClick: () => { navigate(`/videos/edit/${video.id}`); setOpenMenuId(null) },
                            },
                            {
                              label: video.is_published ? 'Unpublish' : 'Publish',
                              onClick: () => { onPublishToggle(video); setOpenMenuId(null) },
                            },
                            {
                              label: 'Delete',
                              onClick: () => { setVideoToDelete(video); setDeleteModalOpen(true); setOpenMenuId(null) },
                              className: 'text-[#ef4444] hover:bg-[#fef2f2]',
                            },
                          ]}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="bg-[rgba(248,242,250,0.6)] border-t border-[#f2ecf4] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs">
              <span className="text-[#2e2e2e]">Showing</span>
              <span className="font-semibold text-[#1d1b20]">{start}–{end}</span>
              <span className="text-[#2e2e2e]">of</span>
              <span className="font-semibold text-[#1d1b20]">{pagination.total}</span>
              <span className="text-[#696969]">videos</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => onPageChange(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium text-[#585858] tracking-[0.36px] hover:bg-white transition-colors disabled:opacity-40"
              >
                <img src="/icons/chevron-left.svg" alt="" className="w-[4.933px] h-2" />
                Previous
              </button>

              {pageNumbers().map(p => (
                <button
                  key={p}
                  onClick={() => onPageChange(p)}
                  className={`w-8 h-8 flex items-center justify-center text-xs font-semibold tracking-[0.36px] rounded ${
                    p === pagination.page
                      ? 'bg-[#7f28bc] text-white shadow-sm'
                      : 'text-[#585858] hover:bg-white transition-colors'
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => onPageChange(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages}
                className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium text-[#585858] tracking-[0.36px] hover:bg-white transition-colors disabled:opacity-40"
              >
                Next
                <img src="/icons/chevron-right-small.svg" alt="" className="w-[4.933px] h-2" />
              </button>
            </div>
          </div>
        )}
      </div>

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => { setDeleteModalOpen(false); setVideoToDelete(null) }}
        onConfirm={() => { if (videoToDelete) { onDelete(videoToDelete); setVideoToDelete(null) } }}
        title="Delete Video"
        message="Are you sure you want to delete"
        itemName={videoToDelete?.title || ''}
      />

      <ViewVideoModal
        isOpen={viewModalOpen}
        onClose={() => { setViewModalOpen(false); setVideoToView(null) }}
        data={videoToView}
      />
    </>
  )
}
