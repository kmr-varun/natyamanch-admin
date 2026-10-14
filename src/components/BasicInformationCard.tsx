export default function BasicInformationCard() {
  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] p-[21px] flex flex-col gap-4">
      {/* Header */}
      <h2 className="text-base font-bold text-[#1e293b] leading-5">
        Basic Information
      </h2>

      {/* Title & Slug Row */}
      <div className="flex gap-4">
        {/* Title */}
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-sm font-semibold text-[#334155] leading-4">
            Title <span className="text-[#f43f5e]">*</span>
          </label>
          <input
            type="text"
            defaultValue="Hello Inspector"
            className="h-10 px-[13px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs font-medium text-[#1e293b] focus:outline-none focus:border-[#7f28bc]"
          />
        </div>

        {/* Slug */}
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-sm font-semibold text-[#334155] leading-4">
            Slug (URL) <span className="text-[#f43f5e]">*</span>
          </label>
          <input
            type="text"
            defaultValue="hello-inspector"
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
          defaultValue="A affluent family, celebrating their daughters engagement to a wellknown producers son in their farm house. The celebrations are suddenly interrupted with the arrival of an inspector, investigating the suicide of young girl!"
          className="px-[13px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#334155] leading-[19.5px] resize-none focus:outline-none focus:border-[#7f28bc]"
        />
        <div className="flex justify-end pt-1.5">
          <span className="text-[10px] font-medium text-[#94a3b8] leading-[15px]">
            214/300
          </span>
        </div>
      </div>

      {/* Full Description */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-[#334155] leading-4">
          Full Description
        </label>
        <div className="border border-[#e2e8f0] rounded-lg overflow-hidden">
          <textarea
            rows={4}
            defaultValue={`The celebrations are suddenly interrupted with the arrival of an inspector, investigating the suicide of young girl! why has to come there? what has the family got to do with the young girl's suicide?? watch the Marathi Play - HELLO INSPECTOR on Natyamanch APP`}
            className="w-full px-3 py-3 bg-white text-xs text-[#334155] leading-[19.5px] resize-none focus:outline-none border-0"
          />
        </div>
        <div className="flex justify-end">
          <span className="text-[10px] font-medium text-[#94a3b8] leading-[15px]">
            256/2000
          </span>
        </div>
      </div>

      {/* Category, Language, Duration Row */}
      <div className="flex gap-3">
        {/* Category */}
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#334155] leading-4">
            Category <span className="text-[#f43f5e]">*</span>
          </label>
          <div className="relative h-10">
            <select className="w-full h-full px-[13px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#334155] appearance-none focus:outline-none focus:border-[#7f28bc]">
              <option>Drama</option>
              <option>Comedy</option>
              <option>Tragedy</option>
            </select>
            <img
              src="/icons/chevron-down-small.svg"
              alt=""
              className="absolute right-[13px] top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
            />
          </div>
        </div>

        {/* Language */}
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#334155] leading-4">
            Language <span className="text-[#f43f5e]">*</span>
          </label>
          <div className="relative h-10">
            <select className="w-full h-full px-[13px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#334155] appearance-none focus:outline-none focus:border-[#7f28bc]">
              <option>Marathi</option>
              <option>Hindi</option>
              <option>English</option>
            </select>
            <img
              src="/icons/chevron-down-small.svg"
              alt=""
              className="absolute right-[13px] top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
            />
          </div>
        </div>

        {/* Duration */}
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#334155] leading-4">
            Duration (HH:MM:SS) <span className="text-[#f43f5e]">*</span>
          </label>
          <input
            type="text"
            defaultValue="02:15:30"
            className="h-10 px-[13px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#334155] font-mono focus:outline-none focus:border-[#7f28bc]"
          />
        </div>
      </div>
    </div>
  )
}
