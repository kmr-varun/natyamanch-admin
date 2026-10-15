import { Button } from './shared'

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

interface ViewVideoModalProps {
  isOpen: boolean
  onClose: () => void
  data: Video | null
}

export default function ViewVideoModal({ isOpen, onClose, data }: ViewVideoModalProps) {
  if (!isOpen || !data) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-900">Video Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Thumbnail */}
          <div className="flex justify-center">
            <img
              src={data.thumbnail}
              alt={data.title}
              className="rounded-lg w-full max-w-md object-cover"
            />
          </div>

          {/* Basic Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Basic Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Video Title
                </label>
                <p className="text-sm font-semibold text-gray-900">{data.title}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Video ID
                </label>
                <p className="text-sm text-gray-900">#{data.id}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Duration
                </label>
                <p className="text-sm text-gray-900">{data.duration}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Category
                </label>
                <p className="text-sm text-gray-900">{data.category}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Tag
                </label>
                <p className="text-sm text-gray-900">{data.tag}</p>
              </div>
            </div>
          </div>

          {/* Pricing & Statistics */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Pricing & Statistics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Price
                </label>
                <p className="text-sm font-semibold text-gray-900">{data.price}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Views
                </label>
                <p className="text-sm text-gray-900">{data.views}</p>
              </div>
            </div>
          </div>

          {/* Publishing Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Publishing Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Status
                </label>
                <div className="flex items-center gap-2">
                  {data.status === 'Published' ? (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-100 rounded-xl">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                      <span className="text-xs font-semibold text-green-700">Published</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-xl">
                      <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                      <span className="text-xs font-semibold text-gray-700">Draft</span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Date Uploaded
                </label>
                <p className="text-sm text-gray-900">{data.dateUploaded}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
