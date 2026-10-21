import { Button } from './shared'
import type { AdminSubscription } from '../lib/api'

interface Props {
  isOpen: boolean
  onClose: () => void
  data: AdminSubscription | null
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  expired: 'bg-gray-100 text-gray-600',
  cancelled: 'bg-red-100 text-red-700',
}

export default function ViewSubscriptionModal({ isOpen, onClose, data }: Props) {
  if (!isOpen || !data) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-900">Subscription Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
        </div>

        <div className="p-6 space-y-5">
          {/* Subscriber */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Subscriber</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#f3e8ff] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-[#7e22ce]">
                  {(data.user_name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{data.user_name || '—'}</p>
                <p className="text-xs text-gray-500">{data.user_email || '—'}</p>
              </div>
            </div>
          </div>

          {/* Plan */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Plan</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-500">Plan Name</label>
                <p className="text-sm font-semibold text-gray-900">{data.plan_name || '—'}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500">Type</label>
                <p className="text-sm text-gray-900 capitalize">{data.plan_type || '—'}</p>
              </div>
              {data.plan_price_inr != null && (
                <div>
                  <label className="text-xs font-medium text-gray-500">Plan Price</label>
                  <p className="text-sm font-semibold text-[#7f28bc]">₹{data.plan_price_inr.toLocaleString('en-IN')}</p>
                </div>
              )}
              {data.amount_paid_inr != null && (
                <div>
                  <label className="text-xs font-medium text-gray-500">Amount Paid</label>
                  <p className="text-sm font-semibold text-gray-900">₹{data.amount_paid_inr.toLocaleString('en-IN')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Dates + Status */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Subscription Period</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-500">Start Date</label>
                <p className="text-sm text-gray-900">{formatDate(data.start_date)}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500">End Date</label>
                <p className="text-sm text-gray-900">{data.end_date ? formatDate(data.end_date) : '—'}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500">Status</label>
                <div className="mt-1">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${STATUS_STYLES[data.status] || 'bg-gray-100 text-gray-600'}`}>
                    {data.status}
                  </span>
                </div>
              </div>
              {data.payment_gateway && (
                <div>
                  <label className="text-xs font-medium text-gray-500">Payment Gateway</label>
                  <p className="text-sm text-gray-900 capitalize">{data.payment_gateway}</p>
                </div>
              )}
            </div>
          </div>

          {(data.transaction_id || data.notes) && (
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Additional Info</h3>
              <div className="bg-gray-50 rounded-lg p-3 space-y-1">
                {data.transaction_id && (
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Transaction ID</span>
                    <span className="text-xs font-mono text-gray-700">{data.transaction_id}</span>
                  </div>
                )}
                {data.notes && (
                  <div>
                    <span className="text-xs text-gray-500">Notes</span>
                    <p className="text-xs text-gray-700 mt-0.5">{data.notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-end sticky bottom-0 bg-white">
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  )
}
