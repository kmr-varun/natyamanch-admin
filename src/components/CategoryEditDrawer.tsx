import { useState, useEffect } from 'react'
import type { AdminCategory, CategoryBody } from '../lib/api'

interface CategoryEditDrawerProps {
  mode?: 'add' | 'edit'
  initialData?: AdminCategory
  onSave: (data: CategoryBody) => Promise<void>
  onCancel: () => void
}

export default function CategoryEditDrawer({ mode = 'add', initialData, onSave, onCancel }: CategoryEditDrawerProps) {
  const [name, setName] = useState(initialData?.name || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [sortOrder, setSortOrder] = useState(initialData?.sort_order ?? 0)
  const [isActive, setIsActive] = useState(initialData ? initialData.is_active === 1 : true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialData) {
      setName(initialData.name)
      setSlug(initialData.slug)
      setDescription(initialData.description || '')
      setSortOrder(initialData.sort_order)
      setIsActive(initialData.is_active === 1)
    }
  }, [initialData?.id])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setName(val)
    if (mode === 'add') {
      setSlug(val.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))
    }
  }

  const handleSubmit = async () => {
    if (!name.trim()) { setError('Category name is required'); return }
    if (!slug.trim()) { setError('Slug is required'); return }
    setError('')
    setSaving(true)
    try {
      await onSave({ name: name.trim(), slug: slug.trim(), description: description.trim() || undefined, sortOrder, isActive })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save category')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={e => { if (e.target === e.currentTarget) onCancel() }}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="border-b border-[#e2e8f0] px-6 py-4 flex items-center justify-between flex-shrink-0">
          <h2 className="text-base font-semibold text-[#0f172a] leading-5">
            {mode === 'edit' ? 'Edit Category' : 'Add New Category'}
          </h2>
          <button
            onClick={onCancel}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors text-lg leading-none"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <div className="overflow-auto p-6 flex flex-col gap-4 flex-1">
          {error && (
            <p className="text-xs text-[#ef4444] bg-[#fef2f2] border border-[#fecaca] rounded-lg px-3 py-2">{error}</p>
          )}

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#334155] leading-4">
              Category Name <span className="text-[#f43f5e]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter category name"
              className="h-10 px-3 py-2 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc] focus:ring-1 focus:ring-[#7f28bc]/20"
            />
          </div>

          {/* Slug */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#334155] leading-4">
              Slug <span className="text-[#f43f5e]">*</span>
            </label>
            <input
              type="text"
              value={slug}
              onChange={e => setSlug(e.target.value)}
              placeholder="category-slug"
              className="h-10 px-3 py-2 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] font-mono focus:outline-none focus:border-[#7f28bc] focus:ring-1 focus:ring-[#7f28bc]/20"
            />
            <p className="text-xs text-[#94a3b8]">URL: /category/{slug || 'your-slug'}</p>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#334155] leading-4">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter category description"
              maxLength={300}
              className="px-3 py-2 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#334155] leading-relaxed resize-none focus:outline-none focus:border-[#7f28bc] focus:ring-1 focus:ring-[#7f28bc]/20"
            />
            <div className="flex justify-end">
              <span className="text-xs text-[#94a3b8]">{description.length}/300</span>
            </div>
          </div>

          {/* Bottom row: sort order + status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#334155] leading-4">Display Order</label>
              <input
                type="number"
                value={sortOrder}
                onChange={e => setSortOrder(Number(e.target.value))}
                min={0}
                className="h-10 px-3 py-2 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc] focus:ring-1 focus:ring-[#7f28bc]/20"
              />
              <p className="text-xs text-[#94a3b8]">Lower = appears first</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#334155] leading-4">Status</label>
              <div className="relative h-10">
                <select
                  value={isActive ? 'active' : 'inactive'}
                  onChange={e => setIsActive(e.target.value === 'active')}
                  className="w-full h-full px-3 py-2 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] appearance-none focus:outline-none focus:border-[#7f28bc] focus:ring-1 focus:ring-[#7f28bc]/20"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <img src="/icons/chevron-down-icon.svg" alt="" className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#e2e8f0] px-6 py-4 flex items-center gap-3 flex-shrink-0">
          <button
            onClick={onCancel}
            disabled={saving}
            type="button"
            className="flex-1 h-10 border border-[#7f28bc] rounded-lg text-sm font-semibold text-[#7f28bc] hover:bg-[#faf5ff] disabled:opacity-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            type="button"
            className="flex-1 h-10 bg-[#7f28bc] rounded-lg text-sm font-semibold text-white hover:bg-[#6d1fa3] disabled:opacity-60 transition-colors shadow-sm"
          >
            {saving ? 'Saving…' : mode === 'edit' ? 'Update Category' : 'Save Category'}
          </button>
        </div>
      </div>
    </div>
  )
}
