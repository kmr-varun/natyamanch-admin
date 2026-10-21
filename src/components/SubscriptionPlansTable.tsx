import { useState } from 'react'
import { ActionMenu, DeleteConfirmModal } from './shared'
import ViewPlanModal from './ViewPlanModal'
import type { AdminPlan } from '../lib/api'

interface Props {
  plans: AdminPlan[]
  loading: boolean
  onEdit: (plan: AdminPlan) => void
  onDelete: (id: string) => void
}

function formatDuration(days: number) {
  if (days === 1) return '1 Day'
  if (days < 7) return `${days} Days`
  if (days === 7) return '1 Week'
  if (days < 30) return `${Math.round(days / 7)} Weeks`
  if (days === 30) return '1 Month'
  if (days < 365) return `${Math.round(days / 30)} Months`
  if (days === 365) return '1 Year'
  return `${Math.round(days / 365)} Years`
}

export default function SubscriptionPlansTable({ plans, loading, onEdit, onDelete }: Props) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [planToDelete, setPlanToDelete] = useState<AdminPlan | null>(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [planToView, setPlanToView] = useState<AdminPlan | null>(null)

  return (
    <>
      <div className="bg-white border border-[rgba(226,232,240,0.9)] rounded-xl overflow-hidden shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        {/* Header */}
        <div className="bg-[rgba(248,250,252,0.6)] border-b border-[#f1f5f9] flex items-center">
          <div className="w-[44px] px-3 py-5 text-center">
            <span className="text-[11px] font-bold text-[#475569] tracking-[0.55px] uppercase">#</span>
          </div>
          <div className="flex-1 min-w-[180px] px-4 py-5">
            <span className="text-[11px] font-bold text-[#475569] tracking-[0.55px] uppercase">Plan Name</span>
          </div>
          <div className="w-[110px] px-4 py-5 text-center">
            <span className="text-[11px] font-bold text-[#475569] tracking-[0.55px] uppercase">Type</span>
          </div>
          <div className="w-[100px] px-4 py-5 text-center">
            <span className="text-[11px] font-bold text-[#475569] tracking-[0.55px] uppercase">Price</span>
          </div>
          <div className="w-[100px] px-4 py-5 text-center">
            <span className="text-[11px] font-bold text-[#475569] tracking-[0.55px] uppercase">Duration</span>
          </div>
          <div className="flex-1 px-4 py-5">
            <span className="text-[11px] font-bold text-[#475569] tracking-[0.55px] uppercase">Features</span>
          </div>
          <div className="w-[90px] px-4 py-5 text-center">
            <span className="text-[11px] font-bold text-[#475569] tracking-[0.55px] uppercase">Status</span>
          </div>
          <div className="w-[100px] px-4 py-5 text-center">
            <span className="text-[11px] font-bold text-[#475569] tracking-[0.55px] uppercase">Actions</span>
          </div>
        </div>

        {/* Body */}
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center border-b border-[#f1f5f9] px-3 py-4 gap-4">
              <div className="w-[44px] flex justify-center"><div className="h-3 w-5 bg-gray-100 rounded animate-pulse" /></div>
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="h-3 w-32 bg-gray-100 rounded animate-pulse" />
                <div className="h-2.5 w-24 bg-gray-100 rounded animate-pulse" />
              </div>
              <div className="w-[110px] flex justify-center"><div className="h-5 w-20 bg-gray-100 rounded-full animate-pulse" /></div>
              <div className="w-[100px] flex justify-center"><div className="h-3 w-14 bg-gray-100 rounded animate-pulse" /></div>
              <div className="w-[100px] flex justify-center"><div className="h-3 w-16 bg-gray-100 rounded animate-pulse" /></div>
              <div className="flex-1 flex flex-col gap-1">
                {Array.from({ length: 2 }).map((_, j) => <div key={j} className="h-2.5 w-28 bg-gray-100 rounded animate-pulse" />)}
              </div>
              <div className="w-[90px] flex justify-center"><div className="h-5 w-14 bg-gray-100 rounded-full animate-pulse" /></div>
              <div className="w-[100px] flex justify-center"><div className="h-7 w-16 bg-gray-100 rounded animate-pulse" /></div>
            </div>
          ))
        ) : plans.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-400">
            No subscription plans yet. Add your first plan above.
          </div>
        ) : (
          plans.map((plan, index) => (
            <div key={plan.id} className="flex items-start border-b border-[#f8f2fa] last:border-b-0 hover:bg-[#fdfaff] transition-colors">
              {/* # */}
              <div className="w-[44px] px-3 py-4 flex justify-center">
                <span className="text-xs text-[#94a3b8] leading-4">{String(index + 1).padStart(2, '0')}</span>
              </div>

              {/* Plan Name */}
              <div className="flex-1 min-w-[180px] px-4 py-3 flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-[#0f172a] leading-5">{plan.name}</span>
                {plan.description && (
                  <span className="text-xs text-[#94a3b8] leading-4 line-clamp-2">{plan.description}</span>
                )}
              </div>

              {/* Type */}
              <div className="w-[110px] px-4 py-4 flex justify-center">
                <span className="px-2.5 py-0.5 bg-[#eff6ff] rounded-full text-[11px] font-medium text-[#2563eb] leading-4 capitalize">
                  {plan.plan_type}
                </span>
              </div>

              {/* Price */}
              <div className="w-[100px] px-4 py-4 flex flex-col items-center justify-center">
                <span className="text-sm font-bold text-[#0f172a] leading-5">₹{plan.price_inr.toLocaleString('en-IN')}</span>
              </div>

              {/* Duration */}
              <div className="w-[100px] px-4 py-4 flex items-center justify-center">
                <span className="text-xs font-medium text-[#0f172a] leading-4">{formatDuration(plan.duration_days)}</span>
              </div>

              {/* Features */}
              <div className="flex-1 px-4 py-3 flex flex-col gap-1">
                {(plan.features || []).slice(0, 3).map((f, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <img src="/icons/checkmark-small.svg" alt="" className="w-[7px] h-[7px] flex-shrink-0" />
                    <span className="text-[11px] text-[#475569] leading-4">{f}</span>
                  </div>
                ))}
                {(plan.features || []).length > 3 && (
                  <span className="text-[10px] text-[#94a3b8]">+{plan.features.length - 3} more</span>
                )}
              </div>

              {/* Status */}
              <div className="w-[90px] px-4 py-4 flex justify-center">
                {plan.is_active ? (
                  <span className="px-2.5 py-0.5 bg-[rgba(209,250,229,0.7)] rounded-full text-[10px] font-semibold text-[#047857] leading-4">Active</span>
                ) : (
                  <span className="px-2.5 py-0.5 bg-gray-100 rounded-full text-[10px] font-semibold text-gray-500 leading-4">Inactive</span>
                )}
              </div>

              {/* Actions */}
              <div className="w-[100px] px-4 py-[13px] flex items-center justify-center gap-1">
                <button
                  onClick={() => { onEdit(plan); setOpenMenuId(null) }}
                  className="flex items-center gap-1 px-2 py-1 bg-white border border-[#7f28bc] rounded text-[11px] font-medium text-[#7f28bc] hover:bg-[#faf5ff] transition-colors"
                >
                  <img src="/icons/edit-small-icon.svg" alt="" className="w-3 h-3" />
                  Edit
                </button>
                <div className="relative">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === plan.id ? null : plan.id)}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    <img src="/icons/more-vertical-icon.svg" alt="" className="w-[14px] h-[14px]" />
                  </button>
                  <ActionMenu
                    isOpen={openMenuId === plan.id}
                    onClose={() => setOpenMenuId(null)}
                    options={[
                      {
                        label: 'View Details',
                        onClick: () => { setPlanToView(plan); setViewModalOpen(true); setOpenMenuId(null) },
                      },
                      {
                        label: 'Delete',
                        onClick: () => { setPlanToDelete(plan); setDeleteModalOpen(true); setOpenMenuId(null) },
                        className: 'text-[#ef4444] hover:bg-[#fef2f2]',
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => { setDeleteModalOpen(false); setPlanToDelete(null) }}
        onConfirm={() => { if (planToDelete) { onDelete(planToDelete.id); setPlanToDelete(null) } }}
        title="Delete Plan"
        message="Are you sure you want to delete plan"
        itemName={planToDelete?.name || ''}
      />

      <ViewPlanModal
        isOpen={viewModalOpen}
        onClose={() => { setViewModalOpen(false); setPlanToView(null) }}
        data={planToView}
      />
    </>
  )
}
