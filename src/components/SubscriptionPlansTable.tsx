import { useState } from 'react'
import { ActionMenu, DeleteConfirmModal } from './shared'
import ViewPlanModal from './ViewPlanModal'

interface Plan {
  id: number
  name: string
  description: string
  type: string
  price: string
  usd: string
  duration: string
  durationDetail: string
  features: string[]
  status: string
  sortOrder: number
}

const initialPlans: Plan[] = [
    {
      id: 1,
      name: 'Monthly Pass',
      description: 'Unlimited\naccess for 1 month',
      type: 'Individual',
      price: '₹149',
      usd: '(~$1.79)',
      duration: '48 Hours',
      durationDetail: 'per video',
      features: [
        'Access to selected video',
        '48-hour streaming',
        'Watch on any device',
      ],
      status: 'Active',
      sortOrder: 1,
    },
    {
      id: 2,
      name: 'Monthly Pass',
      description: 'Unlimited\naccess for 1 month',
      type: 'Individual',
      price: '₹149',
      usd: '(~$1.79)',
      duration: '48 Hours',
      durationDetail: 'per video',
      features: [
        'Access to selected video',
        '48-hour streaming',
        'Watch on any device',
      ],
      status: 'Active',
      sortOrder: 1,
    },
    {
      id: 3,
      name: 'Monthly Pass',
      description: 'Unlimited\naccess for 1 month',
      type: 'Individual',
      price: '₹149',
      usd: '(~$1.79)',
      duration: '48 Hours',
      durationDetail: 'per video',
      features: [
        'Access to selected video',
        '48-hour streaming',
        'Watch on any device',
      ],
      status: 'Active',
      sortOrder: 1,
    },
    {
      id: 4,
      name: 'Monthly Pass',
      description: 'Unlimited\naccess for 1 month',
      type: 'Individual',
      price: '₹149',
      usd: '(~$1.79)',
      duration: '48 Hours',
      durationDetail: 'per video',
      features: [
        'Access to selected video',
        '48-hour streaming',
        'Watch on any device',
      ],
      status: 'Active',
      sortOrder: 1,
    },
    {
      id: 5,
      name: 'Monthly Pass',
      description: 'Unlimited\naccess for 1 month',
      type: 'Individual',
      price: '₹149',
      usd: '(~$1.79)',
      duration: '48 Hours',
      durationDetail: 'per video',
      features: [
        'Access to selected video',
        '48-hour streaming',
        'Watch on any device',
      ],
      status: 'Active',
      sortOrder: 1,
    },
  ]

export default function SubscriptionPlansTable() {
  const [plans, setPlans] = useState<Plan[]>(initialPlans)
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [planToDelete, setPlanToDelete] = useState<Plan | null>(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [planToView, setPlanToView] = useState<Plan | null>(null)

  const handleEdit = (plan: Plan) => {
    console.log('Edit plan:', plan)
    alert(`Edit plan: ${plan.name}\n\nIn production, this would open an edit form with the plan data pre-filled.`)
  }

  const handleView = (plan: Plan) => {
    setPlanToView(plan)
    setViewModalOpen(true)
    setOpenMenuId(null)
  }

  const handleDeleteClick = (plan: Plan) => {
    setPlanToDelete(plan)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (planToDelete) {
      setPlans(plans.filter(p => p.id !== planToDelete.id))
      console.log('Deleted plan:', planToDelete)
      setPlanToDelete(null)
    }
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-[rgba(248,250,252,0.5)] border-b border-[#e2e8f0] flex items-start">
        <div className="w-[25px] px-3 py-5 flex items-center justify-center">
          <span className="text-[11px] font-bold text-[#475569] leading-4">#</span>
        </div>
        <div className="w-[174px] px-3 py-5 flex items-center justify-center">
          <span className="text-[11px] font-bold text-[#475569] leading-4">Plan Name</span>
        </div>
        <div className="flex-1 px-3 py-5 flex items-center justify-center">
          <span className="text-[11px] font-bold text-[#475569] leading-4">Type</span>
        </div>
        <div className="flex-1 px-3 py-5 flex items-center justify-center">
          <span className="text-[11px] font-bold text-[#475569] leading-4">Price</span>
        </div>
        <div className="flex-1 px-3 py-5 flex items-center justify-center">
          <span className="text-[11px] font-bold text-[#475569] leading-4">Duration</span>
        </div>
        <div className="w-[185px] px-3 py-5 flex items-center justify-center">
          <span className="text-[11px] font-bold text-[#475569] leading-4">Features</span>
        </div>
        <div className="w-[76px] px-3 py-5 flex items-center justify-center">
          <span className="text-[11px] font-bold text-[#475569] leading-4">Status</span>
        </div>
        <div className="w-[47px] px-2 py-3 flex items-center justify-center">
          <span className="text-[11px] font-bold text-[#475569] leading-4 text-center">Sort<br/>Order</span>
        </div>
        <div className="w-[80px] px-2 py-3 flex items-center justify-center">
          <span className="text-[11px] font-bold text-[#475569] leading-4">Action</span>
        </div>
      </div>

      {/* Body */}
      <div>
        {plans.map((plan) => (
          <div key={plan.id} className="flex items-center">
            {/* ID */}
            <div className="w-[25px] px-3 py-[12px] flex items-center">
              <span className="text-xs font-medium text-[#94a3b8] leading-4">
                {String(plan.id).padStart(2, '0')}
              </span>
            </div>

            {/* Plan Name with Image */}
            <div className="w-[174px] px-3 py-3 flex gap-3 items-center">
              <div className="flex-1 h-11 rounded overflow-hidden">
                <img src="/images/plan-thumbnail.png" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#0f172a] leading-4">{plan.name}</span>
                <span className="text-[11px] text-[#94a3b8] leading-4 whitespace-pre-line">
                  {plan.description}
                </span>
              </div>
            </div>

            {/* Type */}
            <div className="flex-1 px-3 py-3 flex items-center justify-center">
              <span className="px-2.5 py-0.5 bg-[#eff6ff] rounded-full text-[11px] font-medium text-[#2563eb] leading-4">
                {plan.type}
              </span>
            </div>

            {/* Price */}
            <div className="flex-1 px-3 py-3 flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-[#0f172a] leading-4">{plan.price}</span>
              <span className="text-[10px] text-[#94a3b8] leading-4">{plan.usd}</span>
            </div>

            {/* Duration */}
            <div className="flex-1 px-3 py-3 flex flex-col items-start">
              <span className="text-xs font-medium text-[#0f172a] leading-4">{plan.duration}</span>
              <span className="text-[10px] text-[#94a3b8] leading-4">{plan.durationDetail}</span>
            </div>

            {/* Features */}
            <div className="w-[185px] pl-[19px] pr-3 py-3 flex flex-col gap-1">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-[6px]">
                  <img src="/icons/checkmark-small.svg" alt="" className="w-[7.149px] h-[7.401px]" />
                  <span className="text-[11px] text-[#475569] leading-4">{feature}</span>
                </div>
              ))}
            </div>

            {/* Status */}
            <div className="w-[76px] px-3 py-3 flex items-center justify-center">
              <span className="px-2.5 py-0.5 bg-[rgba(209,250,229,0.7)] rounded-full text-[10px] font-semibold text-[#047857] leading-4">
                {plan.status}
              </span>
            </div>

            {/* Sort Order */}
            <div className="w-[47px] px-3 py-3 flex items-center justify-center">
              <span className="text-xs font-medium text-[#475569] leading-4">{plan.sortOrder}</span>
            </div>

            {/* Actions */}
            <div className="w-[82px] px-4 py-[13.5px] flex items-center justify-center">
              <div className="flex items-center -mr-px">
                <button onClick={() => handleEdit(plan)} className="px-[9px] py-[5px] bg-white border border-[#7f28bc] rounded flex items-center gap-1 hover:bg-[#faf5ff]">
                  <img src="/icons/edit-small-icon.svg" alt="" className="w-3 h-3" />
                  <span className="text-[11px] font-medium text-[#7f28bc] leading-4">Edit</span>
                </button>
                <div className="relative inline-block">
                  <button onClick={() => setOpenMenuId(openMenuId === plan.id ? null : plan.id)} className="p-1 rounded hover:bg-gray-50">
                    <img src="/icons/more-vertical-icon.svg" alt="Actions" className="w-[14px] h-[14px]" />
                  </button>
                  <ActionMenu
                    isOpen={openMenuId === plan.id}
                    onClose={() => setOpenMenuId(null)}
                    options={[
                      {
                        label: 'View Details',
                        onClick: () => handleView(plan),
                      },
                      {
                        label: 'Delete',
                        onClick: () => handleDeleteClick(plan),
                        className: 'text-[#ef4444] hover:bg-[#fef2f2]',
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setPlanToDelete(null)
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Plan"
        message="Are you sure you want to delete plan"
        itemName={planToDelete?.name || ''}
      />

      {/* View Plan Modal */}
      <ViewPlanModal
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false)
          setPlanToView(null)
        }}
        data={planToView}
      />
    </div>
  )
}
