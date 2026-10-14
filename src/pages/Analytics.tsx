import AnalyticsMetrics from '../components/AnalyticsMetrics'
import AnalyticsTrendCharts from '../components/AnalyticsTrendCharts'
import AnalyticsPerformance from '../components/AnalyticsPerformance'
import AnalyticsDevicePayment from '../components/AnalyticsDevicePayment'

export default function Analytics() {
  return (
    <div className="p-8 flex flex-col gap-5">
      {/* Section 1: KPI Metrics */}
      <AnalyticsMetrics />

      {/* Section 2: Trend Charts */}
      <AnalyticsTrendCharts />

      {/* Section 3: Performance Metrics */}
      <AnalyticsPerformance />

      {/* Section 4: Device & Payment Analytics */}
      <AnalyticsDevicePayment />
    </div>
  )
}
