import { Button } from './shared'

interface Notification {
  id: number
  title: string
  message: string
  type: string
  audience: string
  audienceCount: string
  date: string
  time: string
  status: string
  delivered: string
  read: string
}

interface ViewNotificationModalProps {
  isOpen: boolean
  onClose: () => void
  data: Notification | null
}

export default function ViewNotificationModal({ isOpen, onClose, data }: ViewNotificationModalProps) {
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
          <h2 className="text-xl font-bold text-gray-900">Notification Details</h2>
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
                  Notification ID
                </label>
                <p className="text-sm font-semibold text-gray-900">#{data.id}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Title
                </label>
                <p className="text-lg font-bold text-gray-900">{data.title}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Message
                </label>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  {data.message}
                </p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Type
                </label>
                <span className="inline-block px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                  {data.type}
                </span>
              </div>
            </div>
          </div>

          {/* Audience Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Audience Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Target Audience
                </label>
                <p className="text-sm font-semibold text-gray-900">{data.audience}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Audience Count
                </label>
                <p className="text-sm text-gray-900">{data.audienceCount}</p>
              </div>
            </div>
          </div>

          {/* Schedule Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Schedule Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Date
                </label>
                <p className="text-sm text-gray-900">{data.date}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Time
                </label>
                <p className="text-sm text-gray-900">{data.time}</p>
              </div>
            </div>
          </div>

          {/* Delivery Statistics */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Delivery Statistics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Delivered
                </label>
                <p className="text-lg font-bold text-green-600">{data.delivered}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Read
                </label>
                <p className="text-lg font-bold text-purple-600">{data.read}</p>
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Read Rate
              </label>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{
                    width: `${(parseInt(data.read.replace(/,/g, '')) / parseInt(data.delivered.replace(/,/g, ''))) * 100}%`
                  }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {((parseInt(data.read.replace(/,/g, '')) / parseInt(data.delivered.replace(/,/g, ''))) * 100).toFixed(1)}% read rate
              </p>
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
                {data.status === 'Sent' ? (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-100 rounded-xl">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                    <span className="text-xs font-semibold text-green-700">Sent</span>
                  </div>
                ) : data.status === 'Scheduled' ? (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 rounded-xl">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                    <span className="text-xs font-semibold text-blue-700">Scheduled</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-xl">
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                    <span className="text-xs font-semibold text-gray-700">Draft</span>
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
