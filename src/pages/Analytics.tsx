import { useState, useEffect } from 'react'
import AnalyticsMetrics from '../components/AnalyticsMetrics'
import AnalyticsTrendCharts from '../components/AnalyticsTrendCharts'
import AnalyticsPerformance from '../components/AnalyticsPerformance'
import AnalyticsDevicePayment from '../components/AnalyticsDevicePayment'
import { PageContainer } from '../components/shared'
import { analyticsApi, mandalsApi } from '../lib/api'

export default function Analytics() {
  const [dashStats, setDashStats] = useState<Awaited<ReturnType<typeof analyticsApi.dashboard>> | null>(null)
  const [trendData, setTrendData] = useState<{ date: string; orders: number; revenue: number }[]>([])
  const [topVideos, setTopVideos] = useState<{ id: string; title: string; thumbnail_url?: string; view_count: number; purchase_count: number; revenue: number }[]>([])
  const [userRegistrations, setUserRegistrations] = useState<{ date: string; registrations: number }[]>([])
  const [orgStats, setOrgStats] = useState<{ total: number; active: number; expired: number; inactive: number; expiring_soon: number } | null>(null)
  const [chartDays, setChartDays] = useState(30)

  useEffect(() => {
    Promise.all([
      analyticsApi.dashboard(),
      analyticsApi.revenueChart(30),
      analyticsApi.topVideos(),
      analyticsApi.userRegistrations(30),
      mandalsApi.stats(),
    ]).then(([dash, revenue, videos, regs, orgs]) => {
      setDashStats(dash)
      setTrendData(revenue.data ?? [])
      setTopVideos(videos.videos ?? [])
      setUserRegistrations(regs.data ?? [])
      setOrgStats(orgs.stats ?? null)
    }).catch(console.error)
  }, [])

  const handleDaysChange = async (days: number) => {
    setChartDays(days)
    try {
      const [revenue, regs] = await Promise.all([
        analyticsApi.revenueChart(days),
        analyticsApi.userRegistrations(days),
      ])
      setTrendData(revenue.data ?? [])
      setUserRegistrations(regs.data ?? [])
    } catch {}
  }

  return (
    <PageContainer className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1d1b20] leading-8">Analytics</h1>
        <p className="text-sm text-[#64748b] mt-0.5">Platform performance and insights</p>
      </div>
      <AnalyticsMetrics stats={dashStats} />
      <AnalyticsTrendCharts trendData={trendData} orgStats={orgStats} days={chartDays} onDaysChange={handleDaysChange} />
      <AnalyticsPerformance topVideos={topVideos} userRegistrations={userRegistrations} />
      <AnalyticsDevicePayment />
    </PageContainer>
  )
}
