import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useVideoForm } from '../contexts/VideoFormContext'
import { videosApi } from '../lib/api'

export default function VideoActionBar() {
  const form = useVideoForm()
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const buildBody = (publish: boolean) => ({
    title: form.title,
    slug: form.slug || undefined,
    shortDescription: form.shortDescription || undefined,
    fullDescription: form.fullDescription || undefined,
    categoryId: form.categoryId || undefined,
    language: form.language,
    durationSeconds: form.durationSeconds || undefined,
    priceInr: form.priceInr,
    certification: form.certification || undefined,
    castCrew: form.castCrew.length > 0 ? form.castCrew : undefined,
    year: form.year ? parseInt(form.year) : undefined,
    cloudflareVideoId: form.cloudflareVideoId || undefined,
    trailerCloudflareId: form.trailerCloudflareId || undefined,
    playbackPolicy: form.playbackPolicy,
    isPublished: publish,
    isFeatured: form.isFeatured,
  })

  const handleSave = async (publish: boolean) => {
    if (!form.title.trim()) { setError('Title is required'); return }
    if (form.priceInr === undefined || form.priceInr === null) { setError('Price is required'); return }
    setError('')
    setSaving(true)
    try {
      await videosApi.create(buildBody(publish))
      navigate('/videos')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save video')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-[6px] bg-[rgba(255,255,255,0.95)] border-t border-[#e2e8f0] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
      {error && (
        <div className="px-8 pt-2">
          <p className="text-xs text-[#ef4444]">{error}</p>
        </div>
      )}
      <div className="flex items-center justify-end gap-3 px-8 py-[14px]">
        <button
          onClick={() => navigate('/videos')}
          disabled={saving}
          className="px-[21px] py-2 bg-white border border-[#cbd5e1] rounded-lg text-sm font-semibold text-[#334155] leading-4 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          onClick={() => handleSave(false)}
          disabled={saving}
          className="px-[21px] py-2 bg-white border border-[#cbd5e1] rounded-lg text-sm font-semibold text-[#334155] leading-4 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save as Draft'}
        </button>

        <button
          onClick={() => handleSave(true)}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2 bg-[#7f28bc] rounded-lg text-sm font-semibold text-white leading-4 shadow-sm hover:bg-[#6d1fa3] transition-colors disabled:opacity-50"
        >
          <img src="/icons/paper-plane-icon.svg" alt="" className="w-[12.005px] h-[12.006px]" />
          {saving ? 'Publishing…' : 'Publish Play'}
        </button>
      </div>
    </div>
  )
}
