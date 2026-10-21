import { useState } from 'react'

interface Props {
  onSearch: (q: string) => void
  onStatusFilter: (s: string) => void
}

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'completed', label: 'Completed' },
  { value: 'pending', label: 'Pending' },
  { value: 'failed', label: 'Failed' },
]

export default function OrdersFilterBar({ onSearch, onStatusFilter }: Props) {
  const [status, setStatus] = useState('')

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 relative">
        <img src="/icons/search-icon.svg" alt="" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
        <input
          type="text"
          placeholder="Search orders by user name, email or video…"
          onChange={e => onSearch(e.target.value)}
          className="w-full h-9 pl-9 pr-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#7f28bc]"
        />
      </div>
      <div className="relative h-9 w-[160px]">
        <select
          value={status}
          onChange={e => { setStatus(e.target.value); onStatusFilter(e.target.value) }}
          className="w-full h-full px-3 bg-white border border-[#e2e8f0] rounded-lg text-sm text-[#1e293b] appearance-none focus:outline-none focus:border-[#7f28bc]"
        >
          {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <img src="/icons/chevron-down-icon.svg" alt="" className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
      </div>
    </div>
  )
}
