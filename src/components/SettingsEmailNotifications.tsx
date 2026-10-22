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

export default function SettingsEmailNotifications({ settings, onChange }: Props) {
  const toggled = (key: string, defaultVal = 'false') => (settings[key] ?? defaultVal) === 'true'
  const toggle = (key: string, defaultVal = 'false') => onChange(key, toggled(key, defaultVal) ? 'false' : 'true')

  return (
    <div className="bg-white border border-[rgba(226,232,240,0.9)] shadow-sm rounded-xl p-[21px] flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 bg-[#faf5ff] rounded-lg flex items-center justify-center flex-shrink-0">
          <img src="/icons/email-notification-icon.svg" alt="" className="w-[15.552px] h-[11px]" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-[#0f172a] leading-[19.25px]">Email & Notifications</h3>
          <p className="text-xs text-[#64748b] leading-4">Configure email settings and notifications.</p>
        </div>
      </div>

      <div className="flex flex-col gap-[14px]">
        <div className="flex items-start gap-3">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#334155] leading-4">From Name</label>
            <input
              type="text"
              value={settings.email_from_name ?? 'Natyamanch'}
              onChange={e => onChange('email_from_name', e.target.value)}
              className="h-10 bg-white border border-[#e2e8f0] rounded-lg px-[11px] text-xs text-[#1e293b] leading-4 outline-none focus:border-[#7f28bc]"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#334155] leading-4">From Email</label>
            <input
              type="email"
              value={settings.email_from_address ?? ''}
              onChange={e => onChange('email_from_address', e.target.value)}
              className="h-10 bg-white border border-[#e2e8f0] rounded-lg px-[11px] text-xs text-[#1e293b] leading-4 outline-none focus:border-[#7f28bc]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#334155] leading-4">SMTP Provider</label>
          <div className="relative">
            <select
              value={settings.smtp_provider ?? 'sendgrid'}
              onChange={e => onChange('smtp_provider', e.target.value)}
              className="w-full h-10 bg-white border border-[#e2e8f0] rounded-lg px-[11px] text-xs text-[#1e293b] leading-4 appearance-none outline-none focus:border-[#7f28bc]"
            >
              <option value="sendgrid">SendGrid</option>
              <option value="mailgun">Mailgun</option>
              <option value="ses">Amazon SES</option>
              <option value="smtp">Custom SMTP</option>
            </select>
            <img src="/icons/dropdown-arrow-gray.svg" alt="" className="absolute right-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-2">
          {[
            { key: 'email_order_confirmation', label: 'Send Order Confirmation Emails', def: 'true' },
            { key: 'email_subscription_renewal', label: 'Send Subscription Renewal Emails', def: 'false' },
            { key: 'email_marketing', label: 'Send Marketing Emails', def: 'false' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#1e293b] leading-4">{item.label}</span>
              <Toggle checked={toggled(item.key, item.def)} onToggle={() => toggle(item.key, item.def)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
