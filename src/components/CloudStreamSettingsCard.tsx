export default function CloudStreamSettingsCard() {
  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] p-[21px] flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-[#1e293b] leading-5">
          CloudStream Video Settings
        </h2>
        <a
          href="#"
          className="flex items-center gap-1 text-xs font-medium text-[#7f28bc] leading-4 hover:underline"
        >
          How it works?
          <img src="/icons/external-link.svg" alt="" className="w-[8.75px] h-[7.5px]" />
        </a>
      </div>

      {/* CloudStream Video ID */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-[#334155] leading-4">
          CloudStream Video ID <span className="text-[#f43f5e]">*</span>
        </label>
        <div className="flex items-start gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              defaultValue="f3a9b2c1-6d4e-4a2b..."
              className="w-full h-10 px-[13px] py-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-xs text-[#334155] font-mono focus:outline-none focus:border-[#7f28bc]"
            />
            {/* Connected Badge & Edit Icon */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              <div className="flex items-center gap-1 px-2 py-0.5 bg-[#ecfdf5] border border-[#a7f3d0] rounded-md">
                <img src="/icons/check-small.svg" alt="" className="w-[7.875px] h-[5.625px]" />
                <span className="text-[10px] font-medium text-[#047857] leading-[15px]">
                  Connected
                </span>
              </div>
              <button className="p-0.5">
                <img src="/icons/edit-icon.svg" alt="" className="w-[7.5px] h-[7.5px]" />
              </button>
            </div>
          </div>
          {/* Stream Preview Button */}
          <button className="flex items-center gap-1.5 h-10 px-3 bg-[#7f28bc] rounded-lg text-xs font-medium text-white hover:bg-[#6d1fa3] transition-colors">
            <img src="/icons/play-circle.svg" alt="" className="w-[7.5px] h-[8.76px]" />
            Stream Preview
          </button>
        </div>
      </div>

      {/* Playback Policy */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-[#334155] leading-4">
          Playback Policy
        </label>
        <div className="relative h-10">
          <select className="w-full h-full px-[13px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#334155] appearance-none focus:outline-none focus:border-[#7f28bc]">
            <option>Domain Restricted (Recommended)</option>
            <option>Public</option>
            <option>Private</option>
          </select>
          <img
            src="/icons/chevron-down-small.svg"
            alt=""
            className="absolute right-[13px] top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
          />
        </div>
        <p className="text-[11px] text-[#94a3b8] leading-[16.5px]">
          Video will only play on your website/app domain
        </p>
      </div>

      {/* Security */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-[#334155] leading-4">
          Security
        </h3>
        <div className="flex flex-col gap-2">
          {/* Enable DRM */}
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                defaultChecked
                className="w-[18px] h-[18px] border border-transparent rounded bg-[#7e22ce] appearance-none cursor-pointer checked:bg-[#7e22ce]"
              />
              <img
                src="/icons/check-white.svg"
                alt=""
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              />
            </div>
            <span className="text-xs text-[#334155] leading-4">
              Enable DRM (Widevine, FairPlay, etc.)
            </span>
          </label>

          {/* Prevent Downloading */}
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                defaultChecked
                className="w-[18px] h-[18px] border border-transparent rounded bg-[#7e22ce] appearance-none cursor-pointer checked:bg-[#7e22ce]"
              />
              <img
                src="/icons/check-white.svg"
                alt=""
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              />
            </div>
            <span className="text-xs text-[#334155] leading-4">
              Prevent Downloading
            </span>
          </label>
        </div>
      </div>

      {/* Geo Restriction */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-[#334155] leading-4">
          Restrict to allowed countries{' '}
          <span className="font-normal text-[#94a3b8]">(Optional)</span>
        </label>
        <div className="h-10 bg-white border border-[#e2e8f0] rounded-lg flex items-center px-2 gap-1">
          <span className="text-xs font-medium text-[#475569] px-2">
            Allowed in selected countries
          </span>
          <img src="/icons/close-small.svg" alt="" className="w-[7.875px] h-[4.5px]" />

          {/* Country Tags */}
          <div className="flex items-center gap-1 ml-auto">
            <div className="flex items-center gap-1 px-2 py-0.5 bg-[#f1f5f9] rounded-md">
              <span className="text-[11px] font-medium text-[#334155] leading-[16.5px]">
                USA
              </span>
              <button className="text-[11px] font-medium text-[#94a3b8] leading-[16.5px]">
                ×
              </button>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-[#f1f5f9] rounded-md">
              <span className="text-[11px] font-medium text-[#334155] leading-[16.5px]">
                Canada
              </span>
              <button className="text-[11px] font-medium text-[#94a3b8] leading-[16.5px]">
                ×
              </button>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-[#f1f5f9] rounded-md">
              <span className="text-[11px] font-medium text-[#334155] leading-[16.5px]">
                UAE
              </span>
              <button className="text-[11px] font-medium text-[#94a3b8] leading-[16.5px]">
                ×
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
