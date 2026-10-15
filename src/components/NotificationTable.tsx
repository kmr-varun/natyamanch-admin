import { useState } from 'react'
import { handleTab, handlePagination } from '../utils/mockHandlers'
import { ActionMenu, DeleteConfirmModal } from './shared'
import ViewNotificationModal from './ViewNotificationModal'

interface Notification {
  id: number
  title: string
  message: string
  type: string
  audience: string
  audienceCount: string
  date: string
  time: string
  status: string
  delivered: string
  read: string
}

const initialNotifications: Notification[] = Array(6).fill(null).map((_, idx) => ({
  id: idx + 1,
  title: 'New Play Released – Hello Inspector',
  message: 'Watch our latest Marathi drama now...',
  type: 'Push',
  audience: 'All Users',
  audienceCount: '(12,482)',
  date: '20 Sep 2025',
  time: '10:00 AM',
  status: 'Sent',
  delivered: '12,460',
  read: '8,930',
}))

export default function NotificationTable() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [notificationToDelete, setNotificationToDelete] = useState<Notification | null>(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [notificationToView, setNotificationToView] = useState<Notification | null>(null)

  const handleEdit = (notification: Notification) => {
    console.log('Edit notification:', notification)
    alert(`Edit notification: ${notification.title}\n\nIn production, this would open an edit form with the notification data pre-filled.`)
  }

  const handleView = (notification: Notification) => {
    setNotificationToView(notification)
    setViewModalOpen(true)
    setOpenMenuId(null)
  }

  const handleDeleteClick = (notification: Notification) => {
    setNotificationToDelete(notification)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (notificationToDelete) {
      setNotifications(notifications.filter(n => n.id !== notificationToDelete.id))
      console.log('Deleted notification:', notificationToDelete)
      setNotificationToDelete(null)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Tabs */}
      <div className="border-b border-[#e2e8f0] flex items-start gap-6 pb-px">
        <button
          onClick={() => handleTab.switch('All Notifications')}
          className="pb-[14px] border-b-2 border-[#7f28bc] text-xs font-semibold text-[#7f28bc] leading-4"
        >
          All Notifications (124)
        </button>
        <button
          onClick={() => handleTab.switch('Scheduled')}
          className="pb-[14px] border-b-2 border-transparent text-xs font-semibold text-[#64748b] leading-4"
        >
          Scheduled (12)
        </button>
        <button
          onClick={() => handleTab.switch('Sent')}
          className="pb-[14px] border-b-2 border-transparent text-xs font-semibold text-[#64748b] leading-4"
        >
          Sent (98)
        </button>
        <button
          onClick={() => handleTab.switch('Drafts')}
          className="pb-[14px] border-b-2 border-transparent text-xs font-semibold text-[#64748b] leading-4"
        >
          Drafts (8)
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden p-px">
        {/* Header */}
        <div className="bg-[rgba(248,250,252,0.7)] flex items-center h-[73px]">
          <div className="w-[41px] px-3 flex items-center justify-center">
            <input type="checkbox" className="w-[15px] h-[15px] border border-[#cbd5e1] rounded" />
          </div>
          <div className="w-[37px] px-2 flex items-center justify-center">
            <span className="text-xs font-medium text-[#1d1b20] leading-4 tracking-[0.55px] uppercase">#</span>
          </div>
          <div className="w-[216px] px-3 flex items-start">
            <span className="text-xs font-medium text-[#1d1b20] leading-4 tracking-[0.55px] uppercase">Title</span>
          </div>
          <div className="flex-1 px-2 flex items-center justify-center">
            <span className="text-xs font-semibold text-[#1d1b20] leading-4 tracking-[0.55px] uppercase text-center">Type</span>
          </div>
          <div className="flex-1 px-3 flex items-center justify-center">
            <span className="text-xs font-medium text-[#1d1b20] leading-4 tracking-[0.55px] uppercase text-center">Audience</span>
          </div>
          <div className="w-[101px] px-3 flex items-center justify-center">
            <span className="text-xs font-medium text-[#1d1b20] leading-4 tracking-[0.55px] uppercase text-center">
              Scheduled<br />/ Sent At
            </span>
          </div>
          <div className="flex-1 px-2 flex items-center justify-center">
            <span className="text-xs font-medium text-[#1d1b20] leading-4 tracking-[0.55px] uppercase text-center">Status</span>
          </div>
          <div className="flex-1 px-3 flex items-center gap-1">
            <span className="text-xs font-medium text-[#1d1b20] leading-4 tracking-[0.55px] uppercase">Stats</span>
            <img src="/icons/info-circle-icon.svg" alt="" className="w-3 h-3" />
          </div>
          <div className="flex-1 px-3 flex items-center justify-center">
            <span className="text-xs font-medium text-[#1d1b20] leading-4 tracking-[0.55px] uppercase text-center">Actions</span>
          </div>
        </div>

        {/* Body */}
        {notifications.map((notif, idx) => (
          <div key={idx} className="flex items-center h-[109px] border-t border-[#f1f5f9]">
            <div className="w-[41px] px-3 flex items-center justify-center">
              <input type="checkbox" className="w-4 h-4 border border-[#cbd5e1] rounded" />
            </div>
            <div className="w-[37px] px-2 flex items-center justify-center">
              <span className="text-[11px] font-medium text-[#94a3b8] leading-4">0{idx + 1}</span>
            </div>
            <div className="w-[216px] px-3 flex flex-col gap-0.5 py-7">
              <span className="text-xs font-semibold text-[#0f172a] leading-[15px]">{notif.title}</span>
              <span className="text-[11px] text-[#94a3b8] leading-4 max-w-[320px] truncate">{notif.message}</span>
            </div>
            <div className="flex-1 px-2 flex items-center justify-center">
              <span className="px-2 py-0.5 bg-[#f3e8ff] rounded-full text-[10px] font-semibold text-[#7f28bc] leading-4">
                {notif.type}
              </span>
            </div>
            <div className="flex-1 px-3 flex flex-col items-center justify-center">
              <span className="text-xs text-[#334155] leading-4">{notif.audience}</span>
              <span className="text-[11px] text-[#94a3b8] leading-4">{notif.audienceCount}</span>
            </div>
            <div className="w-[101px] px-3 flex flex-col items-center">
              <span className="text-xs text-[#334155] leading-4">{notif.date}</span>
              <span className="text-[11px] text-[#94a3b8] leading-4">{notif.time}</span>
            </div>
            <div className="flex-1 px-2 flex items-center justify-center">
              <span className="px-2 py-0.5 bg-[#d1fae5] rounded-full text-[10px] font-semibold text-[#047857] leading-4">
                {notif.status}
              </span>
            </div>
            <div className="flex-1 px-3 flex flex-col items-center justify-center gap-2">
              <div className="flex flex-col items-start w-full">
                <span className="text-[11px] text-[#475569] leading-4">{notif.delivered}</span>
                <span className="text-[11px] text-[#475569] leading-4">delivered</span>
              </div>
              <div className="flex flex-col items-start w-full">
                <span className="text-[11px] font-semibold text-[#0f172a] leading-4">{notif.read}</span>
                <span className="text-[11px] font-semibold text-[#0f172a] leading-4">read</span>
              </div>
            </div>
            <div className="flex-1 px-3 flex items-center justify-center">
              <div className="relative inline-block">
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
                      label: 'View Details',
                      onClick: () => handleView(notif),
                    },
                    {
                      label: 'Edit Notification',
                      onClick: () => handleEdit(notif),
                    },
                    {
                      label: 'Delete',
                      onClick: () => handleDeleteClick(notif),
                      className: 'text-[#ef4444] hover:bg-[#fef2f2]',
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        ))}

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-4 border-t border-[#e2e8f0]">
          <span className="text-xs text-[#64748b] leading-4">Showing 1 to 10 of 124 notifications</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <button
                onClick={handlePagination.previous}
                className="w-7 h-7 border border-[#e2e8f0] rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <img src="/icons/chevron-left-small.svg" alt="" className="w-[14px] h-[14px]" />
              </button>
              <button
                onClick={() => handlePagination.goToPage(1)}
                className="w-7 h-7 bg-[#7f28bc] rounded flex items-center justify-center text-xs font-bold text-white leading-4"
              >
                1
              </button>
              <button
                onClick={() => handlePagination.goToPage(2)}
                className="w-7 h-7 rounded flex items-center justify-center text-xs text-[#475569] leading-4 hover:bg-gray-50 transition-colors"
              >2</button>
              <button
                onClick={() => handlePagination.goToPage(3)}
                className="w-7 h-7 rounded flex items-center justify-center text-xs text-[#475569] leading-4 hover:bg-gray-50 transition-colors"
              >3</button>
              <button
                onClick={() => handlePagination.goToPage(4)}
                className="w-7 h-7 rounded flex items-center justify-center text-xs text-[#475569] leading-4 hover:bg-gray-50 transition-colors"
              >4</button>
              <button
                onClick={() => handlePagination.goToPage(5)}
                className="w-7 h-7 rounded flex items-center justify-center text-xs text-[#475569] leading-4 hover:bg-gray-50 transition-colors"
              >5</button>
              <button
                onClick={handlePagination.next}
                className="w-7 h-7 border border-[#e2e8f0] rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <img src="/icons/chevron-right-small.svg" alt="" className="w-[14px] h-[14px]" />
              </button>
            </div>
            <button
              onClick={() => handlePagination.changePageSize(10)}
              className="bg-white border border-[#e2e8f0] rounded-lg px-[11px] py-[5px] flex items-center gap-1 hover:bg-gray-50 transition-colors"
            >
              <span className="text-xs text-[#334155] leading-4">10 / page</span>
              <img src="/icons/dropdown-arrow-gray.svg" alt="" className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setNotificationToDelete(null)
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Notification"
        message="Are you sure you want to delete notification"
        itemName={notificationToDelete?.title || ''}
      />

      {/* View Notification Modal */}
      <ViewNotificationModal
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false)
          setNotificationToView(null)
        }}
        data={notificationToView}
      />
    </div>
  )
}
