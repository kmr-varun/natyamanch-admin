import { useState, useEffect, useRef } from 'react'
import MandalsMetrics from '../components/MandalsMetrics'
import MandalsFilterBar from '../components/MandalsFilterBar'
import MandalsTable from '../components/MandalsTable'
import AddMandalModal from '../components/AddMandalModal'
import EditMandalModal from '../components/EditMandalModal'
import { PageContainer, Button } from '../components/shared'
import { mandalsApi, type AdminOrg, type Pagination, type OrgStats } from '../lib/api'

export default function Mandals() {
  const [orgs, setOrgs] = useState<AdminOrg[]>([])
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 10, total: 0, totalPages: 0 })
  const [stats, setStats] = useState<OrgStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editOrg, setEditOrg] = useState<AdminOrg | null>(null)
  const searchRef = useRef('')
  const statusRef = useRef('')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const loadStats = async () => {
    try { const res = await mandalsApi.stats(); setStats(res.stats) } catch {}
  }

  const loadOrgs = async (params: Record<string, string | number> = {}) => {
    setLoading(true)
    try {
      const res = await mandalsApi.list({ page: 1, limit: 10, ...params })
      setOrgs(res.data ?? [])
      if (res.pagination) setPagination(res.pagination)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadStats(); loadOrgs() }, [])

  const handleSearch = (q: string) => {
    searchRef.current = q
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      loadOrgs({ search: q, status: statusRef.current, page: 1 })
    }, 400)
  }

  const handleStatusFilter = (s: string) => {
    statusRef.current = s
    loadOrgs({ search: searchRef.current, status: s, page: 1 })
  }

  const handlePageChange = (page: number) => {
    loadOrgs({ search: searchRef.current, status: statusRef.current, page })
  }

  const handleDelete = async (id: string) => {
    await mandalsApi.delete(id)
    await loadOrgs({ search: searchRef.current, status: statusRef.current, page: pagination.page })
    await loadStats()
  }

  const handleAdded = async () => {
    setAddModalOpen(false)
    await loadStats()
    await loadOrgs()
  }

  const handleEdited = async () => {
    setEditOrg(null)
    await loadOrgs({ search: searchRef.current, status: statusRef.current, page: pagination.page })
  }

  return (
    <PageContainer>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1d1b20] leading-8">Mandals</h1>
            <p className="text-sm text-[#64748b] mt-0.5">Manage organizations and their memberships</p>
          </div>
          <Button onClick={() => setAddModalOpen(true)}>Add Mandal</Button>
        </div>

        <MandalsMetrics stats={stats} />
        <MandalsFilterBar onSearch={handleSearch} onStatusFilter={handleStatusFilter} />
        <MandalsTable
          orgs={orgs}
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange}
          onDelete={handleDelete}
          onEdit={org => setEditOrg(org)}
        />
      </div>

      <AddMandalModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdded={handleAdded}
      />
      <EditMandalModal
        org={editOrg}
        onClose={() => setEditOrg(null)}
        onSaved={handleEdited}
      />
    </PageContainer>
  )
}
