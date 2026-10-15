import { useState } from 'react'
import { Button } from './shared'

interface AddContentModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (content: {
    title: string
    type: 'Page' | 'Popup'
    status: 'Published' | 'Draft'
  }) => void
  type: 'Page' | 'Popup'
}

export default function AddContentModal({ isOpen, onClose, onAdd, type }: AddContentModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    type: type,
    status: 'Draft' as 'Published' | 'Draft'
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title) {
      onAdd(formData)
      setFormData({ title: '', type: type, status: 'Draft' })
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Add New {type}</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {type} Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder={`Enter ${type.toLowerCase()} title`}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Published' | 'Draft' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
            >
              Add {type}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
