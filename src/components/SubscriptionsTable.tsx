import { useState } from 'react'
import { ActionMenu, DeleteConfirmModal } from './shared'
import ViewSubscriptionModal from './ViewSubscriptionModal'
import type { AdminSubscription, Pagination } from '../lib/api'

interface Props {
  subscriptions: AdminSubscription[]
  loading: boolean
  pagination: Pagination
  onPageChange: (page: number) => void
  onDelete: (id: string) => void
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function initials(name: string) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

const STATUS_STYLES: Record<string, string> = {
  active:    'bg-[#ecfdf5] text-[#059669]',
  expired:   'bg-gray-100 text-gray-500',
  cancelled: 'bg-[#fef2f2] text-[#ef4444]',
}

export default function SubscriptionsTable({ subscriptions, loading, pagination, onPageChange, onDelete }: Props) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [toDelete, setToDelete] = useState<AdminSubscription | null>(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [toView, setToView] = useState<AdminSubscription | null>(null)

  const start = (pagination.page - 1) * pagination.limit + 1
  const end = Math.min(pagination.page * pagination.limit, pagination.total)
  const pageNums = () => {
    const nums: number[] = []
    for (let i = Math.max(1, pagination.page - 2); i <= Math.min(pagination.totalPages, pagination.page + 2); i++) nums.push(i)
    return nums
  }

  return (
    <>
      <div className="bg-white border border-[rgba(226,232,240,0.9)] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
        {/* Header */}
        <div className="bg-[rgba(248,250,252,0.6)] border-b border-[#f1f5f9] flex items-center">
          {[
            { label: '#', w: 'w-10' },
            { label: 'Subscriber', w: 'flex-1 min-w-[180px]' },
            { label: 'Plan', w: 'flex-1' },
            { label: 'Type', w: 'w-[110px]' },
            { label: 'Start', w: 'w-[110px]' },
            { label: 'End', w: 'w-[110px]' },
            { label: 'Amount', w: 'w-[90px]' },
            { label: 'Status', w: 'w-[100px]' },
            { label: 'Actions', w: 'w-[80px]' },
          ].map(col => (
            <div key={col.label} className={`${col.w} px-4 py-4 text-center`}>
              <span className="text-[11px] font-bold text-[#434343] tracking-[0.55px] uppercase">{col.label}</span>
            </div>
          ))}
        </div>

        {/* Body */}
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center border-b border-[#f8f2fa] px-2 py-4 gap-3">
              <div className="w-10 flex justify-center"><div className="h-3 w-5 bg-gray-100 rounded animate-pulse" /></div>
              <div className="flex-1 flex items-center gap-2">
                <div className="w-7 h-7 bg-gray-100 rounded-full animate-pulse flex-shrink-0" />
                <div className="flex flex-col gap-1"><div className="h-3 w-28 bg-gray-100 rounded animate-pulse" /><div className="h-2.5 w-20 bg-gray-100 rounded animate-pulse" /></div>
              </div>
              {[160, 80, 90, 90, 70, 60, 50].map((w, j) => (
                <div key={j} style={{ width: w }} className="flex justify-center">
                  <div className="h-3 bg-gray-100 rounded animate-pulse w-full" />
                </div>
              ))}
            </div>
          ))
        ) : subscriptions.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-400">
            No subscriptions found. Add one using the button above.
          </div>
        ) : (
          subscriptions.map((sub, index) => (
            <div key={sub.id} className="flex items-center border-b border-[#f8f2fa] last:border-b-0 hover:bg-[#fdfaff] transition-colors">
              <div className="w-10 px-4 py-4 text-center">
                <span className="text-xs text-[#94a3b8]">{String(start + index).padStart(2, '0')}</span>
              </div>
              <div className="flex-1 min-w-[180px] px-4 py-3 flex items-center gap-2">
                <div className="w-7 h-7 bg-[#f3e8ff] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-semibold text-[#7e22ce]">{initials(sub.user_name || '?')}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#0f172a] leading-4">{sub.user_name || '—'}</p>
                  <p className="text-[10px] text-[#94a3b8] leading-4">{sub.user_email || '—'}</p>
                </div>
              </div>
              <div className="flex-1 px-4 py-4 text-center">
                <span className="text-xs font-medium text-[#334155] leading-4">{sub.plan_name || '—'}</span>
              </div>
              <div className="w-[110px] px-4 py-4 text-center">
                <span className="px-2 py-0.5 bg-[#eff6ff] rounded-full text-[10px] font-medium text-[#2563eb] capitalize">
                  {sub.plan_type || 'individual'}
                </span>
              </div>
              <div className="w-[110px] px-4 py-4 text-center">
                <span className="text-[11px] text-[#64748b]">{formatDate(sub.start_date)}</span>
              </div>
              <div className="w-[110px] px-4 py-4 text-center">
                <span className="text-[11px] text-[#64748b]">{sub.end_date ? formatDate(sub.end_date) : '—'}</span>
              </div>
              <div className="w-[90px] px-4 py-4 text-center">
                <span className="text-xs font-semibold text-[#0f172a]">
                  {sub.amount_paid_inr != null ? `₹${sub.amount_paid_inr.toLocaleString('en-IN')}` : '—'}
                </span>
              </div>
              <div className="w-[100px] px-4 py-4 flex justify-center">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${STATUS_STYLES[sub.status] || 'bg-gray-100 text-gray-500'}`}>
                  {sub.status}
                </span>
              </div>
              <div className="w-[80px] px-4 py-3 flex justify-center">
                <div className="relative">
                  <button onClick={() => setOpenMenuId(openMenuId === sub.id ? null : sub.id)} className="p-1 hover:bg-gray-100 rounded">
                    <img src="/icons/menu-dots-icon.svg" alt="Actions" className="w-4 h-4" />
                  </button>
                  <ActionMenu
                    isOpen={openMenuId === sub.id}
                    onClose={() => setOpenMenuId(null)}
                    options={[
                      { label: 'View Details', onClick: () => { setToView(sub); setViewModalOpen(true); setOpenMenuId(null) } },
                      { label: 'Delete', onClick: () => { setToDelete(sub); setDeleteModalOpen(true); setOpenMenuId(null) }, className: 'text-[#ef4444] hover:bg-[#fef2f2]' },
                    ]}
                  />
                </div>
              </div>
            </div>
          ))
        )}

        {/* Pagination */}
        {!loading && pagination.total > 0 && (
          <div className="border-t border-[#f1f5f9] px-4 py-3 flex items-center justify-between">
            <span className="text-xs text-[#64748b]">
              Showing <span className="font-medium text-[#334155]">{start}–{end}</span> of <span className="font-medium text-[#334155]">{pagination.total}</span>
            </span>
            <div className="flex items-center gap-1">
              <button onClick={() => onPageChange(pagination.page - 1)} disabled={pagination.page <= 1} className="w-7 h-7 border border-[#e2e8f0] rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">
                <img src="/icons/chevron-left-icon.svg" alt="" className="w-[14px] h-[14px]" />
              </button>
              {pageNums().map(p => (
                <button key={p} onClick={() => onPageChange(p)} className={`w-7 h-7 rounded flex items-center justify-center text-xs font-semibold ${p === pagination.page ? 'bg-[#7f28bc] text-white' : 'border border-[#e2e8f0] text-gray-700 hover:bg-gray-50'}`}>{p}</button>
              ))}
              <button onClick={() => onPageChange(pagination.page + 1)} disabled={pagination.page >= pagination.totalPages} className="w-7 h-7 border border-[#e2e8f0] rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">
                <img src="/icons/chevron-right-icon.svg" alt="" className="w-[14px] h-[14px]" />
              </button>
            </div>
          </div>
        )}
      </div>

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => { setDeleteModalOpen(false); setToDelete(null) }}
        onConfirm={() => { if (toDelete) { onDelete(toDelete.id); setToDelete(null) } }}
        title="Delete Subscription"
        message="Are you sure you want to delete the subscription for"
        itemName={toDelete?.user_name || ''}
      />
      <ViewSubscriptionModal isOpen={viewModalOpen} onClose={() => { setViewModalOpen(false); setToView(null) }} data={toView} />
    </>
  )
}
