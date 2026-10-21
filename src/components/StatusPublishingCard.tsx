import { useVideoForm } from '../contexts/VideoFormContext'

export default function StatusPublishingCard() {
  const form = useVideoForm()

  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] p-[21px] flex flex-col gap-4">
      <h2 className="text-base font-bold text-[#1e293b] leading-5">Status & Publishing</h2>

      <div className="flex gap-3">
        {/* Status */}
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-sm font-semibold text-[#334155] leading-[16.5px]">Status</label>
          <div className="relative h-10">
            <select
              value={form.isPublished ? 'published' : 'draft'}
              onChange={e => form.setField('isPublished', e.target.value === 'published')}
              className="w-full h-full px-[13px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#334155] appearance-none focus:outline-none focus:border-[#7f28bc]"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <img src="/icons/chevron-down-small.svg" alt="" className="absolute right-[13px] top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
          </div>
        </div>

        {/* Certification */}
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-sm font-semibold text-[#334155] leading-[16.5px]">Certification</label>
          <div className="relative h-10">
            <select
              value={form.certification}
              onChange={e => form.setField('certification', e.target.value)}
              className="w-full h-full px-[13px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#334155] appearance-none focus:outline-none focus:border-[#7f28bc]"
            >
              <option value="U">U</option>
              <option value="U/A 7+">U/A 7+</option>
              <option value="U/A 13+">U/A 13+</option>
              <option value="A">A</option>
            </select>
            <img src="/icons/chevron-down-small.svg" alt="" className="absolute right-[13px] top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  )
}
