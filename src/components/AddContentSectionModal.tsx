import { useState } from 'react'
import { contentApi } from '../lib/api'

interface Props {
  isOpen: boolean
  onClose: () => void
  onAdded: () => void
}

const CONTENT_TYPES = [
  { value: 'json_object', label: 'JSON Object (key-value fields)' },
  { value: 'json_array', label: 'JSON Array (list of items)' },
  { value: 'html', label: 'HTML Content' },
  { value: 'text', label: 'Plain Text' },
]

function toKey(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')
}

export default function AddContentSectionModal({ isOpen, onClose, onAdded }: Props) {
  const [title, setTitle] = useState('')
  const [sectionKey, setSectionKey] = useState('')
  const [description, setDescription] = useState('')
  const [contentType, setContentType] = useState('json_object')
  const [keyEdited, setKeyEdited] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const reset = () => {
    setTitle(''); setSectionKey(''); setDescription(''); setContentType('json_object')
    setKeyEdited(false); setError('')
  }

  const handleTitleChange = (v: string) => {
    setTitle(v)
    if (!keyEdited) setSectionKey(toKey(v))
  }

  const handleSubmit = async () => {
    if (!title.trim()) { setError('Title is required'); return }
    if (!sectionKey.trim()) { setError('Section key is required'); return }
    setError('')
    setSaving(true)
    try {
      const defaultContent = contentType === 'json_array' ? '[]' : contentType === 'json_object' ? '{"field": ""}' : ''
      await contentApi.create({ sectionKey: sectionKey.trim(), title: title.trim(), description: description || undefined, contentType, content: defaultContent })
      reset()
      onAdded()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create section')
    } finally {
      setSaving(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={e => { if (e.target === e.currentTarget) { onClose(); reset() } }}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg flex flex-col">
        <div className="border-b border-[#e2e8f0] px-6 py-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#0f172a]">Add Content Section</h2>
          <button onClick={() => { onClose(); reset() }} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 text-lg">×</button>
        </div>

        <div className="p-6 flex flex-col gap-4">
          {error && <p className="text-xs text-[#ef4444] bg-[#fef2f2] border border-[#fecaca] rounded-lg px-3 py-2">{error}</p>}

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#334155]">Title <span className="text-[#f43f5e]">*</span></label>
            <input type="text" value={title} onChange={e => handleTitleChange(e.target.value)} placeholder="e.g. Hero Slides" className="h-10 px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc]" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#334155]">Section Key <span className="text-[#f43f5e]">*</span></label>
            <input
              type="text"
              value={sectionKey}
              onChange={e => { setSectionKey(e.target.value); setKeyEdited(true) }}
              placeholder="e.g. hero_slides"
              className="h-10 px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm font-mono text-[#7f28bc] focus:outline-none focus:border-[#7f28bc]"
            />
            <p className="text-[11px] text-[#94a3b8]">Used in the API: <code className="font-mono">/api/content/{sectionKey || 'key'}</code></p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#334155]">Content Type <span className="text-[#f43f5e]">*</span></label>
            <div className="relative h-10">
              <select value={contentType} onChange={e => setContentType(e.target.value)} className="w-full h-full px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] appearance-none focus:outline-none focus:border-[#7f28bc]">
                {CONTENT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
              <img src="/icons/chevron-down-icon.svg" alt="" className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#334155]">Description</label>
            <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Optional description" className="h-10 px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] focus:outline-none focus:border-[#7f28bc]" />
          </div>
        </div>

        <div className="border-t border-[#e2e8f0] px-6 py-4 flex gap-3">
          <button onClick={() => { onClose(); reset() }} disabled={saving} className="flex-1 h-10 border border-[#7f28bc] rounded-lg text-sm font-semibold text-[#7f28bc] hover:bg-[#faf5ff] disabled:opacity-50 transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={saving} className="flex-1 h-10 bg-[#7f28bc] rounded-lg text-sm font-semibold text-white hover:bg-[#6d1fa3] disabled:opacity-60 transition-colors shadow-sm">
            {saving ? 'Creating…' : 'Create Section'}
          </button>
        </div>
      </div>
    </div>
  )
}
