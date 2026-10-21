import { useState } from 'react'
import { ActionMenu, DeleteConfirmModal } from './shared'
import ViewUserModal from './ViewUserModal'
import type { AdminUserRow, Pagination } from '../lib/api'

interface UsersTableProps {
  users: AdminUserRow[]
  loading: boolean
  error: string
  pagination: Pagination
  activeTab: 'active' | 'inactive'
  onTabChange: (tab: 'active' | 'inactive') => void
  onPageChange: (page: number) => void
  onLimitChange: (limit: number) => void
  onStatusUpdate: (userId: string, status: string) => void
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function UsersTable({
  users, loading, error, pagination, activeTab, onTabChange, onPageChange, onLimitChange, onStatusUpdate,
}: UsersTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [suspendModalOpen, setSuspendModalOpen] = useState(false)
  const [userToSuspend, setUserToSuspend] = useState<AdminUserRow | null>(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [userToView, setUserToView] = useState<AdminUserRow | null>(null)
  const [bulkActionOpen, setBulkActionOpen] = useState(false)

  const handleView = (user: AdminUserRow) => {
    setUserToView(user)
    setViewModalOpen(true)
    setOpenMenuId(null)
  }

  const handleToggleStatus = (user: AdminUserRow) => {
    setUserToSuspend(user)
    setSuspendModalOpen(true)
    setOpenMenuId(null)
  }

  const handleToggleConfirm = () => {
    if (userToSuspend) {
      const newStatus = userToSuspend.account_status === 'active' ? 'inactive' : 'active'
      onStatusUpdate(userToSuspend.id, newStatus)
      setUserToSuspend(null)
    }
  }

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(users.map(u => u.id))
    }
  }

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    )
  }

  const handleBulkDeactivate = () => {
    if (confirm(`Deactivate ${selectedUsers.length} selected users?`)) {
      selectedUsers.forEach(id => onStatusUpdate(id, 'inactive'))
      setSelectedUsers([])
      setBulkActionOpen(false)
    }
  }

  const { page, limit, total, totalPages } = pagination
  const startIndex = (page - 1) * limit

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-[#e6e6e6] p-12 text-center">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-[#e6e6e6]">
        {/* Header */}
        <div className="bg-[rgba(248,242,250,0.6)] border-b border-[#f2ecf4] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-base font-bold text-[#1d1b20] leading-6">All Users</h2>
            <span className="text-base text-[#d4c2ca]">•</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onTabChange('active')}
                className={`px-6 h-[26px] ${activeTab === 'active' ? 'bg-[#7f28bc] text-white shadow-[0px_2px_4px_rgba(56,6,43,0.2)]' : 'border border-[#7f28bc] text-[#7f28bc]'} text-xs font-medium tracking-[0.36px] rounded hover:bg-[#6d1fa3] hover:text-white transition-colors`}
              >
                Active Users
              </button>
              <button
                onClick={() => onTabChange('inactive')}
                className={`px-3.5 h-[27px] ${activeTab === 'inactive' ? 'bg-[#7f28bc] text-white shadow-[0px_2px_4px_rgba(56,6,43,0.2)]' : 'border border-[#7f28bc] text-[#7f28bc]'} text-xs font-medium tracking-[0.36px] rounded hover:bg-[#6d1fa3] hover:text-white transition-colors`}
              >
                Deactivated Users
              </button>
            </div>
            {selectedUsers.length > 0 && (
              <div className="relative ml-4">
                <button
                  onClick={() => setBulkActionOpen(!bulkActionOpen)}
                  className="px-4 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded hover:bg-purple-200 transition-colors"
                >
                  Bulk Actions ({selectedUsers.length})
                </button>
                {bulkActionOpen && (
                  <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-48">
                    <button
                      onClick={handleBulkDeactivate}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Deactivate Selected
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-normal text-[#50434a]">Show:</span>
            <select
              value={limit}
              onChange={e => {
                onLimitChange(Number(e.target.value))
              }}
              className="pl-3 pr-6 py-1 bg-white border border-[#f2ecf4] rounded-sm shadow-sm text-[11px] font-bold text-[#1d1b20] tracking-[0.55px] focus:outline-none focus:border-[#7f28bc]"
            >
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="25">25 per page</option>
              <option value="50">50 per page</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f7ecff] border-b border-[#f2ecf4]">
                <th className="w-[107px] px-6 py-5">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === users.length && users.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 border border-[#767676] rounded-sm cursor-pointer"
                  />
                </th>
                <th className="px-4 py-5 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-center">User</th>
                <th className="px-4 py-5 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-center">Email</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-center">Purchased Videos</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-center">Active Access</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-center">Account Status</th>
                <th className="px-4 py-5 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-center">Joined</th>
                <th className="px-6 py-5 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: limit }).map((_, i) => (
                  <tr key={i} className="border-b border-[#f8f2fa] animate-pulse">
                    <td className="px-6 py-5"><div className="w-4 h-4 bg-gray-200 rounded" /></td>
                    <td className="px-4 py-5"><div className="h-4 bg-gray-200 rounded w-32 mx-auto" /></td>
                    <td className="px-4 py-5"><div className="h-4 bg-gray-200 rounded w-40 mx-auto" /></td>
                    <td className="px-4 py-5"><div className="h-4 bg-gray-200 rounded w-16 mx-auto" /></td>
                    <td className="px-4 py-5"><div className="h-4 bg-gray-200 rounded w-20 mx-auto" /></td>
                    <td className="px-4 py-5"><div className="h-6 bg-gray-200 rounded-xl w-20 mx-auto" /></td>
                    <td className="px-4 py-5"><div className="h-4 bg-gray-200 rounded w-24 mx-auto" /></td>
                    <td className="px-6 py-5"><div className="h-4 bg-gray-200 rounded w-6 ml-auto" /></td>
                  </tr>
                ))
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-sm text-gray-400">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user.id} className="border-b border-[#f8f2fa]">
                    <td className="px-6 py-5">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="w-4 h-4 border border-[#767676] rounded-sm cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-sm font-semibold text-[#1d1b20] leading-[17.5px]">{user.name}</span>
                        <span className="text-[11px] font-semibold text-[#3c0d5d] tracking-[0.55px] leading-[14px]">
                          #{user.id.slice(0, 8)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-6 text-xs font-normal text-[#3b3b3b] text-center">{user.email}</td>
                    <td className="px-4 py-6 text-sm font-normal text-[#1d1b20] text-center">
                      {user.purchased_videos} Videos
                    </td>
                    <td className="px-4 py-5 text-center">
                      <div className="inline-flex items-center gap-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${user.active_videos > 0 ? 'bg-[#7f28bc]' : 'bg-gray-400'}`} />
                        <span className={`text-sm font-semibold leading-5 ${user.active_videos > 0 ? 'text-[#7f28bc]' : 'text-gray-400'}`}>
                          {user.active_videos > 0 ? `${user.active_videos} Active` : 'No Access'}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-5 text-center">
                      {user.account_status === 'active' ? (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#dcfce7] rounded-xl">
                          <div className="w-1.5 h-1.5 bg-[#16a34a] rounded-full" />
                          <span className="text-[11px] font-semibold text-[#166534] tracking-[0.55px] leading-[14px]">Active</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#ffebef] rounded-xl">
                          <div className="w-1.5 h-1.5 bg-[#e23e5e] rounded-full" />
                          <span className="text-[11px] font-semibold text-[#e23e5e] tracking-[0.55px] leading-[14px]">
                            {user.account_status === 'banned' ? 'Banned' : 'Inactive'}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-5 text-xs font-normal text-[#3b3b3b] text-center">
                      {formatDate(user.created_at)}
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="relative inline-block">
                        <button
                          onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                          className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                        >
                          <img src="/icons/dots-menu.svg" alt="Actions" className="w-3.5 h-1" />
                        </button>
                        <ActionMenu
                          isOpen={openMenuId === user.id}
                          onClose={() => setOpenMenuId(null)}
                          options={[
                            { label: 'View Details', onClick: () => handleView(user) },
                            {
                              label: user.account_status === 'active' ? 'Deactivate' : 'Activate',
                              onClick: () => handleToggleStatus(user),
                            },
                          ]}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="bg-[rgba(248,242,250,0.6)] border-t border-[#f2ecf4] px-6 py-4 flex items-center justify-between">
          <span className="text-xs font-normal text-[#50434a]">
            Showing <span className="text-[#1d1b20]">{total === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + limit, total)}</span> of <span className="text-[#1d1b20]">{total}</span> users
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium text-[#585858] tracking-[0.36px] hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <img src="/icons/chevron-left.svg" alt="" className="w-[4.933px] h-2" />
              Previous
            </button>

            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const p = i + 1
              return (
                <button
                  key={p}
                  onClick={() => onPageChange(p)}
                  className={`w-8 h-8 flex items-center justify-center ${
                    page === p ? 'bg-[#7f28bc] text-white shadow-sm' : 'text-[#585858] hover:bg-white'
                  } text-xs font-semibold tracking-[0.36px] rounded transition-colors`}
                >
                  {p}
                </button>
              )
            })}

            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages || totalPages === 0}
              className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium text-[#585858] tracking-[0.36px] hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <img src="/icons/chevron-right-small.svg" alt="" className="w-[4.933px] h-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Suspend/Activate Confirmation */}
      <DeleteConfirmModal
        isOpen={suspendModalOpen}
        onClose={() => { setSuspendModalOpen(false); setUserToSuspend(null) }}
        onConfirm={handleToggleConfirm}
        title={userToSuspend?.account_status === 'active' ? 'Deactivate User' : 'Activate User'}
        message={userToSuspend?.account_status === 'active'
          ? 'Are you sure you want to deactivate'
          : 'Are you sure you want to activate'}
        itemName={userToSuspend?.name || ''}
      />

      <ViewUserModal
        isOpen={viewModalOpen}
        onClose={() => { setViewModalOpen(false); setUserToView(null) }}
        data={userToView}
      />
    </>
  )
}
