import { useState } from 'react'
import { handlePagination, handleTab } from '../utils/mockHandlers'
import { ActionMenu, DeleteConfirmModal } from './shared'
import ViewMandalModal from './ViewMandalModal'

interface Organization {
  id: number
  name: string
  location: string
  contact: string
  email: string
  phone: string
  plan: string
  price: string
  members: string
  validUntil: string
  status: string
}

const initialOrganizations: Organization[] = [
    {
      id: 1,
      name: 'Marathi Mandal New Jersey',
      location: 'USA',
      contact: 'Rohan Deshpande',
      email: 'rohan@mmnj.org',
      phone: '+1 987 654 3210',
      plan: '100 Account Plan',
      price: '₹14,999 /year',
      members: '78 / 100',
      validUntil: '10 Aug 2027',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Marathi Mandal New Jersey',
      location: 'USA',
      contact: 'Rohan Deshpande',
      email: 'rohan@mmnj.org',
      phone: '+1 987 654 3210',
      plan: '100 Account Plan',
      price: '₹14,999 /year',
      members: '78 / 100',
      validUntil: '10 Aug 2027',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Marathi Mandal New Jersey',
      location: 'USA',
      contact: 'Rohan Deshpande',
      email: 'rohan@mmnj.org',
      phone: '+1 987 654 3210',
      plan: '100 Account Plan',
      price: '₹14,999 /year',
      members: '78 / 100',
      validUntil: '10 Aug 2027',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Marathi Mandal New Jersey',
      location: 'USA',
      contact: 'Rohan Deshpande',
      email: 'rohan@mmnj.org',
      phone: '+1 987 654 3210',
      plan: '100 Account Plan',
      price: '₹14,999 /year',
      members: '78 / 100',
      validUntil: '10 Aug 2027',
      status: 'Active',
    },
    {
      id: 5,
      name: 'Marathi Mandal New Jersey',
      location: 'USA',
      contact: 'Rohan Deshpande',
      email: 'rohan@mmnj.org',
      phone: '+1 987 654 3210',
      plan: '100 Account Plan',
      price: '₹14,999 /year',
      members: '78 / 100',
      validUntil: '10 Aug 2027',
      status: 'Active',
    },
  ]

interface MandalsTableProps {
  mandals?: any[]
}

export default function MandalsTable({ mandals }: MandalsTableProps = {}) {
  const [organizations, setOrganizations] = useState<Organization[]>(mandals || initialOrganizations)
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [organizationToDelete, setOrganizationToDelete] = useState<Organization | null>(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [organizationToView, setOrganizationToView] = useState<Organization | null>(null)

  const handleEdit = (organization: Organization) => {
    console.log('Edit organization:', organization)
    alert(`Edit organization: ${organization.name}\n\nIn production, this would open an edit form with the organization data pre-filled.`)
  }

  const handleView = (organization: Organization) => {
    setOrganizationToView(organization)
    setViewModalOpen(true)
    setOpenMenuId(null)
  }

  const handleDeleteClick = (organization: Organization) => {
    setOrganizationToDelete(organization)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (organizationToDelete) {
      setOrganizations(organizations.filter(o => o.id !== organizationToDelete.id))
      console.log('Deleted organization:', organizationToDelete)
      setOrganizationToDelete(null)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Tabs */}
      <div className="border-b border-[#e2e8f0]">
        <div className="flex items-start gap-7 px-5 pt-[14px] pb-px">
          <button
            onClick={() => handleTab.switch('All Organizations')}
            className="pb-[14px] border-b-2 border-[#7e22ce] text-sm font-semibold text-[#7e22ce] leading-4 hover:opacity-80"
          >
            All Organizations (28)
          </button>
          <button
            onClick={() => handleTab.switch('Active')}
            className="pb-[13.5px] pt-0.5 text-sm font-semibold text-[#64748b] leading-4 hover:text-[#7e22ce]"
          >
            Active (24)
          </button>
          <button
            onClick={() => handleTab.switch('Expiring Soon')}
            className="pb-[13.5px] pt-0.5 text-sm font-semibold text-[#64748b] leading-4 hover:text-[#7e22ce]"
          >
            Expiring Soon (3)
          </button>
          <button
            onClick={() => handleTab.switch('Inactive')}
            className="pb-[13.5px] pt-0.5 text-sm font-semibold text-[#64748b] leading-4 hover:text-[#7e22ce]"
          >
            Inactive (1)
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[rgba(226,232,240,0.9)] rounded-xl shadow-[0px_1px_1px_rgba(0,0,0,0.05)] overflow-hidden">
        {/* Table Header */}
        <div className="bg-[rgba(248,250,252,0.5)] border-b border-[#e2e8f0] flex items-start">
          <div className="w-[38px] px-3 py-[17px] flex items-center justify-center">
            <span className="text-[10px] font-bold text-[#4d4d4d] leading-[15px] tracking-[0.5px] uppercase">#</span>
          </div>
          <div className="w-[204px] px-[9px] py-2.5 flex items-center">
            <span className="text-[10px] font-semibold text-[#4d4d4d] leading-[15px] tracking-[0.5px] uppercase">ORGANIZATION NAME</span>
          </div>
          <div className="w-[135px] px-3 py-[17px] flex items-center justify-center">
            <span className="text-[10px] font-semibold text-[#4d4d4d] leading-[15px] tracking-[0.5px] uppercase">CONTACT PERSON</span>
          </div>
          <div className="w-[110px] px-3 py-[17px] flex items-center justify-center">
            <span className="text-[10px] font-semibold text-[#4d4d4d] leading-[15px] tracking-[0.5px] uppercase">PLAN</span>
          </div>
          <div className="w-[75px] px-3 py-[17px] flex items-center justify-center">
            <span className="text-[10px] font-semibold text-[#4d4d4d] leading-[15px] tracking-[0.5px] uppercase">MEMBERS</span>
          </div>
          <div className="w-[80px] px-3 py-2.5 flex items-center justify-center">
            <span className="text-[10px] font-semibold text-[#4d4d4d] leading-[15px] tracking-[0.5px] uppercase text-center">VALID<br/>UNTIL</span>
          </div>
          <div className="w-[74px] px-3 py-[17px] flex items-center justify-center">
            <span className="text-[10px] font-semibold text-[#4d4d4d] leading-[15px] tracking-[0.5px] uppercase text-center">STATUS</span>
          </div>
          <div className="flex-1 px-3 py-[17px] flex items-center justify-center">
            <span className="text-[10px] font-semibold text-[#4d4d4d] leading-[15px] tracking-[0.5px] uppercase text-center">ACTIONS</span>
          </div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col gap-1">
          {organizations.map((org) => (
            <div key={org.id} className="flex items-center bg-[rgba(250,245,255,0.3)] h-[84px]">
              {/* ID */}
              <div className="w-[38px] px-3 flex items-center justify-center">
                <span className="text-[11.5px] font-medium text-[#94a3b8] leading-[17.25px]">
                  {String(org.id).padStart(2, '0')}
                </span>
              </div>

              {/* Organization Name */}
              <div className="w-[204px] flex gap-2.5 items-center">
                <div className="bg-[rgba(243,232,255,0.7)] border border-[#e9d5ff] rounded-lg w-8 h-8 flex items-center justify-center p-px flex-shrink-0">
                  <img src="/icons/building-purple-icon.svg" alt="" className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-[5px]">
                  <span className="text-xs font-medium text-[#0f172a] leading-[14.38px]">{org.name}</span>
                  <span className="text-xs font-medium text-[#94a3b8] leading-[15px]">{org.location}</span>
                </div>
              </div>

              {/* Contact Person */}
              <div className="w-[135px] px-3 py-[31.19px] flex flex-col items-center justify-center">
                <span className="text-xs font-medium text-[#1e293b] leading-[14.38px] text-center">{org.contact}</span>
                <span className="text-xs font-light text-[#727374] leading-[15.75px] text-center">{org.email}</span>
                <span className="text-xs font-light text-[#727374] leading-[15.75px] text-center">{org.phone}</span>
              </div>

              {/* Plan */}
              <div className="w-[110px] px-3 flex flex-col items-center justify-center">
                <span className="text-xs font-semibold text-[#1e293b] leading-[17.25px]">{org.plan}</span>
                <span className="text-xs text-[#727374] leading-[15.75px] text-center">{org.price}</span>
              </div>

              {/* Members */}
              <div className="w-[75px] px-3 flex items-center justify-center">
                <span className="text-xs font-semibold text-[#1e293b] leading-[17.25px]">{org.members}</span>
              </div>

              {/* Valid Until */}
              <div className="w-[80px] px-3 flex items-center justify-center">
                <span className="text-xs font-medium text-[#64748b] leading-[17.25px] text-center">{org.validUntil}</span>
              </div>

              {/* Status */}
              <div className="w-[74px] px-3 flex items-center justify-center">
                <span className="px-2.5 py-0.5 bg-[#d1fae5] rounded-full text-xs font-semibold text-[#047857] leading-[15.75px]">
                  {org.status}
                </span>
              </div>

              {/* Actions */}
              <div className="flex-1 px-3 flex items-center justify-center">
                <div className="relative inline-block">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === org.id ? null : org.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <img src="/icons/menu-three-dots.svg" alt="Actions" className="w-4 h-4" />
                  </button>
                  <ActionMenu
                    isOpen={openMenuId === org.id}
                    onClose={() => setOpenMenuId(null)}
                    options={[
                      {
                        label: 'View Details',
                        onClick: () => handleView(org),
                      },
                      {
                        label: 'Edit Organization',
                        onClick: () => handleEdit(org),
                      },
                      {
                        label: 'Delete',
                        onClick: () => handleDeleteClick(org),
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
        <div className="bg-white border-t border-[rgba(226,232,240,0.8)] px-3 py-[12.5px] flex items-center justify-between rounded-bl-xl rounded-br-xl">
          <span className="text-xs text-[#64748b] leading-4">
            Showing 1 to 10 of 28 organizations
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePagination.previous}
              className="w-7 h-7 border border-[#e2e8f0] rounded flex items-center justify-center p-px hover:bg-gray-50"
            >
              <img src="/icons/chevron-left.svg" alt="" className="w-[14px] h-[14px]" />
            </button>
            <button
              onClick={() => handlePagination.goToPage(1)}
              className="w-7 h-7 bg-[#7f28bc] rounded flex items-center justify-center text-xs font-bold text-white leading-4"
            >
              1
            </button>
            <button
              onClick={() => handlePagination.goToPage(2)}
              className="w-7 h-7 border border-[#e2e8f0] rounded flex items-center justify-center text-xs font-medium text-[#475569] leading-4 hover:bg-gray-50"
            >
              2
            </button>
            <button
              onClick={() => handlePagination.goToPage(3)}
              className="w-7 h-7 border border-[#e2e8f0] rounded flex items-center justify-center text-xs font-medium text-[#475569] leading-4 hover:bg-gray-50"
            >
              3
            </button>
            <button
              onClick={handlePagination.next}
              className="w-7 h-7 border border-[#e2e8f0] rounded flex items-center justify-center p-px hover:bg-gray-50"
            >
              <img src="/icons/chevron-right.svg" alt="" className="w-[14px] h-[14px]" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setOrganizationToDelete(null)
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Organization"
        message="Are you sure you want to delete"
        itemName={organizationToDelete?.name || ''}
      />

      {/* View Mandal Modal */}
      <ViewMandalModal
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false)
          setOrganizationToView(null)
        }}
        data={organizationToView}
      />
    </div>
  )
}
