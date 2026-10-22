import { useState, useEffect } from 'react'
import { ActionMenu, DeleteConfirmModal } from './shared'
import ViewMandalModal from './ViewMandalModal'
import { mandalsApi } from '../lib/api'
import type { AdminOrg, Pagination } from '../lib/api'

const DEFAULT_PAGINATION: Pagination = { page: 1, limit: 10, total: 0, totalPages: 0 }

interface Props {
  orgs?: AdminOrg[]
  loading?: boolean
  pagination?: Pagination
  onPageChange?: (page: number) => void
  onDelete?: (id: string) => void
  onEdit?: (org: AdminOrg) => void
}

function formatDate(d?: string) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

const STATUS_STYLES: Record<string, string> = {
  active:   'bg-[#ecfdf5] text-[#059669]',
  expired:  'bg-gray-100 text-gray-500',
  inactive: 'bg-[#fef2f2] text-[#ef4444]',
}

export default function MandalsTable({ orgs: extOrgs, loading: extLoading, pagination: extPagination, onPageChange: extOnPageChange, onDelete: extOnDelete, onEdit: extOnEdit }: Props) {
  const [internalOrgs, setInternalOrgs] = useState<AdminOrg[]>([])
  const [internalLoading, setInternalLoading] = useState(extOrgs === undefined)
  const [internalPagination, setInternalPagination] = useState<Pagination>(DEFAULT_PAGINATION)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [toDelete, setToDelete] = useState<AdminOrg | null>(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [toView, setToView] = useState<AdminOrg | null>(null)

  useEffect(() => {
    if (extOrgs !== undefined) return
    setInternalLoading(true)
    mandalsApi.list({ page: 1, limit: 10 }).then(res => {
      setInternalOrgs(res.data || [])
      if (res.pagination) setInternalPagination(res.pagination)
    }).catch(() => {}).finally(() => setInternalLoading(false))
  }, [extOrgs])

  const orgs = extOrgs ?? internalOrgs
  const loading = extLoading ?? internalLoading
  const pagination = extPagination ?? internalPagination
  const onPageChange = extOnPageChange ?? (() => {})
  const onDelete = extOnDelete ?? (() => {})
  const onEdit = extOnEdit ?? (() => {})

  const start = (pagination.page - 1) * pagination.limit + 1
  const end = Math.min(pagination.page * pagination.limit, pagination.total)
  const pageNums = () => {
    const nums: number[] = []
    for (let i = Math.max(1, pagination.page - 2); i <= Math.min(pagination.totalPages, pagination.page + 2); i++) nums.push(i)
    return nums
  }

  return (
    <>
      <div className="bg-white border border-[rgba(226,232,240,0.9)] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
        {/* Header */}
        <div className="bg-[rgba(248,250,252,0.6)] border-b border-[#f1f5f9] flex items-center">
          {[
            { label: '#', w: 'w-10' },
            { label: 'Organization', w: 'flex-1 min-w-[180px]' },
            { label: 'Admin', w: 'w-[150px]' },
            { label: 'Location', w: 'w-[120px]' },
            { label: 'Seats', w: 'w-[100px]' },
            { label: 'Sub. End', w: 'w-[110px]' },
            { label: 'Status', w: 'w-[100px]' },
            { label: 'Actions', w: 'w-[80px]' },
          ].map(col => (
            <div key={col.label} className={`${col.w} px-4 py-4 text-center`}>
              <span className="text-[11px] font-bold text-[#434343] tracking-[0.55px] uppercase">{col.label}</span>
            </div>
          ))}
        </div>

        {/* Body */}
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center border-b border-[#f8f2fa] px-2 py-4 gap-3">
              <div className="w-10 flex justify-center"><div className="h-3 w-5 bg-gray-100 rounded animate-pulse" /></div>
              <div className="flex-1 flex items-center gap-2">
                <div className="w-7 h-7 bg-gray-100 rounded-full animate-pulse flex-shrink-0" />
                <div className="flex flex-col gap-1"><div className="h-3 w-32 bg-gray-100 rounded animate-pulse" /><div className="h-2.5 w-24 bg-gray-100 rounded animate-pulse" /></div>
              </div>
              {[120, 100, 80, 90, 70, 50].map((w, j) => (
                <div key={j} style={{ width: w }} className="flex justify-center">
                  <div className="h-3 bg-gray-100 rounded animate-pulse w-full" />
                </div>
              ))}
            </div>
          ))
        ) : orgs.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-400">
            No mandals found. Add one using the button above.
          </div>
        ) : (
          orgs.map((org, index) => (
            <div key={org.id} className="flex items-center border-b border-[#f8f2fa] last:border-b-0 hover:bg-[#fdfaff] transition-colors">
              <div className="w-10 px-4 py-4 text-center">
                <span className="text-xs text-[#94a3b8]">{String(start + index).padStart(2, '0')}</span>
              </div>
              <div className="flex-1 min-w-[180px] px-4 py-3 flex items-center gap-2">
                <div className="w-7 h-7 bg-[#f3e8ff] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-semibold text-[#7e22ce]">
                    {org.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#0f172a] leading-4">{org.name}</p>
                  {org.contact_email && <p className="text-[10px] text-[#94a3b8] leading-4">{org.contact_email}</p>}
                </div>
              </div>
              <div className="w-[150px] px-4 py-4 text-center">
                <p className="text-xs font-medium text-[#334155] truncate">{org.admin_name || '—'}</p>
              </div>
              <div className="w-[120px] px-4 py-4 text-center">
                <span className="text-xs text-[#64748b]">{org.location || '—'}</span>
              </div>
              <div className="w-[100px] px-4 py-4 text-center">
                <span className="text-xs font-semibold text-[#334155]">{org.seats_used}/{org.seats_total}</span>
              </div>
              <div className="w-[110px] px-4 py-4 text-center">
                <span className="text-[11px] text-[#64748b]">{formatDate(org.subscription_end)}</span>
              </div>
              <div className="w-[100px] px-4 py-4 flex justify-center">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${STATUS_STYLES[org.subscription_status] || 'bg-gray-100 text-gray-500'}`}>
                  {org.subscription_status}
                </span>
              </div>
              <div className="w-[80px] px-4 py-3 flex justify-center">
                <div className="relative">
                  <button onClick={() => setOpenMenuId(openMenuId === org.id ? null : org.id)} className="p-1 hover:bg-gray-100 rounded">
                    <img src="/icons/menu-dots-icon.svg" alt="Actions" className="w-4 h-4" />
                  </button>
                  <ActionMenu
                    isOpen={openMenuId === org.id}
                    onClose={() => setOpenMenuId(null)}
                    options={[
                      { label: 'View Details', onClick: () => { setToView(org); setViewModalOpen(true); setOpenMenuId(null) } },
                      { label: 'Edit', onClick: () => { onEdit(org); setOpenMenuId(null) } },
                      { label: 'Delete', onClick: () => { setToDelete(org); setDeleteModalOpen(true); setOpenMenuId(null) }, className: 'text-[#ef4444] hover:bg-[#fef2f2]' },
                    ]}
                  />
                </div>
              </div>
            </div>
          ))
        )}

        {/* Pagination */}
        {!loading && pagination.total > 0 && (
          <div className="border-t border-[#f1f5f9] px-4 py-3 flex items-center justify-between">
            <span className="text-xs text-[#64748b]">
              Showing <span className="font-medium text-[#334155]">{start}–{end}</span> of <span className="font-medium text-[#334155]">{pagination.total}</span>
            </span>
            <div className="flex items-center gap-1">
              <button onClick={() => onPageChange(pagination.page - 1)} disabled={pagination.page <= 1} className="w-7 h-7 border border-[#e2e8f0] rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">
                <img src="/icons/chevron-left-icon.svg" alt="" className="w-[14px] h-[14px]" />
              </button>
              {pageNums().map(p => (
                <button key={p} onClick={() => onPageChange(p)} className={`w-7 h-7 rounded flex items-center justify-center text-xs font-semibold ${p === pagination.page ? 'bg-[#7f28bc] text-white' : 'border border-[#e2e8f0] text-gray-700 hover:bg-gray-50'}`}>{p}</button>
              ))}
              <button onClick={() => onPageChange(pagination.page + 1)} disabled={pagination.page >= pagination.totalPages} className="w-7 h-7 border border-[#e2e8f0] rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">
                <img src="/icons/chevron-right-icon.svg" alt="" className="w-[14px] h-[14px]" />
              </button>
            </div>
          </div>
        )}
      </div>

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => { setDeleteModalOpen(false); setToDelete(null) }}
        onConfirm={() => { if (toDelete) { onDelete(toDelete.id); setToDelete(null) } }}
        title="Delete Mandal"
        message="Are you sure you want to delete the mandal"
        itemName={toDelete?.name || ''}
      />
      <ViewMandalModal isOpen={viewModalOpen} onClose={() => { setViewModalOpen(false); setToView(null) }} data={toView} />
    </>
  )
}
