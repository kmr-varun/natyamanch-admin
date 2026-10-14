import StatsCard from '../components/StatsCard'
import UsersFilterToolbar from '../components/UsersFilterToolbar'
import UsersTable from '../components/UsersTable'

export default function Users() {
  return (
    <div className="p-8">
      {/* Stats Cards Row */}
      <div className="flex gap-3">
        <StatsCard
          icon="/icons/total-users-icon.svg"
          iconBg="#f86c2e"
          title="Total Users"
          value="48"
          change="12%"
          changeType="up"
        />
        <StatsCard
          icon="/icons/active-users-icon.svg"
          iconBg="#e23e5e"
          title="Active Users"
          value="48"
          change="12%"
          changeType="up"
        />
        <StatsCard
          icon="/icons/active-access-icon.svg"
          iconBg="#7f28bc"
          title="Active Access"
          value="48"
          change="12%"
          changeType="up"
        />
        <StatsCard
          icon="/icons/subscribed-users-icon.svg"
          iconBg="#4930ea"
          title="Subscribed Users"
          value="48"
          change="12%"
          changeType="up"
        />
      </div>

      {/* Filter & Actions Toolbar */}
      <div className="pt-6">
        <UsersFilterToolbar />
      </div>

      {/* Users Table */}
      <div className="pt-6">
        <UsersTable />
      </div>
    </div>
  )
}
