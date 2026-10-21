import { useVideoForm } from '../contexts/VideoFormContext'

export default function AdditionalDetailsCard() {
  const form = useVideoForm()

  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] p-[21px] flex flex-col gap-4">
      <h2 className="text-base font-bold text-[#1e293b] leading-5">Additional Details</h2>

      {/* Year + Playback Policy */}
      <div className="flex gap-3">
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-sm font-semibold text-[#334155] leading-[16.5px]">Release Year</label>
          <input
            type="text"
            value={form.year}
            onChange={e => form.setField('year', e.target.value)}
            placeholder="YYYY"
            maxLength={4}
            className="h-10 px-[13px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#334155] focus:outline-none focus:border-[#7f28bc]"
          />
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <label className="text-sm font-semibold text-[#334155] leading-[16.5px]">Playback Policy</label>
          <div className="relative h-10">
            <select
              value={form.playbackPolicy}
              onChange={e => form.setField('playbackPolicy', e.target.value)}
              className="w-full h-full px-[13px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#334155] appearance-none focus:outline-none focus:border-[#7f28bc]"
            >
              <option value="signed">Signed (Recommended)</option>
              <option value="public">Public</option>
            </select>
            <img src="/icons/chevron-down-small.svg" alt="" className="absolute right-[13px] top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  )
}
