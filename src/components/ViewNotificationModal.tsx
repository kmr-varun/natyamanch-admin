import { type AdminNotification } from '../lib/api'

interface Props {
  isOpen: boolean
  onClose: () => void
  data: AdminNotification | null
}

const fmtDate = (d: string) => new Date(d).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })

export default function ViewNotificationModal({ isOpen, onClose, data }: Props) {
  if (!isOpen || !data) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
        <div className="px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between">
          <h2 className="text-base font-bold text-[#0f172a]">Notification Details</h2>
          <button onClick={onClose} className="text-[#94a3b8] hover:text-[#475569] text-xl leading-none">×</button>
        </div>

        <div className="p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider">Title</span>
            <span className="text-base font-bold text-[#0f172a]">{data.title}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider">Message</span>
            <p className="text-sm text-[#334155] bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2.5 leading-5">{data.message}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider">Recipient</span>
              <span className="text-sm font-medium text-[#1e293b]">{data.user_name || 'Unknown'}</span>
              {data.user_email && <span className="text-xs text-[#64748b]">{data.user_email}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider">Type</span>
              <span className="inline-block px-2 py-0.5 bg-[#f3e8ff] text-[#7f28bc] text-xs font-semibold rounded-full w-fit">{data.type}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider">Status</span>
              {data.is_read ? (
                <span className="inline-block px-2 py-0.5 bg-[#d1fae5] text-[#047857] text-xs font-semibold rounded-full w-fit">Read</span>
              ) : (
                <span className="inline-block px-2 py-0.5 bg-[#fef3c7] text-[#92400e] text-xs font-semibold rounded-full w-fit">Unread</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider">Sent At</span>
              <span className="text-sm text-[#334155]">{fmtDate(data.created_at)}</span>
            </div>
          </div>

          {data.user_id && (
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider">Notification ID</span>
              <span className="text-xs font-mono text-[#64748b]">{data.id}</span>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-[#e2e8f0] flex justify-end">
          <button onClick={onClose} className="px-4 py-2 border border-[#e2e8f0] rounded-lg text-sm font-medium text-[#334155] hover:bg-[#f8fafc]">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
