import { useState } from 'react'
import { Link } from 'react-router-dom'
import SubscriptionsMetrics from '../components/SubscriptionsMetrics'
import SubscriptionsFilterBar from '../components/SubscriptionsFilterBar'
import SubscriptionsTable from '../components/SubscriptionsTable'
import SubscriptionDetailsPanel from '../components/SubscriptionDetailsPanel'
import AddSubscriptionModal from '../components/AddSubscriptionModal'
import { PageContainer, TwoColumnLayout, Button } from '../components/shared'

export default function Subscriptions() {
  const [addModalOpen, setAddModalOpen] = useState(false)

  const handleAddSubscription = (subscription: any) => {
    console.log('New subscription:', subscription)
    // In production, this would call an API to create the subscription
  }

  return (
    <PageContainer>
      <TwoColumnLayout
        leftColumn={
          <>
            <SubscriptionsMetrics />
            <SubscriptionsFilterBar />
            <SubscriptionsTable />
          </>
        }
        rightColumn={
          <>
            <div className="flex items-center justify-end gap-3">
              <Link to="/subscription-plans">
                <Button variant="secondary">View Plans</Button>
              </Link>
              <Button onClick={() => setAddModalOpen(true)} icon="/icons/plus-white-icon.svg">Add Subscription</Button>
            </div>
            <SubscriptionDetailsPanel />
          </>
        }
      />
      <AddSubscriptionModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddSubscription}
      />
    </PageContainer>
  )
}
