import SettingsGeneral from '../components/SettingsGeneral'
import SettingsEmailNotifications from '../components/SettingsEmailNotifications'
import SettingsBranding from '../components/SettingsBranding'
import SettingsSiteConfig from '../components/SettingsSiteConfig'
import { PageContainer, TwoColumnLayout, Button } from '../components/shared'
import { handleSettings } from '../utils/mockHandlers'

export default function Settings() {

  return (
    <PageContainer className="flex flex-col gap-6">
      <TwoColumnLayout
        leftColumn={
          <>
            <SettingsGeneral />
            <SettingsEmailNotifications />
          </>
        }
        rightColumn={
          <>
            <SettingsBranding />
            <SettingsSiteConfig />
          </>
        }
      />

      <div className="flex items-center justify-end gap-3">
        <button onClick={() => handleSettings.cancel()} className="border border-[#e2e8f0] rounded-lg px-4 py-2.5 text-xs font-medium text-[#334155] leading-4">
          Cancel
        </button>
        <Button onClick={() => handleSettings.save()}>Save Changes</Button>
      </div>
    </PageContainer>
  )
}
