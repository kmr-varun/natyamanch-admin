import { useState } from 'react'
import { mandalsApi, usersApi } from '../lib/api'

interface Props {
  isOpen: boolean
  onClose: () => void
  onAdded: () => void
}

const PLAN_SIZES = [50, 100, 200]

export default function AddMandalModal({ isOpen, onClose, onAdded }: Props) {
  const [name, setName] = useState('')
  const [planSize, setPlanSize] = useState<number>(50)
  const [contactPerson, setContactPerson] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [location, setLocation] = useState('')
  const [priceInr, setPriceInr] = useState('')
  const [subscriptionEndDays, setSubscriptionEndDays] = useState('365')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // Admin user search
  const [adminSearch, setAdminSearch] = useState('')
  const [adminResults, setAdminResults] = useState<{ id: string; name: string; email: string }[]>([])
  const [adminUserId, setAdminUserId] = useState('')
  const [adminUserName, setAdminUserName] = useState('')
  const [searchingAdmins, setSearchingAdmins] = useState(false)

  const handleAdminSearch = async (q: string) => {
    setAdminSearch(q)
    setAdminUserId('')
    setAdminUserName('')
    if (q.length < 2) { setAdminResults([]); return }
    setSearchingAdmins(true)
    try {
      const res = await usersApi.list({ search: q, limit: 8 })
      setAdminResults(res.data.map(u => ({ id: u.id, name: u.name, email: u.email })))
    } catch {} finally { setSearchingAdmins(false) }
  }

  const selectAdmin = (u: { id: string; name: string; email: string }) => {
    setAdminUserId(u.id)
    setAdminUserName(`${u.name} (${u.email})`)
    setAdminSearch(u.name)
    setAdminResults([])
  }

  const reset = () => {
    setName(''); setPlanSize(50); setContactPerson(''); setContactEmail('')
    setContactPhone(''); setLocation(''); setPriceInr(''); setSubscriptionEndDays('365')
    setAdminSearch(''); setAdminUserId(''); setAdminUserName(''); setAdminResults([])
    setError('')
  }

  const handleSubmit = async () => {
    if (!name.trim()) { setError('Mandal name is required'); return }
    if (!adminUserId) { setError('Please select an admin user'); return }
    setError('')
    setSaving(true)
    try {
      await mandalsApi.create({
        name: name.trim(),
        planSize,
        adminUserId,
        contactPerson: contactPerson || undefined,
        contactEmail: contactEmail || undefined,
        contactPhone: contactPhone || undefined,
        location: location || undefined,
        priceInr: priceInr ? Number(priceInr) : undefined,
        subscriptionEndDays: subscriptionEndDays ? Number(subscriptionEndDays) : undefined,
      })
      reset()
      onAdded()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create mandal')
    } finally {
      setSaving(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={e => { if (e.target === e.currentTarget) { onClose(); reset() } }}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]">
        <div className="border-b border-[#e2e8f0] px-6 py-4 flex items-center justify-between flex-shrink-0">
          <h2 className="text-base font-semibold text-[#0f172a]">Add Mandal</h2>
          <button onClick={() => { onClose(); reset() }} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
        </div>

        <div className="overflow-auto p-6 flex flex-col gap-4 flex-1">
          {error && <p className="text-xs text-[#ef4444] bg-[#fef2f2] border border-[#fecaca] rounded-lg px-3 py-2">{error}</p>}

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#334155]">Mandal Name <span className="text-[#f43f5e]">*</span></label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Mumbai Natyamanch" className="h-10 px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc]" />
          </div>

          {/* Admin user search */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#334155]">Admin User <span className="text-[#f43f5e]">*</span></label>
            <div className="relative">
              <input
                type="text"
                value={adminSearch}
                onChange={e => handleAdminSearch(e.target.value)}
                placeholder="Search by name or email…"
                className="w-full h-10 px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc]"
              />
              {adminResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e2e8f0] rounded-lg shadow-lg z-10 max-h-48 overflow-auto">
                  {adminResults.map(u => (
                    <button key={u.id} onClick={() => selectAdmin(u)} className="w-full px-3 py-2.5 text-left hover:bg-[#faf5ff] transition-colors">
                      <p className="text-sm font-medium text-[#0f172a]">{u.name}</p>
                      <p className="text-xs text-[#64748b]">{u.email}</p>
                    </button>
                  ))}
                </div>
              )}
              {searchingAdmins && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94a3b8]">Searching…</span>}
            </div>
            {adminUserName && <p className="text-xs text-[#059669]">✓ {adminUserName}</p>}
          </div>

          {/* Plan size */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#334155]">Plan Size <span className="text-[#f43f5e]">*</span></label>
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

          {/* Contact */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#334155]">Contact Person</label>
              <input type="text" value={contactPerson} onChange={e => setContactPerson(e.target.value)} placeholder="Full name" className="h-10 px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc]" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#334155]">Contact Email</label>
              <input type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} placeholder="email@example.com" className="h-10 px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#334155]">Phone</label>
              <input type="tel" value={contactPhone} onChange={e => setContactPhone(e.target.value)} placeholder="Phone number" className="h-10 px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc]" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#334155]">Location</label>
              <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="City / State" className="h-10 px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#334155]">Price (INR)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#94a3b8]">₹</span>
                <input type="number" value={priceInr} onChange={e => setPriceInr(e.target.value)} min={0} placeholder="Annual price" className="w-full h-10 pl-7 pr-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc]" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#334155]">Subscription (days)</label>
              <input type="number" value={subscriptionEndDays} onChange={e => setSubscriptionEndDays(e.target.value)} min={1} placeholder="365" className="h-10 px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc]" />
            </div>
          </div>
        </div>

        <div className="border-t border-[#e2e8f0] px-6 py-4 flex gap-3 flex-shrink-0">
          <button onClick={() => { onClose(); reset() }} disabled={saving} className="flex-1 h-10 border border-[#7f28bc] rounded-lg text-sm font-semibold text-[#7f28bc] hover:bg-[#faf5ff] disabled:opacity-50 transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={saving} className="flex-1 h-10 bg-[#7f28bc] rounded-lg text-sm font-semibold text-white hover:bg-[#6d1fa3] disabled:opacity-60 transition-colors shadow-sm">
            {saving ? 'Saving…' : 'Add Mandal'}
          </button>
        </div>
      </div>
    </div>
  )
}
