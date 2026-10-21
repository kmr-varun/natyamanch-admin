import type { AdminPlan } from '../lib/api'

interface Props {
  plans: AdminPlan[]
  loading?: boolean
}

export default function SubscriptionPlansMetrics({ plans, loading }: Props) {
  const total = loading ? '—' : plans.length
  const active = loading ? '—' : plans.filter(p => p.is_active).length
  const inactive = loading ? '—' : plans.filter(p => !p.is_active).length

  return (
    <div className="flex gap-4">
      <div className="flex-1 bg-white border border-[rgba(226,232,240,0.8)] rounded-xl p-[17px] flex gap-4 items-center shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="bg-[#faf5ff] rounded-lg w-11 h-11 flex items-center justify-center flex-shrink-0">
          <img src="/icons/subscription-plan-icon.svg" alt="" className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <span className="text-[20px] font-bold text-[#0f172a] leading-[25px]">{total}</span>
          <span className="text-xs font-medium text-[#64748b] leading-4">Total Plans</span>
        </div>
      </div>

      <div className="flex-1 bg-white border border-[rgba(226,232,240,0.8)] rounded-xl p-[17px] flex gap-4 items-center shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="bg-[#ecfdf5] rounded-lg w-11 h-11 flex items-center justify-center flex-shrink-0">
          <div className="w-4 h-4 bg-[#10b981] rounded-full shadow-[0px_0px_0px_4px_#d1fae5]" />
        </div>
        <div className="flex flex-col">
          <span className="text-[20px] font-bold text-[#0f172a] leading-[25px]">{active}</span>
          <span className="text-xs font-medium text-[#64748b] leading-4">Active Plans</span>
        </div>
      </div>

      <div className="flex-1 bg-white border border-[rgba(226,232,240,0.8)] rounded-xl p-[17px] flex gap-4 items-center shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="bg-[#fef2f2] rounded-lg w-11 h-11 flex items-center justify-center flex-shrink-0">
          <img src="/icons/plan-inactive-icon.svg" alt="" className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[20px] font-bold text-[#0f172a] leading-[25px]">{inactive}</span>
          <span className="text-xs font-medium text-[#64748b] leading-4">Inactive Plans</span>
        </div>
      </div>
    </div>
  )
}
