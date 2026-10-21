import { useState, useEffect } from 'react'
import { subscriptionsApi, usersApi, plansApi, type AdminPlan } from '../lib/api'

interface Props {
  isOpen: boolean
  onClose: () => void
  onAdded: () => void
}

export default function AddSubscriptionModal({ isOpen, onClose, onAdded }: Props) {
  const [plans, setPlans] = useState<AdminPlan[]>([])
  const [userId, setUserId] = useState('')
  const [planId, setPlanId] = useState('')
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
  const [amountPaidInr, setAmountPaidInr] = useState('')
  const [paymentGateway, setPaymentGateway] = useState('')
  const [transactionId, setTransactionId] = useState('')
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // User search
  const [userSearch, setUserSearch] = useState('')
  const [userResults, setUserResults] = useState<{ id: string; name: string; email: string }[]>([])
  const [selectedUserName, setSelectedUserName] = useState('')
  const [searchingUsers, setSearchingUsers] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    plansApi.list().then(res => setPlans(res.plans.filter(p => p.is_active))).catch(() => {})
  }, [isOpen])

  const handleUserSearch = async (q: string) => {
    setUserSearch(q)
    setUserId('')
    setSelectedUserName('')
    if (q.length < 2) { setUserResults([]); return }
    setSearchingUsers(true)
    try {
      const res = await usersApi.list({ search: q, limit: 8 })
      setUserResults(res.data.map(u => ({ id: u.id, name: u.name, email: u.email })))
    } catch {} finally { setSearchingUsers(false) }
  }

  const selectUser = (u: { id: string; name: string; email: string }) => {
    setUserId(u.id)
    setSelectedUserName(`${u.name} (${u.email})`)
    setUserSearch(u.name)
    setUserResults([])
  }

  const reset = () => {
    setUserId(''); setPlanId(''); setUserSearch(''); setSelectedUserName('')
    setUserResults([]); setStartDate(new Date().toISOString().split('T')[0])
    setAmountPaidInr(''); setPaymentGateway(''); setTransactionId(''); setNotes('')
    setError('')
  }

  const handleSubmit = async () => {
    if (!userId) { setError('Please select a user'); return }
    if (!planId) { setError('Please select a plan'); return }
    setError('')
    setSaving(true)
    try {
      await subscriptionsApi.create({
        userId,
        planId,
        startDate: startDate ? new Date(startDate).toISOString() : undefined,
        amountPaidInr: amountPaidInr ? Number(amountPaidInr) : undefined,
        paymentGateway: paymentGateway || undefined,
        transactionId: transactionId || undefined,
        notes: notes || undefined,
      })
      reset()
      onAdded()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create subscription')
    } finally {
      setSaving(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={e => { if (e.target === e.currentTarget) { onClose(); reset() } }}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]">
        <div className="border-b border-[#e2e8f0] px-6 py-4 flex items-center justify-between flex-shrink-0">
          <h2 className="text-base font-semibold text-[#0f172a]">Add Subscription</h2>
          <button onClick={() => { onClose(); reset() }} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
        </div>

        <div className="overflow-auto p-6 flex flex-col gap-4 flex-1">
          {error && <p className="text-xs text-[#ef4444] bg-[#fef2f2] border border-[#fecaca] rounded-lg px-3 py-2">{error}</p>}

          {/* User search */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#334155]">User <span className="text-[#f43f5e]">*</span></label>
            <div className="relative">
              <input
                type="text"
                value={userSearch}
                onChange={e => handleUserSearch(e.target.value)}
                placeholder="Search by name or email…"
                className="w-full h-10 px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc]"
              />
              {userResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e2e8f0] rounded-lg shadow-lg z-10 max-h-48 overflow-auto">
                  {userResults.map(u => (
                    <button key={u.id} onClick={() => selectUser(u)} className="w-full px-3 py-2.5 text-left hover:bg-[#faf5ff] transition-colors">
                      <p className="text-sm font-medium text-[#0f172a]">{u.name}</p>
                      <p className="text-xs text-[#64748b]">{u.email}</p>
                    </button>
                  ))}
                </div>
              )}
              {searchingUsers && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94a3b8]">Searching…</span>}
            </div>
            {selectedUserName && <p className="text-xs text-[#059669]">✓ {selectedUserName}</p>}
          </div>

          {/* Plan */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#334155]">Plan <span className="text-[#f43f5e]">*</span></label>
            <div className="relative h-10">
              <select value={planId} onChange={e => setPlanId(e.target.value)} className="w-full h-full px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] appearance-none focus:outline-none focus:border-[#7f28bc]">
                <option value="">Select a plan…</option>
                {plans.map(p => (
                  <option key={p.id} value={p.id}>{p.name} — ₹{p.price_inr.toLocaleString('en-IN')}</option>
                ))}
              </select>
              <img src="/icons/chevron-down-icon.svg" alt="" className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          {/* Start date + Amount */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#334155]">Start Date</label>
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="h-10 px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc]" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#334155]">Amount Paid (INR)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#94a3b8]">₹</span>
                <input type="number" value={amountPaidInr} onChange={e => setAmountPaidInr(e.target.value)} placeholder="Auto from plan" min={0} className="w-full h-10 pl-7 pr-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc]" />
              </div>
            </div>
          </div>

          {/* Payment gateway + Transaction ID */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#334155]">Payment Gateway</label>
              <input type="text" value={paymentGateway} onChange={e => setPaymentGateway(e.target.value)} placeholder="e.g. Razorpay" className="h-10 px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc]" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#334155]">Transaction ID</label>
              <input type="text" value={transactionId} onChange={e => setTransactionId(e.target.value)} placeholder="Optional" className="h-10 px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm font-mono text-[#1e293b] focus:outline-none focus:border-[#7f28bc]" />
            </div>
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#334155]">Notes</label>
            <textarea rows={2} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Optional notes" className="px-3 py-2 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#334155] leading-relaxed resize-none focus:outline-none focus:border-[#7f28bc]" />
          </div>
        </div>

        <div className="border-t border-[#e2e8f0] px-6 py-4 flex gap-3 flex-shrink-0">
          <button onClick={() => { onClose(); reset() }} disabled={saving} className="flex-1 h-10 border border-[#7f28bc] rounded-lg text-sm font-semibold text-[#7f28bc] hover:bg-[#faf5ff] disabled:opacity-50 transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={saving} className="flex-1 h-10 bg-[#7f28bc] rounded-lg text-sm font-semibold text-white hover:bg-[#6d1fa3] disabled:opacity-60 transition-colors shadow-sm">
            {saving ? 'Saving…' : 'Add Subscription'}
          </button>
        </div>
      </div>
    </div>
  )
}
