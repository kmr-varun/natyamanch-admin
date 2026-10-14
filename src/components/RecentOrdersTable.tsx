// Mock data for recent orders
const mockOrders = [
  {
    id: 1048,
    user: 'Priya S.',
    item: 'Bharatanatyam',
    amount: '$49.00',
    status: 'Completed',
    date: 'Sep 19',
  },
  {
    id: 1047,
    user: 'Rahul M.',
    item: 'Kathak Fund.',
    amount: '$49.00',
    status: 'Completed',
    date: 'Sep 19',
  },
  {
    id: 1046,
    user: 'Ananya I.',
    item: 'Sub (Monthly)',
    amount: '$99.00',
    status: 'Active',
    date: 'Sep 18',
  },
  {
    id: 1045,
    user: 'Vikram S.',
    item: 'Odissi Work.',
    amount: '$49.00',
    status: 'Completed',
    date: 'Sep 18',
  },
  {
    id: 1044,
    user: 'Neha K.',
    item: 'Sub (Annual)',
    amount: '$499.00',
    status: 'Active',
    date: 'Sep 17',
  },
]

export default function RecentOrdersTable() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#f1f5f9] p-4 flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-2">
          <h2 className="text-base font-semibold text-[#1d1b20] leading-8">
            Recent Orders
          </h2>
          <button className="flex items-center gap-0.5 text-[11px] font-semibold text-[#7f28bc] tracking-[0.55px] leading-[14px] hover:underline">
            View all
            <img src="/icons/chevron-right.svg" alt="" className="w-[4.933px] h-2" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#ece6ee]">
                <th className="text-center py-2.5 px-0.5 text-[11px] font-semibold text-[#4c4b4b] tracking-[0.55px] uppercase">
                  #
                </th>
                <th className="text-center py-2.5 px-0.5 text-[11px] font-semibold text-[#4c4b4b] tracking-[0.55px] uppercase">
                  User
                </th>
                <th className="text-center py-2.5 px-0.5 text-[11px] font-semibold text-[#4c4b4b] tracking-[0.55px] uppercase">
                  Item
                </th>
                <th className="text-center py-2.5 px-0.5 text-[11px] font-semibold text-[#4c4b4b] tracking-[0.55px] uppercase">
                  Amount
                </th>
                <th className="text-center py-2.5 px-0.5 text-[11px] font-semibold text-[#4c4b4b] tracking-[0.55px] uppercase">
                  Status
                </th>
                <th className="text-right py-2.5 px-0.5 text-[11px] font-semibold text-[#4c4b4b] tracking-[0.55px] uppercase">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order, index) => (
                <tr key={order.id} className={index > 0 ? 'border-t border-[#ece6ee]' : ''}>
                  <td className="py-4 text-center text-xs font-medium text-[#1d1b20] leading-4">
                    {order.id}
                  </td>
                  <td className="py-4 text-center text-xs font-medium text-[#1d1b20] leading-4">
                    {order.user}
                  </td>
                  <td className="py-4 text-center text-xs font-normal text-[#4c4b4b] leading-4">
                    {order.item}
                  </td>
                  <td className="py-4 text-center text-xs font-medium text-[#1d1b20] leading-4">
                    {order.amount}
                  </td>
                  <td className="py-4 text-center">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-xl text-xs font-normal leading-4 ${
                        order.status === 'Completed'
                          ? 'bg-[#ecfdf5] text-[#047857]'
                          : 'bg-[#ffd8ec] text-[#38062b]'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 text-right text-xs font-normal text-[#4c4b4b] leading-4">
                    {order.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 mt-4 border-t border-[#ece6ee] flex items-center justify-between">
        <span className="text-[11px] font-semibold text-[#4c4b4b] tracking-[0.55px] leading-[14px]">
          Displaying 5 of 1,280 entries
        </span>
        <span className="text-xs font-normal text-[#1d1b20] tracking-[0.55px] leading-[14px]">
          Updated 4m ago
        </span>
      </div>
    </div>
  )
}
