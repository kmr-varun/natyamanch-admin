interface DeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
  itemName?: string
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Delete',
  message = 'Are you sure you want to delete',
  itemName = 'this item',
}: DeleteConfirmModalProps) {
  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-[#1e293b] leading-6">{title}</h3>
            <p className="text-sm text-[#64748b] mt-2">
              {message} <span className="font-semibold text-[#1e293b]">{itemName}</span>?
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#94a3b8] hover:text-[#64748b] transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Warning */}
        <div className="bg-[#fef2f2] border border-[#fecaca] rounded-lg p-3 mb-6">
          <p className="text-xs text-[#991b1b] leading-relaxed">
            This action cannot be undone. The item will be permanently deleted.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-[#e2e8f0] rounded-lg text-sm font-semibold text-[#334155] hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2.5 bg-[#ef4444] rounded-lg text-sm font-semibold text-white hover:bg-[#dc2626] transition-colors shadow-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
