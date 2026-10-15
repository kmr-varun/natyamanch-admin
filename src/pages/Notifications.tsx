import NotificationMetrics from '../components/NotificationMetrics'
import NotificationFilterBar from '../components/NotificationFilterBar'
import NotificationTable from '../components/NotificationTable'
import NotificationCreatePanel from '../components/NotificationCreatePanel'
import { PageContainer, TwoColumnLayout, Button } from '../components/shared'
import { handleNotification } from '../utils/mockHandlers'

export default function Notifications() {

  return (
    <PageContainer className="flex flex-col gap-6">
      <NotificationMetrics />

      <div className="flex items-start gap-6">
        <div className="flex-1">
          <NotificationFilterBar />
        </div>
        <Button onClick={() => handleNotification.send('New')} icon="/icons/plus-icon.svg" className="h-[57px]">
          Send Notification
        </Button>
      </div>

      <TwoColumnLayout
        leftColumn={<NotificationTable />}
        rightColumn={<NotificationCreatePanel />}
      />
    </PageContainer>
  )
}
