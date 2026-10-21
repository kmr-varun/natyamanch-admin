import { Button } from './shared'
import type { AdminOrder } from '../lib/api'

interface Props {
  isOpen: boolean
  onClose: () => void
  data: AdminOrder | null
}

function formatDateTime(d: string) {
  return new Date(d).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })
}

function initials(name?: string) {
  return (name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

const STATUS_STYLES: Record<string, string> = {
  completed: 'bg-[#d1fae5] text-[#047857]',
  pending:   'bg-[#fef9c3] text-[#a16207]',
  failed:    'bg-[#fef2f2] text-[#ef4444]',
}

export default function ViewOrderModal({ isOpen, onClose, data }: Props) {
  if (!isOpen || !data) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
        </div>

        <div className="p-6 space-y-5">
          {/* Status */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Order ID</p>
              <p className="text-sm font-mono font-semibold text-gray-900 mt-0.5">{data.id.slice(0, 16)}…</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_STYLES[data.status] || 'bg-gray-100 text-gray-600'}`}>
              {data.status}
            </span>
          </div>

          {/* Customer */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Customer</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#f3e8ff] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-[#7e22ce]">{initials(data.user_name)}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{data.user_name || '—'}</p>
                <p className="text-xs text-gray-500">{data.user_email || '—'}</p>
              </div>
            </div>
          </div>

          {/* Video */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Video Purchased</h3>
            <div className="flex items-center gap-3">
              {data.thumbnail_url ? (
                <img src={data.thumbnail_url} alt="" className="w-16 h-10 rounded object-cover flex-shrink-0" />
              ) : (
                <div className="w-16 h-10 bg-gradient-to-br from-[#450a0a] to-[#78350f] rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-[9px] font-bold text-[#fde68a] text-center leading-tight px-1">{(data.video_title || '').slice(0, 10)}</span>
                </div>
              )}
              <p className="text-sm font-semibold text-gray-900">{data.video_title || '—'}</p>
            </div>
          </div>

          {/* Payment */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Payment</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-500">Amount</label>
                <p className="text-lg font-bold text-[#0f172a]">₹{data.amount_inr.toLocaleString('en-IN')}</p>
              </div>
              {data.discount_amount ? (
                <div>
                  <label className="text-xs font-medium text-gray-500">Discount</label>
                  <p className="text-sm font-semibold text-[#059669]">−₹{data.discount_amount.toLocaleString('en-IN')}</p>
                </div>
              ) : null}
              <div>
                <label className="text-xs font-medium text-gray-500">Gateway</label>
                <p className="text-sm text-gray-900 capitalize">{data.payment_gateway || '—'}</p>
              </div>
              {data.gateway_payment_id && (
                <div>
                  <label className="text-xs font-medium text-gray-500">Transaction ID</label>
                  <p className="text-xs font-mono text-gray-700">{data.gateway_payment_id}</p>
                </div>
              )}
            </div>
          </div>

          {/* Date */}
          <div className="bg-gray-50 rounded-lg px-4 py-3">
            <label className="text-xs font-medium text-gray-500">Order Date</label>
            <p className="text-sm font-semibold text-gray-900 mt-0.5">{formatDateTime(data.created_at)}</p>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-end sticky bottom-0 bg-white">
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  )
}
