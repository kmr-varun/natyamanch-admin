import StatsCard from '../components/StatsCard'
import RevenueChart from '../components/RevenueChart'
import MandalsTable from '../components/MandalsTable'
import RecentOrdersTable from '../components/RecentOrdersTable'
import PopularVideos from '../components/PopularVideos'
import { PageContainer } from '../components/shared'

export default function Dashboard() {
  return (
    <PageContainer>
      <div className="flex gap-3">
        <StatsCard
          icon="/icons/users-icon.svg"
          iconBg="#f86c2e"
          title="Total Users"
          value="48"
          change="12%"
          changeType="up"
        />
        <StatsCard
          icon="/icons/revenue-icon.svg"
          iconBg="#e23e5e"
          title="Total Revenue"
          value="$4800"
          change="12%"
          changeType="up"
        />
        <StatsCard
          icon="/icons/sales-icon.svg"
          iconBg="#7f28bc"
          title="Total Video Sales"
          value="48"
          change="12%"
          changeType="up"
        />
        <StatsCard
          icon="/icons/subscriptions-icon.svg"
          iconBg="#4930ea"
          title="Active Subscriptions"
          value="48"
          change="12%"
          changeType="up"
        />
        <StatsCard
          icon="/icons/video-access-icon.svg"
          iconBg="#e23e5e"
          title="Active Video Accesses"
          value="48"
          change="12%"
          changeType="up"
        />
      </div>

      <div className="grid grid-cols-12 gap-6 pt-6">
        <div className="col-span-7">
          <RevenueChart />
        </div>
        <div className="col-span-5">
          <MandalsTable />
        </div>
      </div>

      <div className="flex gap-6 pt-6">
        <div className="flex-1">
          <RecentOrdersTable />
        </div>
        <div className="w-[503px]">
          <PopularVideos />
        </div>
      </div>
    </PageContainer>
  )
}
