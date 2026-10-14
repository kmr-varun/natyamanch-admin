import OrdersMetrics from '../components/OrdersMetrics'
import OrdersFilterBar from '../components/OrdersFilterBar'
import OrdersTable from '../components/OrdersTable'
import OrderDetailsPanel from '../components/OrderDetailsPanel'

export default function Orders() {
  return (
    <div className="p-8 flex flex-col gap-6">
      {/* Full Width Metrics Row */}
      <OrdersMetrics />

      {/* Two Column Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - 8 cols */}
        <div className="col-span-8 flex flex-col gap-6">
          <OrdersFilterBar />
          <OrdersTable />
        </div>

        {/* Right Column - 4 cols */}
        <div className="col-span-4">
          <OrderDetailsPanel />
        </div>
      </div>
    </div>
  )
}