interface Props {
  settings: Record<string, string>
  onChange: (key: string, value: string) => void
}

const Toggle = ({ checked, onToggle }: { checked: boolean; onToggle: () => void }) => (
  <button
    onClick={onToggle}
    className={`w-[29px] h-[17px] rounded-full transition-colors flex-shrink-0 relative ${checked ? 'bg-[#7f28bc]' : 'bg-[#cbd5e1]'}`}
  >
    <div className={`absolute top-[2px] w-[13px] h-[13px] bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-[14px]' : 'translate-x-[2px]'}`} />
  </button>
)

const FEATURES = [
  { key: 'allow_registration', label: 'Allow User Registration', description: 'Allow new users to sign up', def: 'true' },
  { key: 'enable_subscriptions', label: 'Enable Subscriptions', description: 'Allow subscription plans', def: 'true' },
  { key: 'enable_ppv', label: 'Enable Pay-per-View', description: 'Allow individual video purchases', def: 'true' },
  { key: 'enable_reviews', label: 'Enable Reviews & Ratings', description: 'Allow users to review content', def: 'true' },
  { key: 'enable_comments', label: 'Enable Comments', description: 'Allow comments on videos', def: 'true' },
  { key: 'maintenance_mode', label: 'Maintenance Mode', description: 'Temporarily disable the website', def: 'false' },
  { key: 'show_trailer', label: 'Show Trailer for Paid Videos', description: 'Allow free trailer preview', def: 'true' },
]

export default function SettingsSiteConfig({ settings, onChange }: Props) {
  const toggled = (key: string, def: string) => (settings[key] ?? def) === 'true'
  const toggle = (key: string, def: string) => onChange(key, toggled(key, def) ? 'false' : 'true')

  return (
    <div className="bg-white border border-[rgba(226,232,240,0.9)] shadow-sm rounded-xl p-[21px] flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 bg-[#f0fdfa] rounded-lg flex items-center justify-center flex-shrink-0">
          <img src="/icons/site-config-icon.svg" alt="" className="w-5 h-5" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-[#0f172a] leading-[19.25px]">Site Configuration</h3>
          <p className="text-xs text-[#64748b] leading-4">Control key website settings and features.</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {FEATURES.map(feature => (
          <div key={feature.key} className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold text-[#1e293b] leading-4">{feature.label}</span>
              <span className="text-xs text-[#94a3b8] leading-[16.5px]">{feature.description}</span>
            </div>
            <Toggle checked={toggled(feature.key, feature.def)} onToggle={() => toggle(feature.key, feature.def)} />
          </div>
        ))}
      </div>
    </div>
  )
}
