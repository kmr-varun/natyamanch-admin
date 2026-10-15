import { SearchInput, Dropdown, Button } from './shared'
import { handleFilter } from '../utils/mockHandlers'

export default function MandalsFilterBar() {

  return (
    <div className="bg-white border border-[rgba(226,232,240,0.8)] rounded-xl p-[13px] flex items-center justify-end gap-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
      <SearchInput placeholder="Search" className="w-[304px]" />

      <div className="flex items-center gap-3">
        <Dropdown
          options={['100 Account Plan', '50 Account Plan']}
          placeholder="All Plans"
          height="h-[30px]"
          iconType="arrow"
        />
        <Dropdown
          options={['Active', 'Expiring Soon', 'Inactive']}
          placeholder="All Status"
          height="h-[30px]"
          iconType="arrow"
        />
        <Dropdown
          options={['USA', 'India', 'UK']}
          placeholder="All Countries"
          height="h-[30px]"
          iconType="arrow"
        />
        <Button onClick={() => handleFilter.clear()} variant="text">Reset</Button>
      </div>
    </div>
  )
}
