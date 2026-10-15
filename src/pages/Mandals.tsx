import { useState } from 'react'
import MandalsMetrics from '../components/MandalsMetrics'
import MandalsFilterBar from '../components/MandalsFilterBar'
import MandalsTable from '../components/MandalsTable'
import MandalsActionHeader from '../components/MandalsActionHeader'
import MandalsDetailSidebar from '../components/MandalsDetailSidebar'
import AddMandalModal from '../components/AddMandalModal'
import { PageContainer, TwoColumnLayout } from '../components/shared'

export default function Mandals() {
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [mandals, setMandals] = useState([
    { id: 1, name: 'Mumbai Mandal', contactPerson: 'Raj Sharma', email: 'raj@mumbai.com', phone: '9876543210', location: 'Mumbai', status: 'Active' },
    { id: 2, name: 'Pune Mandal', contactPerson: 'Priya Desai', email: 'priya@pune.com', phone: '9876543211', location: 'Pune', status: 'Active' },
  ])

  const handleAddMandal = (newMandal: any) => {
    const mandal = {
      id: Math.max(...mandals.map(m => m.id)) + 1,
      ...newMandal,
      status: 'Active'
    }
    setMandals([mandal, ...mandals])
  }

  return (
    <PageContainer>
      <TwoColumnLayout
        leftColumn={
          <>
            <MandalsMetrics mandals={mandals} />
            <MandalsFilterBar />
            <MandalsTable mandals={mandals} />
          </>
        }
        rightColumn={
          <>
            <MandalsActionHeader onAddMandal={() => setAddModalOpen(true)} />
            <MandalsDetailSidebar />
          </>
        }
      />
      <AddMandalModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddMandal}
      />
    </PageContainer>
  )
}
