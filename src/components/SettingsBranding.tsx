import { handleMedia, handleDropdownChange } from '../utils/mockHandlers'

export default function SettingsBranding() {

  return (
    <div className="bg-white border border-[rgba(226,232,240,0.9)] shadow-sm rounded-xl p-[21px] flex flex-col gap-[14px]">
      {/* Card Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-[#eff6ff] rounded-lg flex items-center justify-center flex-shrink-0">
          <img src="/icons/branding-palette-icon.svg" alt="" className="w-5 h-5" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-[#0f172a] leading-[19.25px]">Branding & Appearance</h3>
          <p className="text-xs text-[#64748b] leading-4">Manage your logo, branding and site appearance.</p>
        </div>
      </div>

      {/* Logo & Favicon Upload Preview Section */}
      <div className="flex flex-col gap-[11.99px] pt-0.5">
        {/* Logo */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#334155] leading-4">Logo</label>
          <div className="bg-[rgba(248,250,252,0.5)] border border-[#e2e8f0] rounded-lg h-[58px] flex items-center justify-center p-[11px]">
            <img src="/logo.svg" alt="Logo" className="h-full object-contain" />
          </div>
        </div>

        {/* Favicon + Change Button */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#334155] leading-4">Favicon</label>
          <div className="flex items-end gap-1.5">
            <div className="bg-[rgba(248,250,252,0.5)] border border-[#e2e8f0] rounded-lg h-[58px] w-[352px] flex items-center justify-center p-px">
              <img src="/logo.svg" alt="Favicon" className="h-full object-contain" />
            </div>
            <div className="flex flex-col gap-1 items-end">
              <button onClick={() => handleMedia.change('logo')} className="border border-[#7f28bc] rounded-lg px-[11px] py-[7px] w-[134px] text-xs font-semibold text-[#7f28bc] leading-4">
                Change Logo
              </button>
              <span className="text-[9.5px] text-[#94a3b8] leading-[11.88px] text-right w-[188px]">
                Recommended size: 200 x 60 px<br />Formats: PNG, SVG (Max 1MB)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary & Secondary Colors */}
      <div className="flex items-start gap-[11.99px]">
        {/* Primary Color */}
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#334155] leading-4">Primary Color</label>
          <div className="bg-white border border-[#e2e8f0] rounded-lg h-10 flex items-center px-[7px] py-[5px]">
            <div className="w-5 h-5 bg-[#6b21a8] rounded flex-shrink-0"></div>
            <input
              type="text"
              defaultValue="#6B21A8"
              className="flex-1 bg-transparent px-2 text-xs text-[#334155] leading-4 uppercase font-mono"
            />
          </div>
        </div>

        {/* Secondary Color */}
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#334155] leading-4">Secondary Color</label>
          <div className="bg-white border border-[#e2e8f0] rounded-lg h-10 flex items-center px-[7px] py-[5px]">
            <div className="w-5 h-5 bg-[#ec4899] rounded flex-shrink-0"></div>
            <input
              type="text"
              defaultValue="#EC4899"
              className="flex-1 bg-transparent px-2 text-xs text-[#334155] leading-4 uppercase font-mono"
            />
          </div>
        </div>
      </div>

      {/* Font Family */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-[#334155] leading-4">Font Family</label>
        <div className="relative">
          <select onChange={(e) => handleDropdownChange('Font Family', e.target.value)} className="w-full h-10 bg-white border border-[#e2e8f0] rounded-lg px-[11px] py-[7px] text-xs text-[#1e293b] leading-4 appearance-none">
            <option>Inter (Default)</option>
          </select>
          <img
            src="/icons/dropdown-arrow-gray.svg"
            alt=""
            className="absolute right-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] pointer-events-none"
          />
        </div>
      </div>
    </div>
  )
}
