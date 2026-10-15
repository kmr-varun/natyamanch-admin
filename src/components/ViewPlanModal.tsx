import { Button } from './shared'

interface Plan {
  id: number
  name: string
  description: string
  type: string
  price: string
  usd: string
  duration: string
  durationDetail: string
  features: string[]
  status: string
  sortOrder: number
}

interface ViewPlanModalProps {
  isOpen: boolean
  onClose: () => void
  data: Plan | null
}

export default function ViewPlanModal({ isOpen, onClose, data }: ViewPlanModalProps) {
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
          <h2 className="text-xl font-bold text-gray-900">Plan Details</h2>
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
                  Plan ID
                </label>
                <p className="text-sm font-semibold text-gray-900">#{data.id}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Plan Name
                </label>
                <p className="text-lg font-bold text-gray-900">{data.name}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Description
                </label>
                <p className="text-sm text-gray-700 whitespace-pre-line">{data.description}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Type
                </label>
                <p className="text-sm text-gray-900">{data.type}</p>
              </div>
            </div>
          </div>

          {/* Pricing Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Pricing Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Price (INR)
                </label>
                <p className="text-2xl font-bold text-purple-600">{data.price}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Price (USD)
                </label>
                <p className="text-sm text-gray-600">{data.usd}</p>
              </div>
            </div>
          </div>

          {/* Duration */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Duration
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Duration
                </label>
                <p className="text-sm font-semibold text-gray-900">{data.duration}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Duration Detail
                </label>
                <p className="text-sm text-gray-900">{data.durationDetail}</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Features
            </h3>
            <ul className="space-y-2">
              {data.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✓</span>
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Settings */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Settings
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Status
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
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Sort Order
                </label>
                <p className="text-sm text-gray-900">{data.sortOrder}</p>
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
