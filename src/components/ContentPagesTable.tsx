import { useState } from 'react'
import { handlePagination, handleTab } from '../utils/mockHandlers'
import { ActionMenu, DeleteConfirmModal } from './shared'
import ViewContentModal from './ViewContentModal'

interface Page {
  id: number
  title: string
  subtitle: string
  slug: string
  date: string
  time: string
  status: string
}

const initialPages: Page[] = Array(10).fill(null).map((_, idx) => ({
  id: idx + 1,
  title: 'Home',
  subtitle: 'Main landing page',
  slug: '/',
  date: '12 Sep 2025',
  time: '10:30 AM',
  status: 'Published',
}))

interface ContentPagesTableProps {
  content?: any[]
}

export default function ContentPagesTable({ content }: ContentPagesTableProps = {}) {
  const [pages, setPages] = useState<Page[]>(content || initialPages)
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [pageToDelete, setPageToDelete] = useState<Page | null>(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [pageToView, setPageToView] = useState<Page | null>(null)

  const handleEdit = (page: Page) => {
    console.log('Edit page:', page)
    alert(`Edit page: ${page.title}\n\nIn production, this would open an edit form with the page data pre-filled.`)
  }

  const handleView = (page: Page) => {
    setPageToView(page)
    setViewModalOpen(true)
    setOpenMenuId(null)
  }

  const handleDeleteClick = (page: Page) => {
    setPageToDelete(page)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (pageToDelete) {
      setPages(pages.filter(p => p.id !== pageToDelete.id))
      console.log('Deleted page:', pageToDelete)
      setPageToDelete(null)
    }
  }

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm overflow-hidden p-px">
      {/* Tabs */}
      <div className="border-b border-[#e2e8f0] px-5 pt-3 pb-px flex items-center gap-6">
        <button
          onClick={() => handleTab.switch('Pages')}
          className="pb-[14px] border-b-2 border-[#7f28bc] text-sm font-semibold text-[#7f28bc] leading-4 hover:opacity-80"
        >
          Pages (18)
        </button>
        <button
          onClick={() => handleTab.switch('Popups')}
          className="pb-[14px] text-sm font-semibold text-[#64748b] leading-4 hover:text-[#7f28bc]"
        >
          Popups (6)
        </button>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        {/* Header */}
        <div className="bg-[rgba(248,250,252,0.75)] border-b border-[#e2e8f0] flex items-start">
          <div className="w-[71px] px-3 py-3 flex items-center justify-center">
            <input type="checkbox" className="w-[14px] h-[14px] border border-[#cbd5e1] rounded" />
          </div>
          <div className="w-[70px] px-3 py-3 flex items-center justify-center">
            <span className="text-xs font-bold text-[#2e2e2e] leading-4">#</span>
          </div>
          <div className="w-[163px] px-3 py-3 flex items-start">
            <span className="text-xs font-semibold text-[#2e2e2e] leading-4">Page Title</span>
          </div>
          <div className="flex-1 px-3 py-3 flex items-center">
            <span className="text-xs font-semibold text-[#2e2e2e] leading-4">URL / Slug</span>
          </div>
          <div className="flex-1 px-3 py-3 flex items-center justify-center">
            <span className="text-xs font-semibold text-[#2e2e2e] leading-4">Last Updated</span>
          </div>
          <div className="flex-1 px-3 py-3 flex items-center justify-center">
            <span className="text-xs font-semibold text-[#2e2e2e] leading-4">Status</span>
          </div>
          <div className="flex-1 px-3 py-3 flex items-center justify-end">
            <span className="text-xs font-semibold text-[#2e2e2e] leading-4">Actions</span>
          </div>
        </div>

        {/* Body */}
        {pages.map((page, idx) => (
          <div key={idx} className="bg-[rgba(250,245,255,0.3)] flex items-center h-[72px]">
            <div className="w-[71px] px-3 flex items-center justify-center">
              <input type="checkbox" className="w-[14px] h-[14px] border border-[#cbd5e1] rounded" />
            </div>
            <div className="w-[70px] px-2 flex items-center justify-center">
              <span className="text-xs text-[#94a3b8] leading-4">{page.id}</span>
            </div>
            <div className="w-[163px] flex items-center gap-3 pr-3">
              <img src="/images/page-thumbnail.png" alt="" className="w-11 h-11 rounded flex-shrink-0 object-cover" />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-[#0f172a] leading-[15px]">{page.title}</span>
                <span className="text-[11px] text-[#94a3b8] leading-4">{page.subtitle}</span>
              </div>
            </div>
            <div className="flex-1 pl-7 pr-3">
              <span className="text-[11px] text-[#64748b] leading-4 font-mono">{page.slug}</span>
            </div>
            <div className="flex-1 px-3 flex flex-col items-center">
              <span className="text-[11px] font-medium text-[#334155] leading-[13.75px]">{page.date}</span>
              <span className="text-[11px] text-[#94a3b8] leading-[13.75px]">{page.time}</span>
            </div>
            <div className="flex-1 px-3 flex items-center justify-center">
              <span className="px-2.5 py-0.5 bg-[#ecfdf5] border border-[#a7f3d0] rounded-full text-[10px] font-semibold text-[#047857] leading-4">
                {page.status}
              </span>
            </div>
            <div className="flex-1 px-4 flex items-center justify-end gap-[6px]">
              <button
                onClick={() => handleEdit(page)}
                className="bg-white border border-[#e2e8f0] rounded-md px-[11px] py-[5px] flex items-center gap-1 hover:bg-gray-50"
              >
                <img src="/icons/edit-pencil-icon.svg" alt="" className="w-3 h-3" />
                <span className="text-[11px] font-medium text-[#334155] leading-4">Edit</span>
              </button>
              <div className="relative inline-block">
                <button
                  onClick={() => setOpenMenuId(openMenuId === page.id ? null : page.id)}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <img src="/icons/three-dots-icon.svg" alt="Actions" className="w-[14px] h-[14px]" />
                </button>
                <ActionMenu
                  isOpen={openMenuId === page.id}
                  onClose={() => setOpenMenuId(null)}
                  options={[
                    {
                      label: 'View Details',
                      onClick: () => handleView(page),
                    },
                    {
                      label: 'Delete',
                      onClick: () => handleDeleteClick(page),
                      className: 'text-[#ef4444] hover:bg-[#fef2f2]',
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="border-t border-[#e2e8f0] px-4 py-[16.5px] flex items-center justify-between">
        <span className="text-xs text-[#64748b] leading-4">Showing 1 to 10 of 18 pages</span>
        <div className="flex items-center gap-1">
          <button
            onClick={handlePagination.previous}
            className="w-7 h-7 border border-[#e2e8f0] rounded flex items-center justify-center p-px hover:bg-gray-50"
          >
            <img src="/icons/chevron-left-small.svg" alt="" className="w-[14px] h-[14px]" />
          </button>
          <button
            onClick={() => handlePagination.goToPage(1)}
            className="w-7 h-7 bg-[#7f28bc] rounded flex items-center justify-center text-xs font-semibold text-white leading-4"
          >
            1
          </button>
          <button
            onClick={() => handlePagination.goToPage(2)}
            className="w-7 h-7 border border-[#e2e8f0] rounded flex items-center justify-center text-xs text-[#475569] leading-4 hover:bg-gray-50"
          >
            2
          </button>
          <button
            onClick={handlePagination.next}
            className="w-7 h-7 border border-[#e2e8f0] rounded flex items-center justify-center p-px hover:bg-gray-50"
          >
            <img src="/icons/chevron-right-small.svg" alt="" className="w-[14px] h-[14px]" />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setPageToDelete(null)
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Page"
        message="Are you sure you want to delete page"
        itemName={pageToDelete?.title || ''}
      />

      {/* View Content Modal */}
      <ViewContentModal
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false)
          setPageToView(null)
        }}
        data={pageToView}
      />
    </div>
  )
}
