interface Props {
  settings: Record<string, string>
  onChange: (key: string, value: string) => void
}

export default function SettingsBranding({ settings, onChange }: Props) {
  return (
    <div className="bg-white border border-[rgba(226,232,240,0.9)] shadow-sm rounded-xl p-[21px] flex flex-col gap-[14px]">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-[#eff6ff] rounded-lg flex items-center justify-center flex-shrink-0">
          <img src="/icons/branding-palette-icon.svg" alt="" className="w-5 h-5" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-[#0f172a] leading-[19.25px]">Branding & Appearance</h3>
          <p className="text-xs text-[#64748b] leading-4">Manage your logo, branding and site appearance.</p>
        </div>
      </div>

      {/* Logo preview (read-only for now) */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-[#334155] leading-4">Logo</label>
        <div className="bg-[rgba(248,250,252,0.5)] border border-[#e2e8f0] rounded-lg h-[58px] flex items-center justify-center p-[11px]">
          <img src="/logo.svg" alt="Logo" className="h-full object-contain" />
        </div>
        <span className="text-[10px] text-[#94a3b8]">Logo upload coming soon. Recommended: 200×60px PNG/SVG.</span>
      </div>

      {/* Primary & Secondary Colors */}
      <div className="flex items-start gap-3">
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#334155] leading-4">Primary Color</label>
          <div className="bg-white border border-[#e2e8f0] rounded-lg h-10 flex items-center px-[7px] py-[5px] gap-2">
            <input
              type="color"
              value={settings.primary_color ?? '#6B21A8'}
              onChange={e => onChange('primary_color', e.target.value)}
              className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent"
            />
            <input
              type="text"
              value={settings.primary_color ?? '#6B21A8'}
              onChange={e => onChange('primary_color', e.target.value)}
              className="flex-1 bg-transparent text-xs text-[#334155] leading-4 uppercase font-mono outline-none"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#334155] leading-4">Secondary Color</label>
          <div className="bg-white border border-[#e2e8f0] rounded-lg h-10 flex items-center px-[7px] py-[5px] gap-2">
            <input
              type="color"
              value={settings.secondary_color ?? '#EC4899'}
              onChange={e => onChange('secondary_color', e.target.value)}
              className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent"
            />
            <input
              type="text"
              value={settings.secondary_color ?? '#EC4899'}
              onChange={e => onChange('secondary_color', e.target.value)}
              className="flex-1 bg-transparent text-xs text-[#334155] leading-4 uppercase font-mono outline-none"
            />
          </div>
        </div>
      </div>

      {/* Font Family */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-[#334155] leading-4">Font Family</label>
        <div className="relative">
          <select
            value={settings.font_family ?? 'Inter'}
            onChange={e => onChange('font_family', e.target.value)}
            className="w-full h-10 bg-white border border-[#e2e8f0] rounded-lg px-[11px] text-xs text-[#1e293b] leading-4 appearance-none outline-none focus:border-[#7f28bc]"
          >
            <option value="Inter">Inter (Default)</option>
            <option value="Sora">Sora</option>
            <option value="Poppins">Poppins</option>
            <option value="Roboto">Roboto</option>
          </select>
          <img src="/icons/dropdown-arrow-gray.svg" alt="" className="absolute right-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] pointer-events-none" />
        </div>
      </div>
    </div>
  )
}
