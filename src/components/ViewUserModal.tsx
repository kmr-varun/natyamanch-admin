import { Button } from './shared'

interface User {
  id: number
  name: string
  email: string
  purchasedVideos: number
  activeVideos: number
  activeStatus: 'Active' | 'Expired'
  accountStatus: 'Active' | 'Expired'
  joinedDate: string
}

interface ViewUserModalProps {
  isOpen: boolean
  onClose: () => void
  data: User | null
}

export default function ViewUserModal({ isOpen, onClose, data }: ViewUserModalProps) {
  if (!isOpen || !data) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  // Add ESC key listener
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeyDown as any)
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-900">User Details</h2>
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  User ID
                </label>
                <p className="text-sm font-semibold text-gray-900">#{data.id}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Full Name
                </label>
                <p className="text-sm font-semibold text-gray-900">{data.name}</p>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Email Address
                </label>
                <p className="text-sm text-gray-900">{data.email}</p>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Account Status
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Account Status
                </label>
                <div className="flex items-center gap-2">
                  {data.accountStatus === 'Active' ? (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-100 rounded-xl">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                      <span className="text-xs font-semibold text-green-700">Active</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-100 rounded-xl">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                      <span className="text-xs font-semibold text-red-700">Expired</span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Joined Date
                </label>
                <p className="text-sm text-gray-900">{data.joinedDate}</p>
              </div>
            </div>
          </div>

          {/* Video Statistics */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Video Statistics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Purchased Videos
                </label>
                <p className="text-sm font-semibold text-gray-900">{data.purchasedVideos} Videos</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Active Videos
                </label>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                  <span className="text-sm font-semibold text-purple-600">
                    {data.activeVideos > 0 ? `${data.activeVideos} Active` : 'Expired'}
                  </span>
                </div>
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
