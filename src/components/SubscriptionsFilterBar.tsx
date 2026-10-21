import { useState } from 'react'
import { FilterBar, Dropdown } from './shared'

interface Props {
  onSearch: (q: string) => void
  onStatusFilter: (s: string) => void
}

export default function SubscriptionsFilterBar({ onSearch, onStatusFilter }: Props) {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')

  const handleReset = () => {
    setSearch('')
    setStatus('')
    onSearch('')
    onStatusFilter('')
  }

  return (
    <FilterBar
      searchPlaceholder="Search by name, email or video…"
      searchWidth="w-[260px]"
      searchValue={search}
      onSearchChange={v => { setSearch(v); onSearch(v) }}
      onReset={handleReset}
    >
      <Dropdown
        options={['completed', 'pending', 'failed']}
        placeholder="All Status"
        value={status}
        onChange={v => { setStatus(v); onStatusFilter(v) }}
      />
    </FilterBar>
  )
}
