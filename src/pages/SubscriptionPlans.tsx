import { useState } from 'react'
import SubscriptionPlansMetrics from '../components/SubscriptionPlansMetrics'
import SubscriptionPlansFilterBar from '../components/SubscriptionPlansFilterBar'
import SubscriptionPlansTable from '../components/SubscriptionPlansTable'
import SubscriptionPlansTipsBanner from '../components/SubscriptionPlansTipsBanner'
import SubscriptionPlanForm from '../components/SubscriptionPlanForm'
import { PageContainer, TwoColumnLayout, Button } from '../components/shared'

export default function SubscriptionPlans() {
  const [showPlanForm, setShowPlanForm] = useState(false)
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add')

  const handleAddPlan = () => {
    setFormMode('add')
    setShowPlanForm(true)
  }

  return (
    <PageContainer>
      <TwoColumnLayout
        leftColumn={
          <>
            <SubscriptionPlansMetrics />
            <SubscriptionPlansFilterBar />
            <SubscriptionPlansTable />
            <SubscriptionPlansTipsBanner />
          </>
        }
        rightColumn={
          <>
            <div className="flex items-center justify-end">
              <Button onClick={handleAddPlan} icon="/icons/plus-small-white.svg">Add New Plan</Button>
            </div>
            {showPlanForm && <SubscriptionPlanForm mode={formMode} />}
          </>
        }
      />
    </PageContainer>
  )
}
