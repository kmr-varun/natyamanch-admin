import { Button } from './shared'

interface Organization {
  id: number
  name: string
  location: string
  contact: string
  email: string
  phone: string
  plan: string
  price: string
  members: string
  validUntil: string
  status: string
}

interface ViewMandalModalProps {
  isOpen: boolean
  onClose: () => void
  data: Organization | null
}

export default function ViewMandalModal({ isOpen, onClose, data }: ViewMandalModalProps) {
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
          <h2 className="text-xl font-bold text-gray-900">Mandal / Organization Details</h2>
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
                  Organization ID
                </label>
                <p className="text-sm font-semibold text-gray-900">#{data.id}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Organization Name
                </label>
                <p className="text-lg font-bold text-gray-900">{data.name}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Location
                </label>
                <p className="text-sm text-gray-900">{data.location}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Contact Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Contact Person
                </label>
                <p className="text-sm font-semibold text-gray-900">{data.contact}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Email Address
                </label>
                <p className="text-sm text-gray-900">{data.email}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Phone Number
                </label>
                <p className="text-sm text-gray-900">{data.phone}</p>
              </div>
            </div>
          </div>

          {/* Subscription Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Subscription Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Plan
                </label>
                <p className="text-sm font-semibold text-gray-900">{data.plan}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Price
                  </label>
                  <p className="text-lg font-bold text-purple-600">{data.price}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Members
                  </label>
                  <p className="text-sm font-semibold text-gray-900">{data.members}</p>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Valid Until
                </label>
                <p className="text-sm text-gray-900">{data.validUntil}</p>
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
