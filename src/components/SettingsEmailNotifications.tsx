export default function SettingsEmailNotifications() {
  return (
    <div className="bg-white border border-[rgba(226,232,240,0.9)] shadow-sm rounded-xl p-[21px] flex flex-col gap-4">
      {/* Card Header */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 bg-[#faf5ff] rounded-lg flex items-center justify-center flex-shrink-0">
          <img src="/icons/email-notification-icon.svg" alt="" className="w-[15.552px] h-[11px]" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-[#0f172a] leading-[19.25px]">Email & Notifications</h3>
          <p className="text-xs text-[#64748b] leading-4">Configure email settings and notifications.</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-[14px]">
        {/* From Name + From Email */}
        <div className="flex items-start gap-3">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#334155] leading-4">From Name</label>
            <input
              type="text"
              defaultValue="Natyamanch"
              className="h-10 bg-white border border-[#e2e8f0] rounded-lg px-[11px] py-[7px] text-xs text-[#1e293b] leading-4"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#334155] leading-4">From Email</label>
            <input
              type="text"
              defaultValue="no-reply@natyamanch.com"
              className="h-10 bg-white border border-[#e2e8f0] rounded-lg px-[11px] py-[7px] text-xs text-[#1e293b] leading-4"
            />
          </div>
        </div>

        {/* SMTP Provider + Test Connection Button */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#334155] leading-4">SMTP Provider</label>
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <select className="w-full h-10 bg-white border border-[#e2e8f0] rounded-lg px-[11px] py-[7px] text-xs text-[#1e293b] leading-4 appearance-none">
                <option>SendGrid</option>
              </select>
              <img
                src="/icons/dropdown-arrow-gray.svg"
                alt=""
                className="absolute right-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] pointer-events-none"
              />
            </div>
            <button className="h-10 bg-[rgba(250,245,255,0.5)] border border-[#e9d5ff] rounded-lg px-[9.1px] flex items-center gap-2 w-[141px]">
              <div className="w-[19.799px] h-[19.799px] flex items-center justify-center rotate-45">
                <img src="/icons/send-arrow-icon.svg" alt="" className="w-[14px] h-[14px]" />
              </div>
              <span className="text-xs font-semibold text-[#7f28bc] leading-4">Test Connection</span>
            </button>
          </div>
        </div>

        {/* Email Toggles */}
        <div className="flex flex-col gap-4 pt-2">
          {/* Send Order Confirmation Emails - ON */}
          <div className="h-4 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#1e293b] leading-4">Send Order Confirmation Emails</span>
            <img src="/icons/toggle-on-icon.svg" alt="" className="w-[28.688px] h-[17px]" />
          </div>

          {/* Send Subscription Renewal Emails - OFF */}
          <div className="h-4 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#1e293b] leading-4">Send Subscription Renewal Emails</span>
            <img src="/icons/toggle-off-icon.svg" alt="" className="w-[28.688px] h-[17px]" />
          </div>

          {/* Send Marketing Emails - OFF */}
          <div className="h-4 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#1e293b] leading-4">Send Marketing Emails</span>
            <img src="/icons/toggle-off-icon.svg" alt="" className="w-[28.688px] h-[17px]" />
          </div>
        </div>
      </div>
    </div>
  )
}
