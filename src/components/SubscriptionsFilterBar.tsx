import { FilterBar, Dropdown } from './shared'

export default function SubscriptionsFilterBar() {
  return (
    <FilterBar searchPlaceholder="Search categories..." searchWidth="w-[190px]" onReset={() => {}}>
      <Dropdown options={['Active', 'Expired']} placeholder="All Status" />
      <Dropdown options={['Stripe', 'Razorpay']} placeholder="All Payment Method" />
      <Dropdown options={['Last 7 days', 'Last 30 days']} placeholder="Select Date Range" />
    </FilterBar>
  )
}
