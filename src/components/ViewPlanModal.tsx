import { Button } from './shared'
import type { AdminPlan } from '../lib/api'

interface Props {
  isOpen: boolean
  onClose: () => void
  data: AdminPlan | null
}

function formatDuration(days: number) {
  if (days === 1) return '1 Day'
  if (days < 7) return `${days} Days`
  if (days === 7) return '1 Week'
  if (days < 30) return `${Math.round(days / 7)} Weeks`
  if (days === 30) return '1 Month'
  if (days < 365) return `${Math.round(days / 30)} Months`
  if (days === 365) return '1 Year'
  return `${Math.round(days / 365)} Years`
}

export default function ViewPlanModal({ isOpen, onClose, data }: Props) {
  if (!isOpen || !data) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-900">Plan Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Basic Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Plan Name</label>
                <p className="text-lg font-bold text-gray-900">{data.name}</p>
              </div>
              {data.description && (
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                  <p className="text-sm text-gray-700">{data.description}</p>
                </div>
              )}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Type</label>
                <span className="px-2.5 py-0.5 bg-[#eff6ff] rounded-full text-xs font-medium text-[#2563eb] capitalize">{data.plan_type}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Pricing & Duration</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Price</label>
                <p className="text-2xl font-bold text-[#7f28bc]">₹{data.price_inr.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Duration</label>
                <p className="text-sm font-semibold text-gray-900">{formatDuration(data.duration_days)}</p>
                <p className="text-xs text-gray-400">{data.duration_days} days</p>
              </div>
            </div>
          </div>

          {data.features && data.features.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Features</h3>
              <ul className="space-y-2">
                {data.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#7f28bc] mt-0.5 text-sm">✓</span>
                    <span className="text-sm text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                {data.is_active ? (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-100 rounded-xl">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                    <span className="text-xs font-semibold text-green-700">Active</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-xl">
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                    <span className="text-xs font-semibold text-gray-600">Inactive</span>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Sort Order</label>
                <p className="text-sm text-gray-900">{data.sort_order}</p>
              </div>
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
