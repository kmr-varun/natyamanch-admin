export default function SettingsGeneral() {
  return (
    <div className="bg-white border border-[rgba(226,232,240,0.9)] shadow-sm rounded-xl p-[21px] flex flex-col gap-4">
      {/* Card Header */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 bg-[#faf5ff] rounded-lg flex items-center justify-center flex-shrink-0">
          <img src="/icons/settings-gear-icon.svg" alt="" className="w-5 h-5" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-[#0f172a] leading-[19.25px]">General Settings</h3>
          <p className="text-xs text-[#64748b] leading-4">Basic information about your website.</p>
        </div>
      </div>

      {/* Fields */}
      <div className="flex flex-col gap-[14px]">
        {/* Website Name + Tagline */}
        <div className="flex items-start gap-3">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#334155] leading-4">
              Website Name <span className="text-[#ef4444]">*</span>
            </label>
            <input
              type="text"
              defaultValue="Natyamanch"
              className="h-10 bg-white border border-[#e2e8f0] rounded-lg px-[11px] py-[7px] text-xs text-[#1e293b] leading-4"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#334155] leading-4">Tagline</label>
            <input
              type="text"
              defaultValue="Discover. Watch. Celebrate Theatre"
              className="h-10 bg-white border border-[#e2e8f0] rounded-lg px-[11px] py-[7px] text-xs text-[#1e293b] leading-4"
            />
          </div>
        </div>

        {/* Website URL */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#334155] leading-4">
            Website URL <span className="text-[#ef4444]">*</span>
          </label>
          <input
            type="text"
            defaultValue="https://natyamanch.com"
            className="h-10 bg-white border border-[#e2e8f0] rounded-lg px-[11px] py-[7px] text-xs text-[#1e293b] leading-4"
          />
        </div>

        {/* Support Email */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#334155] leading-4">
            Support Email <span className="text-[#ef4444]">*</span>
          </label>
          <input
            type="text"
            defaultValue="support@natyamanch.com"
            className="h-10 bg-white border border-[#e2e8f0] rounded-lg px-[11px] py-[7px] text-xs text-[#1e293b] leading-4"
          />
        </div>

        {/* Default Language + Timezone */}
        <div className="flex flex-col gap-3">
          {/* Default Language */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#334155] leading-4">Default Language</label>
            <div className="relative">
              <select className="w-full h-10 bg-white border border-[#e2e8f0] rounded-lg px-[11px] py-[7px] text-xs text-[#1e293b] leading-4 appearance-none">
                <option>English</option>
              </select>
              <img
                src="/icons/dropdown-arrow-gray.svg"
                alt=""
                className="absolute right-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] pointer-events-none"
              />
            </div>
          </div>

          {/* Timezone */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#334155] leading-4">Timezone</label>
            <div className="relative">
              <select className="w-full h-10 bg-white border border-[#e2e8f0] rounded-lg px-[11px] py-[7px] text-xs text-[#1e293b] leading-4 appearance-none">
                <option>(GMT+05:30) India Standard Time</option>
              </select>
              <img
                src="/icons/dropdown-arrow-gray.svg"
                alt=""
                className="absolute right-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
