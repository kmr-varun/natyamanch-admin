import { useState, useEffect } from 'react'
import SubscriptionPlansMetrics from '../components/SubscriptionPlansMetrics'
import SubscriptionPlansFilterBar from '../components/SubscriptionPlansFilterBar'
import SubscriptionPlansTable from '../components/SubscriptionPlansTable'
import SubscriptionPlanForm from '../components/SubscriptionPlanForm'
import { PageContainer, Button } from '../components/shared'
import { plansApi, type AdminPlan, type PlanBody } from '../lib/api'

export default function SubscriptionPlans() {
  const [plans, setPlans] = useState<AdminPlan[]>([])
  const [filtered, setFiltered] = useState<AdminPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add')
  const [selected, setSelected] = useState<AdminPlan | null>(null)
  const [deleteError, setDeleteError] = useState('')
  const [search, setSearch] = useState('')

  const loadPlans = async () => {
    try {
      const res = await plansApi.list()
      setPlans(res.plans)
      applySearch(res.plans, search)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadPlans() }, [])

  const applySearch = (list: AdminPlan[], q: string) => {
    setFiltered(q ? list.filter(p => p.name.toLowerCase().includes(q.toLowerCase())) : list)
  }

  const handleSearch = (q: string) => { setSearch(q); applySearch(plans, q) }

  const handleSave = async (body: PlanBody) => {
    if (modalMode === 'add') {
      await plansApi.create(body as Parameters<typeof plansApi.create>[0])
    } else if (selected) {
      await plansApi.update(selected.id, body)
    }
    setModalOpen(false)
    setSelected(null)
    await loadPlans()
  }

  const handleDelete = async (id: string) => {
    setDeleteError('')
    try {
      await plansApi.delete(id)
      await loadPlans()
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Failed to delete plan')
    }
  }

  const openAdd = () => { setModalMode('add'); setSelected(null); setModalOpen(true) }
  const openEdit = (plan: AdminPlan) => { setModalMode('edit'); setSelected(plan); setModalOpen(true) }

  return (
    <PageContainer>
      <div className="flex flex-col gap-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1d1b20] leading-8">Subscription Plans</h1>
            <p className="text-sm text-[#64748b] mt-0.5">Manage subscription tiers and pricing</p>
          </div>
          <Button onClick={openAdd}>Add New Plan</Button>
        </div>

        <SubscriptionPlansMetrics plans={plans} loading={loading} />

        {deleteError && (
          <div className="bg-[#fef2f2] border border-[#fecaca] rounded-lg px-4 py-3 text-sm text-[#ef4444]">
            {deleteError}
          </div>
        )}

        <SubscriptionPlansFilterBar onSearch={handleSearch} />

        <SubscriptionPlansTable plans={filtered} loading={loading} onEdit={openEdit} onDelete={handleDelete} />
      </div>

      {modalOpen && (
        <SubscriptionPlanForm
          mode={modalMode}
          initialData={selected ?? undefined}
          onSave={handleSave}
          onCancel={() => { setModalOpen(false); setSelected(null) }}
        />
      )}
    </PageContainer>
  )
}
