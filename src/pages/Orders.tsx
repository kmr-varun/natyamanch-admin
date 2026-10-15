import OrdersMetrics from '../components/OrdersMetrics'
import OrdersFilterBar from '../components/OrdersFilterBar'
import OrdersTable from '../components/OrdersTable'
import OrderDetailsPanel from '../components/OrderDetailsPanel'
import { PageContainer, TwoColumnLayout } from '../components/shared'

export default function Orders() {
  return (
    <PageContainer className="flex flex-col gap-6">
      <OrdersMetrics />
      <TwoColumnLayout
        leftColumn={
          <>
            <OrdersFilterBar />
            <OrdersTable />
          </>
        }
        rightColumn={<OrderDetailsPanel />}
      />
    </PageContainer>
  )
}