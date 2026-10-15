import { useState } from 'react'
import { handlePagination, handleTab, handleDropdownChange } from '../utils/mockHandlers'
import { ActionMenu, DeleteConfirmModal } from './shared'
import ViewSubscriptionModal from './ViewSubscriptionModal'

interface Subscription {
  id: number
  subscriber: string
  email: string
  type: string
  plan: string
  video: string
  startDate: string
  endDate: string
  amount: string
  status: string
  payment: string
}

const initialSubscriptions: Subscription[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  subscriber: 'Rohan Deshpande',
  email: 'rohan@example.com',
  type: 'Individual',
  plan: 'Single Video Access',
  video: '(Hello Inspector)',
  startDate: '12 Aug\n2025',
  endDate: '14 Aug\n2025',
  amount: '₹149',
  status: 'Active',
  payment: 'Razorpay',
}))

export default function SubscriptionsTable() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions)
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [subscriptionToDelete, setSubscriptionToDelete] = useState<Subscription | null>(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [subscriptionToView, setSubscriptionToView] = useState<Subscription | null>(null)

  const handleEdit = (subscription: Subscription) => {
    console.log('Edit subscription:', subscription)
    alert(`Edit subscription: ${subscription.subscriber}\n\nIn production, this would open an edit form with the subscription data pre-filled.`)
  }

  const handleView = (subscription: Subscription) => {
    setSubscriptionToView(subscription)
    setViewModalOpen(true)
    setOpenMenuId(null)
  }

  const handleDeleteClick = (subscription: Subscription) => {
    setSubscriptionToDelete(subscription)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (subscriptionToDelete) {
      setSubscriptions(subscriptions.filter(s => s.id !== subscriptionToDelete.id))
      console.log('Deleted subscription:', subscriptionToDelete)
      setSubscriptionToDelete(null)
    }
  }

  return (
    <div className="bg-white border border-[rgba(226,232,240,0.9)] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
      {/* Tabs */}
      <div className="border-b border-[#e2e8f0] px-4 pt-2 flex items-start">
        <button
          onClick={() => handleTab.switch('All Subscriptions')}
          className="flex items-center gap-1.5 px-4 pb-3 pt-2.5 border-b-2 border-[#7f28bc] text-xs font-semibold text-[#7f28bc] leading-4 hover:opacity-80"
        >
          All Subscriptions <span>(486)</span>
        </button>
        <button
          onClick={() => handleTab.switch('Individual')}
          className="px-4 pb-[11px] pt-2.5 text-xs font-medium text-[#64748b] leading-4 hover:text-[#7f28bc]"
        >
          Individual (312)
        </button>
        <button
          onClick={() => handleTab.switch('Mandal / Organization')}
          className="px-4 pb-[11px] pt-2.5 text-xs font-medium text-[#64748b] leading-4 hover:text-[#7f28bc]"
        >
          Mandal / Organization (174)
        </button>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        {/* Header */}
        <div className="bg-[rgba(248,250,252,0.5)] border-b border-[#e2e8f0] flex items-start">
          <div className="w-8 px-3 py-3 flex items-center justify-center">
            <input type="checkbox" className="w-4 h-4 border border-[#434343] rounded" />
          </div>
          <div className="w-8 px-3 py-3 flex items-center justify-center">
            <span className="text-[11px] font-bold text-[#434343] leading-4 tracking-[0.55px]">#</span>
          </div>
          <div className="flex-1 px-3 py-3">
            <span className="text-[11px] font-semibold text-[#434343] leading-4 tracking-[0.55px]">SUBSCRIBER</span>
          </div>
          <div className="flex-1 px-3 py-3 text-center">
            <span className="text-[11px] font-semibold text-[#434343] leading-4 tracking-[0.55px]">TYPE</span>
          </div>
          <div className="flex-1 px-3 py-3 text-center">
            <span className="text-[11px] font-semibold text-[#434343] leading-4 tracking-[0.55px]">PLAN</span>
          </div>
          <div className="flex-1 px-3 py-3 text-center">
            <span className="text-[11px] font-semibold text-[#434343] leading-4 tracking-[0.55px]">START DATE</span>
          </div>
          <div className="flex-1 px-3 py-3 text-center">
            <span className="text-[11px] font-semibold text-[#434343] leading-4 tracking-[0.55px]">END DATE</span>
          </div>
          <div className="flex-1 px-3 py-3 text-center">
            <span className="text-[11px] font-semibold text-[#434343] leading-4 tracking-[0.55px]">AMOUNT</span>
          </div>
          <div className="flex-1 px-3 py-3 text-center">
            <span className="text-[11px] font-semibold text-[#434343] leading-4 tracking-[0.55px]">STATUS</span>
          </div>
          <div className="flex-1 px-3 py-3 text-center">
            <span className="text-[11px] font-semibold text-[#434343] leading-4 tracking-[0.55px]">PAYMENT METHOD</span>
          </div>
          <div className="flex-1 px-3 py-3 text-right">
            <span className="text-[11px] font-semibold text-[#434343] leading-4 tracking-[0.55px]">ACTIONS</span>
          </div>
        </div>

        {/* Body */}
        <div>
          {subscriptions.map((sub) => (
            <div key={sub.id} className="flex items-center border-b last:border-b-0 border-[#e2e8f0]">
              <div className="w-8 px-3 py-[43px] flex items-center justify-center">
                <input type="checkbox" className="w-4 h-4 border border-[#cbd5e1] rounded" />
              </div>
              <div className="w-8 px-[6px] py-[43px] flex items-center justify-center">
                <span className="text-xs font-medium text-[#94a3b8] leading-4">
                  {String(sub.id).padStart(2, '0')}
                </span>
              </div>
              <div className="flex-1 px-4 py-2.5 flex items-center gap-2">
                <div className="w-7 h-7 bg-[#f3e8ff] rounded-full flex items-center justify-center">
                  <span className="text-[11px] font-semibold text-[#7e22ce] leading-4">RS</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#0f172a] leading-[15px]">{sub.subscriber}</p>
                  <p className="text-[10px] text-[#94a3b8] leading-4">{sub.email}</p>
                </div>
              </div>
              <div className="flex-1 px-2 py-[39.5px] flex items-center justify-center">
                <span className="px-2 py-0.5 bg-[#eff6ff] border border-[#dbeafe] rounded-full text-[10px] font-medium text-[#2563eb] leading-4">
                  {sub.type}
                </span>
              </div>
              <div className="flex-1 px-3 py-2.5 text-center">
                <p className="text-xs font-medium text-[#334155] leading-4">{sub.plan}</p>
                <p className="text-[10px] text-[#94a3b8] leading-4">{sub.video}</p>
              </div>
              <div className="flex-1 px-2 py-[34.5px] text-center">
                <span className="text-[11px] text-[#64748b] leading-4 whitespace-pre-line">{sub.startDate}</span>
              </div>
              <div className="flex-1 px-2 py-[26.5px] text-center">
                <span className="text-[11px] text-[#64748b] leading-4 whitespace-pre-line">{sub.endDate}</span>
              </div>
              <div className="flex-1 px-2 py-[43px] text-center">
                <span className="text-xs font-semibold text-[#0f172a] leading-4">{sub.amount}</span>
              </div>
              <div className="flex-1 px-2 py-[40.5px] flex items-center justify-center">
                <span className="px-2 py-0.5 bg-[#ecfdf5] rounded-full text-[10px] font-semibold text-[#059669] leading-4">
                  {sub.status}
                </span>
              </div>
              <div className="flex-1 px-2 py-[42.5px] text-center">
                <span className="text-[11px] text-[#64748b] leading-4">{sub.payment}</span>
              </div>
              <div className="flex-1 px-2 py-[38.5px] flex items-center justify-center">
                <div className="relative inline-block">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === sub.id ? null : sub.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <img src="/icons/menu-dots-icon.svg" alt="Actions" className="w-4 h-4" />
                  </button>
                  <ActionMenu
                    isOpen={openMenuId === sub.id}
                    onClose={() => setOpenMenuId(null)}
                    options={[
                      {
                        label: 'View Details',
                        onClick: () => handleView(sub),
                      },
                      {
                        label: 'Edit Subscription',
                        onClick: () => handleEdit(sub),
                      },
                      {
                        label: 'Delete',
                        onClick: () => handleDeleteClick(sub),
                        className: 'text-[#ef4444] hover:bg-[#fef2f2]',
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="border-t border-[#f1f5f9] px-[14px] py-[14px] flex items-center justify-between">
        <span className="text-xs text-[#64748b] leading-4">
          Showing <span className="font-medium text-[#334155]">1</span> to <span className="font-medium text-[#334155]">10</span> of <span className="font-medium text-[#334155]">486</span> subscriptions
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePagination.previous}
            className="w-7 h-7 border border-[#e2e8f0] rounded flex items-center justify-center p-px hover:bg-gray-50"
          >
            <img src="/icons/chevron-left-icon.svg" alt="" className="w-[14px] h-[14px]" />
          </button>
          <button
            onClick={() => handlePagination.goToPage(1)}
            className="w-7 h-7 bg-[#7f28bc] rounded flex items-center justify-center text-xs font-semibold text-white leading-4"
          >
            1
          </button>
          <button
            onClick={() => handlePagination.goToPage(2)}
            className="w-7 h-7 rounded flex items-center justify-center text-xs text-[#475569] leading-4 hover:bg-gray-100"
          >
            2
          </button>
          <button
            onClick={() => handlePagination.goToPage(3)}
            className="w-7 h-7 rounded flex items-center justify-center text-xs text-[#475569] leading-4 hover:bg-gray-100"
          >
            3
          </button>
          <button
            onClick={() => handlePagination.goToPage(4)}
            className="w-7 h-7 rounded flex items-center justify-center text-xs text-[#475569] leading-4 hover:bg-gray-100"
          >
            4
          </button>
          <button
            onClick={() => handlePagination.goToPage(5)}
            className="w-7 h-7 rounded flex items-center justify-center text-xs text-[#475569] leading-4 hover:bg-gray-100"
          >
            5
          </button>
          <button
            onClick={handlePagination.next}
            className="w-7 h-7 border border-[#e2e8f0] rounded flex items-center justify-center p-px hover:bg-gray-50"
          >
            <img src="/icons/chevron-right-icon.svg" alt="" className="w-[14px] h-[14px]" />
          </button>
          <div className="ml-2 relative">
            <select
              onChange={(e) => handleDropdownChange('pageSize', e.target.value)}
              className="h-7 pl-[9px] pr-[33px] py-1 bg-white border border-[#e2e8f0] rounded text-xs text-[#475569] appearance-none hover:bg-gray-50"
            >
              <option>10 / page</option>
              <option>25 / page</option>
              <option>50 / page</option>
            </select>
            <img
              src="/icons/chevron-down-small.svg"
              alt=""
              className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setSubscriptionToDelete(null)
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Subscription"
        message="Are you sure you want to delete subscription for"
        itemName={subscriptionToDelete?.subscriber || ''}
      />

      {/* View Subscription Modal */}
      <ViewSubscriptionModal
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false)
          setSubscriptionToView(null)
        }}
        data={subscriptionToView}
      />
    </div>
  )
}
