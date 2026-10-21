import { Button } from './shared'
import type { AdminVideo } from '../lib/api'

const CF_SUBDOMAIN = 'customer-w1lqmmjxo1pu5rut'

interface ViewVideoModalProps {
  isOpen: boolean
  onClose: () => void
  data: AdminVideo | null
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatDuration(seconds: number) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function ViewVideoModal({ isOpen, onClose, data }: ViewVideoModalProps) {
  if (!isOpen || !data) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={handleBackdropClick}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-900">Video Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none">×</button>
        </div>

        <div className="p-6 space-y-6">
          {/* Cloudflare iframe preview */}
          {data.cloudflare_video_id ? (
            <div className="aspect-video rounded-lg overflow-hidden bg-black">
              <iframe
                src={`https://${CF_SUBDOMAIN}.cloudflarestream.com/${data.cloudflare_video_id}/iframe`}
                className="w-full h-full"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : data.thumbnail_url ? (
            <div className="flex justify-center">
              <img src={data.thumbnail_url} alt={data.title} className="rounded-lg w-full max-w-md object-cover" />
            </div>
          ) : null}

          {/* Basic Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">Video Title</label>
                <p className="text-sm font-semibold text-gray-900">{data.title}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">ID</label>
                <p className="text-xs font-mono text-gray-600">{data.id}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Slug</label>
                <p className="text-xs font-mono text-gray-600">{data.slug}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
                <p className="text-sm text-gray-900">{data.category_name || '—'}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Language</label>
                <p className="text-sm text-gray-900">{data.language || '—'}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Duration</label>
                <p className="text-sm text-gray-900">{data.duration_seconds > 0 ? formatDuration(data.duration_seconds) : '—'}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Year</label>
                <p className="text-sm text-gray-900">{data.year || '—'}</p>
              </div>
              {data.short_description && (
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Short Description</label>
                  <p className="text-sm text-gray-700">{data.short_description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Cloudflare */}
          {data.cloudflare_video_id && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Cloudflare Stream</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Video ID</label>
                  <p className="text-xs font-mono text-gray-600">{data.cloudflare_video_id}</p>
                </div>
              </div>
            </div>
          )}

          {/* Pricing & Stats */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Pricing & Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Price</label>
                <p className="text-sm font-semibold text-gray-900">₹{data.price_inr.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Views</label>
                <p className="text-sm text-gray-900">{data.view_count.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Publishing</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                {data.is_published ? (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-100 rounded-xl">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                    <span className="text-xs font-semibold text-green-700">Published</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-xl">
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                    <span className="text-xs font-semibold text-gray-600">Draft</span>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Uploaded</label>
                <p className="text-sm text-gray-900">{formatDate(data.created_at)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-end sticky bottom-0 bg-white">
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  )
}
