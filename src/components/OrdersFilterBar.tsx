import { SearchInput, Dropdown, Button } from './shared'
import { handleFilter } from '../utils/mockHandlers'

export default function OrdersFilterBar() {

  return (
    <div className="bg-white border border-[rgba(226,232,240,0.8)] rounded-xl p-[13px] flex items-center justify-end gap-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
      <SearchInput placeholder="Search" className="flex-1 max-w-[384px]" />

      <div className="flex items-center gap-3">
        <Dropdown
          options={['Completed', 'Pending', 'Failed']}
          placeholder="All Status"
          height="h-[30px]"
          iconType="arrow"
        />
        <Dropdown
          options={['Individual', 'Mandal']}
          placeholder="All Type"
          height="h-[30px]"
          iconType="arrow"
        />
        <Dropdown
          options={['Videos', 'Monthly Plan', 'Annual Plan']}
          placeholder="All Plans/Videos"
          height="h-[30px]"
          iconType="arrow"
        />
        <Dropdown
          options={['Last 7 days', 'Last 30 days', 'Last 90 days']}
          placeholder="Select Date Range"
          height="h-[30px]"
          iconType="arrow"
        />
        <Button onClick={() => handleFilter.clear()} variant="text">Reset</Button>
      </div>
    </div>
  )
}
