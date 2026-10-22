import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ordersApi, type AdminOrder } from '../lib/api'

const fmtDate = (d: string) => {
  const date = new Date(d)
  return `${date.getDate()} ${date.toLocaleString('en', { month: 'short' })}`
}

const STATUS_STYLES: Record<string, string> = {
  completed: 'bg-[#ecfdf5] text-[#047857]',
  pending: 'bg-[#fef3c7] text-[#92400e]',
  failed: 'bg-[#fee2e2] text-[#b91c1c]',
  refunded: 'bg-[#ffd8ec] text-[#38062b]',
}

export default function RecentOrdersTable() {
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ordersApi.list({ page: 1, limit: 5 }).then(res => {
      setOrders(res.data ?? [])
      if (res.pagination) setTotal(res.pagination.total)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#f1f5f9] p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-2">
          <h2 className="text-base font-semibold text-[#1d1b20] leading-8">Recent Orders</h2>
          <Link to="/orders" className="flex items-center gap-0.5 text-[11px] font-semibold text-[#7f28bc] tracking-[0.55px] leading-[14px] hover:underline">
            View all
            <img src="/icons/chevron-right.svg" alt="" className="w-[4.933px] h-2" />
          </Link>
        </div>

        {loading ? (
          <div className="py-8 text-center text-sm text-[#94a3b8]">Loading...</div>
        ) : (
          <div className="overflow-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#ece6ee]">
                  {['User', 'Video', 'Amount', 'Status', 'Date'].map(h => (
                    <th key={h} className="text-center py-2.5 px-0.5 text-[11px] font-semibold text-[#4c4b4b] tracking-[0.55px] uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.id} className={index > 0 ? 'border-t border-[#ece6ee]' : ''}>
                    <td className="py-4 text-center text-xs font-medium text-[#1d1b20] leading-4 max-w-[80px] truncate">{order.user_name || order.user_id}</td>
                    <td className="py-4 text-center text-xs font-normal text-[#4c4b4b] leading-4 max-w-[80px] truncate">{order.video_title || order.video_id}</td>
                    <td className="py-4 text-center text-xs font-medium text-[#1d1b20] leading-4">₹{order.amount_inr}</td>
                    <td className="py-4 text-center">
                      <span className={`inline-flex px-2 py-0.5 rounded-xl text-xs font-normal leading-4 ${STATUS_STYLES[order.status] ?? 'bg-[#f1f5f9] text-[#64748b]'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-right text-xs font-normal text-[#4c4b4b] leading-4">{fmtDate(order.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="pt-4 mt-4 border-t border-[#ece6ee] flex items-center justify-between">
        <span className="text-[11px] font-semibold text-[#4c4b4b] tracking-[0.55px] leading-[14px]">
          Displaying 5 of {total} entries
        </span>
        <span className="text-xs font-normal text-[#1d1b20] tracking-[0.55px] leading-[14px]">
          Live data
        </span>
      </div>
    </div>
  )
}
