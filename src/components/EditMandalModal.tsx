import { useState, useEffect } from 'react'
import { mandalsApi, type AdminOrg } from '../lib/api'

interface Props {
  org: AdminOrg | null
  onClose: () => void
  onSaved: () => void
}

const PLAN_SIZES = [50, 100, 200]
const STATUS_OPTIONS = ['active', 'expired', 'inactive']

export default function EditMandalModal({ org, onClose, onSaved }: Props) {
  const [name, setName] = useState('')
  const [planSize, setPlanSize] = useState<number>(50)
  const [contactPerson, setContactPerson] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [location, setLocation] = useState('')
  const [priceInr, setPriceInr] = useState('')
  const [subscriptionStatus, setSubscriptionStatus] = useState('active')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!org) return
    setName(org.name)
    setPlanSize(org.plan_size)
    setContactPerson(org.contact_person || '')
    setContactEmail(org.contact_email || '')
    setContactPhone(org.contact_phone || '')
    setLocation(org.location || '')
    setPriceInr(org.price_inr != null ? String(org.price_inr) : '')
    setSubscriptionStatus(org.subscription_status || 'active')
    setError('')
  }, [org])

  const handleSubmit = async () => {
    if (!org) return
    if (!name.trim()) { setError('Mandal name is required'); return }
    setError('')
    setSaving(true)
    try {
      await mandalsApi.update(org.id, {
        name: name.trim(),
        planSize,
        contactPerson: contactPerson || undefined,
        contactEmail: contactEmail || undefined,
        contactPhone: contactPhone || undefined,
        location: location || undefined,
        priceInr: priceInr ? Number(priceInr) : undefined,
        subscriptionStatus,
      })
      onSaved()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update mandal')
    } finally {
      setSaving(false)
    }
  }

  if (!org) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]">
        <div className="border-b border-[#e2e8f0] px-6 py-4 flex items-center justify-between flex-shrink-0">
          <h2 className="text-base font-semibold text-[#0f172a]">Edit Mandal</h2>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
        </div>

        <div className="overflow-auto p-6 flex flex-col gap-4 flex-1">
          {error && <p className="text-xs text-[#ef4444] bg-[#fef2f2] border border-[#fecaca] rounded-lg px-3 py-2">{error}</p>}

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#334155]">Mandal Name <span className="text-[#f43f5e]">*</span></label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="h-10 px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc]" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#334155]">Plan Size</label>
            <div className="flex gap-2">
              {PLAN_SIZES.map(s => (
                <button
                  key={s}
                  onClick={() => setPlanSize(s)}
                  className={`flex-1 h-10 rounded-lg border text-sm font-semibold transition-colors ${planSize === s ? 'bg-[#7f28bc] border-[#7f28bc] text-white' : 'bg-white border-[#e2e8f0] text-[#334155] hover:border-[#7f28bc]'}`}
                >
                  {s} seats
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#334155]">Contact Person</label>
              <input type="text" value={contactPerson} onChange={e => setContactPerson(e.target.value)} className="h-10 px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc]" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#334155]">Contact Email</label>
              <input type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} className="h-10 px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#334155]">Phone</label>
              <input type="tel" value={contactPhone} onChange={e => setContactPhone(e.target.value)} className="h-10 px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc]" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#334155]">Location</label>
              <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="h-10 px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#334155]">Price (INR)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#94a3b8]">₹</span>
                <input type="number" value={priceInr} onChange={e => setPriceInr(e.target.value)} min={0} className="w-full h-10 pl-7 pr-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc]" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#334155]">Status</label>
              <div className="relative h-10">
                <select value={subscriptionStatus} onChange={e => setSubscriptionStatus(e.target.value)} className="w-full h-full px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] appearance-none focus:outline-none focus:border-[#7f28bc] capitalize">
                  {STATUS_OPTIONS.map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
                </select>
                <img src="/icons/chevron-down-icon.svg" alt="" className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#e2e8f0] px-6 py-4 flex gap-3 flex-shrink-0">
          <button onClick={onClose} disabled={saving} className="flex-1 h-10 border border-[#7f28bc] rounded-lg text-sm font-semibold text-[#7f28bc] hover:bg-[#faf5ff] disabled:opacity-50 transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={saving} className="flex-1 h-10 bg-[#7f28bc] rounded-lg text-sm font-semibold text-white hover:bg-[#6d1fa3] disabled:opacity-60 transition-colors shadow-sm">
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
