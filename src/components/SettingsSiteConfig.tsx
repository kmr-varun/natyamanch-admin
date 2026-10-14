export default function SettingsSiteConfig() {
  const features = [
    { label: 'Allow User Registration', description: 'Allow new users to sign up', enabled: true },
    { label: 'Enable Subscriptions', description: 'Allow subscription plans', enabled: true },
    { label: 'Enable Pay-per-View', description: 'Allow individual video purchases', enabled: true },
    { label: 'Enable Reviews & Ratings', description: 'Allow users to review content', enabled: true },
    { label: 'Enable Comments', description: 'Allow comments on videos', enabled: true },
    { label: 'Maintenance Mode', description: 'Temporarily disable the website', enabled: true },
    { label: 'Show Trailer for Paid Videos', description: 'Allow free trailer preview', enabled: true },
  ]

  return (
    <div className="bg-white border border-[rgba(226,232,240,0.9)] shadow-sm rounded-xl p-[21px] flex flex-col gap-4">
      {/* Card Header */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 bg-[#f0fdfa] rounded-lg flex items-center justify-center flex-shrink-0">
          <img src="/icons/site-config-icon.svg" alt="" className="w-5 h-5" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-[#0f172a] leading-[19.25px]">Site Configuration</h3>
          <p className="text-xs text-[#64748b] leading-4">Control key website settings and features.</p>
        </div>
      </div>

      {/* Feature Toggles List */}
      <div className="flex flex-col gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center justify-between h-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold text-[#1e293b] leading-4">{feature.label}</span>
              <span className="text-xs text-[#94a3b8] leading-[16.5px]">{feature.description}</span>
            </div>
            <img src="/icons/site-toggle-icon.svg" alt="" className="w-[28.688px] h-[17px]" />
          </div>
        ))}
      </div>
    </div>
  )
}
