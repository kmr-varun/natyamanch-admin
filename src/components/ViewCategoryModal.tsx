import { Button } from './shared'
import type { AdminCategory } from '../lib/api'

interface ViewCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  data: AdminCategory | null
}

export default function ViewCategoryModal({ isOpen, onClose, data }: ViewCategoryModalProps) {
  if (!isOpen || !data) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-900">Category Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none">×</button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Category Name</label>
                <p className="text-sm font-semibold text-gray-900">{data.name}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Slug (URL)</label>
                <p className="text-sm text-gray-900 font-mono bg-gray-50 px-2 py-1 rounded">{data.slug}</p>
              </div>
              {data.description && (
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                  <p className="text-sm text-gray-700">{data.description}</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Video Count</label>
                <p className="text-sm font-semibold text-gray-900">{data.video_count ?? 0} videos</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Display Order</label>
                <p className="text-sm text-gray-900">{data.sort_order}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Status</h3>
            <div className="flex items-center gap-2">
              {data.is_active === 1 ? (
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

        <div className="px-6 py-4 border-t border-gray-200 flex justify-end sticky bottom-0 bg-white">
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  )
}
