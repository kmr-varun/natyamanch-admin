import NotificationMetrics from '../components/NotificationMetrics'
import NotificationFilterBar from '../components/NotificationFilterBar'
import NotificationTable from '../components/NotificationTable'
import NotificationCreatePanel from '../components/NotificationCreatePanel'

export default function Notifications() {
  return (
    <div className="p-8 flex flex-col gap-6">
      {/* Metrics */}
      <NotificationMetrics />

      {/* Filter Bar + Button */}
      <div className="flex items-start gap-6">
        <div className="flex-1">
          <NotificationFilterBar />
        </div>
        <button className="bg-[#7f28bc] shadow-sm rounded-lg px-[14px] py-2 flex items-center gap-1.5 h-[57px] flex-shrink-0">
          <img src="/icons/plus-icon.svg" alt="" className="w-[14px] h-[14px]" />
          <span className="text-xs font-semibold text-white leading-4">Send Notification</span>
        </button>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - 8 cols */}
        <div className="col-span-8">
          <NotificationTable />
        </div>

        {/* Right Column - 4 cols */}
        <div className="col-span-4">
          <NotificationCreatePanel />
        </div>
      </div>
    </div>
  )
}
