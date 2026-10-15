import { Button } from './shared'

interface Order {
  id: string
  user: { name: string; email: string; initials: string }
  type: string
  item: { title: string; subtitle: string; badge: string }
  amount: string
  date: { date: string; time: string }
  status: string
  payment: string
}

interface ViewOrderModalProps {
  isOpen: boolean
  onClose: () => void
  data: Order | null
}

export default function ViewOrderModal({ isOpen, onClose, data }: ViewOrderModalProps) {
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
          <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Order Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Order Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Order ID
                </label>
                <p className="text-sm font-bold text-gray-900">{data.id}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Order Type
                </label>
                <p className="text-sm text-gray-900">{data.type}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Date
                  </label>
                  <p className="text-sm text-gray-900">{data.date.date}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Time
                  </label>
                  <p className="text-sm text-gray-900">{data.date.time}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Customer Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Customer Name
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold">
                    {data.user.initials}
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{data.user.name}</p>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Email Address
                </label>
                <p className="text-sm text-gray-900">{data.user.email}</p>
              </div>
            </div>
          </div>

          {/* Item Details */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Item Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Item Title
                </label>
                <p className="text-sm font-semibold text-gray-900">{data.item.title}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Item Type
                </label>
                <p className="text-sm text-gray-900">{data.item.subtitle}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Badge
                </label>
                <span className="inline-block px-2.5 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                  {data.item.badge}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Payment Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Amount
                </label>
                <p className="text-2xl font-bold text-gray-900">{data.amount}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Payment Method
                </label>
                <p className="text-sm text-gray-900">{data.payment}</p>
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
                Order Status
              </label>
              <div className="flex items-center gap-2">
                {data.status === 'Completed' ? (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-100 rounded-xl">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                    <span className="text-xs font-semibold text-green-700">Completed</span>
                  </div>
                ) : data.status === 'Pending' ? (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-yellow-100 rounded-xl">
                    <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full" />
                    <span className="text-xs font-semibold text-yellow-700">Pending</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-100 rounded-xl">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                    <span className="text-xs font-semibold text-red-700">Failed</span>
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
