import AnalyticsMetrics from '../components/AnalyticsMetrics'
import AnalyticsTrendCharts from '../components/AnalyticsTrendCharts'
import AnalyticsPerformance from '../components/AnalyticsPerformance'
import AnalyticsDevicePayment from '../components/AnalyticsDevicePayment'
import { PageContainer } from '../components/shared'

export default function Analytics() {
  return (
    <PageContainer className="flex flex-col gap-6">
      <AnalyticsMetrics />
      <AnalyticsTrendCharts />
      <AnalyticsPerformance />
      <AnalyticsDevicePayment />
    </PageContainer>
  )
}
