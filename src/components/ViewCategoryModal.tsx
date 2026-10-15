import { Button } from './shared'

interface Category {
  id: number
  name: string
  slug: string
  videoCount: number
  status: string
  displayOrder: number
}

interface ViewCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  data: Category | null
}

export default function ViewCategoryModal({ isOpen, onClose, data }: ViewCategoryModalProps) {
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
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-900">Category Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Basic Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Category ID
                </label>
                <p className="text-sm font-semibold text-gray-900">#{String(data.id).padStart(2, '0')}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Category Name
                </label>
                <p className="text-sm font-semibold text-gray-900">{data.name}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Slug (URL)
                </label>
                <p className="text-sm text-gray-900 font-mono bg-gray-50 px-2 py-1 rounded">
                  {data.slug}
                </p>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Statistics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Video Count
                </label>
                <p className="text-sm font-semibold text-gray-900">{data.videoCount} videos</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Display Order
                </label>
                <p className="text-sm text-gray-900">{data.displayOrder}</p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Status
            </h3>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Current Status
              </label>
              <div className="flex items-center gap-2">
                {data.status === 'Active' ? (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-100 rounded-xl">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                    <span className="text-xs font-semibold text-green-700">Active</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-xl">
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                    <span className="text-xs font-semibold text-gray-700">Inactive</span>
                  </div>
                )}
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
