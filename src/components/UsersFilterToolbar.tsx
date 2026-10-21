import { useState } from 'react'
import { Button } from './shared'
import { downloadCSV } from '../utils/exportUtils'
import type { AdminUserRow } from '../lib/api'

interface UsersFilterToolbarProps {
  onAddUser: () => void
  onSearch: (query: string) => void
  users: AdminUserRow[]
}

export default function UsersFilterToolbar({ onAddUser, onSearch, users }: UsersFilterToolbarProps) {
  const [searchValue, setSearchValue] = useState('')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    onSearch(value)
  }

  const handleExportClick = () => {
    const exportData = users.map(user => ({
      ID: user.id,
      Name: user.name,
      Email: user.email,
      Phone: user.phone || '',
      'Purchased Videos': user.purchased_videos,
      'Active Videos': user.active_videos,
      'Account Status': user.account_status,
      'Joined Date': user.created_at,
    }))
    downloadCSV(exportData, 'users')
  }

  return (
    <div className="bg-white rounded-lg shadow-sm h-[84px] flex items-center px-4 justify-between">
      <div className="flex items-center gap-4">
        <div className="relative w-80">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
            <img src="/icons/search.svg" alt="" className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchValue}
            onChange={handleSearchChange}
            className="w-full h-[34px] pl-9 pr-7 bg-white border border-[#e2e8f0] rounded-full text-xs text-[#94a3b8] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#7f28bc] shadow-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={handleExportClick} variant="secondary" icon="/icons/export-icon.svg" className="h-10 px-3.5">
          Export
        </Button>
        <Button onClick={onAddUser} icon="/icons/add-user-icon.svg" className="h-10 px-6">
          Add User
        </Button>
      </div>
    </div>
  )
}
