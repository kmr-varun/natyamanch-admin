import { useState } from 'react'
import { ActionMenu, DeleteConfirmModal } from './shared'
import ViewCategoryModal from './ViewCategoryModal'

interface Category {
  id: number
  name: string
  slug: string
  videoCount: number
  status: string
  displayOrder: number
}

interface CategoriesTableProps {
  categories: Category[]
  onEdit: (category: Category) => void
  onDelete: (categoryId: number) => void
}

export default function CategoriesTable({ categories, onEdit, onDelete }: CategoriesTableProps) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [categoryToView, setCategoryToView] = useState<Category | null>(null)

  const handleView = (category: Category) => {
    setCategoryToView(category)
    setViewModalOpen(true)
    setOpenMenuId(null)
  }

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (categoryToDelete) {
      onDelete(categoryToDelete.id)
      setCategoryToDelete(null)
    }
  }

  // Pagination
  const totalPages = Math.ceil(categories.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCategories = categories.slice(startIndex, startIndex + itemsPerPage)

  return (
    <>
      <div className="bg-white border border-[rgba(226,232,240,0.9)] rounded-xl p-px shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
        {/* Table */}
        <div className="overflow-auto">
          {/* Header */}
          <div className="bg-[rgba(248,250,252,0.6)] border-b border-[#f1f5f9] flex items-start">
            <div className="w-[66px] px-3 py-[19.5px] flex items-center justify-center">
              <span className="text-xs font-bold text-[#64748b] leading-4 tracking-[0.6px]">#</span>
            </div>
            <div className="w-[197px] pl-[45.2px] pr-4 py-[19.5px]">
              <span className="text-xs font-semibold text-[#242424] leading-4 tracking-[0.6px]">
                Category Name
              </span>
            </div>
            <div className="flex-1 px-4 py-[19.5px]">
              <span className="text-xs font-semibold text-[#242424] leading-4 tracking-[0.6px]">
                Slug (URL)
              </span>
            </div>
            <div className="flex-1 px-4 py-3 flex items-center justify-center">
              <span className="text-xs font-semibold text-[#242424] leading-4 tracking-[0.6px] text-center">
                Video Count
              </span>
            </div>
            <div className="flex-1 px-4 py-[19.5px] flex items-center justify-center">
              <span className="text-xs font-semibold text-[#242424] leading-4 tracking-[0.6px]">
                Status
              </span>
            </div>
            <div className="flex-1 px-4 py-3 flex items-center justify-center">
              <span className="text-xs font-semibold text-[#242424] leading-4 tracking-[0.6px] text-center">
                Display Order
              </span>
            </div>
            <div className="flex-1 px-4 py-[19.5px] flex items-center justify-center">
              <span className="text-xs font-semibold text-[#242424] leading-4 tracking-[0.6px] text-right">
                Actions
              </span>
            </div>
          </div>

          {/* Body */}
          <div>
            {paginatedCategories.map((category, index) => (
              <div
                key={index}
                className="bg-[rgba(250,245,255,0.2)] flex items-start border-b last:border-b-0 border-[rgba(226,232,240,0.3)]"
              >
                {/* # */}
                <div className="w-[66px] px-2 py-[18.5px] flex items-center justify-center">
                  <span className="text-xs text-[#94a3b8] leading-4">
                    {String(category.id).padStart(2, '0')}
                  </span>
                </div>

                {/* Category Name with Thumbnail */}
                <div className="w-[197px] px-4 py-2.5 flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0f172a] border border-[#e2e8f0] rounded overflow-hidden flex-shrink-0">
                    <img
                      src="/images/category-thumbnail.png"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-medium text-[#0f172a] leading-4">
                    {category.name}
                  </span>
                </div>

                {/* Slug */}
                <div className="flex-1 px-4 py-[18.5px] flex items-center justify-center">
                  <span className="text-xs text-[#64748b] leading-4">{category.slug}</span>
                </div>

                {/* Video Count */}
                <div className="flex-1 px-4 py-[18px] flex items-center justify-center">
                  <span className="text-xs font-medium text-[#1e293b] leading-4 text-center">
                    {category.videoCount}
                  </span>
                </div>

                {/* Status */}
                <div className="flex-1 px-4 py-[15.5px] flex items-center justify-center">
                  <span className="px-2 py-0.5 bg-[#ecfdf5] border border-[rgba(167,243,208,0.5)] rounded-full text-[11px] font-medium text-[#059669] leading-4">
                    {category.status}
                  </span>
                </div>

                {/* Display Order */}
                <div className="flex-1 px-4 py-[18px] flex items-center justify-center">
                  <span className="text-xs text-[#475569] leading-4 text-center">
                    {category.displayOrder}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex-1 px-4 py-[13.5px] flex items-center justify-center">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onEdit(category)}
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
                            onClick: () => handleView(category),
                          },
                          {
                            label: 'Delete',
                            onClick: () => handleDeleteClick(category),
                            className: 'text-[#ef4444] hover:bg-[#fef2f2]',
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Footer */}
        <div className="border-t border-[#f1f5f9] px-3 py-3 flex items-center justify-between">
          <span className="text-xs text-[#64748b] leading-4">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, categories.length)} of {categories.length} categories
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-7 h-7 border border-[#e2e8f0] rounded flex items-center justify-center p-px hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <img src="/icons/chevron-left-icon.svg" alt="" className="w-[14px] h-[14px]" />
            </button>
            {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
              const page = i + 1
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-7 h-7 rounded flex items-center justify-center text-xs font-semibold leading-4 ${
                    currentPage === page
                      ? 'bg-[#7f28bc] text-white'
                      : 'border border-[#e2e8f0] text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              )
            })}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-7 h-7 border border-[#e2e8f0] rounded flex items-center justify-center p-px hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <img src="/icons/chevron-right-icon.svg" alt="" className="w-[14px] h-[14px]" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setCategoryToDelete(null)
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        message="Are you sure you want to delete category"
        itemName={categoryToDelete?.name || ''}
      />

      {/* View Category Modal */}
      <ViewCategoryModal
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false)
          setCategoryToView(null)
        }}
        data={categoryToView}
      />
    </>
  )
}
