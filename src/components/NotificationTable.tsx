import { useState } from 'react'
import { ActionMenu, DeleteConfirmModal } from './shared'
import { type AdminNotification, type Pagination } from '../lib/api'

interface Props {
  notifications: AdminNotification[]
  loading: boolean
  pagination: Pagination
  onPageChange: (page: number) => void
  onDelete: (id: string) => void
}

const TYPE_STYLES: Record<string, string> = {
  info: 'bg-[#f3e8ff] text-[#7f28bc]',
  alert: 'bg-[#fee2e2] text-[#b91c1c]',
  promo: 'bg-[#fef3c7] text-[#92400e]',
}

const fmtDate = (d: string) => {
  const date = new Date(d)
  return {
    date: `${date.getDate()} ${date.toLocaleString('en', { month: 'short' })} ${date.getFullYear()}`,
    time: date.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }),
  }
}

export default function NotificationTable({ notifications, loading, pagination, onPageChange, onDelete }: Props) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteTitle, setDeleteTitle] = useState('')

  const start = (pagination.page - 1) * pagination.limit + 1
  const end = Math.min(pagination.page * pagination.limit, pagination.total)

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden p-px">
        {/* Header */}
        <div className="bg-[rgba(248,250,252,0.7)] flex items-center h-[52px]">
          <div className="w-[40px] px-3 text-xs font-medium text-[#1d1b20] uppercase tracking-[0.55px]">#</div>
          <div className="w-[240px] px-3 text-xs font-medium text-[#1d1b20] uppercase tracking-[0.55px]">Title</div>
          <div className="flex-1 px-3 text-xs font-medium text-[#1d1b20] uppercase tracking-[0.55px]">Recipient</div>
          <div className="w-[80px] px-2 text-center text-xs font-medium text-[#1d1b20] uppercase tracking-[0.55px]">Type</div>
          <div className="w-[100px] px-2 text-center text-xs font-medium text-[#1d1b20] uppercase tracking-[0.55px]">Status</div>
          <div className="w-[130px] px-3 text-xs font-medium text-[#1d1b20] uppercase tracking-[0.55px]">Sent At</div>
          <div className="w-[80px] px-3 text-center text-xs font-medium text-[#1d1b20] uppercase tracking-[0.55px]">Actions</div>
        </div>

        {/* Body */}
        {loading ? (
          Array(5).fill(null).map((_, i) => (
            <div key={i} className="flex items-center h-[72px] border-t border-[#f1f5f9] animate-pulse">
              {[40, 240, 0, 80, 100, 130, 80].map((w, j) => (
                <div key={j} className={`${w ? `w-[${w}px]` : 'flex-1'} px-3`}>
                  <div className="h-3 bg-[#f1f5f9] rounded w-3/4" />
                </div>
              ))}
            </div>
          ))
        ) : notifications.length === 0 ? (
          <div className="h-32 flex items-center justify-center text-sm text-[#94a3b8]">No notifications found</div>
        ) : (
          notifications.map((notif, idx) => {
            const { date, time } = fmtDate(notif.created_at)
            return (
              <div key={notif.id} className="flex items-center h-[80px] border-t border-[#f1f5f9]">
                <div className="w-[40px] px-3 text-[11px] font-medium text-[#94a3b8]">
                  {start + idx}
                </div>
                <div className="w-[240px] px-3 flex flex-col gap-0.5">
                  <span className="text-xs font-semibold text-[#0f172a] leading-[15px] truncate">{notif.title}</span>
                  <span className="text-[11px] text-[#94a3b8] leading-4 truncate max-w-[220px]">{notif.message}</span>
                </div>
                <div className="flex-1 px-3 flex flex-col">
                  <span className="text-xs text-[#334155] leading-4">{notif.user_name || 'Unknown'}</span>
                  {notif.user_email && <span className="text-[11px] text-[#94a3b8] leading-4 truncate">{notif.user_email}</span>}
                </div>
                <div className="w-[80px] px-2 flex items-center justify-center">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold leading-4 ${TYPE_STYLES[notif.type] ?? 'bg-[#f1f5f9] text-[#64748b]'}`}>
                    {notif.type}
                  </span>
                </div>
                <div className="w-[100px] px-2 flex items-center justify-center">
                  {notif.is_read ? (
                    <span className="px-2 py-0.5 bg-[#d1fae5] rounded-full text-[10px] font-semibold text-[#047857] leading-4">Read</span>
                  ) : (
                    <span className="px-2 py-0.5 bg-[#fef3c7] rounded-full text-[10px] font-semibold text-[#92400e] leading-4">Unread</span>
                  )}
                </div>
                <div className="w-[130px] px-3 flex flex-col">
                  <span className="text-xs text-[#334155] leading-4">{date}</span>
                  <span className="text-[11px] text-[#94a3b8] leading-4">{time}</span>
                </div>
                <div className="w-[80px] px-3 flex items-center justify-center">
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === notif.id ? null : notif.id)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <img src="/icons/three-dots-icon.svg" alt="Actions" className="w-4 h-4" />
                    </button>
                    <ActionMenu
                      isOpen={openMenuId === notif.id}
                      onClose={() => setOpenMenuId(null)}
                      options={[
                        {
                          label: 'Delete',
                          onClick: () => { setDeleteId(notif.id); setDeleteTitle(notif.title); setOpenMenuId(null) },
                          className: 'text-[#ef4444] hover:bg-[#fef2f2]',
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            )
          })
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#e2e8f0]">
          <span className="text-xs text-[#64748b] leading-4">
            {pagination.total === 0 ? 'No results' : `Showing ${start}–${end} of ${pagination.total}`}
          </span>
          {pagination.totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button onClick={() => onPageChange(pagination.page - 1)} disabled={pagination.page <= 1} className="w-7 h-7 border border-[#e2e8f0] rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">
                <img src="/icons/chevron-left-small.svg" alt="" className="w-[14px] h-[14px]" />
              </button>
              {(() => { const nums: number[] = []; for (let i = Math.max(1, pagination.page - 2); i <= Math.min(pagination.totalPages, pagination.page + 2); i++) nums.push(i); return nums.map(p => <button key={p} onClick={() => onPageChange(p)} className={`w-7 h-7 rounded flex items-center justify-center text-xs font-semibold ${p === pagination.page ? 'bg-[#7f28bc] text-white' : 'border border-[#e2e8f0] text-gray-700 hover:bg-gray-50'}`}>{p}</button>) })()}
              <button onClick={() => onPageChange(pagination.page + 1)} disabled={pagination.page >= pagination.totalPages} className="w-7 h-7 border border-[#e2e8f0] rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">
                <img src="/icons/chevron-right-small.svg" alt="" className="w-[14px] h-[14px]" />
              </button>
            </div>
          )}
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={!!deleteId}
        onClose={() => { setDeleteId(null); setDeleteTitle('') }}
        onConfirm={() => { if (deleteId) { onDelete(deleteId); setDeleteId(null) } }}
        title="Delete Notification"
        message="Are you sure you want to delete"
        itemName={deleteTitle}
      />
    </div>
  )
}
