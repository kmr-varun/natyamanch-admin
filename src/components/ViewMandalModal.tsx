import { Button } from './shared'
import type { AdminOrg } from '../lib/api'

interface Props {
  isOpen: boolean
  onClose: () => void
  data: AdminOrg | null
}

function formatDate(d?: string) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

const STATUS_STYLES: Record<string, string> = {
  active:   'bg-[#ecfdf5] text-[#059669]',
  expired:  'bg-gray-100 text-gray-600',
  inactive: 'bg-[#fef2f2] text-[#ef4444]',
}

export default function ViewMandalModal({ isOpen, onClose, data }: Props) {
  if (!isOpen || !data) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-900">Mandal Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
        </div>

        <div className="p-6 space-y-5">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#f3e8ff] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-base font-bold text-[#7e22ce]">{data.name.slice(0, 2).toUpperCase()}</span>
            </div>
            <div>
              <p className="text-base font-bold text-gray-900">{data.name}</p>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${STATUS_STYLES[data.subscription_status] || 'bg-gray-100 text-gray-600'}`}>
                {data.subscription_status}
              </span>
            </div>
          </div>

          {/* Organization Info */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Organization Info</h3>
            <div className="grid grid-cols-2 gap-3">
              {data.location && (
                <div>
                  <label className="text-xs font-medium text-gray-500">Location</label>
                  <p className="text-sm text-gray-900">{data.location}</p>
                </div>
              )}
              {data.contact_person && (
                <div>
                  <label className="text-xs font-medium text-gray-500">Contact Person</label>
                  <p className="text-sm text-gray-900">{data.contact_person}</p>
                </div>
              )}
              {data.contact_email && (
                <div>
                  <label className="text-xs font-medium text-gray-500">Email</label>
                  <p className="text-sm text-gray-900">{data.contact_email}</p>
                </div>
              )}
              {data.contact_phone && (
                <div>
                  <label className="text-xs font-medium text-gray-500">Phone</label>
                  <p className="text-sm text-gray-900">{data.contact_phone}</p>
                </div>
              )}
            </div>
          </div>

          {/* Admin */}
          {(data.admin_name || data.admin_email) && (
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Admin</h3>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#eff6ff] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-[#2563eb]">
                    {(data.admin_name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{data.admin_name || '—'}</p>
                  <p className="text-xs text-gray-500">{data.admin_email || ''}</p>
                </div>
              </div>
            </div>
          )}

          {/* Plan & Seats */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Plan & Seats</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-500">Plan Size</label>
                <p className="text-sm font-semibold text-gray-900">{data.plan_size} seats</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500">Seats Used</label>
                <p className="text-sm font-semibold text-gray-900">{data.seats_used} / {data.seats_total}</p>
              </div>
              {data.price_inr != null && (
                <div>
                  <label className="text-xs font-medium text-gray-500">Price</label>
                  <p className="text-sm font-semibold text-[#7f28bc]">₹{data.price_inr.toLocaleString('en-IN')}</p>
                </div>
              )}
              <div>
                <label className="text-xs font-medium text-gray-500">Subscription End</label>
                <p className="text-sm text-gray-900">{formatDate(data.subscription_end)}</p>
              </div>
            </div>
          </div>

          {data.member_count != null && (
            <div className="bg-[#faf5ff] rounded-lg px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-medium text-[#7f28bc]">Active Members</span>
              <span className="text-lg font-bold text-[#7f28bc]">{data.member_count}</span>
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
