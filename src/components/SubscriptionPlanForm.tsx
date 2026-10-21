import { useState, useEffect } from 'react'
import type { AdminPlan, PlanBody } from '../lib/api'

interface Props {
  mode?: 'add' | 'edit'
  initialData?: AdminPlan
  onSave: (body: PlanBody) => Promise<void>
  onCancel: () => void
}

export default function SubscriptionPlanForm({ mode = 'add', initialData, onSave, onCancel }: Props) {
  const [name, setName] = useState(initialData?.name || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [planType, setPlanType] = useState(initialData?.plan_type || 'individual')
  const [priceInr, setPriceInr] = useState(initialData?.price_inr ?? '')
  const [durationDays, setDurationDays] = useState(initialData?.duration_days ?? '')
  const [features, setFeatures] = useState<string[]>(initialData?.features || [''])
  const [isActive, setIsActive] = useState(initialData ? initialData.is_active : true)
  const [sortOrder, setSortOrder] = useState(initialData?.sort_order ?? 0)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialData) {
      setName(initialData.name)
      setDescription(initialData.description || '')
      setPlanType(initialData.plan_type)
      setPriceInr(initialData.price_inr)
      setDurationDays(initialData.duration_days)
      setFeatures(initialData.features.length > 0 ? initialData.features : [''])
      setIsActive(initialData.is_active)
      setSortOrder(initialData.sort_order)
    }
  }, [initialData?.id])

  const addFeature = () => setFeatures([...features, ''])
  const removeFeature = (i: number) => setFeatures(features.filter((_, idx) => idx !== i))
  const updateFeature = (i: number, val: string) => setFeatures(features.map((f, idx) => idx === i ? val : f))

  const handleSubmit = async () => {
    if (!name.trim()) { setError('Plan name is required'); return }
    if (!priceInr || Number(priceInr) < 0) { setError('Valid price is required'); return }
    if (!durationDays || Number(durationDays) < 1) { setError('Duration (days) must be at least 1'); return }
    setError('')
    setSaving(true)
    try {
      await onSave({
        name: name.trim(),
        description: description.trim() || undefined,
        planType,
        priceInr: Number(priceInr),
        durationDays: Number(durationDays),
        features: features.filter(f => f.trim()),
        isActive,
        sortOrder: Number(sortOrder),
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save plan')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={e => { if (e.target === e.currentTarget) onCancel() }}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="border-b border-[#e2e8f0] px-6 py-4 flex items-center justify-between flex-shrink-0">
          <h2 className="text-base font-semibold text-[#0f172a]">
            {mode === 'edit' ? 'Edit Subscription Plan' : 'Add Subscription Plan'}
          </h2>
          <button onClick={onCancel} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
        </div>

        {/* Form */}
        <div className="overflow-auto p-6 flex flex-col gap-4 flex-1">
          {error && (
            <p className="text-xs text-[#ef4444] bg-[#fef2f2] border border-[#fecaca] rounded-lg px-3 py-2">{error}</p>
          )}

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#334155]">Plan Name <span className="text-[#f43f5e]">*</span></label>
            <input
              type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Monthly Pass"
              className="h-10 px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc]"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#334155]">Description</label>
            <textarea
              rows={2} value={description} onChange={e => setDescription(e.target.value)} placeholder="Brief plan description"
              className="px-3 py-2 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#334155] leading-relaxed resize-none focus:outline-none focus:border-[#7f28bc]"
            />
          </div>

          {/* Type */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#334155]">Type <span className="text-[#f43f5e]">*</span></label>
            <div className="flex items-center gap-5">
              {[['individual', 'Individual'], ['organization', 'Mandal / Organization']].map(([val, label]) => (
                <label key={val} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="planType" value={val} checked={planType === val} onChange={() => setPlanType(val)} className="w-4 h-4 accent-[#7f28bc]" />
                  <span className="text-sm text-[#334155]">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price + Duration row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#334155]">Price (INR) <span className="text-[#f43f5e]">*</span></label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#94a3b8]">₹</span>
                <input
                  type="number" value={priceInr} onChange={e => setPriceInr(e.target.value)} placeholder="0" min={0}
                  className="w-full h-10 pl-7 pr-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc]"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#334155]">Duration (days) <span className="text-[#f43f5e]">*</span></label>
              <input
                type="number" value={durationDays} onChange={e => setDurationDays(e.target.value)} placeholder="30" min={1}
                className="h-10 px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc]"
              />
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#334155]">Features</label>
            <div className="flex flex-col gap-2">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text" value={f} onChange={e => updateFeature(i, e.target.value)} placeholder={`Feature ${i + 1}`}
                    className="flex-1 h-9 px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc]"
                  />
                  {features.length > 1 && (
                    <button onClick={() => removeFeature(i)} className="w-7 h-7 flex items-center justify-center text-[#94a3b8] hover:text-[#ef4444] hover:bg-[#fef2f2] rounded transition-colors">×</button>
                  )}
                </div>
              ))}
            </div>
            <button onClick={addFeature} className="w-full py-2 border border-dashed border-[#7f28bc] rounded-lg text-xs font-semibold text-[#7f28bc] hover:bg-[#faf5ff] transition-colors">
              + Add Feature
            </button>
          </div>

          {/* Status + Sort Order */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#334155]">Status</label>
              <div className="relative h-10">
                <select
                  value={isActive ? 'active' : 'inactive'} onChange={e => setIsActive(e.target.value === 'active')}
                  className="w-full h-full px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] appearance-none focus:outline-none focus:border-[#7f28bc]"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <img src="/icons/chevron-down-icon.svg" alt="" className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#334155]">Sort Order</label>
              <input
                type="number" value={sortOrder} onChange={e => setSortOrder(Number(e.target.value))} min={0}
                className="h-10 px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc]"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#e2e8f0] px-6 py-4 flex gap-3 flex-shrink-0">
          <button onClick={onCancel} disabled={saving} className="flex-1 h-10 border border-[#7f28bc] rounded-lg text-sm font-semibold text-[#7f28bc] hover:bg-[#faf5ff] disabled:opacity-50 transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={saving} className="flex-1 h-10 bg-[#7f28bc] rounded-lg text-sm font-semibold text-white hover:bg-[#6d1fa3] disabled:opacity-60 transition-colors shadow-sm">
            {saving ? 'Saving…' : mode === 'edit' ? 'Update Plan' : 'Save Plan'}
          </button>
        </div>
      </div>
    </div>
  )
}
