import SubscriptionPlansMetrics from '../components/SubscriptionPlansMetrics'
import SubscriptionPlansFilterBar from '../components/SubscriptionPlansFilterBar'
import SubscriptionPlansTable from '../components/SubscriptionPlansTable'
import SubscriptionPlansTipsBanner from '../components/SubscriptionPlansTipsBanner'
import SubscriptionPlanForm from '../components/SubscriptionPlanForm'

export default function SubscriptionPlans() {
  return (
    <div className="p-8">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - 8 cols */}
        <div className="col-span-8 flex flex-col gap-6">
          <SubscriptionPlansMetrics />
          <SubscriptionPlansFilterBar />
          <SubscriptionPlansTable />
          <SubscriptionPlansTipsBanner />
        </div>

        {/* Right Column - 4 cols */}
        <div className="col-span-4 flex flex-col gap-6">
          {/* Add New Plan Button */}
          <div className="flex items-center justify-end pr-[0.01px]">
            <button className="px-4 py-2 bg-[#7f28bc] rounded-lg flex items-center gap-[6px] shadow-[0px_1px_1px_rgba(88,28,135,0.2)] hover:bg-[#6d1fa3]">
              <img src="/icons/plus-small-white.svg" alt="" className="w-4 h-4" />
              <span className="text-xs font-semibold text-white leading-4">Add New Plan</span>
            </button>
          </div>

          {/* Subscription Plan Form */}
          <SubscriptionPlanForm />
        </div>
      </div>
    </div>
  )
}
