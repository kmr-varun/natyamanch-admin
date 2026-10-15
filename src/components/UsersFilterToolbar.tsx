import { useState } from 'react'
import { Button } from './shared'
import { downloadCSV } from '../utils/exportUtils'

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

interface UsersFilterToolbarProps {
  onAddUser: () => void
  onSearch: (query: string) => void
  onStatusFilter: (status: 'All' | 'Active' | 'Inactive') => void
  users: User[]
}

export default function UsersFilterToolbar({
  onAddUser,
  onSearch,
  onStatusFilter,
  users
}: UsersFilterToolbarProps) {
  const [searchValue, setSearchValue] = useState('')
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Active' | 'Inactive'>('All')

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
      'Purchased Videos': user.purchasedVideos,
      'Active Videos': user.activeVideos,
      'Account Status': user.accountStatus,
      'Joined Date': user.joinedDate,
    }))
    downloadCSV(exportData, 'users')
  }

  const handleFilterSelect = (filter: 'All' | 'Active' | 'Inactive') => {
    setSelectedFilter(filter)
    onStatusFilter(filter)
    setFilterDropdownOpen(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm h-[84px] flex items-center px-4 justify-between">
      {/* Left Side: Search & Filters */}
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative w-80">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
            <img src="/icons/search.svg" alt="" className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search users by name, email, or ID..."
            value={searchValue}
            onChange={handleSearchChange}
            className="w-full h-[34px] pl-9 pr-7 bg-white border border-[#e2e8f0] rounded-full text-xs text-[#94a3b8] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#7f28bc] shadow-sm"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-5">
          <span className="text-base font-medium text-black">Filters</span>
          <div className="relative">
            <button
              onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
              className="flex items-center justify-between w-[250px] px-5 py-3 bg-white border border-[rgba(17,17,17,0.1)] rounded-md text-xs text-[#8a8a8a] hover:border-[#7f28bc] transition-colors"
            >
              {selectedFilter === 'All' ? 'All Users' : `${selectedFilter} Users`}
              <img src="/icons/dropdown-arrow.svg" alt="" className="w-2 h-1" />
            </button>
            {filterDropdownOpen && (
              <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <button
                  onClick={() => handleFilterSelect('All')}
                  className="w-full px-5 py-3 text-left text-xs text-gray-700 hover:bg-purple-50 transition-colors"
                >
                  All Users
                </button>
                <button
                  onClick={() => handleFilterSelect('Active')}
                  className="w-full px-5 py-3 text-left text-xs text-gray-700 hover:bg-purple-50 transition-colors"
                >
                  Active Users
                </button>
                <button
                  onClick={() => handleFilterSelect('Inactive')}
                  className="w-full px-5 py-3 text-left text-xs text-gray-700 hover:bg-purple-50 transition-colors"
                >
                  Inactive Users
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Side: Action Buttons */}
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
