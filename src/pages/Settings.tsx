import SettingsGeneral from '../components/SettingsGeneral'
import SettingsEmailNotifications from '../components/SettingsEmailNotifications'
import SettingsBranding from '../components/SettingsBranding'
import SettingsSiteConfig from '../components/SettingsSiteConfig'

export default function Settings() {
  return (
    <div className="p-8 flex flex-col gap-6">
      {/* Two Column Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - 8 cols */}
        <div className="col-span-8 flex flex-col gap-6">
          <SettingsGeneral />
          <SettingsEmailNotifications />
        </div>

        {/* Right Column - 4 cols */}
        <div className="col-span-4 flex flex-col gap-6">
          <SettingsBranding />
          <SettingsSiteConfig />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3">
        <button className="border border-[#e2e8f0] rounded-lg px-4 py-2.5 text-xs font-medium text-[#334155] leading-4">
          Cancel
        </button>
        <button className="bg-[#7f28bc] rounded-lg px-4 py-2.5 text-xs font-semibold text-white leading-4">
          Save Changes
        </button>
      </div>
    </div>
  )
}
