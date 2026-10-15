import type { ReactNode } from 'react'
import SearchInput from './SearchInput'
import Button from './Button'

interface FilterBarProps {
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchWidth?: string
  children?: ReactNode
  onReset?: () => void
}

export default function FilterBar({
  searchPlaceholder = 'Search...',
  searchValue,
  onSearchChange,
  searchWidth = 'max-w-[384px] flex-1',
  children,
  onReset,
}: FilterBarProps) {
  return (
    <div className="bg-white border border-[rgba(226,232,240,0.8)] rounded-xl p-[13px] flex items-center justify-between shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
      {/* Search Input */}
      <SearchInput
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={onSearchChange}
        className={searchWidth}
      />

      {/* Filters */}
      <div className="flex items-center gap-3">
        {children}
        {onReset && (
          <Button variant="text" onClick={onReset}>
            Reset
          </Button>
        )}
      </div>
    </div>
  )
}
