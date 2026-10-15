import { useState } from 'react'
import { ActionMenu, DeleteConfirmModal } from './shared'
import ViewUserModal from './ViewUserModal'

interface User {
  id: number
  name: string
  email: string
  purchasedVideos: number
  activeVideos: number
  activeStatus: 'Active' | 'Expired'
  accountStatus: 'Active' | 'Expired'
  joinedDate: string
}

interface UsersTableProps {
  users: User[]
  onDeleteUser: (userId: number) => void
}

export default function UsersTable({ users, onDeleteUser }: UsersTableProps) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [showActiveOnly, setShowActiveOnly] = useState(true)
  const [bulkActionOpen, setBulkActionOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [userToView, setUserToView] = useState<User | null>(null)

  const handleEdit = (user: User) => {
    console.log('Edit user:', user)
    alert(`Edit user: ${user.name}\n\nIn production, this would open an edit form with the user's data pre-filled.`)
  }

  const handleView = (user: User) => {
    setUserToView(user)
    setViewModalOpen(true)
    setOpenMenuId(null)
  }

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      onDeleteUser(userToDelete.id)
      setUserToDelete(null)
    }
  }

  const handleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(paginatedUsers.map(u => u.id))
    }
  }

  const handleSelectUser = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId))
    } else {
      setSelectedUsers([...selectedUsers, userId])
    }
  }

  const handleBulkDelete = () => {
    if (confirm(`Delete ${selectedUsers.length} selected users?`)) {
      selectedUsers.forEach(id => onDeleteUser(id))
      setSelectedUsers([])
      setBulkActionOpen(false)
    }
  }

  const handleBulkDeactivate = () => {
    alert(`Deactivate ${selectedUsers.length} users (mock action)`)
    setSelectedUsers([])
    setBulkActionOpen(false)
  }

  // Filter users based on active tab
  const filteredUsers = showActiveOnly
    ? users.filter(u => u.accountStatus === 'Active')
    : users.filter(u => u.accountStatus === 'Expired')

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages))
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
                onClick={() => setShowActiveOnly(true)}
                className={`px-6 h-[26px] ${showActiveOnly ? 'bg-[#7f28bc] text-white shadow-[0px_2px_4px_rgba(56,6,43,0.2)]' : 'border border-[#7f28bc] text-[#7f28bc]'} text-xs font-medium tracking-[0.36px] rounded hover:bg-[#6d1fa3] hover:text-white transition-colors`}
              >
                Active User
              </button>
              <button
                onClick={() => setShowActiveOnly(false)}
                className={`px-3.5 h-[27px] ${!showActiveOnly ? 'bg-[#7f28bc] text-white shadow-[0px_2px_4px_rgba(56,6,43,0.2)]' : 'border border-[#7f28bc] text-[#7f28bc]'} text-xs font-medium tracking-[0.36px] rounded hover:bg-[#6d1fa3] hover:text-white transition-colors`}
              >
                Deactivated User
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
                    <button
                      onClick={handleBulkDelete}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Delete Selected
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-normal text-[#50434a]">Show:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value))
                setCurrentPage(1)
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
                    checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 border border-[#767676] rounded-sm cursor-pointer"
                  />
                </th>
                <th className="px-4 py-5 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-center">
                  User
                </th>
                <th className="px-4 py-5 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-center">
                  Email
                </th>
                <th className="px-4 py-3 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-center">
                  Purchased Videos
                </th>
                <th className="px-4 py-3 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-center">
                  Active Videos
                </th>
                <th className="px-4 py-3 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-center">
                  Account Status
                </th>
                <th className="px-4 py-5 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-center">
                  Joined
                </th>
                <th className="px-6 py-5 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="border-b border-[#f8f2fa]">
                  <td className="px-6 py-5.5">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="w-4 h-4 border border-[#767676] rounded-sm cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-sm font-semibold text-[#1d1b20] leading-[17.5px]">
                        {user.name}
                      </span>
                      <span className="text-[11px] font-semibold text-[#3c0d5d] tracking-[0.55px] leading-[14px]">
                        #{user.id}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-6 text-xs font-normal text-[#3b3b3b] text-center">
                    {user.email}
                  </td>
                  <td className="px-4 py-6 text-sm font-normal text-[#1d1b20] text-center">
                    {user.purchasedVideos} Videos
                  </td>
                  <td className="px-4 py-5.5 text-center">
                    <div className="inline-flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-[#7f28bc] rounded-full" />
                      <span className="text-sm font-semibold text-[#7f28bc] leading-5">
                        {user.activeVideos > 0 ? `${user.activeVideos} Active` : 'Expired'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-5 text-center">
                    {user.accountStatus === 'Active' ? (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#dcfce7] rounded-xl">
                        <div className="w-1.5 h-1.5 bg-[#16a34a] rounded-full" />
                        <span className="text-[11px] font-semibold text-[#166534] tracking-[0.55px] leading-[14px]">
                          Active
                        </span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#ffebef] rounded-xl">
                        <div className="w-1.5 h-1.5 bg-[#e23e5e] rounded-full" />
                        <span className="text-[11px] font-semibold text-[#e23e5e] tracking-[0.55px] leading-[14px]">
                          Expired
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-5 text-xs font-normal text-[#3b3b3b] text-center">
                    {user.joinedDate}
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
                          {
                            label: 'View Details',
                            onClick: () => handleView(user),
                          },
                          {
                            label: 'Edit User',
                            onClick: () => handleEdit(user),
                          },
                          {
                            label: 'Delete',
                            onClick: () => handleDeleteClick(user),
                            className: 'text-[#ef4444] hover:bg-[#fef2f2]',
                          },
                        ]}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer with Pagination */}
        <div className="bg-[rgba(248,242,250,0.6)] border-t border-[#f2ecf4] px-6 py-4 flex items-center justify-between">
          <span className="text-xs font-normal text-[#50434a]">
            Showing <span className="text-[#1d1b20]">{startIndex + 1}–{Math.min(startIndex + itemsPerPage, filteredUsers.length)}</span> of <span className="text-[#1d1b20]">{filteredUsers.length}</span> users
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium text-[#585858] tracking-[0.36px] hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <img src="/icons/chevron-left.svg" alt="" className="w-[4.933px] h-2" />
              Previous
            </button>

            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const page = i + 1
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-8 h-8 flex items-center justify-center ${
                    currentPage === page
                      ? 'bg-[#7f28bc] text-white shadow-sm'
                      : 'text-[#585858] hover:bg-white'
                  } text-xs font-semibold tracking-[0.36px] rounded transition-colors`}
                >
                  {page}
                </button>
              )
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium text-[#585858] tracking-[0.36px] hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <img src="/icons/chevron-right-small.svg" alt="" className="w-[4.933px] h-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setUserToDelete(null)
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete User"
        message="Are you sure you want to delete user"
        itemName={userToDelete?.name || ''}
      />

      {/* View User Modal */}
      <ViewUserModal
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false)
          setUserToView(null)
        }}
        data={userToView}
      />
    </>
  )
}
