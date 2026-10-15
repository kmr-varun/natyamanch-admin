import { handleDropdownChange, handleClick } from '../utils/mockHandlers'

interface AdditionalDetailsCardProps {
  mode?: 'add' | 'edit'
  initialData?: {
    releaseYear: string
    director: string
    writer: string
    subtitles: string[]
    ageRating: string
    tags: string[]
  }
}

export default function AdditionalDetailsCard({ mode = 'add', initialData }: AdditionalDetailsCardProps) {

  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] p-[21px] flex flex-col gap-4">
      {/* Header */}
      <h2 className="text-base font-bold text-[#1e293b] leading-5">
        Additional Details
      </h2>

      {/* Release Year, Director, Writer Row */}
      <div className="flex gap-3">
        {/* Release Year */}
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-sm font-semibold text-[#334155] leading-[16.5px]">
            Release Year
          </label>
          <input
            type="text"
            defaultValue={mode === 'edit' ? initialData?.releaseYear : ''}
            placeholder="YYYY"
            className="h-10 px-[13px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#334155] focus:outline-none focus:border-[#7f28bc]"
          />
        </div>

        {/* Director */}
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-sm font-semibold text-[#334155] leading-[16.5px]">
            Director
          </label>
          <input
            type="text"
            defaultValue={mode === 'edit' ? initialData?.director : ''}
            placeholder="Enter director name"
            className="h-10 px-[13px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#334155] focus:outline-none focus:border-[#7f28bc]"
          />
        </div>

        {/* Writer */}
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-sm font-semibold text-[#334155] leading-[16.5px]">
            Writer
          </label>
          <input
            type="text"
            defaultValue={mode === 'edit' ? initialData?.writer : ''}
            placeholder="Enter writer name"
            className="h-10 px-[13px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#334155] focus:outline-none focus:border-[#7f28bc]"
          />
        </div>
      </div>

      {/* Subtitles & Age Rating Row */}
      <div className="grid grid-cols-12 gap-3">
        {/* Subtitles (8 columns) */}
        <div className="col-span-8 flex flex-col gap-1">
          <label className="text-sm font-semibold text-[#334155] leading-[16.5px]">
            Subtitles
          </label>
          <div className="h-10 bg-white border border-[#e2e8f0] rounded-lg flex items-center gap-2 px-2 py-[7px]">
            {/* English Tag */}
            <div className="flex items-center gap-1 px-2 py-0.5 bg-[#f1f5f9] rounded-md">
              <span className="text-[11px] text-[#334155] leading-[16.5px]">
                English
              </span>
              <button onClick={() => handleClick('Remove English subtitle')} className="text-[11px] text-[#94a3b8] leading-[16.5px]">
                ×
              </button>
            </div>

            {/* Marathi (CC) Tag */}
            <div className="flex items-center gap-1 px-2 py-0.5 bg-[#f1f5f9] rounded-md">
              <span className="text-[11px] text-[#334155] leading-[16.5px]">
                Marathi (CC)
              </span>
              <button onClick={() => handleClick('Remove Marathi (CC) subtitle')} className="text-[11px] text-[#94a3b8] leading-[16.5px]">
                ×
              </button>
            </div>

            {/* Hindi Tag */}
            <div className="flex items-center gap-1 px-2 py-0.5 bg-[#f1f5f9] rounded-md">
              <span className="text-[11px] text-[#334155] leading-[16.5px]">
                Hindi
              </span>
              <button onClick={() => handleClick('Remove Hindi subtitle')} className="text-[11px] text-[#94a3b8] leading-[16.5px]">
                ×
              </button>
            </div>
          </div>
        </div>

        {/* Age Rating (4 columns) */}
        <div className="col-span-4 flex flex-col gap-1">
          <label className="text-sm font-semibold text-[#334155] leading-[16.5px]">
            Age Rating
          </label>
          <div className="relative h-10">
            <select onChange={(e) => handleDropdownChange('Age Rating', e.target.value)} className="w-full h-full px-[13px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#334155] appearance-none focus:outline-none focus:border-[#7f28bc]">
              <option>U/A 13+</option>
              <option>U</option>
              <option>U/A 7+</option>
              <option>A</option>
            </select>
            <img
              src="/icons/chevron-down-small.svg"
              alt=""
              className="absolute right-[13px] top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-[#334155] leading-[16.5px]">
          Tags (comma separated)
        </label>
        <input
          type="text"
          defaultValue="Family Drama, Comedy, Inspector, Marathi Play"
          className="h-10 px-[13px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#334155] focus:outline-none focus:border-[#7f28bc]"
        />
      </div>
    </div>
  )
}
