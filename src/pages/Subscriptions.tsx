import { Link } from 'react-router-dom'
import SubscriptionsMetrics from '../components/SubscriptionsMetrics'
import SubscriptionsFilterBar from '../components/SubscriptionsFilterBar'
import SubscriptionsTable from '../components/SubscriptionsTable'
import SubscriptionDetailsPanel from '../components/SubscriptionDetailsPanel'

export default function Subscriptions() {
  return (
    <div className="p-8">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - 8 cols */}
        <div className="col-span-8 flex flex-col gap-6">
          <SubscriptionsMetrics />
          <SubscriptionsFilterBar />
          <SubscriptionsTable />
        </div>

        {/* Right Column - 4 cols */}
        <div className="col-span-4 flex flex-col gap-6">
          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3">
            <Link to="/subscription-plans" className="px-[15px] py-2 bg-white border border-[#7f28bc] rounded-lg text-xs font-semibold text-[#7f28bc] leading-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#faf5ff] transition-colors">
              View Plans
            </Link>
            <button className="flex items-center gap-1.5 px-[14px] py-2 bg-[#7f28bc] rounded-lg text-xs font-semibold text-white leading-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#6d1fa3] transition-colors">
              <img src="/icons/plus-white-icon.svg" alt="" className="w-[14px] h-[14px]" />
              Add Subscription
            </button>
          </div>

          {/* Subscription Details Panel */}
          <SubscriptionDetailsPanel />
        </div>
      </div>
    </div>
  )
}
