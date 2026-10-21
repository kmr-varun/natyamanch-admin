import { useState } from 'react'
import { ActionMenu, DeleteConfirmModal } from './shared'
import ViewCategoryModal from './ViewCategoryModal'
import type { AdminCategory } from '../lib/api'

interface CategoriesTableProps {
  categories: AdminCategory[]
  loading: boolean
  onEdit: (category: AdminCategory) => void
  onDelete: (id: string) => void
}

export default function CategoriesTable({ categories, loading, onEdit, onDelete }: CategoriesTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<AdminCategory | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [categoryToView, setCategoryToView] = useState<AdminCategory | null>(null)
  const itemsPerPage = 10

  const totalPages = Math.ceil(categories.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCategories = categories.slice(startIndex, startIndex + itemsPerPage)

  return (
    <>
      <div className="bg-white border border-[rgba(226,232,240,0.9)] rounded-xl p-px shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="overflow-auto">
          {/* Header */}
          <div className="bg-[rgba(248,250,252,0.6)] border-b border-[#f1f5f9] flex items-start">
            <div className="w-[50px] px-3 py-[19.5px] flex items-center justify-center">
              <span className="text-xs font-bold text-[#64748b] leading-4 tracking-[0.6px]">#</span>
            </div>
            <div className="w-[220px] pl-3 pr-4 py-[19.5px]">
              <span className="text-xs font-semibold text-[#242424] leading-4 tracking-[0.6px]">Category Name</span>
            </div>
            <div className="flex-1 px-4 py-[19.5px]">
              <span className="text-xs font-semibold text-[#242424] leading-4 tracking-[0.6px]">Slug (URL)</span>
            </div>
            <div className="w-[90px] px-4 py-3 flex items-center justify-center">
              <span className="text-xs font-semibold text-[#242424] leading-4 tracking-[0.6px] text-center">Videos</span>
            </div>
            <div className="w-[90px] px-4 py-[19.5px] flex items-center justify-center">
              <span className="text-xs font-semibold text-[#242424] leading-4 tracking-[0.6px]">Status</span>
            </div>
            <div className="w-[70px] px-4 py-3 flex items-center justify-center">
              <span className="text-xs font-semibold text-[#242424] leading-4 tracking-[0.6px] text-center">Order</span>
            </div>
            <div className="w-[110px] px-4 py-[19.5px] flex items-center justify-center">
              <span className="text-xs font-semibold text-[#242424] leading-4 tracking-[0.6px]">Actions</span>
            </div>
          </div>

          {/* Body */}
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center border-b border-[rgba(226,232,240,0.3)] px-3 py-4 gap-3">
                <div className="w-[50px] flex justify-center">
                  <div className="h-3 w-5 bg-gray-100 rounded animate-pulse" />
                </div>
                <div className="w-[220px] flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded animate-pulse flex-shrink-0" />
                  <div className="h-3 w-28 bg-gray-100 rounded animate-pulse" />
                </div>
                <div className="flex-1">
                  <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
                </div>
                <div className="w-[90px] flex justify-center">
                  <div className="h-3 w-8 bg-gray-100 rounded animate-pulse" />
                </div>
                <div className="w-[90px] flex justify-center">
                  <div className="h-5 w-14 bg-gray-100 rounded-full animate-pulse" />
                </div>
                <div className="w-[70px] flex justify-center">
                  <div className="h-3 w-6 bg-gray-100 rounded animate-pulse" />
                </div>
                <div className="w-[110px] flex justify-center">
                  <div className="h-7 w-16 bg-gray-100 rounded animate-pulse" />
                </div>
              </div>
            ))
          ) : categories.length === 0 ? (
            <div className="py-16 text-center text-sm text-gray-400">
              No categories found. Add your first category using the button above.
            </div>
          ) : (
            paginatedCategories.map((category, index) => (
              <div key={category.id} className="bg-[rgba(250,245,255,0.2)] flex items-center border-b last:border-b-0 border-[rgba(226,232,240,0.3)] hover:bg-[#fdfaff] transition-colors">
                {/* # */}
                <div className="w-[50px] px-2 py-[18.5px] flex items-center justify-center">
                  <span className="text-xs text-[#94a3b8] leading-4">
                    {String(startIndex + index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Name */}
                <div className="w-[220px] px-3 py-2.5 flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#f1e9f9] border border-[#e2e8f0] rounded overflow-hidden flex items-center justify-center flex-shrink-0">
                    <img src="/icons/folder-icon.svg" alt="" className="w-4 h-4 opacity-60" />
                  </div>
                  <span className="text-xs font-medium text-[#0f172a] leading-4">{category.name}</span>
                </div>

                {/* Slug */}
                <div className="flex-1 px-4 py-[18.5px]">
                  <span className="text-xs font-mono text-[#64748b] leading-4">{category.slug}</span>
                </div>

                {/* Video Count */}
                <div className="w-[90px] px-4 py-[18px] flex items-center justify-center">
                  <span className="text-xs font-medium text-[#1e293b] leading-4">{category.video_count ?? 0}</span>
                </div>

                {/* Status */}
                <div className="w-[90px] px-4 py-[15.5px] flex items-center justify-center">
                  {category.is_active === 1 ? (
                    <span className="px-2 py-0.5 bg-[#ecfdf5] border border-[rgba(167,243,208,0.5)] rounded-full text-[11px] font-medium text-[#059669] leading-4">
                      Active
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-gray-100 border border-gray-200 rounded-full text-[11px] font-medium text-gray-500 leading-4">
                      Inactive
                    </span>
                  )}
                </div>

                {/* Sort Order */}
                <div className="w-[70px] px-4 py-[18px] flex items-center justify-center">
                  <span className="text-xs text-[#475569] leading-4">{category.sort_order}</span>
                </div>

                {/* Actions */}
                <div className="w-[110px] px-4 py-[13.5px] flex items-center justify-center">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => { onEdit(category); setOpenMenuId(null) }}
                      className="flex items-center gap-1 px-2 py-1 bg-white border border-[#7f28bc] rounded text-[11px] font-medium text-[#7f28bc] leading-4 hover:bg-[#faf5ff] transition-colors"
                    >
                      <img src="/icons/edit-icon-purple.svg" alt="" className="w-3 h-3" />
                      Edit
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === category.id ? null : category.id)}
                        className="p-1 rounded hover:bg-gray-100"
                      >
                        <img src="/icons/dots-menu-icon.svg" alt="" className="w-[14px] h-[14px]" />
                      </button>
                      <ActionMenu
                        isOpen={openMenuId === category.id}
                        onClose={() => setOpenMenuId(null)}
                        options={[
                          {
                            label: 'View Details',
                            onClick: () => { setCategoryToView(category); setViewModalOpen(true); setOpenMenuId(null) },
                          },
                          {
                            label: 'Delete',
                            onClick: () => { setCategoryToDelete(category); setDeleteModalOpen(true); setOpenMenuId(null) },
                            className: 'text-[#ef4444] hover:bg-[#fef2f2]',
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {!loading && categories.length > itemsPerPage && (
          <div className="border-t border-[#f1f5f9] px-3 py-3 flex items-center justify-between">
            <span className="text-xs text-[#64748b] leading-4">
              Showing {startIndex + 1}–{Math.min(startIndex + itemsPerPage, categories.length)} of {categories.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-7 h-7 border border-[#e2e8f0] rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
              >
                <img src="/icons/chevron-left-icon.svg" alt="" className="w-[14px] h-[14px]" />
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-7 h-7 rounded flex items-center justify-center text-xs font-semibold leading-4 ${
                    currentPage === p ? 'bg-[#7f28bc] text-white' : 'border border-[#e2e8f0] text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-7 h-7 border border-[#e2e8f0] rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
              >
                <img src="/icons/chevron-right-icon.svg" alt="" className="w-[14px] h-[14px]" />
              </button>
            </div>
          </div>
        )}
      </div>

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => { setDeleteModalOpen(false); setCategoryToDelete(null) }}
        onConfirm={() => { if (categoryToDelete) { onDelete(categoryToDelete.id); setCategoryToDelete(null) } }}
        title="Delete Category"
        message="Are you sure you want to delete category"
        itemName={categoryToDelete?.name || ''}
      />

      <ViewCategoryModal
        isOpen={viewModalOpen}
        onClose={() => { setViewModalOpen(false); setCategoryToView(null) }}
        data={categoryToView}
      />
    </>
  )
}
