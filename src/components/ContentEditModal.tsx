import { useState, useEffect } from 'react'
import { contentApi, type AdminContent } from '../lib/api'

interface Props {
  section: AdminContent | null
  onClose: () => void
  onSaved: () => void
}

// ─── Generic JSON array item editor ───────────────────────────────────────────

function ArrayEditor({ value, onChange }: { value: unknown[]; onChange: (v: unknown[]) => void }) {
  const addItem = () => {
    if (value.length === 0) { onChange([{}]); return }
    const template = Object.fromEntries(Object.keys(value[0] as object).map(k => [k, '']))
    onChange([...value, template])
  }
  const removeItem = (i: number) => onChange(value.filter((_, idx) => idx !== i))
  const updateField = (i: number, key: string, val: string) => {
    const copy = [...value]
    copy[i] = { ...(copy[i] as object), [key]: val }
    onChange(copy)
  }

  if (value.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <div className="py-8 text-center text-sm text-gray-400 border border-dashed border-[#e2e8f0] rounded-lg">
          No items yet. Add the first one.
        </div>
        <button onClick={addItem} className="h-9 border border-dashed border-[#7f28bc] rounded-lg text-sm font-semibold text-[#7f28bc] hover:bg-[#faf5ff] transition-colors">
          + Add Item
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {value.map((item, i) => (
        <div key={i} className="border border-[#e2e8f0] rounded-lg p-4 flex flex-col gap-3 relative bg-[#fafafa]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-[#7f28bc] uppercase tracking-wider">Item {i + 1}</span>
            <button onClick={() => removeItem(i)} className="text-xs text-[#ef4444] hover:bg-[#fef2f2] px-2 py-0.5 rounded transition-colors">Remove</button>
          </div>
          {Object.entries(item as Record<string, unknown>).map(([key, val]) => (
            <div key={key} className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#334155] capitalize">{key.replace(/_/g, ' ')}</label>
              {(key === 'description' || key === 'quote') ? (
                <textarea
                  rows={2}
                  value={String(val)}
                  onChange={e => updateField(i, key, e.target.value)}
                  className="px-3 py-2 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#334155] resize-none focus:outline-none focus:border-[#7f28bc] leading-relaxed"
                />
              ) : key === 'featured' ? (
                <select
                  value={String(val)}
                  onChange={e => updateField(i, key, e.target.value)}
                  className="h-9 px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc]"
                >
                  <option value="false">No</option>
                  <option value="true">Yes (Featured)</option>
                </select>
              ) : (
                <input
                  type="text"
                  value={String(val)}
                  onChange={e => updateField(i, key, e.target.value)}
                  className="h-9 px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc]"
                />
              )}
            </div>
          ))}
        </div>
      ))}
      <button onClick={addItem} className="h-9 border border-dashed border-[#7f28bc] rounded-lg text-sm font-semibold text-[#7f28bc] hover:bg-[#faf5ff] transition-colors">
        + Add Item
      </button>
    </div>
  )
}

// ─── Generic JSON object editor ───────────────────────────────────────────────

function ObjectEditor({ value, onChange }: { value: Record<string, unknown>; onChange: (v: Record<string, unknown>) => void }) {
  const updateField = (key: string, val: string) => onChange({ ...value, [key]: val })

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(value).map(([key, val]) => (
        <div key={key} className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#334155] capitalize">{key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim()}</label>
          {(key === 'description' || key === 'metaDescription' || key === 'footerTagline') ? (
            <textarea
              rows={3}
              value={String(val)}
              onChange={e => updateField(key, e.target.value)}
              className="px-3 py-2 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#334155] resize-none focus:outline-none focus:border-[#7f28bc] leading-relaxed"
            />
          ) : (
            <input
              type="text"
              value={String(val)}
              onChange={e => updateField(key, e.target.value)}
              className="h-10 px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc]"
            />
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Main modal ───────────────────────────────────────────────────────────────

export default function ContentEditModal({ section, onClose, onSaved }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [sortOrder, setSortOrder] = useState(0)
  const [parsedContent, setParsedContent] = useState<unknown>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'content' | 'settings'>('content')

  useEffect(() => {
    if (!section) return
    setTitle(section.title)
    setDescription(section.description || '')
    setIsActive(section.is_active === 1)
    setSortOrder(section.sort_order)
    setError('')
    setActiveTab('content')
    try {
      setParsedContent(JSON.parse(section.content))
    } catch {
      setParsedContent(section.content)
    }
  }, [section])

  const handleSave = async () => {
    if (!section) return
    setError('')
    setSaving(true)
    try {
      let contentStr: string
      if (typeof parsedContent === 'string') {
        contentStr = parsedContent
      } else {
        // Post-process: convert 'true'/'false' strings back to booleans in arrays
        const processed = section.content_type === 'json_array'
          ? (parsedContent as Record<string, unknown>[]).map(item =>
              Object.fromEntries(Object.entries(item).map(([k, v]) => {
                if (v === 'true') return [k, true]
                if (v === 'false') return [k, false]
                return [k, v]
              }))
            )
          : parsedContent
        contentStr = JSON.stringify(processed)
      }
      await contentApi.update(section.section_key, {
        title,
        description: description || undefined,
        content: contentStr,
        isActive,
        sortOrder,
      })
      onSaved()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  if (!section) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="border-b border-[#e2e8f0] px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-base font-semibold text-[#0f172a]">Edit: {section.title}</h2>
            <code className="text-[11px] text-[#7f28bc] bg-[#faf5ff] px-1.5 py-0.5 rounded mt-0.5 inline-block">{section.section_key}</code>
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 text-lg">×</button>
        </div>

        {/* Tabs */}
        <div className="border-b border-[#e2e8f0] px-6 flex gap-6 flex-shrink-0">
          {(['content', 'settings'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 text-sm font-semibold capitalize border-b-2 transition-colors ${activeTab === tab ? 'border-[#7f28bc] text-[#7f28bc]' : 'border-transparent text-[#64748b] hover:text-[#334155]'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="overflow-auto p-6 flex flex-col gap-4 flex-1">
          {error && <p className="text-xs text-[#ef4444] bg-[#fef2f2] border border-[#fecaca] rounded-lg px-3 py-2">{error}</p>}

          {activeTab === 'content' ? (
            <>
              {/* Content editor */}
              {section.content_type === 'json_array' && Array.isArray(parsedContent) ? (
                <ArrayEditor
                  value={parsedContent as unknown[]}
                  onChange={v => setParsedContent(v)}
                />
              ) : section.content_type === 'json_object' && parsedContent && typeof parsedContent === 'object' && !Array.isArray(parsedContent) ? (
                <ObjectEditor
                  value={parsedContent as Record<string, unknown>}
                  onChange={v => setParsedContent(v)}
                />
              ) : (
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#334155]">Content</label>
                  <textarea
                    rows={8}
                    value={typeof parsedContent === 'string' ? parsedContent : JSON.stringify(parsedContent, null, 2)}
                    onChange={e => setParsedContent(e.target.value)}
                    className="px-3 py-2 bg-white border border-[#e2e8f0] rounded-lg text-sm font-mono text-[#334155] resize-none focus:outline-none focus:border-[#7f28bc] leading-relaxed"
                  />
                </div>
              )}
            </>
          ) : (
            /* Settings tab */
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#334155]">Display Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="h-10 px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc]" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#334155]">Description</label>
                <textarea rows={2} value={description} onChange={e => setDescription(e.target.value)} className="px-3 py-2 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#334155] resize-none focus:outline-none focus:border-[#7f28bc]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#334155]">Sort Order</label>
                  <input type="number" value={sortOrder} onChange={e => setSortOrder(Number(e.target.value))} min={0} className="h-10 px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#334155]">Status</label>
                  <div className="relative h-10">
                    <select value={isActive ? 'active' : 'inactive'} onChange={e => setIsActive(e.target.value === 'active')} className="w-full h-full px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] appearance-none focus:outline-none focus:border-[#7f28bc]">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    <img src="/icons/chevron-down-icon.svg" alt="" className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
                  </div>
                </div>
              </div>
              <div className="bg-[#f8fafc] rounded-lg p-3 border border-[#e2e8f0]">
                <p className="text-xs font-semibold text-[#64748b]">Section Key: <code className="font-mono text-[#7f28bc]">{section.section_key}</code></p>
                <p className="text-xs text-[#94a3b8] mt-0.5">Type: {section.content_type} · Created: {new Date(section.created_at).toLocaleDateString('en-IN')}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#e2e8f0] px-6 py-4 flex gap-3 flex-shrink-0">
          <button onClick={onClose} disabled={saving} className="flex-1 h-10 border border-[#7f28bc] rounded-lg text-sm font-semibold text-[#7f28bc] hover:bg-[#faf5ff] disabled:opacity-50 transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} disabled={saving} className="flex-1 h-10 bg-[#7f28bc] rounded-lg text-sm font-semibold text-white hover:bg-[#6d1fa3] disabled:opacity-60 transition-colors shadow-sm">
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
