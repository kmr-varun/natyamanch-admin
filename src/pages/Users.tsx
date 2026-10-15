import { useState } from 'react'
import StatsCard from '../components/StatsCard'
import UsersFilterToolbar from '../components/UsersFilterToolbar'
import UsersTable from '../components/UsersTable'
import AddUserModal from '../components/AddUserModal'
import { PageContainer } from '../components/shared'

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

const initialUsers: User[] = [
  {
    id: 1048,
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    purchasedVideos: 8,
    activeVideos: 6,
    activeStatus: 'Active',
    accountStatus: 'Active',
    joinedDate: 'Sep 12, 2026',
  },
  {
    id: 1047,
    name: 'Rahul Mehta',
    email: 'rahul.mehta@email.com',
    purchasedVideos: 8,
    activeVideos: 6,
    activeStatus: 'Active',
    accountStatus: 'Active',
    joinedDate: 'Sep 12, 2026',
  },
  {
    id: 1046,
    name: 'Ananya Iyer',
    email: 'ananya.iyer@email.com',
    purchasedVideos: 8,
    activeVideos: 6,
    activeStatus: 'Active',
    accountStatus: 'Active',
    joinedDate: 'Sep 12, 2026',
  },
  {
    id: 1045,
    name: 'Vikram Singh',
    email: 'vikram.singh@email.com',
    purchasedVideos: 8,
    activeVideos: 0,
    activeStatus: 'Expired',
    accountStatus: 'Expired',
    joinedDate: 'Sep 12, 2026',
  },
  {
    id: 1044,
    name: 'Neha Kapoor',
    email: 'neha.kapoor@email.com',
    purchasedVideos: 8,
    activeVideos: 6,
    activeStatus: 'Active',
    accountStatus: 'Active',
    joinedDate: 'Sep 12, 2026',
  },
  {
    id: 1043,
    name: 'Arjun Patel',
    email: 'arjun.patel@email.com',
    purchasedVideos: 8,
    activeVideos: 6,
    activeStatus: 'Active',
    accountStatus: 'Active',
    joinedDate: 'Sep 12, 2026',
  },
  {
    id: 1042,
    name: 'Divya Nair',
    email: 'divya.nair@email.com',
    purchasedVideos: 8,
    activeVideos: 6,
    activeStatus: 'Active',
    accountStatus: 'Active',
    joinedDate: 'Sep 12, 2026',
  },
  {
    id: 1041,
    name: 'Karan Desai',
    email: 'karan.desai@email.com',
    purchasedVideos: 8,
    activeVideos: 6,
    activeStatus: 'Active',
    accountStatus: 'Active',
    joinedDate: 'Sep 12, 2026',
  },
]

export default function Users() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [filteredUsers, setFilteredUsers] = useState<User[]>(initialUsers)
  const [addUserModalOpen, setAddUserModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All')

  const handleAddUser = (newUser: { name: string; email: string; password: string; status: 'Active' | 'Inactive' }) => {
    const user: User = {
      id: Math.max(...users.map(u => u.id)) + 1,
      name: newUser.name,
      email: newUser.email,
      purchasedVideos: 0,
      activeVideos: 0,
      activeStatus: newUser.status === 'Active' ? 'Active' : 'Expired',
      accountStatus: newUser.status === 'Active' ? 'Active' : 'Expired',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }
    const updatedUsers = [user, ...users]
    setUsers(updatedUsers)
    applyFilters(updatedUsers, searchQuery, statusFilter)
  }

  const handleDeleteUser = (userId: number) => {
    const updatedUsers = users.filter(u => u.id !== userId)
    setUsers(updatedUsers)
    applyFilters(updatedUsers, searchQuery, statusFilter)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    applyFilters(users, query, statusFilter)
  }

  const handleStatusFilter = (status: 'All' | 'Active' | 'Inactive') => {
    setStatusFilter(status)
    applyFilters(users, searchQuery, status)
  }

  const applyFilters = (userList: User[], query: string, status: 'All' | 'Active' | 'Inactive') => {
    let filtered = userList

    // Apply search filter
    if (query) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        user.id.toString().includes(query)
      )
    }

    // Apply status filter
    if (status !== 'All') {
      filtered = filtered.filter(user =>
        status === 'Active' ? user.accountStatus === 'Active' : user.accountStatus === 'Expired'
      )
    }

    setFilteredUsers(filtered)
  }

  const activeUsers = users.filter(u => u.accountStatus === 'Active').length
  const subscribedUsers = users.filter(u => u.activeVideos > 0).length

  return (
    <PageContainer>
      <div className="flex gap-3">
        <StatsCard
          icon="/icons/total-users-icon.svg"
          iconBg="#f86c2e"
          title="Total Users"
          value={users.length.toString()}
          change="12%"
          changeType="up"
        />
        <StatsCard
          icon="/icons/active-users-icon.svg"
          iconBg="#e23e5e"
          title="Active Users"
          value={activeUsers.toString()}
          change="12%"
          changeType="up"
        />
        <StatsCard
          icon="/icons/active-access-icon.svg"
          iconBg="#7f28bc"
          title="Active Access"
          value={activeUsers.toString()}
          change="12%"
          changeType="up"
        />
        <StatsCard
          icon="/icons/subscribed-users-icon.svg"
          iconBg="#4930ea"
          title="Subscribed Users"
          value={subscribedUsers.toString()}
          change="12%"
          changeType="up"
        />
      </div>

      <div className="pt-6">
        <UsersFilterToolbar
          onAddUser={() => setAddUserModalOpen(true)}
          onSearch={handleSearch}
          onStatusFilter={handleStatusFilter}
          users={filteredUsers}
        />
      </div>

      <div className="pt-6">
        <UsersTable
          users={filteredUsers}
          onDeleteUser={handleDeleteUser}
        />
      </div>

      <AddUserModal
        isOpen={addUserModalOpen}
        onClose={() => setAddUserModalOpen(false)}
        onAdd={handleAddUser}
      />
    </PageContainer>
  )
}
