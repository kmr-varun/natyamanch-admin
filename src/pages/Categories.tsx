import { useState, useEffect, useRef } from 'react'
import CategoriesMetrics from '../components/CategoriesMetrics'
import CategoriesFilterBar from '../components/CategoriesFilterBar'
import CategoriesTable from '../components/CategoriesTable'
import CategoryEditDrawer from '../components/CategoryEditDrawer'
import { PageContainer, Button } from '../components/shared'
import { categoriesApi, type AdminCategory, type CategoryBody } from '../lib/api'

export type { CategoryBody }

export default function Categories() {
  const [categories, setCategories] = useState<AdminCategory[]>([])
  const [filtered, setFiltered] = useState<AdminCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteError, setDeleteError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add')
  const [selected, setSelected] = useState<AdminCategory | null>(null)
  const searchRef = useRef('')
  const statusRef = useRef('')

  const loadCategories = async () => {
    try {
      const res = await categoriesApi.list()
      setCategories(res.categories)
      applyFilters(res.categories, searchRef.current, statusRef.current)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadCategories() }, [])

  const applyFilters = (list: AdminCategory[], q: string, status: string) => {
    let result = list
    if (q) result = result.filter(c => c.name.toLowerCase().includes(q.toLowerCase()) || c.slug.toLowerCase().includes(q.toLowerCase()))
    if (status === 'active') result = result.filter(c => c.is_active === 1)
    if (status === 'inactive') result = result.filter(c => c.is_active === 0)
    setFiltered(result)
  }

  const handleSearch = (q: string) => { searchRef.current = q; applyFilters(categories, q, statusRef.current) }
  const handleStatusFilter = (s: string) => { statusRef.current = s; applyFilters(categories, searchRef.current, s) }
  const handleSort = (_: string) => {}

  const handleSave = async (body: CategoryBody) => {
    if (modalMode === 'add') {
      await categoriesApi.create({ ...body, name: body.name! })
    } else if (selected) {
      await categoriesApi.update(selected.id, body)
    }
    setModalOpen(false)
    setSelected(null)
    await loadCategories()
  }

  const handleDelete = async (id: string) => {
    setDeleteError('')
    try {
      await categoriesApi.delete(id)
      await loadCategories()
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Failed to delete category')
    }
  }

  const openAdd = () => { setModalMode('add'); setSelected(null); setModalOpen(true) }
  const openEdit = (cat: AdminCategory) => { setModalMode('edit'); setSelected(cat); setModalOpen(true) }

  return (
    <PageContainer>
      <div className="flex flex-col gap-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1d1b20] leading-8">Categories</h1>
            <p className="text-sm text-[#64748b] mt-0.5">Manage your video categories</p>
          </div>
          <Button onClick={openAdd}>Add New Category</Button>
        </div>

        <CategoriesMetrics categories={categories} loading={loading} />

        {deleteError && (
          <div className="bg-[#fef2f2] border border-[#fecaca] rounded-lg px-4 py-3 text-sm text-[#ef4444]">
            {deleteError}
          </div>
        )}

        <CategoriesFilterBar onSearch={handleSearch} onStatusFilter={handleStatusFilter} onSort={handleSort} />

        <CategoriesTable categories={filtered} loading={loading} onEdit={openEdit} onDelete={handleDelete} />
      </div>

      {/* Add / Edit modal */}
      {modalOpen && (
        <CategoryEditDrawer
          mode={modalMode}
          initialData={selected ?? undefined}
          onSave={handleSave}
          onCancel={() => { setModalOpen(false); setSelected(null) }}
        />
      )}
    </PageContainer>
  )
}
