import { handleDropdownChange } from '../utils/mockHandlers'

export default function StatusPublishingCard() {

  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] p-[21px] flex flex-col gap-4">
      {/* Header */}
      <h2 className="text-base font-bold text-[#1e293b] leading-5">
        Status & Publishing
      </h2>

      {/* Status, Publish Date, Schedule Row */}
      <div className="flex gap-3">
        {/* Status */}
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-sm font-semibold text-[#334155] leading-[16.5px]">
            Status
          </label>
          <div className="relative h-10">
            <select onChange={(e) => handleDropdownChange('Status', e.target.value)} className="w-full h-full px-[13px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#334155] appearance-none focus:outline-none focus:border-[#7f28bc]">
              <option>Draft</option>
              <option>Published</option>
              <option>Scheduled</option>
            </select>
            <img
              src="/icons/chevron-down-small.svg"
              alt=""
              className="absolute right-[13px] top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
            />
          </div>
        </div>

        {/* Publish Date */}
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-sm font-semibold text-[#334155] leading-[16.5px]">
            Publish Date
          </label>
          <div className="relative h-10">
            <input
              type="text"
              defaultValue="12 Aug 2025"
              className="w-full h-full px-[13px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#334155] focus:outline-none focus:border-[#7f28bc]"
            />
            <img
              src="/icons/calendar-icon.svg"
              alt=""
              className="absolute right-[9.83px] top-1/2 -translate-y-1/2 w-[10.5px] h-3 pointer-events-none"
            />
          </div>
        </div>

        {/* Schedule (Optional) */}
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-sm font-semibold text-[#334155] leading-[16.5px]">
            Schedule (Optional)
          </label>
          <div className="relative h-10">
            <input
              type="text"
              placeholder="Select date & time"
              className="w-full h-full px-[13px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#6b7280] placeholder:text-[#6b7280] focus:outline-none focus:border-[#7f28bc]"
            />
            <img
              src="/icons/calendar-icon.svg"
              alt=""
              className="absolute right-[8.5px] top-1/2 -translate-y-1/2 w-[10.5px] h-3 pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
