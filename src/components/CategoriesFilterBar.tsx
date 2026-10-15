import { useState } from 'react'
import { FilterBar, Dropdown } from './shared'

interface CategoriesFilterBarProps {
  onSearch: (query: string) => void
  onStatusFilter: (status: string) => void
  onSort: (sort: string) => void
}

export default function CategoriesFilterBar({
  onSearch,
  onStatusFilter,
  onSort
}: CategoriesFilterBarProps) {
  const [searchValue, setSearchValue] = useState('')
  const [statusValue, setStatusValue] = useState('')
  const [sortValue, setSortValue] = useState('')

  const handleReset = () => {
    setSearchValue('')
    setStatusValue('')
    setSortValue('')
    onSearch('')
    onStatusFilter('')
    onSort('')
  }

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
    onSearch(value)
  }

  const handleStatusChange = (value: string) => {
    setStatusValue(value)
    onStatusFilter(value)
  }

  const handleSortChange = (value: string) => {
    setSortValue(value)
    onSort(value)
  }

  return (
    <FilterBar
      searchPlaceholder="Search categories..."
      searchValue={searchValue}
      onSearchChange={handleSearchChange}
      onReset={handleReset}
    >
      <Dropdown
        options={['Active', 'Draft', 'Archived']}
        placeholder="All Status"
        value={statusValue}
        onChange={handleStatusChange}
      />
      <Dropdown
        options={['Name A-Z', 'Name Z-A', 'Newest First']}
        placeholder="Sort by Order"
        value={sortValue}
        onChange={handleSortChange}
      />
    </FilterBar>
  )
}
