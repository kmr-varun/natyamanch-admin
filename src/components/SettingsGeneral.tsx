interface Props {
  settings: Record<string, string>
  onChange: (key: string, value: string) => void
}

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'mr', label: 'Marathi' },
  { value: 'hi', label: 'Hindi' },
]

const TIMEZONES = [
  { value: 'Asia/Kolkata', label: '(GMT+05:30) India Standard Time' },
  { value: 'UTC', label: '(UTC+00:00) Coordinated Universal Time' },
  { value: 'America/New_York', label: '(GMT-05:00) Eastern Time' },
]

export default function SettingsGeneral({ settings, onChange }: Props) {
  return (
    <div className="bg-white border border-[rgba(226,232,240,0.9)] shadow-sm rounded-xl p-[21px] flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 bg-[#faf5ff] rounded-lg flex items-center justify-center flex-shrink-0">
          <img src="/icons/settings-gear-icon.svg" alt="" className="w-5 h-5" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-[#0f172a] leading-[19.25px]">General Settings</h3>
          <p className="text-xs text-[#64748b] leading-4">Basic information about your website.</p>
        </div>
      </div>

      <div className="flex flex-col gap-[14px]">
        <div className="flex items-start gap-3">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#334155] leading-4">Website Name <span className="text-[#ef4444]">*</span></label>
            <input
              type="text"
              value={settings.site_name ?? 'Natyamanch'}
              onChange={e => onChange('site_name', e.target.value)}
              className="h-10 bg-white border border-[#e2e8f0] rounded-lg px-[11px] text-xs text-[#1e293b] leading-4 outline-none focus:border-[#7f28bc]"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#334155] leading-4">Tagline</label>
            <input
              type="text"
              value={settings.tagline ?? ''}
              onChange={e => onChange('tagline', e.target.value)}
              className="h-10 bg-white border border-[#e2e8f0] rounded-lg px-[11px] text-xs text-[#1e293b] leading-4 outline-none focus:border-[#7f28bc]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#334155] leading-4">Website URL <span className="text-[#ef4444]">*</span></label>
          <input
            type="text"
            value={settings.website_url ?? ''}
            onChange={e => onChange('website_url', e.target.value)}
            className="h-10 bg-white border border-[#e2e8f0] rounded-lg px-[11px] text-xs text-[#1e293b] leading-4 outline-none focus:border-[#7f28bc]"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#334155] leading-4">Support Email <span className="text-[#ef4444]">*</span></label>
          <input
            type="email"
            value={settings.support_email ?? ''}
            onChange={e => onChange('support_email', e.target.value)}
            className="h-10 bg-white border border-[#e2e8f0] rounded-lg px-[11px] text-xs text-[#1e293b] leading-4 outline-none focus:border-[#7f28bc]"
          />
        </div>

        <div className="flex items-start gap-3">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#334155] leading-4">Default Language</label>
            <div className="relative">
              <select
                value={settings.default_language ?? 'en'}
                onChange={e => onChange('default_language', e.target.value)}
                className="w-full h-10 bg-white border border-[#e2e8f0] rounded-lg px-[11px] text-xs text-[#1e293b] leading-4 appearance-none outline-none focus:border-[#7f28bc]"
              >
                {LANGUAGES.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
              </select>
              <img src="/icons/dropdown-arrow-gray.svg" alt="" className="absolute right-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] pointer-events-none" />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#334155] leading-4">Timezone</label>
            <div className="relative">
              <select
                value={settings.timezone ?? 'Asia/Kolkata'}
                onChange={e => onChange('timezone', e.target.value)}
                className="w-full h-10 bg-white border border-[#e2e8f0] rounded-lg px-[11px] text-xs text-[#1e293b] leading-4 appearance-none outline-none focus:border-[#7f28bc]"
              >
                {TIMEZONES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
              <img src="/icons/dropdown-arrow-gray.svg" alt="" className="absolute right-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
