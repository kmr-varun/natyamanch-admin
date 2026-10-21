import { useEffect, useState } from 'react'
import { useVideoForm } from '../contexts/VideoFormContext'
import { categoriesApi, type AdminCategory } from '../lib/api'

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function BasicInformationCard() {
  const form = useVideoForm()
  const [categories, setCategories] = useState<AdminCategory[]>([])

  useEffect(() => {
    categoriesApi.list().then(res => setCategories(res.categories)).catch(() => {})
  }, [])

  const handleTitleChange = (value: string) => {
    form.setField('title', value)
    if (!form.slug) form.setField('slug', slugify(value))
  }

  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] p-[21px] flex flex-col gap-4">
      <h2 className="text-base font-bold text-[#1e293b] leading-5">Basic Information</h2>

      {/* Title & Slug */}
      <div className="flex gap-4">
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-sm font-semibold text-[#334155] leading-4">
            Title <span className="text-[#f43f5e]">*</span>
          </label>
          <input
            type="text"
            value={form.title}
            onChange={e => handleTitleChange(e.target.value)}
            placeholder="Enter video title"
            className="h-10 px-[13px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs font-medium text-[#1e293b] focus:outline-none focus:border-[#7f28bc]"
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-sm font-semibold text-[#334155] leading-4">
            Slug (URL) <span className="text-[#f43f5e]">*</span>
          </label>
          <input
            type="text"
            value={form.slug}
            onChange={e => form.setField('slug', e.target.value)}
            placeholder="video-slug"
            className="h-10 px-[13px] py-2 bg-[rgba(248,250,252,0.5)] border border-[#e2e8f0] rounded-lg text-xs text-[#334155] font-mono focus:outline-none focus:border-[#7f28bc]"
          />
        </div>
      </div>

      {/* Short Description */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-[#334155] leading-4">
          Short Description <span className="text-[#f43f5e]">*</span>
        </label>
        <textarea
          rows={3}
          value={form.shortDescription}
          onChange={e => form.setField('shortDescription', e.target.value)}
          placeholder="Enter a short description (max 300 characters)"
          maxLength={300}
          className="px-[13px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#334155] leading-[19.5px] resize-none focus:outline-none focus:border-[#7f28bc]"
        />
        <div className="flex justify-end pt-1.5">
          <span className="text-[10px] font-medium text-[#94a3b8] leading-[15px]">{form.shortDescription.length}/300</span>
        </div>
      </div>

      {/* Full Description */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-[#334155] leading-4">Full Description</label>
        <div className="border border-[#e2e8f0] rounded-lg overflow-hidden">
          <textarea
            rows={4}
            value={form.fullDescription}
            onChange={e => form.setField('fullDescription', e.target.value)}
            placeholder="Enter full description (max 2000 characters)"
            maxLength={2000}
            className="w-full px-3 py-3 bg-white text-xs text-[#334155] leading-[19.5px] resize-none focus:outline-none border-0"
          />
        </div>
        <div className="flex justify-end">
          <span className="text-[10px] font-medium text-[#94a3b8] leading-[15px]">{form.fullDescription.length}/2000</span>
        </div>
      </div>

      {/* Category, Language, Duration */}
      <div className="flex gap-3">
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#334155] leading-4">
            Category <span className="text-[#f43f5e]">*</span>
          </label>
          <div className="relative h-10">
            <select
              value={form.categoryId}
              onChange={e => form.setField('categoryId', e.target.value)}
              className="w-full h-full px-[13px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#334155] appearance-none focus:outline-none focus:border-[#7f28bc]"
            >
              <option value="">Select category</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <img src="/icons/chevron-down-small.svg" alt="" className="absolute right-[13px] top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#334155] leading-4">
            Language <span className="text-[#f43f5e]">*</span>
          </label>
          <div className="relative h-10">
            <select
              value={form.language}
              onChange={e => form.setField('language', e.target.value)}
              className="w-full h-full px-[13px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#334155] appearance-none focus:outline-none focus:border-[#7f28bc]"
            >
              <option value="Marathi">Marathi</option>
              <option value="Hindi">Hindi</option>
              <option value="English">English</option>
            </select>
            <img src="/icons/chevron-down-small.svg" alt="" className="absolute right-[13px] top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#334155] leading-4">
            Duration (seconds)
          </label>
          <input
            type="number"
            value={form.durationSeconds || ''}
            onChange={e => form.setField('durationSeconds', parseInt(e.target.value) || 0)}
            placeholder="0"
            min={0}
            className="h-10 px-[13px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#334155] font-mono focus:outline-none focus:border-[#7f28bc]"
          />
        </div>
      </div>
    </div>
  )
}
